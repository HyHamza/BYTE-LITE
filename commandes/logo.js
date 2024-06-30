const { Hamza } = require("../framework/Hamza");
var mumaker = require("mumaker");
Hamza({ nomCom: "hacker",
    categorie: "Logo", reaction: "👨🏿‍💻" }, async (origineMessage, zk, commandeOptions) => {
    const { prefixe, arg, ms, repondre } = commandeOptions;
    if (!arg || arg == "") {
        repondre("*__Exemple : * " + prefixe + "BYTE LOGO");
        return;
    }
    try {
        let radio = "984dd03e-220d-4335-a6ba-7ac56b092240";
        let anu = await mumaker.ephoto("https://en.ephoto360.com/create-anonymous-hacker-avatars-cyan-neon-677.html", arg); //
        //
       // let res = Object.values(anu)[3];
        // console.log("&€"+res);
      //  let lien = "https://e1.yotools.net" + res;
        repondre("*⚡ *ʟᴏᴀᴅɪɴɢ BYTE-MD* ⚡...*");
        await zk.sendMessage(origineMessage, { image: { url:anu.image}, caption: "\t *Logo by BYTE-MD*" }, { quoted: ms });
    }
    catch (e) {
        repondre("🥵🥵 " + e);
    }
});
Hamza({ nomCom: "dragonball", categorie: "Logo", reaction: "🐉" }, async (dest, zk, commandeOptions) => {
    let { arg, repondre, prefixe, ms } = commandeOptions;
    try {
        const noArgMsg = `*_EXEMPLE *:  ${prefixe}dragonball BYTEKing`;
        //  if(arg=='') {await zok.sendMessage(dest,{text:noArgMsg},{quoted:infoMessage}); return;}
        if (arg == '' || !arg) {
            repondre(noArgMsg);
            return;
        }
        var lienMaker = "https://ephoto360.com/tao-hieu-ung-chu-phong-cach-dragon-ball-truc-tuyen-1000.html";
        var lienMaker2 = "https://en.ephoto360.com/create-dragon-ball-style-text-effects-online-809.html";
      
       
        const imgInfo = await mumaker.ephoto(lienMaker2, arg.join(' '));
       
        await zk.sendMessage(dest, { text: " *\t Traitement en cours ...*" }, { quoted: ms });
       // var idImg = Object.values(imgInfo)[3];
       
        await zk.sendMessage(dest, { image: { url: imgInfo.image }, caption: " \t *Logo by BYTE-MD*" }, { quoted: ms });
    }
    catch (e) {
        repondre("🥵🥵 " + e);
    }
});
////////////////////////////
Hamza({ nomCom: "naruto", categorie: "Logo", reaction: "⛩" }, async (dest, zk, commandeOptions) => {
    let { ms, arg, repondre, prefixe } = commandeOptions;
    try {
        if (!arg || arg == '') {
            repondre("*_Exemple : * " + prefixe + "naruto BYTE-MD");
            return;
        }
        var nar = "https://en.ephoto360.com/naruto-shippuden-logo-style-text-effect-online-808.html";
        //let img= await //mumaker.textpro('https://textpro.me/create-naruto-logo-style-text-effect-online-1125.html',arg);
        repondre("*traitement en cours...*");
        var radio2 = "e0723d60-fc0d-421f-bf8f-a9b9b61e4be6";
        var img = await mumaker.ephoto("https://en.ephoto360.com/naruto-shippuden-logo-style-text-effect-online-808.html", arg.join(' '));
        
        await zk.sendMessage(dest, { image: { url: img.image }, caption: "\t *Logo by BYTE-MD*" }, { quoted: ms });
    }
    catch (e) {
        repondre("🥵🥵 " + e);
    }
});
//didong
/*Hamza({ nomCom: "didong", categorie: "Logo", reaction: "📱" }, async (dest, zk, commandeOptions) => {
    let { ms, repondre, arg, prefixe } = commandeOptions;
    
    var titre = "\t logo by Hamza-Md";
    try {
      var lien = "https://ephoto360.com/tao-anh-che-vui-tu-choi-cuoc-goi-voi-ten-cua-ban-930.html";
        if (!arg || arg == "") {
           repondre(`*exemple :* ${prefixe}didong Hamza`)
            return ;
        }
      console.log(typeof arg[0])
        var maker = mumaker.ephoto(lien, "arg");
        var lienImg = Object.values(maker)[1];
        await zk.sendMessage(dest, { image: { url: lienImg }, caption: titre });
    }
    catch (e) {
        repondre("🥵🥵 " + e);
    }
});
*/


