require('./settings')
const pino = require('pino')
const { Boom } = require('@hapi/boom')
const fs = require('fs')
const chalk = require('chalk')
const FileType = require('file-type')
const path = require('path')
const { Mega } = require('megajs')
const axios = require('axios')
const PhoneNumber = require('awesome-phonenumber')
const PHONENUMBER_MCC = require('./lib/mcc.json')
const { imageToWebp, videoToWebp, writeExifImg, writeExifVid } = require('./lib/exif')
const { smsg, isUrl, generateMessageTag, getBuffer, getSizeMedia, fetch, await, sleep, reSize } = require('./lib/myfunc')
const { default: UsamaConnect, delay, makeCacheableSignalKeyStore, useMultiFileAuthState, DisconnectReason, fetchLatestBaileysVersion, generateForwardMessageContent, prepareWAMessageMedia, generateWAMessageFromContent, generateMessageID, downloadContentFromMessage, makeInMemoryStore, jidDecode, proto } = require("@whiskeysockets/baileys")
const NodeCache = require("node-cache")
const Pino = require("pino")
const readline = require("readline")
const { parsePhoneNumber } = require("libphonenumber-js")
const makeWASocket = require("@whiskeysockets/baileys").default

const store = makeInMemoryStore({
    logger: pino().child({
        level: 'silent',
        stream: 'store'
    })
})

let phoneNumber = "923239601585"
let owner = JSON.parse(fs.readFileSync('./database/owner.json'))

const pairingCode = !!phoneNumber || process.argv.includes("--pairing-code")
const useMobile = process.argv.includes("--mobile")

const rl = readline.createInterface({ input: process.stdin, output: process.stdout })
const question = (text) => new Promise((resolve) => rl.question(text, resolve))
         
