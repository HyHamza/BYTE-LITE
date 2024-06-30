const axios = require('axios');
const fs = require('fs');
const { Hamza } = require("../TalkDrove/Hamza");
const { writeFile } = require('fs/promises')

// Waifu command
Hamza({
  nomCom: "waifu",
  categorie: "Anime",
  reaction: "😏"
},
async (origineMessage, zk, commandeOptions) => {
  const { repondre, ms } = commandeOptions;

  const url = 'https://api.waifu.pics/sfw/waifu'; // Replace with actual waifu.pics API link

  try {
    for (let i = 0; i < 5; i++) {
      const response = await axios.get(url);
      const imageUrl = response.data.url;

      zk.sendMessage(origineMessage, { image: { url: imageUrl } }, { quoted: ms });
    }
  } catch (error) {
    repondre('Error fetching data:', error);
  }
});

// Neko command
Hamza({
  nomCom: "neko",
  categorie: "Anime",
  reaction: "😺"
},
async (origineMessage, zk, commandeOptions) => {
  const { repondre, ms } = commandeOptions;

  const url = 'https://api.waifu.pics/sfw/neko'; // Replace with actual neko API link or another neko API

  try {
    for (let i = 0; i < 5; i++) {
      const response = await axios.get(url);
      const imageUrl = response.data.url;

      zk.sendMessage(origineMessage, { image: { url: imageUrl } }, { quoted: ms });
    }
  } catch (error) {
    repondre('Error fetching data:', error);
  }
});

// Shinobu command
Hamza({
  nomCom: "shinobu",
  categorie: "Anime",
  reaction: "🦋"
},
async (origineMessage, zk, commandeOptions) => {
  const { repondre, ms } = commandeOptions;

  const url = 'https://api.waifu.pics/sfw/shinobu'; // Replace with actual Shinobu API link or another Shinobu image API

  try {
    for (let i = 0; i < 5; i++) {
      const response = await axios.get(url);
      const imageUrl = response.data.url;

      zk.sendMessage(origineMessage, { image: { url: imageUrl } }, { quoted: ms });
    }
  } catch (error) {
    repondre('Error fetching data:', error);
  }
});

// Megumin command
Hamza({
  nomCom: "megumin",
  categorie: "Anime",
  reaction: "💥"
},
async (origineMessage, zk, commandeOptions) => {
  const { repondre, ms } = commandeOptions;

  const url = 'https://api.waifu.pics/sfw/megumin'; // Replace with actual Megumin API link or another Megumin image API

  try {
    for (let i = 0; i < 5; i++) {
      const response = await axios.get(url);
      const imageUrl = response.data.url;

      zk.sendMessage(origineMessage, { image: { url: imageUrl } }, { quoted: ms });
    }
  } catch (error) {
    repondre('Error fetching data:', error);
  }
});

// Cosplay command
Hamza({
  nomCom: "cosplay",
  categorie: "Anime",
  reaction: "😏"
},
async (origineMessage, zk, commandeOptions) => {
  const { repondre, ms } = commandeOptions;

  try {
    for (let i = 0; i < 5; i++) {
      let url = 'https://fantox-cosplay-api.onrender.com/';
      const response = await axios.get(url, { responseType: 'arraybuffer' });
      const image = response.data;
      await writeFile('./cosplay.jpg', image);
      zk.sendMessage(origineMessage, { image: { url: `./cosplay.jpg` } }, { quoted: ms });
    }
  } catch (e) {
    repondre("Unfortunately, I encountered an error: " + e);
  }
});

// Couplepp command
Hamza({
  nomCom: "couplepp",
  categorie: "Anime",
  reaction: "💞"
},
async (dest, zk, commandeOptions) => {
  const { repondre, ms } = commandeOptions;
  let api = 'https://smiling-hosiery-bear.cyclic.app/weeb/couplepp';

  try {
    repondre('she/he dont love you :)');
    const result = await axios.get(api);
  
    zk.sendMessage(dest, { image: { url: result.data.male }, caption: `For Man` }, { quoted: ms });
    zk.sendMessage(dest, { image: { url: result.data.female }, caption: `_For woman_` }, { quoted: ms });
  
  } catch (e) {
    repondre(e);
  }
});
