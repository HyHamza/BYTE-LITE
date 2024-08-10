 
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


module.exports = { session: process.env.SESSION_ID || 'Byte;;;eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoib0ovU1NaN0tQdWNPckRpUUVuMVZKeE54TDA0TkZ3WmxFVHA1MXlJcHFrTT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiLzdldlpxQWhtaVFkRXNOWDNrOVQvVm5LeHNxMjY3RGVwQ1YwaExxSnBuZz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiIwR3ZhYkZ3NFl6ci83RkFWVFNUU0dzTnIwdGVmUDBxRFRXc0lQN01ZaEZNPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJiNEZ6ZlpZK1RxUlRhRVZrRmR2Y0V1WlhldFdTWHBQa0hzYURZWFMxTUZ3PSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IktOa1pEVTdMWlIwVElta2hiSXdnVHEwbmx6UlpmcXBsU0lMTTk5YXd1a2c9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjlaZ1ViMzJncGZrS0JQRWRGc2tJd1ZkcTBzZmROeXdxakNVMHZBSW9EREk9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiYU90elcxNW0rR0VCTVZ6Z3VlbEtRdGoyWmE3ZkJ3K2FQNTBsejUvcXAzOD0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQWZteXgvY04wRkhMamoySGp5WDhXQ08yb0s0ajBaLzh1UGp6ZklnNW14ND0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlFSckczc2Z2S1VnWkgxc2U4TTlZN04rN0dzbVZwc3RNdnhHdkIxdnFoMDFDakxaSTJoeGNZb0dtQXU3c05teW1nZzkvS3dkSEhsV2hBS205Y0ZHK2dBPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTczLCJhZHZTZWNyZXRLZXkiOiJrWGlTcmhZbzk3YVFONGF0TjRqUUFTV3cvc050a2RvWnMvVnpacmJHeVhJPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJ1NGNHRGJOOFNEQ2lYeXpHd2Y4cThBIiwicGhvbmVJZCI6IjQ2ZTdmN2MxLWNkYmQtNDMyNy04ZTA0LTU2YjQ3MzhiYzQ4NCIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJZZDI2cDRHeWlrSTVYUGpKWlVxUVdxTUVFVVU9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiVFVwQjRIeTJQWHJUS09CcHBWWDVELzNvUFNJPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IldKVlA0VlJIIiwibWUiOnsiaWQiOiIyMzQ5MTMyMjY2NDIyOjg2QHMud2hhdHNhcHAubmV0In0sImFjY291bnQiOnsiZGV0YWlscyI6IkNNbjdpSVFIRUozQzNyVUdHQUVnQUNnQSIsImFjY291bnRTaWduYXR1cmVLZXkiOiJEUm1SdTVLTVZuaURIaUxSQ1BtSGdIakFOemc1R0IwL2R5czB0bEJVeHlRPSIsImFjY291bnRTaWduYXR1cmUiOiJUbUR1SlYwQVEyT0t2SExoUzFlWW96MXVCMUZxY25RRHgzL0p2bjExbE92VUhnaitjUkkrSEJraE5PNVAxT29jOW9QVjAyR2hueVVkNHZTaFNaV1NCZz09IiwiZGV2aWNlU2lnbmF0dXJlIjoiaFNiU1BHS2lQTWZjRnlSMUw1eGUrMDBYNGNnMUFxYzdwUzh0UiswbGszeEpaZStxY2ExeXZ1VWlLN2RjVVNoWUVMMTQ5cFlwYS9kRG1CbUd6VDVsZ3c9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiIyMzQ5MTMyMjY2NDIyOjg2QHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQlEwWmtidVNqRlo0Z3g0aTBRajVoNEI0d0RjNE9SZ2RQM2NyTkxaUVZNY2sifX1dLCJwbGF0Zm9ybSI6ImFuZHJvaWQiLCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3MjMzMTAzNzcsIm15QXBwU3RhdGVLZXlJZCI6IkFBQUFBQTE5In0=',

////////////////////////////////



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
