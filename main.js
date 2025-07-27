// Finalized version: Pairing code and QR removed — session only login retained

require('./settings')
const pino = require('pino')
const fs = require('fs')
const chalk = require('chalk')
const { default: UsamaConnect, delay, makeCacheableSignalKeyStore, useMultiFileAuthState, DisconnectReason, fetchLatestBaileysVersion, jidDecode, proto, downloadContentFromMessage } = require("@whiskeysockets/baileys")
const { smsg, getBuffer } = require('./lib/myfunc')
const NodeCache = require("node-cache")
const { File } = require('megajs')
const path = require('path')
const PhoneNumber = require('awesome-phonenumber')
const FileType = require('file-type')
const { writeExifImg, writeExifVid, imageToWebp, videoToWebp } = require('./lib/exif')

const sessionPath = path.join(__dirname, 'sessions', 'creds.json')
if (!fs.existsSync(path.dirname(sessionPath))) fs.mkdirSync(path.dirname(sessionPath))

if (!fs.existsSync(sessionPath)) {
    fs.writeFileSync(sessionPath, global.SESSION_ID && isValidJSON(global.SESSION_ID) ? global.SESSION_ID : '{}')
}

function isValidJSON(str) {
    try {
        JSON.parse(str);
        return true;
    } catch {
        return false;
    }
}

