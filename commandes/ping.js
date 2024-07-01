const { Hamza } = require("../TalkDrove/Hamza");
const moment = require("moment-timezone");
const { default: axios } = require('axios');

Hamza({
  nomCom: 'ping',
  desc: 'To check ping',
  categorie: 'General',
  reaction: '🐥',
  fromMe: 'true'
},
async (dest, zk, commandeOptions) => {
  const { ms, arg, repondre } = commandeOptions;
  
  const start = new Date().getTime();
  await repondre('Please wait...');
  const end = new Date().getTime();
  
  const ping = end - start;
  await zk.sendMessage(dest, {
    text: `*BYTE-MD ping is...* \`\`\`${ping}\`\`\` *ms* 🐼`
  }, { quoted: ms });
});


Hamza({ nomCom: 'ping',
    desc: 'To check ping',
    Categorie: 'General',
    reaction: '🐼', 
    fromMe: 'true', 
       
repondre('BYTE-MD is Active...🐼');
