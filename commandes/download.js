const { Hamza } = require('../TalkDrove/Hamza');
const fs = require('fs');
const getFBInfo = require("@xaviabot/fb-downloader");
const { default: axios } = require('axios');

Hamza({ nomCom: "igdl", categorie: "Download" }, async (dest, zk, commandeOptions) => {
  const { ms, repondre, arg } = commandeOptions;

  let link = arg.join(' ');

  if (!arg[0]) { repondre('Please insert an Instagram video link'); return; }

  try {
    let igvid = await axios('https://vihangayt.me/download/instagram?url=' + link);

    if (igvid.data.data.data[0].type == 'video') {
      zk.sendMessage(dest, { video: { url: igvid.data.data.data[0].url }, caption: "IG video downloader powered by *DEXTER-MD*", gifPlayback: false }, { quoted: ms });
    } else {
      zk.sendMessage(dest, { image: { url: igvid.data.data.data[0].url }, caption: "IG image downloader powered by *DEXTER-MD*" });
    }

  } catch (e) { repondre("Error occurred during download: \n " + e); }
});

Hamza({
  nomCom: "fbdl",
  categorie: "Download",
  reaction: "📽️"
},
async (dest, zk, commandeOptions) => {
  const { repondre, ms, arg } = commandeOptions;

  if (!arg[0]) {
    repondre('Insert a public Facebook video link!');
    return;
  }

  const queryURL = arg.join(" ");

  try {
    getFBInfo(queryURL)
      .then((result) => {
        let caption = `
          Title: ${result.title}
          Link: ${result.url}
        `;
        zk.sendMessage(dest, { image: { url: result.thumbnail }, caption: caption }, { quoted: ms });
        zk.sendMessage(dest, { video: { url: result.hd }, caption: 'Facebook video downloader powered by *DEXTER-MD*' }, { quoted: ms });

      })
      .catch((error) => {
        console.log("Error:", error);
        repondre('Try fbdl2 on this link');
      });

  } catch (error) {
    console.error('Error occurred during video download:', error);
    repondre('Error occurred during video download.', error);
  }
});

Hamza({ nomCom: "tiktok", categorie: "Download", reaction: "🎵" }, async (dest, zk, commandeOptions) => {
  const { arg, ms, prefixe, repondre } = commandeOptions;
  if (!arg[0]) {
    repondre(`How to use this command:\n ${prefixe}tiktok tiktok_video_link`);
    return;
  }

  const videoUrl = arg.join(" ");

  let data = await axios.get('https://vihangayt.me/download/tiktok?url=' + videoUrl);

  let tik = data.data.data;

  // Send message with video thumbnail
  const caption = `
    Author: ${tik.author}
    Description: ${tik.desc}
  `;

  zk.sendMessage(dest, { video: { url: tik.links[0].a }, caption: caption }, { quoted: ms });
});

Hamza({
  nomCom: "fbdl2",
  categorie: "Download",
  reaction: "📽️"
},
async (dest, zk, commandeOptions) => {
  const { repondre, ms, arg } = commandeOptions;

  if (!arg[0]) {
    repondre('Insert a public Facebook video link!');
    return;
  }

  const queryURL = arg.join(" ");

  try {
    getFBInfo(queryURL)
      .then((result) => {
        let caption = `
          Title: ${result.title}
          Link: ${result.url}
        `;
        zk.sendMessage(dest, { image: { url: result.thumbnail }, caption: caption }, { quoted: ms });
        zk.sendMessage(dest, { video: { url: result.sd }, caption: 'Facebook video downloader powered by *DEXTER-MD*' }, { quoted: ms });

      })
      .catch((error) => {
        console.log("Error:", error);
        repondre(error);
      });

  } catch (error) {
    console.error('Error occurred during video download:', error);
    repondre('Error occurred during video download.', error);
  }
});