Hamza({ nomCom: "didong", categorie: "Logo", reaction: "📱" }, async (dest, zk, commandeOptions) => {
    let { arg, repondre, prefixe, ms } = commandeOptions;
   try {
     var titre = "\t *Logo by BYTE-MD*";
      var lien = "https://ephoto360.com/tao-anh-che-vui-tu-choi-cuoc-goi-voi-ten-cua-ban-930.html";
        if (!arg || arg == "") {
           repondre(`*exemple :* ${prefixe}didong BYTE King`)
            return ;
        }
     
        var maker =await mumaker.ephoto(lien,arg.join(' '));
    
        
     repondre('*⚡ *ʟᴏᴀᴅɪɴɢ BYTE-MD* ⚡...*')
       await zk.sendMessage(dest, { image: { url: maker.image}, caption: titre });
    }
    catch (e) {
        repondre("🥵🥵 " + e);
    }
    }
);


Hamza({nomCom : "wall",categorie : "Logo",reaction : "👍"} , async (dest,zk,commandeOptions) =>{

  const {arg,repondre,ms,prefixe} = commandeOptions;
  if(!arg[0]) { repondre( `Exemple of using commande:\n ${prefixe}wall BYTE-MD` ); return ;}
   let text = arg.join(" ")
   mumaker.textpro("https://textpro.me/break-wall-text-effect-871.html", text)
.then((data) =>{
 zk.sendMessage(dest,{image : { url : data.image},caption : 'Logo by *BYTE King*'},{quoted:ms})
}) 
.catch(console.log)
})
;
Hamza({nomCom: "summer", categorie: "Logo", reaction: "🌞"}, async (dest, zk, commandeOptions) => {
  const { arg, repondre, ms, prefixe } = commandeOptions;
  if (!arg[0]) {
    repondre(`Exemple of using commande:\n ${prefixe}summer My text`);
    return;
  }
  
  const text = arg.join(" ");
  mumaker.textpro("https://textpro.me/create-sunset-light-text-effects-online-for-free-1124.html", text)
    .then((data) => {
      zk.sendMessage(dest, { image: { url: data.image }, caption: 'Logo by *premium BYTE-MD*' }, { quoted: ms });
    })
    .catch(console.error);
});

Hamza({nomCom: "neonlight", categorie: "Logo", reaction: "💡"}, async (dest, zk, commandeOptions) => {
  const { arg, repondre, ms, prefixe } = commandeOptions;
  /*if (!arg[0]) {
    repondre(`Exemple of using commande:\n ${prefixe}neonlight My text`);
    return;
  }*/
  if(!arg ||arg=="")
  {
      repondre(`Exemple of using commande:\n ${prefixe}neonlight My text`);
    return;
  }
  
  const text = arg.join(" ");
  try{
    
    let maker=await mumaker.textpro("https://textpro.me/create-glowing-neon-light-text-effect-online-free-1061.html",arg)
    //repondre(stringify(maker))
    /*.then((data) => {*/
     zk.sendMessage(dest, { image: { url: maker.image }, caption: 'Logo by *BYTE-MD*' }, { quoted: ms });
    
    /*.catch(console.error);*/

  
}catch(e){repondre("🥵🥵 "+e)}

});

