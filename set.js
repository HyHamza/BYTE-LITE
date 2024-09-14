 
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


module.exports = { session: process.env.SESSION_ID ||eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoic0tBLzVxZ2JTQ01rY0tLY09wY0laSFc2bVpiVC9PN2orQ21qU2tZRFYwbz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZ21QWlk0ZnhXMi9TMUZiQU94K3k4V2RDMUo3UXRYMjg1cnp3K3dPK0N4RT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ3SXBRR20vc3BoWGJzalNKN2oxTWY2OVdoanRwQTZhekhtVllqVjd2V1VZPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ3L1pmc3RaUnJMVTFIdWRHSGtyTWlmTThPWnNUKzBPazY5T0N2cDhtVGlRPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IldDbjBKVXFTcG9LVnp6T09yc2FIb0VKYmRNc0FDamgrZWQ1UDhoazNBWFU9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkVGa3gzaHl1TWRhYnNsZ0hQc0hGSVQ1bXljeTJTdHMwMitwSktkYlF1VGM9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQ0xiT0pIMFVHZURTa092eEczNHFBVVFSWkRWSFVxQWY5YkwzNDdPb0Zudz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoia3V6bUpYeWg2NDNPVHcyTEQvQ0VZcnQvMEpZY0kveHRaVVoza0RldTNGOD0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InZ6TmxUenlsRWg4blArY0lGN2lqd2NvOWExTm1iQ2pGV1Y1VkgzVjRmSWNPc3Nac3dHalJzTGUzL3lqWVRYMUlpVzB0MlF3cGc0TWJGMTYxcjVwYmp3PT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6ODIsImFkdlNlY3JldEtleSI6InluUlo1eFhwT3Fpa0FhRTNZU1l5dFpNUnNqeVROYXVIVVNwUGVqN25xWjg9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbeyJrZXkiOnsicmVtb3RlSmlkIjoiNjI4ODE2MDMzNDM2QHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6IjQyNjZGODY4MTc3QjIxOUU5Nzk2ODk4MEQ2QUJGN0I1In0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3MjYzMTc0NTN9LHsia2V5Ijp7InJlbW90ZUppZCI6IjYyODgxNjAzMzQzNkBzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiJBMDBBRkIyODI2QUE4ODE4NjAzMzgwMjJGMEJDMzlBMSJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzI2MzE3NDU0fSx7ImtleSI6eyJyZW1vdGVKaWQiOiI2Mjg4MTYwMzM0MzZAcy53aGF0c2FwcC5uZXQiLCJmcm9tTWUiOnRydWUsImlkIjoiNjM5RDY2QUUxNkFGRUU4OTBFMTY2NzFCMjEzQTI2MUMifSwibWVzc2FnZVRpbWVzdGFtcCI6MTcyNjMxNzQ2Mn1dLCJuZXh0UHJlS2V5SWQiOjMxLCJmaXJzdFVudXBsb2FkZWRQcmVLZXlJZCI6MzEsImFjY291bnRTeW5jQ291bnRlciI6MSwiYWNjb3VudFNldHRpbmdzIjp7InVuYXJjaGl2ZUNoYXRzIjpmYWxzZX0sImRldmljZUlkIjoiNGVOaVFQeC1SWjZmY0FjRkItbjQ5USIsInBob25lSWQiOiJkN2Q2NDc2My1jZmE5LTQyMjktYTA1NC1kNzEyOTM4MDVhNjMiLCJpZGVudGl0eUlkIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoidGZ6THZOcllUVFhyOU1JbFBkR1E5UjhLSWRZPSJ9LCJyZWdpc3RlcmVkIjp0cnVlLCJiYWNrdXBUb2tlbiI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjdKMHNmQVN6NERqemU5WEtNdTg0cHFucU53bz0ifSwicmVnaXN0cmF0aW9uIjp7fSwicGFpcmluZ0NvZGUiOiJMTjhXRTFDQiIsIm1lIjp7ImlkIjoiNjI4ODE2MDMzNDM2OjE3QHMud2hhdHNhcHAubmV0IiwibmFtZSI6ImRpdCBpcyB3YWFydm9vciBvbnMgaXMifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ0w3dzV2TUZFUGlHbHJjR0dBUWdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6ImsxRC9tWXVUWnA0MlJBRXB6SzFPbnhsNjBpQndFMHBocHJwbHFyYm90VWs9IiwiYWNjb3VudFNpZ25hdHVyZSI6ImxwMGFMelY3U25CQk5IUGkvRDAvb2pabnpLc2s4eFFVVGNleElMRDVrRUlCZ3h3M3dXSXZwZlFueit5eS93NHV5d3l2Y2tEL2ZMT1FZc2JNcGhZc0R3PT0iLCJkZXZpY2VTaWduYXR1cmUiOiJwTzZTa3BwMVJzQk14S2g4eE81NzNUeGdvcHJSUXB1R3lINk9Rb09RcUN4OEJhdU5QZlYxU3lLL3ZIVFFiVTcwSkdxaUJsc1psbW01N0FOcGRFUTlpdz09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjYyODgxNjAzMzQzNjoxN0BzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJaTlEvNW1MazJhZU5rUUJLY3l0VHA4WmV0SWdjQk5LWWFhNlphcTI2TFZKIn19XSwicGxhdGZvcm0iOiJzbWJhIiwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzI2MzE3NDQ2LCJteUFwcFN0YXRlS2V5SWQiOiJBQUFBQUdKcSJ9',

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
