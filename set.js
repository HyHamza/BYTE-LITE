 
const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;


///////////////////


module.exports = { session: process.env.SESSION_ID || 'Byte;;;',

////////////////////////////////Byte;;;eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiY0VBYitwN1hmS3AvTVNCQ3cvcndMWHVQVS9rVGtHdjdmaG9mS2xrU29uRT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiSEZSZnh0MkhzZ204OG1VaFZEWU4vdjJyUDdscTdSdmVRTGt1L2g3ZDlXOD0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJXSEZURkVqUkx3ZmxJWUZncjQ0MTYwcXBHV2xrcHdOdm02S1NMbVFzbFhJPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiIxeWNpeUVva0JOaHB6TXZ4M0dLNWs4ZiswQjVVeDRBS3h3OVZnOHVwa2pVPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IitGZnhHZEo4RW0rWmZocHlrUGJxQmpKaWt4cG15dWUyK0hiamljaUs5RTA9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlU5UUlmSXlUa29IQituZVV0ZDZaMFhVVWdOdHd2QlE4eG9kU09Sa3phblU9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiT0FhdWhyQnkzN2hKajVNUEV6aUZiVWpLSll4VENyRENZUURqeCtPK2NuST0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoidzhPRnE2OGNvc0dER2svWk5LZ2pQdFc5NHhkQVJJdnc2VThjS0ZxalVrWT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ii9GcDAvblNjNnRjOTRWbTRhM1J2S0kwMDMrTkdzZFVYTkVaTU5qRXpjMDhqSnNtNXdnRFArL284d3BJMkNDS2puOVVZLzFRRDVUSFdWdXFtUTRwNWdRPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6NjYsImFkdlNlY3JldEtleSI6Ijl6dDFPcHI3UkVvRmlCYWI4bDhXQWVGZWRtbzdkRWxHcjl1RUc3dXEwVDA9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbeyJrZXkiOnsicmVtb3RlSmlkIjoiNTA5NDEwNjkxMzFAcy53aGF0c2FwcC5uZXQiLCJmcm9tTWUiOnRydWUsImlkIjoiQkMxMUYyRDExNEFDNTRGNUU1OEFDRUMxQTBDRkExMDIifSwibWVzc2FnZVRpbWVzdGFtcCI6MTcyNzEzMzQwNn0seyJrZXkiOnsicmVtb3RlSmlkIjoiNTA5NDEwNjkxMzFAcy53aGF0c2FwcC5uZXQiLCJmcm9tTWUiOnRydWUsImlkIjoiNDBEMjU2MUY5QjdCNTRFN0QxQ0ZDNUZDRjg2MzYyMzAifSwibWVzc2FnZVRpbWVzdGFtcCI6MTcyNzEzMzQwNn1dLCJuZXh0UHJlS2V5SWQiOjMxLCJmaXJzdFVudXBsb2FkZWRQcmVLZXlJZCI6MzEsImFjY291bnRTeW5jQ291bnRlciI6MSwiYWNjb3VudFNldHRpbmdzIjp7InVuYXJjaGl2ZUNoYXRzIjpmYWxzZX0sImRldmljZUlkIjoiQno2NkQ2VDVUTC1GUUZ6VXRHeWJvZyIsInBob25lSWQiOiI2NDFlMzU0NS0yNzQ4LTRhNDQtOTVhZS1kMDMwZmE1YmQ4YTYiLCJpZGVudGl0eUlkIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoidXdsTEFZWUxWVW81ZXoyRTl0MDBzZ2I4UFRFPSJ9LCJyZWdpc3RlcmVkIjp0cnVlLCJiYWNrdXBUb2tlbiI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkxWWi9JQzkyT0dKOUN0dXJWT3RaMFkwN1ZLcz0ifSwicmVnaXN0cmF0aW9uIjp7fSwicGFpcmluZ0NvZGUiOiJMNDVYRzRGQiIsIm1lIjp7ImlkIjoiNTA5NDEwNjkxMzE6NEBzLndoYXRzYXBwLm5ldCIsIm5hbWUiOiJBbGluw6ljYXNpbWlyIn0sImFjY291bnQiOnsiZGV0YWlscyI6IkNJU3o2b1FIRU1ydHg3Y0dHQUVnQUNnQSIsImFjY291bnRTaWduYXR1cmVLZXkiOiJJbTgvUjZjSCtiL3g3SjdWYjF0NGdEd2hOMnNldmpqVWFDVGJ3UWFOVDM0PSIsImFjY291bnRTaWduYXR1cmUiOiI3SDM3ZHlyN0tzcG53T2FtL1dxS2VTdFBPa1NMTXpxbWRNZTh3T2QzUng5RnkwRjEya2ZxUzRpNC92blpqUWlmR1FXS1ZQTWJubEtEQ0R0dnJTZHBDQT09IiwiZGV2aWNlU2lnbmF0dXJlIjoiRm1qRUVnV3ZWdGtwRDM4NU5GSHlsWHBHYlQrbzlGU242Yi9XVERpWUtNWUg5ZlExaVNsSnRVcmpITmlTTDRGR0I1MTE2cU1IazhqY0pMQ0VKdVpraXc9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiI1MDk0MTA2OTEzMTo0QHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQlNKdlAwZW5CL20vOGV5ZTFXOWJlSUE4SVRkckhyNDQxR2drMjhFR2pVOSsifX1dLCJwbGF0Zm9ybSI6InNtYmEiLCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3MjcxMzMzOTksIm15QXBwU3RhdGVLZXlJZCI6IkFBQUFBRXVTIn0=



    PREFIXE: process.env.PREFIX || ".",



///////////////////////////
    A_REACT : process.env.AUTO_REACTION || 'on',
    CHATBOT: process.env.CHAT_BOT || "off",
    OWNER_NAME: process.env.OWNER_NAME || "TALKDROVE",
    NUMERO_OWNER : process.env.OWNER_NUMBER || "923072380380",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'non',
    BOT : process.env.BOT_NAME || 'BYTE-MD',
    OPENAI_API_KEY : process.env.OPENAI_API_KEY || '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',
    URL : process.env.BOT_MENU_LINKS || 'https://raw.githubusercontent.com/HyHamza/HyHamza/main/Images/BYTE-MD-LITE.jpeg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'no',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_API_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    //GPT : process.env.OPENAI_API_KEY || '',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'yes',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9" : "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9",
   
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`Update ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