Hamza({nomCom: "greenneon", categorie: "Logo", reaction: "🟢"}, async (dest, zk, commandeOptions) => {
  const { arg, repondre, ms, prefixe } = commandeOptions;
  if (!arg[0]) {
    repondre(`Exemple of using commande:\n ${prefixe}greenneon My text`);
    return;
  }
  
  const text = arg.join(" ");
  mumaker.textpro("https://textpro.me/green-neon-text-effect-874.html", text)
    .then((data) => {
      zk.sendMessage(dest, { image: { url: data.image }, caption: 'Logo by *BYTE King*' }, { quoted: ms });
    })
    .catch(console.error);
});

Hamza({nomCom: "glitch", categorie: "Logo", reaction: "🎛️"}, async (dest, zk, commandeOptions) => {
  const { arg, repondre, ms, prefixe } = commandeOptions;
  if (!arg[0]) {
    repondre(`Exemple of using commande:\n ${prefixe}glitch My text`);
    return;
  }
  
  const text = arg.join(" ");
  mumaker.textpro("https://textpro.me/create-impressive-glitch-text-effects-online-1027.html", text)
    .then((data) => {
      zk.sendMessage(dest, { image: { url: data.image }, caption: 'Logo by *BYTE King*' }, { quoted: ms });
    })
    .catch(console.error);
});

Hamza({nomCom: "devil", categorie: "Logo", reaction: "😈"}, async (dest, zk, commandeOptions) => {
  const { arg, repondre, ms, prefixe } = commandeOptions;
  if (!arg[0]) {
    repondre(`Exemple of using commande:\n ${prefixe}devil My text`);
    return;
  }
  
  const text = arg.join(" ");
  mumaker.textpro("https://textpro.me/create-neon-devil-wings-text-effect-online-free-1014.html",arg)
    .then((data) => {
      zk.sendMessage(dest, { image: { url: data.image }, caption: 'Logo by *BYTE-MD*' }, { quoted: ms });
    })
    .catch(console.error);
});
////////////////////
Hamza(
  {nomCom:"boom",categorie:
    "Logo",reaction:"💥"},async(dest,zk,commandeOptions)=>{

    let {ms,repondre,prefixe,arg}=commandeOptions;

        if(!arg||arg=="")
        {
   
          repondre(`  Exemple :* ${prefixe}boom BYTE-MD`)
          return ;
        }
       try{
              var radio2 = "e0723d60-fc0d-421f-bf8f-a9b9b61e4be6";
         let radio = "984dd03e-220d-4335-a6ba-7ac56b092240";
var lien="https://en.ephoto360.com/boom-text-comic-style-text-effect-675.html";
        console.log(arg)
         var img =await mumaker.ephoto(lien,arg)

        //var idImg = Object.values(img)[3];
       // var lienImage = "https://e1.yotools.net/" + idImg; 

  /* let radio = "984dd03e-220d-4335-a6ba-7ac56b092240";
         var v="https://en.ephoto360.com/boom-text-comic-style-text-effect-675.html";
         var c="https://en.ephoto360.com/create-anonymous-hacker-avatars-cyan-neon-677.html"
        let anu = await mumaker.ephoto4(v, arg, radio);      
         let res = Object.values(anu)[3];*/
        // console.log("&€"+res);
       // let lien = "https://e1.yotools.net" + res;
         

repondre("  ⚡ *ʟᴏᴀᴅɪɴɢ BYTE-MD* ⚡ ...")
         await zk.sendMessage(dest,{image:{url:img.image},caption:"\t *Logo by BYTE-MD*"})
         
        // await zk.sendMessage(dest,{image:{url:lienImage},caption:"\t *Logo by BYTE-Md*"})
         


       }catch(e){repondre("🥵🥵 "+e)}
    
    }
)
//water
Hamza({nomCom:"water",categorie:"Logo",reation:"💦"},async(dest,zk,commandeOptions)=>{

  
var {ms,repondre,arg,prefixe}=commandeOptions;
  if(!arg||arg=="")
  {
    repondre(`${prefixe}water Hamza`)
    return;
  }
  try{
    var lien ="https://en.ephoto360.com/create-water-effect-text-online-295.html";
    var img =await mumaker.ephoto(lien,arg);
    repondre(" ⚡ *ʟᴏᴀᴅɪɴɢ BYTE-MD* ⚡ ...")
    await zk.sendMessage(dest,{image:{url:img.image},caption:"  *Logo by BYTE-MD*"})
  }catch(e){repondre(`🥵🥵 ${e}`)}

});

