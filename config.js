const fs = require('fs-extra')
if (fs.existsSync('config.env')) require('dotenv').config({ path: __dirname+'/config.env' })


//═══════[Required Variables]════════\\
global.owner = process.env.OWNER_NUMBER || '923072380380'  // Make SURE its Not Be Empty, Else Bot Stoped And Errors,
global.mongodb = process.env.MONGODB_URI || "mongodb+srv://SithumKalhara:97531@cluster0.iva7dbo.mongodb.net/?retryWrites=true&w=majority"
global.port= process.env.PORT || 5000
global.email = 'talkdrove@gmail.com'
global.github = 'https://github.com/HyHamza/BYTE-MD-LITE'
global.location = 'Earth'
global.gurl = 'https://instagram.com/talkdrove' // add your username
global.sudo = process.env.SUDO || "923072380380"
global.devs = '923072380380';
global.website = 'HyHamza.vercel.app' //wa.me/+92000000000000
global.THUMB_IMAGE = process.env.THUMB_IMAGE || 'https://raw.githubusercontent.com/HyHamza/HyHamza/main/Images/BYTE-MD-LITE.jpeg'
module.exports = {
  sessionName: process.env.SESSION_ID || "Byte;;;eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiU095V2poNmMrSk9HWVQ5TUtqZkt0dlZvTk1wbGNRL3I1V2ZVdTVOcUZGZz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoibTE0dEJSbXZiVmRxakZqaEpzYThSOTVOelpJb2VJRy9jQ2Fxenc4VFJYYz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiIyRkNCMUNKUit5STMzV29BTU4xbmdjZFk4OXZVN0R2SU5FVlJLcGF5SmtJPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiIzbXVjTUgxUUFuWnRiSmVyeHNvUm8yRys4NGtVS1JVcUQ2VTBiMnpRcGhRPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlNQaHlOTVQxMFM0Z2VuVEZEbDdRY0FsWXFZaDV0QTh5TG0zK3NMOFFaRm89In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlFMUStOVVducDBOTG1Zdjk2a0I1ZTg4MzhEU2Nxb2E3ZkoxZVhObFFwd009In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiUUxZWVhXSjNKdVJSdEp2QVpKYmRTV3B0V3hlUGs4dlAxRGRpaEk0VzRWOD0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiOXkyaHBoK0t2NVVzdElwYnBPOFBXUHNNcm0vNTVoamdkcnJibjUzckx3MD0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InJ1UURSVFV1R0JFM0s3dGpDMDVpL2xCdlU1Z1hXWHRkR1FVYWJBR2FGb0xaQ3FrekRjSnZ5Rm0vRS9vL2MxLyttYk4rSUl5UkxCM2EvQ0JacnBoL2h3PT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTgyLCJhZHZTZWNyZXRLZXkiOiJ2VHNUc01CbHRNUGI2ZFdBNEVPUU1rQ3VyTlMzSFY5Um9xMG1xYzFaRFVRPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJGMVFMdnlFdFN5U1NkbTl6SFM2ZnRBIiwicGhvbmVJZCI6IjExMjJhYTgxLTJkYjItNGViYy04ODVlLTNkNTQ1NmY0NTJmMyIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ6YXZJUTN6cVIvMnBKbDR1Tis1ZlRTaVFGRHM9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiUTF1RGNFY3JYaGZGamRXYk0xZU4va3dWZk1NPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IkdUQVZMNFdDIiwibWUiOnsiaWQiOiI5MjMwNzIzODAzODA6NjdAcy53aGF0c2FwcC5uZXQiLCJuYW1lIjoiOm8ifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ002QTlJd0dFSWFMMGJRR0dDMGdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6InFiWlI5WHJsOWxScGZvRlpZMkd1aUJEMUtqT2lSc3Z6NUFJNXFqUzRtbk09IiwiYWNjb3VudFNpZ25hdHVyZSI6ImpORkdOMTg1MnFvZDdxalNISldGdG1NZit5eDJ1N09CcURLM050M3o4QXc4cG1lTUFkbEk1ZkVaZm1KdGl3SEN0WUNid0lOQ0VlbGZRVEorT2d0ZERRPT0iLCJkZXZpY2VTaWduYXR1cmUiOiJQRlZ3ZkkwV0JXVWZuZ0YzRTUxM2oyY1VSTVM4SU1IQkQvQWhqNWZ2VzBHN2oyZW84cFpLMHJNTmJjYTVXMHQzVDNVcnN2R0ZnenhUOWxGdmdTQ0loUT09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjkyMzA3MjM4MDM4MDo2N0BzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJhbTJVZlY2NWZaVWFYNkJXV05ocm9nUTlTb3pva2JMOCtRQ09hbzB1SnB6In19XSwicGxhdGZvcm0iOiJzbWJhIiwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzIwOTkzMTczLCJteUFwcFN0YXRlS2V5SWQiOiJBQUFBQUUwRiJ9",      //Put Your Session Id Here
  author:  process.env.PACK_AUTHER ||  'BYTE-MD',
  packname:  process.env.PACK_NAME || 'POWERED BY TALKDROVE',
  
  botname:   process.env.BOT_NAME === undefined ? "BYTE-MD" : process.env.BOT_NAME,
  ownername: process.env.OWNER_NAME === undefined ? 'TalkDrove' : process.env.OWNER_NAME,  
  auto_read_status :  process.env.AUTO_READ_STATUS === undefined ? false : process.env.AUTO_READ_STATUS,
  autoreaction:  process.env.AUTO_REACTION  === undefined ? true : process.env.AUTO_REACTION ,
  antibadword :  process.env.ANTI_BAD_WORD === undefined ? 'love' : process.env.ANTI_BAD_WORD,
  alwaysonline:  process.env.ALWAYS_ONLINE === undefined ? true : process.env.ALWAYS_ONLINE,
  antifake : process.env.FAKE_COUNTRY_CODE === undefined ? '234' : process.env.FAKE_COUNTRY_CODE,
  readmessage:  process.env.READ_MESSAGE === undefined ? false : process.env.READ_MESSAGE,
  auto_status_saver: process.env.AUTO_STATUS_SAVER === undefined ? false : process.env.AUTO_STATUS_SAVER,
  HANDLERS:  process.env.PREFIX === undefined ? '.' : process.env.PREFIX,
  warncount : process.env.WARN_COUNT === undefined ? 3 : process.env.WARN_COUNT,
  disablepm:  process.env.DISABLE_PM === undefined ? false : process.env.DISABLE_PM,
  levelupmessage:  process.env.LEVEL_UP_MESSAGE === undefined ? false : process.env.LEVEL_UP_MESSAGE,
  antilink:  process.env.ANTILINK_VALUES === undefined ? 'all' : process.env.ANTILINK_VALUES,
  antilinkaction: process.env.ANTILINK_ACTION === undefined ? 'remove' : process.env.ANTILINK_ACTION,
  BRANCH: 'main', 
  ALIVE_MESSAGE:  process.env.ALIVE_MESSAGE === undefined ? '' : process.env.ALIVE_MESSAGE,
  autobio:  process.env.AUTO_BIO === undefined ? false : process.env.AUTO_BIO,
  caption :process.env.CAPTION || "\t*POWERED BY TALKDROVE* ",   
  OPENAI_API_KEY:  process.env.OPENAI_API_KEY === undefined ? false : process.env.OPENAI_API_KEY,
  heroku:  process.env.heroku === undefined ? false : process.env.heroku,
  HEROKU: {
    HEROKU: process.env.HEROKU ||false,
    API_KEY: process.env.HEROKU_API_KEY === undefined ? '' : process.env.HEROKU_API_KEY,
    APP_NAME: process.env.HEROKU_APP_NAME === undefined ? '' : process.env.HEROKU_APP_NAME
},
  VERSION: process.env.VERSION === undefined ? '0.1' : process.env.VERSION,
  LANG: process.env.THEME|| 'BYTE-MD-LITE',
  WORKTYPE: process.env.WORKTYPE === undefined ? 'public' : process.env.WORKTYPE
};


let file = require.resolve(__filename)
fs.watchFile(file, () => {
	fs.unwatchFile(file)
	console.log(`Update'${__filename}'`)
    delete require.cache[file]
	require(file)
})
 
