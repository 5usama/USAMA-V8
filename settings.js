const fs = require('fs')
const chalk = require('chalk')




global.SESSION_ID = "UsamaMD~qwQQ0DZI#7rnP9RHmD-fV2NxB_2L5SuBn6I6WPEkO91tHv79rgPs"
//contact details
global.ownernomer = "923239601585"
global.ownername = "USAMA"
global.ownernumber = '923239601585'  //creator number
global.ownername = 'USAMA' //owner name
global.botname = '`𝗨𝗦𝗔𝗠𝗔-𝗩𝟖`' //name of the bot
//sticker details
global.packname = 'Sticker By'
global.author = 'USAMA\n\nContact: +923239601585'

//console view/theme

//theme link
global.link = 'https://whatsapp.com/channel/0029VavSK8U8fewp1htKiS21'

//custom prefix
global.prefa = ['','!','.','#','&']

//false=disable and true=enable
global.autoRecording = true //auto recording
global.autoTyping = true //auto typing
global.autorecordtype = true //auto typing + recording
global.AUTO_STATUS_REACT = true
global.autoread = false //auto read messages
global.autobio = false //auto update bio
global.autoswview = true //auto view status/story



//text bug
global.xbugtex = {
xtxt: 'USAMA-V8',
}


//reply messages
global.mess = {
    done: 'Done !',
    prem: 'This feature can be used by premium user only',
    admin: 'This feature can be used by admin only',
    botAdmin: 'This feature can only be used when the bot is a group admin ',
    owner: 'This feature can be used by or owner only',
    group: 'This feature is only for groups',
    private: 'This feature is only for private chats',
    wait: 'In process... ',    
    error: 'Error!',
}

let file = require.resolve(__filename)
fs.watchFile(file, () => {
    fs.unwatchFile(file)
    console.log(chalk.redBright(`Update'${__filename}'`))
    delete require.cache[file]
    require(file)
})