Hamza({ nomCom: "snow", categorie: "Logo", reaction: "❄️" }, async (dest, zk, commandeOptions) => {
  const { arg, ms, prefixe,repondre } = commandeOptions;
  if (!arg[0]) {
    repondre(`Exemple of using commande:\n ${prefixe}Snow My text`);
    return;
  }

  const text = arg.join(" ");
  mumaker.textpro("https://textpro.me/create-beautiful-3d-snow-text-effect-online-1101.html", text)
    .then((data) => {
      zk.sendMessage(dest, { image: { url: data.image }, caption: 'Logo BY *BYTE-MD*' }, { quoted: ms });
    })
    .catch((err) => {
      console.error("Une erreur s'est produite :", err);
    });
});

Hamza({ nomCom: "transformer", categorie: "Logo", reaction: "🤖" }, async (dest, zk, commandeOptions) => {
  const { arg, ms, prefixe,repondre } = commandeOptions;
  if (!arg[0]) {
    repondre(`Exemple of using commande:\n ${prefixe}Transformer My text`);
    return;
  }

  const text = arg.join(" ");
  mumaker.textpro("https://textpro.me/create-a-transformer-text-effect-online-1035.html", text)
    .then((data) => {
      zk.sendMessage(dest, { image: { url: data.image }, caption: 'Logo BY *BYTE-MD*' }, { quoted: ms });
    })
    .catch((err) => {
      console.error("Une erreur s'est produite :", err);
    });
});

Hamza({ nomCom: "thunder", categorie: "Logo", reaction: "⚡" }, async (dest, zk, commandeOptions) => {
  const { arg, ms, prefixe,repondre } = commandeOptions;
  if (!arg[0]) {
    repondre(`Exemple of using commande:\n ${prefixe}Thunder My text`);
    return;
  }

  const text = arg.join(" ");
  mumaker.textpro("https://textpro.me/online-thunder-text-effect-generator-1031.html", text)
    .then((data) => {
      zk.sendMessage(dest, { image: { url: data.image }, caption: 'Logo by *BYTE-MD*' }, { quoted: ms });
    })
    .catch((err) => {
      console.error("Une erreur s'est produite :", err);
    });
});

Hamza({ nomCom: "harrypotter", categorie: "Logo", reaction: "🧙‍♂️" }, async (dest, zk, commandeOptions) => {
  const { arg, ms, prefixe,repondre } = commandeOptions;
  if (!arg[0]) {
    repondre(`Exemple of using commande:\n ${prefixe}HarryPotter My text`);
    return;
  }

  const text = arg.join(" ");
  mumaker.textpro("https://textpro.me/create-harry-potter-text-effect-online-1025.html", text)
    .then((data) => {
      zk.sendMessage(dest, { image: { url: data.image }, caption: 'Logo BY *BYTE-MD*' }, { quoted: ms });
    })
    .catch((err) => {
      console.error("Une erreur s'est produite :", err);
    });
});

Hamza({ nomCom: "cat", categorie: "Logo", reaction: "🪟" }, async (dest, zk, commandeOptions) => {
  const { arg, ms, prefixe } = commandeOptions;
  if (!arg[0]) {
    repondre(`Exemple of using commande:\n ${prefixe}FoggyWindow My text`);
    return;
  }

  const text = arg.join(" ");
  mumaker.textpro("https://textpro.me/write-text-on-foggy-window-online-free-1015.html", text)
    .then((data) => {
      zk.sendMessage(dest, { image: { url: data.image }, caption: 'Logo BY *BYTE-MD*' }, { quoted: ms });
    })
    .catch((err) => {
      console.error("Une erreur s'est produite :", err);
    });
});

                                                                         

