 
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


module.exports = { session: process.env.SESSION_ID ||Zokou-MD-WHATSAPP-BOT;;;=>eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiNE5mT0w2aXpSdFpmMDMwbng4Mitqb2F4YUQrMElZeVFXZHhUTjBnNklGQT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoia2tlUGVCL2laMEpaQTZPYUloSENSNGpablVIdUJGc1hPcU8vL1hVZWxWWT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJxSjZOT0tzYUZOVnpYMjV3YklmQ1YvZmlUODRLWGpGcndmT054ckJyY25zPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJpaUNtU0JndUxpR20vYWwvV1VkMHZOakZkMVRNd0JUdHFOL0FhL1dmc0M4PSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IktBZ0lNczFlVzlLdEUrWWJTcFlTTHltVFdRekNBRzVQZU85UDZ1NjBXa3M9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlErYWFmVllvd2Y5djAxbzNwVjJqUDRNSnA5Mm9FSEdGeFhQTjhpVnBxQWM9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiR0Vndnp6Nzg3YUt5UlcxVXVyYk8vQllpUGZzYmNmZTFmb3ZMNXppNEJVRT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiVEpwUksyS0tQZ2M0VEF6STFSNTJmNFRYY0J2cTVmVGhzK0M0ZTZEdkt6dz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InhCbTRTTWh3UkxlYjY4Tm9XV0k0cWU5ZUpCTDJNNnFvNkMyZlVUTm5FOHVzRkRPNlhpQVROWmJsV2dwWVRVRnZtNmF4THMySGFzQk5MS2FhOEdNS0FRPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MjIxLCJhZHZTZWNyZXRLZXkiOiJLUVBHaDR2V1FBdis4L1BCRmpJaFhjM1VUa2NQcEkwR2lPaFVGYUtCZU5jPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W3sia2V5Ijp7InJlbW90ZUppZCI6IjU5Nzc0OTgzMjlAcy53aGF0c2FwcC5uZXQiLCJmcm9tTWUiOnRydWUsImlkIjoiODU2NTUyMzI4NDFDQkVBRkNEMEIyNjlCMDI5QTk4MDMifSwibWVzc2FnZVRpbWVzdGFtcCI6MTcyODgwMjc4MX1dLCJuZXh0UHJlS2V5SWQiOjMxLCJmaXJzdFVudXBsb2FkZWRQcmVLZXlJZCI6MzEsImFjY291bnRTeW5jQ291bnRlciI6MSwiYWNjb3VudFNldHRpbmdzIjp7InVuYXJjaGl2ZUNoYXRzIjpmYWxzZX0sImRldmljZUlkIjoiaGV2Q0FWa2VRbUNCcTFDemVxbDkwUSIsInBob25lSWQiOiI3ODU5NTZhNy0xMzRmLTRiNTgtOTdjZC00YmMxZjQ3YmJjOWQiLCJpZGVudGl0eUlkIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZktOSUZYZ3BNcjV6d045TDdPM1E1TEhEM2N3PSJ9LCJyZWdpc3RlcmVkIjp0cnVlLCJiYWNrdXBUb2tlbiI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlJpS1V1YXo4K3A1c2N0L3dJaGZVcDhKanhBaz0ifSwicmVnaXN0cmF0aW9uIjp7fSwicGFpcmluZ0NvZGUiOiJEV0pBVlZDMSIsImxhc3RQcm9wSGFzaCI6IjNSRVJteSIsInJvdXRpbmdJbmZvIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQ0JJSURRPT0ifSwibWUiOnsiaWQiOiI1OTc3NDk4MzI5OjE0QHMud2hhdHNhcHAubmV0IiwibGlkIjoiMjc1ODM2MTIwOTE2MTUxOjE0QGxpZCJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDSlMrenZzREVOWGZyYmdHR0FFZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoiR21sQzIvVTlyZTNQRElJK20wZDBqdUJFdDZ6UDZpV1dqUEQxbEoxeG8wcz0iLCJhY2NvdW50U2lnbmF0dXJlIjoiZnNqdWVZdGkzRExMaVBHT1VDTHBXRU9mWVdVRE51bmZHWWRkNUFraVpOd0NLVEtPUHJhUzFmditvTXh0QUphZ1dOeHpNcGxsbkIxSEV6VDR5akI1QlE9PSIsImRldmljZVNpZ25hdHVyZSI6ImY1SkEyeFJOa0VqZ1ZCaFpXMW5GTU1xaEN3akd3TVVlZFFIZ2JWM1Z4Qzhyb0ExT3J5cklhNXhDRFFnRU5aS2pJQTJaMUZBaGt1eWhIMHQwMVZNckN3PT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiNTk3NzQ5ODMyOToxNEBzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJScHBRdHYxUGEzdHp3eUNQcHRIZEk3Z1JMZXN6K29sbG96dzlaU2RjYU5MIn19XSwicGxhdGZvcm0iOiJhbmRyb2lkIiwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzI4ODAyNzc1LCJteUFwcFN0YXRlS2V5SWQiOiJBQUFBQUI3ayJ9

////////////////////////////////



    PREFIXE: process.env.PREFIX || ".",



///////////////////////////
    A_REACT : process.env.AUTO_REACTION || 'on',
    CHATBOT: process.env.CHAT_BOT || "off",
    OWNER_NAME: process.env.OWNER_NAME || "DADDY.BRAIN",
    NUMERO_OWNER : process.env.OWNER_NUMBER || 5977498329              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'non',
    BOT : process.env.BOT_NAME || 'vortex brain',
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