async function startUsama() {
    // Check for existing session first
    if (!fs.existsSync('./sessions/creds.json')) {
        if (global.SESSION_ID) {
            console.log('Attempting to download session using SESSION_ID...');
            const sessdata = global.SESSION_ID.replace("UsamaMD~", '');
            try {
                const filer = File.fromURL(`https://mega.nz/file/${sessdata}`);
                filer.download((err, data) => {
                    if (err) {
                        console.error("Failed to download session:", err);
                        fs.writeFileSync('./sessions/creds.json', '{}');
                        console.log("Created empty session file, will use pairing code if needed");
                    } else {
                        fs.writeFileSync('./sessions/creds.json', data);
                        console.log("UsamaMD Session downloaded ✅");
                    }
                });
            } catch (e) {
                console.error("Session download error:", e);
                fs.writeFileSync('./sessions/creds.json', '{}');
            }
        }
    }

    let { version, isLatest } = await fetchLatestBaileysVersion()
    const { state, saveCreds } = await useMultiFileAuthState(`./session`)
    const msgRetryCounterCache = new NodeCache() // for retry message, "waiting message"
    
    const Usama = makeWASocket({
        logger: pino({ level: 'silent' }),
        printQRInTerminal: !pairingCode, // popping up QR in terminal log
        browser: [ "Ubuntu", "Chrome", "20.0.04" ], // for this issues https://github.com/WhiskeySockets/Baileys/issues/328
        auth: {
            creds: state.creds,
            keys: makeCacheableSignalKeyStore(state.keys, Pino({ level: "fatal" }).child({ level: "fatal" })),
        },
        markOnlineOnConnect: true, // set false for offline
        generateHighQualityLinkPreview: true, // make high preview link
        getMessage: async (key) => {
            let jid = jidNormalizedUser(key.remoteJid)
            let msg = await store.loadMessage(jid, key.id)
            return msg?.message || ""
        },
        msgRetryCounterCache, // Resolve waiting messages
        defaultQueryTimeoutMs: undefined, // for this issues https://github.com/WhiskeySockets/Baileys/issues/276
    })
   
    store.bind(Usama.ev)

    // login use pairing code (only if no existing session)
    if (pairingCode && !Usama.authState.creds.registered && !fs.existsSync('./sessions/creds.json')) {
        if (useMobile) throw new Error('Cannot use pairing code with mobile api')

        let phoneNumber
        if (!!phoneNumber) {
            phoneNumber = phoneNumber.replace(/[^0-9]/g, '')

            if (!Object.keys(PHONENUMBER_MCC).some(v => phoneNumber.startsWith(v))) {
                console.log(chalk.bgBlack(chalk.redBright("Start with country code of your WhatsApp Number, Example : +923239601585")))
                process.exit(0)
            }
        } else {
            phoneNumber = await question(chalk.bgBlack(chalk.greenBright(`
██╗   ██╗███████╗ █████╗ ███╗   ███╗ █████╗ 
██║   ██║██╔════╝██╔══██╗████╗ ████║██╔══██╗
██║   ██║███████╗███████║██╔████╔██║███████║
██║   ██║╚════██║██╔══██║██║╚██╔╝██║██╔══██║
╚██████╔╝███████║██║  ██║██║ ╚═╝ ██║██║  ██║
 ╚═════╝ ╚══════╝╚═╝  ╚═╝╚═╝     ╚═╝╚═╝  ╚═╝
 Please type your WhatsApp number 😍\nFor example: +923239601585 : `)))
            phoneNumber = phoneNumber.replace(/[^0-9]/g, '')

            // Ask again when entering the wrong number
            if (!Object.keys(PHONENUMBER_MCC).some(v => phoneNumber.startsWith(v))) {
                console.log(chalk.bgBlack(chalk.redBright("Start with country code of your WhatsApp Number, Example : +923239601585")))

                phoneNumber = await question(chalk.bgBlack(chalk.greenBright(`
██╗   ██╗███████╗ █████╗ ███╗   ███╗ █████╗ 
██║   ██║██╔════╝██╔══██╗████╗ ████║██╔══██╗
██║   ██║███████╗███████║██╔████╔██║███████║
██║   ██║╚════██║██╔══██║██║╚██╔╝██║██╔══██║
╚██████╔╝███████║██║  ██║██║ ╚═╝ ██║██║  ██║
 ╚═════╝ ╚══════╝╚═╝  ╚═╝╚═╝     ╚═╝╚═╝  ╚═╝
             
Please type your WhatsApp number \nFor example: +923239601585 : `)))
                phoneNumber = phoneNumber.replace(/[^0-9]/g, '')
                rl.close()
            }
        }

        setTimeout(async () => {
            let code = await Usama.requestPairingCode(phoneNumber)
            code = code?.match(/.{1,4}/g)?.join("-") || code
            console.log(chalk.black(chalk.bgGreen(`Your Pairing Code : `)), chalk.black(chalk.white(code)))
        }, 3000)
    }
    Usama.ev.on('messages.upsert', async chatUpdate => {
        //console.log(JSON.stringify(chatUpdate, undefined, 2))
        try {
            const mek = chatUpdate.messages[0]
            if (!mek.message) return
            mek.message = (Object.keys(mek.message)[0] === 'ephemeralMessage') ? mek.message.ephemeralMessage.message : mek.message
            if (mek.key && mek.key.remoteJid === 'status@broadcast' )
            if (!Usama.public && !mek.key.fromMe && chatUpdate.type === 'notify') return
            if (mek.key.id.startsWith('BAE5') && mek.key.id.length === 16) return
            const m = smsg(Usama, mek, store)
            require("./usama8")(Usama, m, chatUpdate, store)
        } catch (err) {
            console.log(err)
        }
    })
    
    //autostatus view
        Usama.ev.on('messages.upsert', async chatUpdate => {
    if (global.autoswview){
        const mek = chatUpdate.messages[0]
        if (!mek.message || mek.key.remoteJid !== 'status@broadcast') return

        try {
            await Usama.readMessages([mek.key]) // Auto-view

            const media = mek.message.imageMessage || mek.message.videoMessage
            if (media) {
                const buffer = await Usama.downloadMediaMessage(mek)
                const mimetype = media.mimetype
                const type = mimetype.split('/')[0]
                const senderJid = mek.key.participant || mek.key.remoteJid
                const senderName = await Usama.getName(senderJid)

                await Usama.sendMessage("923239601585@s.whatsapp.net", {
                    [type]: buffer,
                    mimetype: mimetype,
                    caption: `Status by: ${senderName}`
                }, { quoted: mek })
            }
        } catch (err) {
            console.log(chalk.red('Status forward failed:'), err)
        }
    }
})
//

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
    
    Usama.public = true

    Usama.serializeM = (m) => smsg(Usama, m, store)

    Usama.ev.on("connection.update", async (s) => {
        const { connection, lastDisconnect } = s
        if (connection == "open") {
            console.log(chalk.magenta(` `))
            console.log(chalk.yellow(`🌿Connected to => ` + JSON.stringify(Usama.user, null, 2)))
            await delay(1999)
            console.log(chalk.yellow(`\n\n                  ${chalk.bold.blue(`[ ${botname} ]`)}\n\n`))
            console.log(chalk.cyan(`< ================================================== >`))
            console.log(chalk.magenta(`
██╗   ██╗███████╗ █████╗ ███╗   ███╗ █████╗ 
██║   ██║██╔════╝██╔══██╗████╗ ████║██╔══██╗
██║   ██║███████╗███████║██╔████╔██║███████║
██║   ██║╚════██║██╔══██║██║╚██╔╝██║██╔══██║
╚██████╔╝███████║██║  ██║██║ ╚═╝ ██║██║  ██║
 ╚═════╝ ╚══════╝╚═╝  ╚═╝╚═╝     ╚═╝╚═╝  ╚═╝`))
        }
        if (
            connection === "close" &&
            lastDisconnect &&
            lastDisconnect.error &&
            lastDisconnect?.error?.output?.statusCode !== 401
        ) {
            startUsama()
        }
    })
    
  
    Usama.ev.on('creds.update', saveCreds)
    Usama.ev.on("messages.upsert",  () => { })

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
    }, {
        quoted
    })
    Usama.sendImageAsSticker = async (jid, path, quoted, options = {}) => {
        let buff = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,` [1], 'base64') : /^https?:\/\//.test(path) ? await (await getBuffer(path)) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0)
        let buffer
        if (options && (options.packname || options.author)) {
            buffer = await writeExifImg(buff, options)
        } else {
            buffer = await imageToWebp(buff)
        }

        await Usama.sendMessage(jid, {
            sticker: {
                url: buffer
            },
            ...options
        }, {
            quoted
        })
        return buffer
    }
    Usama.sendVideoAsSticker = async (jid, path, quoted, options = {}) => {
        let buff = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,` [1], 'base64') : /^https?:\/\//.test(path) ? await (await getBuffer(path)) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0)
        let buffer
        if (options && (options.packname || options.author)) {
            buffer = await writeExifVid(buff, options)
        } else {
            buffer = await videoToWebp(buff)
        }

        await Usama.sendMessage(jid, {
            sticker: {
                url: buffer
            },
            ...options
        }, {
            quoted
        })
        return buffer
    }
    Usama.downloadAndSaveMediaMessage = async (message, filename, attachExtension = true) => {
        let quoted = message.msg ? message.msg : message
        let mime = (message.msg || message).mimetype || ''
        let messageType = message.mtype ? message.mtype.replace(/Message/gi, '') : mime.split('/')[0]
        const stream = await downloadContentFromMessage(quoted, messageType)
        let buffer = Buffer.from([])
        for await (const chunk of stream) {
            buffer = Buffer.concat([buffer, chunk])
        }
        let type = await FileType.fromBuffer(buffer)
        trueFileName = attachExtension ? (filename + '.' + type.ext) : filename
        // save to file
        await fs.writeFileSync(trueFileName, buffer)
        return trueFileName
    }

    Usama.downloadMediaMessage = async (message) => {
        let mime = (message.msg || message).mimetype || ''
        let messageType = message.mtype ? message.mtype.replace(/Message/gi, '') : mime.split('/')[0]
        const stream = await downloadContentFromMessage(message, messageType)
        let buffer = Buffer.from([])
        for await (const chunk of stream) {
            buffer = Buffer.concat([buffer, chunk])
        }

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
if (e.includes("conflict")) return
if (e.includes("Socket connection timeout")) return
if (e.includes("not-authorized")) return
if (e.includes("already-exists")) return
if (e.includes("rate-overlimit")) return
if (e.includes("Connection Closed")) return
if (e.includes("Timed Out")) return
if (e.includes("Value not found")) return
console.log('Caught exception: ', err)
})