Hamza({ nomCom: "whitegold", categorie: "Logo", reaction: "💫" }, async (dest, zk, commandeOptions) => {
  const { arg, ms, prefixe,repondre } = commandeOptions;
  if (!arg[0]) {
    repondre(`Exemple of using commande:\n ${prefixe}WhiteGold My text`);
    return;
  }

  const text = arg.join(" ");
  mumaker.textpro("https://textpro.me/elegant-white-gold-3d-text-effect-online-free-1070.html", text)
    .then((data) => {
      zk.sendMessage(dest, { image: { url: data.image }, caption: 'Logo BY *BYTE-MD*' }, { quoted: ms });
    })
    .catch((err) => {
      console.error("Une erreur s'est produite :", err);
    });
});

Hamza({ nomCom: "lightglow", categorie: "Logo", reaction: "🌟" }, async (dest, zk, commandeOptions) => {
  const { arg, ms, prefixe,repondre } = commandeOptions;
  if (!arg[0]) {
    repondre(`Exemple of using commande:\n ${prefixe}LightGlow My text`);
    return;
  }

  const text = arg.join(" ");
  mumaker.textpro("https://textpro.me/create-light-glow-sliced-text-effect-online-1068.html", text)
    .then((data) => {
      zk.sendMessage(dest, { image: { url: data.image }, caption: 'Logo BY *BYTE-MD*' }, { quoted: ms });
    })
    .catch((err) => {
      console.error("Une erreur s'est produite :", err);
    });
});

Hamza({ nomCom: "thor", categorie: "Logo", reaction: "🔨" }, async (dest, zk, commandeOptions) => {
  const { arg, ms, prefixe,repondre } = commandeOptions;
  if (!arg[0]) {
    repondre(`Exemple of using commande:\n ${prefixe}Thor My text`);
    return;
  }

  const text = arg.join(" ");
  mumaker.textpro("https://textpro.me/create-thor-logo-style-text-effect-online-1064.html", text)
    .then((data) => {
      zk.sendMessage(dest, { image: { url: data.image }, caption: 'Logo BY *BYTE-MD*' }, { quoted: ms });
    })
    .catch((err) => {
      console.error("Une erreur s'est produite :", err);
    });
});

Hamza({ nomCom: "neon", categorie: "Logo", reaction: "💡" }, async (dest, zk, commandeOptions) => {
  const { arg, ms, prefixe,repondre } = commandeOptions;
  if (!arg[0]) {
    repondre(`Exemple of using commande:\n ${prefixe}Neon My text`);
    return;
  }

  const text = arg.join(" ");
  mumaker.textpro("https://textpro.me/neon-text-effect-online-879.html", text)
    .then((data) => {
      zk.sendMessage(dest, { image: { url: data.image }, caption: 'Logo BY *BYTE-MD*' }, { quoted: ms });
    })
    .catch((err) => {
      console.error("Une erreur s'est produite :", err);
    });
});



Hamza({nomCom:"purple",categorie:"Logo",reaction:"🧳"},async(dest,zk,commandeOptions)=>{
  var {ms,repondre,prefixe,arg}=commandeOptions;
  
    try{
      if(!arg||arg=="")
  {
    repondre(prefixe+"purple BYTE");return;}
      const lien="https://en.ephoto360.com/purple-text-effect-online-100.html"
      var img = await mumaker.ephoto(lien,arg);
      repondre(" ⚡ *ʟᴏᴀᴅɪɴɢ BYTE-MD* ⚡ ...")
      await zk.sendMessage(dest,{image:{url:img.image},caption:"*Logo by BYTE-MD*"});
    }catch(e){repondre(e)}
  
})

