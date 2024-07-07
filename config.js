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
  sessionName: process.env.SESSION_ID || "Byte;;;eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiWUNTS0hSamM3MVM5aVhaVlU2WE9mTTdxMTVWUlRPQ0FWNDJXVjVuVHoyTT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiUFkvbEw1blU1UmZyL01Oc0E0WUdqL1BibHQ4YVoyWVdxTFcyTjdicGNIbz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiIwSXgwZkpqNjJ0ZXQ4cGxNaGoyNDlUSGEyeTZaWk1kWXBSTFVEK2lpeEUwPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiIrOXczNVVCUE42cTRMUnVDM0tLbHZMcGVRcC9HSTd3TmI0ZkZ0RHBTdGgwPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InVHWG5sbjZyUFM2Q2RLb3NTRXhEZzRzcGNnNFdULzFBWEhpc0lyUmJlR1k9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjU4Qy9rT3JQZFdZanpUcHZ2RWI2N1ZSWnh3c0hWTHN0NlVKcmtZdVhlQUU9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoib05kUFNHbjB1cVk0N0Jjak1DM0poa0E2Uy9LclFYSTZweHpJa0xyYXJtMD0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiU2U1QTdKNXZ6clZidmRVNE9OU2lmQk43Wm9rYzhocFF5cVpYdmN4NkRnND0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Im1DRXJKQ2ovVjhLWnJmYTJrS1lNOHJsSU5DdTIwUHV5UXNMRjNSWjlieDB5T1pLUlppcVYyMFRlNXNUMzFjV2lIVFd5UnNGMTBqS0l6NVFPQjhNUkN3PT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTU3LCJhZHZTZWNyZXRLZXkiOiJHblBsdCtGTENoVEdFR2NJWUlDMHppaXVoNDBEZnBIaG03ZG9tZmdxa1ZNPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJncGtvbG1PQ1RqU0ZRM09IaXplanh3IiwicGhvbmVJZCI6IjY5YmIzNjVlLWFiODItNDZiYi05YmY4LWRjNTM2MjA2MjZlYyIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJTNmxiOWdicVlBVlVjWUYxVklPS294aEZJUms9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiVUVzaDNSREwrZFVyajNXcDhqUSt1eEQyQ1pnPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IlBESjRRTlhZIiwibWUiOnsiaWQiOiI5MjMwNzIzODAzODA6NTVAcy53aGF0c2FwcC5uZXQiLCJuYW1lIjoiOm8ifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ002QTlJd0dFT3ZUcTdRR0dDQWdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6InFiWlI5WHJsOWxScGZvRlpZMkd1aUJEMUtqT2lSc3Z6NUFJNXFqUzRtbk09IiwiYWNjb3VudFNpZ25hdHVyZSI6IjJpc0YwMGE0QkQrMWZOZVpVV3VhWG5TWS9PcS9oMWV3WXVUTno4a2I5b2pBWHROSzFKSGdaUU0rRE9LWGZMVTJwelRSMjNJeDlWVnRvYmNqdkVSekF3PT0iLCJkZXZpY2VTaWduYXR1cmUiOiJOQ0lwaFIwRnJDTDE5dTJqNzBVNVFZdFpjdjA5SDFPNHdVVzRFVzlHcDNSTmh2bThpRS9FTkNiRGxuUVhlZEZIL1R1YkFiSWVPSkphUjN2WHhZQjJCdz09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjkyMzA3MjM4MDM4MDo1NUBzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJhbTJVZlY2NWZaVWFYNkJXV05ocm9nUTlTb3pva2JMOCtRQ09hbzB1SnB6In19XSwicGxhdGZvcm0iOiJzbWJhIiwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzIwMzc5ODg2fQ==",      //Put Your Session Id Here
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
 