async function startUsama() {
    if (!fs.existsSync('./sessions/creds.json')) {
        if (global.SESSION_ID) {
            const sessdata = global.SESSION_ID.replace("UsamaMD~", '')
            try {
                const filer = File.fromURL(`https://mega.nz/file/${sessdata}`)
                filer.download((err, data) => {
                    if (err) {
                        console.error("Failed to download session:", err)
                        fs.writeFileSync('./sessions/creds.json', '{}')
                    } else {
                        fs.writeFileSync('./sessions/creds.json', data)
                        console.log("UsamaMD Session downloaded ✅")
                    }
                })
            } catch (e) {
                console.error("Session download error:", e)
                fs.writeFileSync('./sessions/creds.json', '{}')
            }
        }
    }

    const { version } = await fetchLatestBaileysVersion()
    const { state, saveCreds } = await useMultiFileAuthState('./session')
    const msgRetryCounterCache = new NodeCache()

    const Usama = UsamaConnect({
        logger: pino({ level: 'silent' }),
        printQRInTerminal: false,
        browser: ["Ubuntu", "Chrome", "20.0.04"],
        auth: {
            creds: state.creds,
            keys: makeCacheableSignalKeyStore(state.keys)
        },
        msgRetryCounterCache
    })

    Usama.public = true

    Usama.ev.on("connection.update", async (s) => {
        const { connection, lastDisconnect } = s
        if (connection === "open") {
            console.log(chalk.green("Connected ✅"))
        } else if (connection === "close") {
            if (lastDisconnect?.error?.output?.statusCode !== 401) startUsama()
        }
    })

    Usama.ev.on('messages.upsert', async chatUpdate => {
        try {
            const mek = chatUpdate.messages[0]
            if (!mek.message) return
            mek.message = (Object.keys(mek.message)[0] === 'ephemeralMessage') ? mek.message.ephemeralMessage.message : mek.message
            if (!Usama.public && !mek.key.fromMe && chatUpdate.type === 'notify') return
            if (mek.key.id.startsWith('BAE5') && mek.key.id.length === 16) return
            const m = smsg(Usama, mek)
            require("./usama8")(Usama, m, chatUpdate)
        } catch (err) {
            console.log(err)
        }
    })

    Usama.decodeJid = (jid) => {
        if (!jid) return jid
        if (/:\d+@/gi.test(jid)) {
            let decode = jidDecode(jid) || {}
            return decode.user && decode.server && decode.user + '@' + decode.server || jid
        } else return jid
    }

    Usama.ev.on('contacts.update', update => {
        for (let contact of update) {
            let id = Usama.decodeJid(contact.id)
            if (store && store.contacts) store.contacts[id] = {
                id,
                name: contact.notify
            }
        }
    })

    Usama.getName = (jid, withoutContact = false) => {
        id = Usama.decodeJid(jid)
        withoutContact = Usama.withoutContact || withoutContact
        let v
        if (id.endsWith("@g.us")) return new Promise(async (resolve) => {
            v = store.contacts[id] || {}
            if (!(v.name || v.subject)) v = Usama.groupMetadata(id) || {}
            resolve(v.name || v.subject || PhoneNumber('+' + id.replace('@s.whatsapp.net', '')).getNumber('international'))
        })
        else v = id === '0@s.whatsapp.net' ? {
                id,
                name: 'WhatsApp'
            } : id === Usama.decodeJid(Usama.user.id) ?
            Usama.user :
            (store.contacts[id] || {})
        return (withoutContact ? '' : v.name) || v.subject || v.verifiedName || PhoneNumber('+' + jid.replace('@s.whatsapp.net', '')).getNumber('international')
    }

    Usama.serializeM = (m) => smsg(Usama, m)
    Usama.ev.on('creds.update', saveCreds)

    Usama.sendText = (jid, text, quoted = '', options) => Usama.sendMessage(jid, {
        text: text,
        ...options
    }, {
        quoted,
        ...options
    })

    Usama.sendTextWithMentions = async (jid, text, quoted, options = {}) => Usama.sendMessage(jid, {
        text: text,
        mentions: [...text.matchAll(/@(\d{0,16})/g)].map(v => v[1] + '@s.whatsapp.net'),
        ...options
    }, { quoted })

    Usama.sendImageAsSticker = async (jid, path, quoted, options = {}) => {
        let buff = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,` [1], 'base64') : /^https?:\/\//.test(path) ? await (await getBuffer(path)) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0)
        let buffer = options && (options.packname || options.author) ? await writeExifImg(buff, options) : await imageToWebp(buff)
        await Usama.sendMessage(jid, { sticker: { url: buffer }, ...options }, { quoted })
        return buffer
    }

    Usama.sendVideoAsSticker = async (jid, path, quoted, options = {}) => {
        let buff = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,` [1], 'base64') : /^https?:\/\//.test(path) ? await (await getBuffer(path)) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0)
        let buffer = options && (options.packname || options.author) ? await writeExifVid(buff, options) : await videoToWebp(buff)
        await Usama.sendMessage(jid, { sticker: { url: buffer }, ...options }, { quoted })
        return buffer
    }

    Usama.downloadAndSaveMediaMessage = async (message, filename, attachExtension = true) => {
        let quoted = message.msg ? message.msg : message
        let mime = (message.msg || message).mimetype || ''
        let messageType = message.mtype ? message.mtype.replace(/Message/gi, '') : mime.split('/')[0]
        const stream = await downloadContentFromMessage(quoted, messageType)
        let buffer = Buffer.from([])
        for await (const chunk of stream) buffer = Buffer.concat([buffer, chunk])
        let type = await FileType.fromBuffer(buffer)
        let trueFileName = attachExtension ? `${filename}.${type.ext}` : filename
        await fs.writeFileSync(trueFileName, buffer)
        return trueFileName
    }

    Usama.downloadMediaMessage = async (message) => {
        let mime = (message.msg || message).mimetype || ''
        let messageType = message.mtype ? message.mtype.replace(/Message/gi, '') : mime.split('/')[0]
        const stream = await downloadContentFromMessage(message, messageType)
        let buffer = Buffer.from([])
        for await (const chunk of stream) buffer = Buffer.concat([buffer, chunk])
        return buffer
    }
}

return startUsama()

let file = require.resolve(__filename)
fs.watchFile(file, () => {
    fs.unwatchFile(file)
    console.log(chalk.redBright(`Update ${__filename}`))
    delete require.cache[file]
    require(file)
})

process.on('uncaughtException', function (err) {
    let e = String(err)
    if (["conflict", "Socket connection timeout", "not-authorized", "already-exists", "rate-overlimit", "Connection Closed", "Timed Out", "Value not found"].some(msg => e.includes(msg))) return
    console.log('Caught exception: ', err)
})