Hamza({nomCom:"gold",categorie:"Logo",reaction:"🧚🏿‍♀️"},async(dest,zk,commandeOptions)=>{


  let {ms,arg,prefixe,repondre}=commandeOptions;
  try{
      if(!arg||arg=="")
      {
        repondre(prefixe+"gold BYTE-MD");return;
      }

    var lien="https://en.ephoto360.com/modern-gold-4-213.html";

    var img = await mumaker.ephoto(lien,arg);
   repondre("⚡ *ʟᴏᴀᴅɪɴɢ BYTE-MD* ⚡ ...")
    await zk.sendMessage(dest,{image:{url:img.image},caption:" *Logo by BYTE-MD*"},{quoted:ms})
  }catch(e){repondre(e)}
})


Hamza({nomCom:"arena",categorie:"Logo",reaction:"🥵"},async(dest,zk,commandeOptions)=>{


  let {ms,arg,prefixe,repondre}=commandeOptions;
  try{
      if(!arg||arg=="")
      {
        repondre(prefixe+"arena BYTE-MD");return;
      }

    var lien="https://en.ephoto360.com/create-cover-arena-of-valor-by-mastering-360.html";

    var img = await mumaker.ephoto(lien,arg.join(' '));
   repondre("⚡ *ʟᴏᴀᴅɪɴɢ BYTE-MD* ⚡ ...")
    await zk.sendMessage(dest,{image:{url:img.image},caption:" *Logo by BYTE-MD*"},{quoted:ms})
  }catch(e){repondre(e)}
})

Hamza({nomCom:"incandescent",categorie:"Logo",reaction:"😋"},async(dest,zk,commandeOptions)=>{


  let {ms,arg,prefixe,repondre}=commandeOptions;
  try{
      if(!arg||arg=="")
      {
        repondre(prefixe+"incandescent BYTE-MD");return;
      }

    var lien="https://en.ephoto360.com/text-effects-incandescent-bulbs-219.html";

    var img = await mumaker.ephoto(lien,arg.join(' '));
   repondre("⚡ *ʟᴏᴀᴅɪɴɢ BYTE-MD* ⚡ ...")
    await zk.sendMessage(dest,{image:{url:img.image},caption:" *Logo by BYTE-MD*"},{quoted:ms})
  }catch(e){repondre(e)}
})


Hamza({nomCom:"child",categorie:"Logo",reaction:"😇"},async(dest,zk,commandeOptions)=>{


  let {ms,arg,prefixe,repondre}=commandeOptions;
  try{
      if(!arg||arg=="")
      {
        repondre(prefixe+"child BYTE-MD");return;
      }

    var lien="https://en.ephoto360.com/write-text-on-wet-glass-online-589.html";

    var img = await mumaker.ephoto(lien,arg.join(' '));
   repondre("⚡ *ʟᴏᴀᴅɪɴɢ BYTE-MD* ⚡ ...")
    await zk.sendMessage(dest,{image:{url:img.image},caption:" *Logo by BYTE-MD*"},{quoted:ms})
  }catch(e){repondre(e)}
})


Hamza({nomCom:"typo",categorie:"Logo",reaction:"😇"},async(dest,zk,commandeOptions)=>{


  let {ms,arg,prefixe,repondre}=commandeOptions;
  try{
      if(!arg||arg=="")
      {
        repondre(prefixe+"typo BYTE-MD");return;
      }

    var lien="https://en.ephoto360.com/typography-text-effect-on-pavement-online-774.html";

    var img = await mumaker.ephoto(lien,arg.join(' '));
   repondre("⚡ *ʟᴏᴀᴅɪɴɢ BYTE-MD* ⚡ ...")
    await zk.sendMessage(dest,{image:{url:img.image},caption:" *Logo by BYTE-MD*"},{quoted:ms})
  }catch(e){repondre(e)}
})

Hamza({nomCom:"light",categorie:"Logo",reaction:"🌠"},async(dest,zk,commandeOptions)=>{


  let {ms,arg,prefixe,repondre}=commandeOptions;
  try{
      if(!arg||arg=="")
      {
        repondre(prefixe+"light BYTE-MD");return;
      }

    var lien="https://en.ephoto360.com/light-text-effect-futuristic-technology-style-648.html";

    var img = await mumaker.ephoto(lien,arg.join(' '));
   repondre("⚡ *ʟᴏᴀᴅɪɴɢ BYTE-MD* ⚡ ...")
    await zk.sendMessage(dest,{image:{url:img.image},caption:" *Logo by BYTE-MD*"},{quoted:ms})
  }catch(e){repondre(e)}
})

