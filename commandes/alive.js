const { Hamza } = require('../TalkDrove/Hamza');
const {addOrUpdateDataInAlive , getDataFromAlive} = require('../byte-tables/alive')
const moment = require("moment-timezone");
const s = require(__dirname + "/../set");

Hamza(
    {
        nomCom : 'alive',
        categorie : 'General'
        
    },async (dest,zk,commandeOptions) => {

 const {ms , arg, repondre,superUser} = commandeOptions;

 const data = await getDataFromAlive();

 if (!arg || !arg[0] || arg.join('') === '') {

    if(data) {
       
        const {message , lien} = data;


        var mode = "public";
        if ((s.MODE).toLocaleLowerCase() != "yes") {
            mode = "private";
        }
      
    
     
    moment.tz.setDefault('EAT');

// Créer une date et une heure en EAT
const temps = moment().format('HH:mm:ss');
const date = moment().format('DD/MM/YYYY');

    const alivemsg = `
*Owner* : ${s.OWNER_NAME}
*Mode* : ${mode}
*Date* : ${date}
*Time* : ${temps}

 ${message}
 
 
 *BYTE-MD BY TALKDROVE*`

 if (lien.match(/\.(mp4|gif)$/i)) {
    try {
        zk.sendMessage(dest, { video: { url: lien }, caption: alivemsg }, { quoted: ms });
    }
    catch (e) {
        console.log("🥵🥵 Menu Error " + e);
        repondre("🥵🥵 Menu Error" + e);
    }
} 
// Checking for .jpeg or .png
else if (lien.match(/\.(jpeg|png|jpg)$/i)) {
    try {
        zk.sendMessage(dest, { image: { url: lien }, caption: alivemsg }, { quoted: ms });
    }
    catch (e) {
        console.log("🥵🥵 Menu Error" + e);
        repondre("🥵🥵 Menu Error" + e);
    }
} 
else {
    
    repondre(alivemsg);
    
}

    } else {
        if(!superUser) { repondre("there is no alive for this bot") ; return};

      await   repondre("⚔ T A L K D R O V E  Alive message ⚔");
         repondre(" *BYTE-MD is alive bro!!!*")
     }
 } else {

    if(!superUser) { repondre ("Only the owner can  modify the alive") ; return};

  
    const texte = arg.join(' ').split(';')[0];
    const tlien = arg.join(' ').split(';')[1]; 


    
await addOrUpdateDataInAlive(texte , tlien)

repondre('message alive refresh successfully')

}
    });
