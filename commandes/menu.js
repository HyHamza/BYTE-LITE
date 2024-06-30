
const util = require('util');
const fs = require('fs-extra');
const { Hamza } = require(__dirname + "/../TalkDrove/Hamza");
const { format } = require(__dirname + "/../TalkDrove/mesfonctions");
const os = require("os");
const moment = require("moment-timezone");
const s = require(__dirname + "/../set");

Hamza({ nomCom: "menu", categorie: "General" }, async (dest, zk, commandeOptions) => {
    let { ms, repondre ,prefixe,nomAuteurMessage,mybotpic} = commandeOptions;
    let { cm } = require(__dirname + "/../TalkDrove//Hamza");
    var coms = {};
    var mode = "public";
    
    if ((s.MODE).toLocaleLowerCase() != "yes") {
        mode = "private";
    }


    
 cm.map(async (com, index) => {
        if (!coms[com.categorie])
            coms[com.categorie] = [];
        coms[com.categorie].push(com.nomCom);
    });

    moment.tz.setDefault('Asia/Karachi');

// Create a date and time in EAT
const temps = moment().format('HH:mm:ss');
const date = moment().format('DD/MM/YYYY');
let infoMsg =  `
╭────〖BYTE-MD-LITE〗────╮
│﹄ *Préfix* : ${s.PREFIXE}
│﹄ *User* : ${s.OWNER_NAME}
│﹄ *Mode* : ${mode}
│﹄ *Commands* : ${cm.length} 
│﹄ *Date* : ${date}
│﹄ *Time* : ${temps} 
│﹄ *Ram* : ${format(os.totalmem() - os.freemem())}/${format(os.totalmem())}
│﹄ *Platform* : ${os.platform()}
│﹄ *Developer* : 𝐻𝒶𝓂𝓏𝒶
│﹄ *Version* : v.lite
╰─────{*TalkDrove*}─────o: \n\n`;

  let menuMsg=`  

*BYTE-MD Commands :*
◇                             ◇
`;

    for (const cat in coms) {
        menuMsg += `*-‿‿o *${cat}* *o‿‿*`;
        for (const cmd of coms[cat]) {
            menuMsg += `
 *|*${s.PREFIXE} ${cmd}`;
        }
        menuMsg += `
*╰═════════════⊷* \n`
    }

    menuMsg += `

*———————————————————— Channel link: ———————————————————————————*

  _https://whatsapp.com/channel/0029VaNRcHSJP2199iMQ4W0l_                                         
*-‿-︵-‿-︵-‿-︵-‿--‿-︵-‿-︵-‿-︵-‿--‿-︵-‿-︵-‿-︵-‿-*
`;

   var lien = mybotpic();

   if (lien.match(/\.(mp4|gif)$/i)) {
    try {
        zk.sendMessage(dest, { video: { url: lien }, caption:infoMsg + menuMsg, footer: "*Powered by TalkDrove*" , gifPlayback : true }, { quoted: ms });
    }
    catch (e) {
        console.log("Awhhhhh Menu Error " + e);
        repondre("Awhhhhh Menu Error " + e);
    }
} 
// Vérification pour .jpeg ou .png
else if (lien.match(/\.(jpeg|png|jpg)$/i)) {
    try {
        zk.sendMessage(dest, { image: { url: lien }, caption:infoMsg + menuMsg, footer: "*BYTE-MD*" }, { quoted: ms });
    }
    catch (e) {
        console.log("Awhhhhh Menu Error " + e);
        repondre("Awhhhhh Menu Error " + e);
    }
} 
else {
    
    repondre(infoMsg + menuMsg);
    
}

});