Hamza({nomCom:"steel",categorie:"Logo",reaction:"🌠"},async(dest,zk,commandeOptions)=>{


  let {ms,arg,prefixe,repondre}=commandeOptions;
  try{
      if(!arg||arg=="")
      {
        repondre(prefixe+"steel BYTE-MD");return;
      }

    var lien="https://en.ephoto360.com/dragon-steel-text-effect-online-347.html";

    var img = await mumaker.ephoto(lien,arg.join(' '));
   repondre("⚡ *ʟᴏᴀᴅɪɴɢ BYTE-MD* ⚡ ...")
    await zk.sendMessage(dest,{image:{url:img.image},caption:" *Logo by BYTE-MD*"},{quoted:ms})
  }catch(e){repondre(e)}
})


Hamza({nomCom:"sunlight",categorie:"Logo",reaction:"🌠"},async(dest,zk,commandeOptions)=>{


  let {ms,arg,prefixe,repondre}=commandeOptions;
  try{
      if(!arg||arg=="")
      {
        repondre(prefixe+"sunlight BYTE-MD");return;
      }

    var lien="https://en.ephoto360.com/sunlight-shadow-text-204.html";

    var img = await mumaker.ephoto(lien,arg.join(' '));
   repondre("⚡ *ʟᴏᴀᴅɪɴɢ BYTE-MD* ⚡ ...")
    await zk.sendMessage(dest,{image:{url:img.image},caption:" *Logo by BYTE-MD*"},{quoted:ms})
  }catch(e){repondre(e)}
})

Hamza({ nomCom: "scifi", categorie: "Logo", reaction: "💥" }, async (dest, zk, commandeOptions) => {
  const { arg, ms, prefixe,repondre } = commandeOptions;
  if (!arg[0]) {
    repondre(`Example of using command:\n ${prefixe}scifi My text`);
    return;
  }

  const text = arg.join(" ");
  mumaker.textpro("https://textpro.me/create-3d-sci-fi-text-effect-online-1050.html", text)
    .then((data) => {
      zk.sendMessage(dest, { image: { url: data.image }, caption: 'Logo BY *BYTE-MD*' }, { quoted: ms });
    })
    .catch((err) => {
      console.error("Une erreur s'est produite :", err);
    });
});

Hamza({ nomCom: "magma", categorie: "Logo", reaction: "♨️" }, async (dest, zk, commandeOptions) => {
  const { arg, ms, prefixe,repondre } = commandeOptions;
  if (!arg[0]) {
    repondre(`Example of using command:\n ${prefixe}magma My text`);
    return;
  }

  const text = arg.join(" ");
  mumaker.textpro("https://textpro.me/create-a-magma-hot-text-effect-online-1030.html", text)
    .then((data) => {
      zk.sendMessage(dest, { image: { url: data.image }, caption: 'Logo BY *BYTE-MD*' }, { quoted: ms });
    })
    .catch((err) => {
      console.error("Une erreur s'est produite :", err);
    });
});

Hamza({ nomCom: "leaves", categorie: "Logo", reaction: "☘️" }, async (dest, zk, commandeOptions) => {
  const { arg, ms, prefixe,repondre } = commandeOptions;
  if (!arg[0]) {
    repondre(`Example of using command:\n ${prefixe}leaves My text`);
    return;
  }

  const text = arg.join(" ");
  mumaker.textpro("https://textpro.me/natural-leaves-text-effect-931.html", text)
    .then((data) => {
      zk.sendMessage(dest, { image: { url: data.image }, caption: 'Logo BY *BYTE-MD*' }, { quoted: ms });
    })
    .catch((err) => {
      console.error("Une erreur s'est produite :", err);
    });
});