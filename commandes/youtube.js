const { Hamza } = require("../TalkDrove/Hamza");
const yts = require('yt-search');
const { ytdown } = require("nayan-media-downloader");
const fetch = require('node-fetch');  // Import fetch from node-fetch
const fs = require('fs');

Hamza({
  nomCom: "song",
  categorie: "Search",
  reaction: "💿"
}, async (origineMessage, zk, commandeOptions) => {
  const { ms, repondre, arg } = commandeOptions;
     
  if (!arg[0]) {
    repondre("Please type the song name you want to download.");
    return;
  }

  try {
    let query = arg.join(" ");
    const search = await yts(query);
    const videos = search.videos;

    if (videos && videos.length > 0 && videos[0]) {
      const urlElement = videos[0].url;
          
      let infoMess = {
        image: { url: videos[0].thumbnail },
        caption : `\n*Song name :* _${videos[0].title}_

*Duration :* _${videos[0].timestamp}_

*URL :* _${videos[0].url}_


_*BYTE-MD SONG DOWNLOADING......*_\n\n`
      };

      zk.sendMessage(origineMessage, infoMess, { quoted: ms });

      // Download the audio using nayan-media-downloader
      const audioUrlObject = await ytdown(urlElement, 'audio');  // Ensure correct usage of ytdown
      const audioUrl = audioUrlObject.url;  // Extract URL from the returned object
      const filename = 'audio.mp3';

      // Fetch and save the audio file
      const response = await fetch(audioUrl);
      const buffer = await response.buffer();
      fs.writeFileSync(filename, buffer);

      // Send the audio file
      zk.sendMessage(origineMessage, { audio: { url: `./${filename}` }, mimetype: 'audio/mp4' }, { quoted: ms, ptt: false });
      console.log("Audio file sent successfully!");
    } else {
      repondre('No video found.');
    }
  } catch (error) {
    console.error('Error during video search or download:', error);
    repondre('An error occurred during the search or download of the video.');
  }
});

Hamza({
  nomCom: "video",
  categorie: "Search",
  reaction: "🎥"
}, async (origineMessage, zk, commandeOptions) => {
  const { arg, ms, repondre } = commandeOptions;

  if (!arg[0]) {
    repondre("Please insert video name.");
    return;
  }

  try {
    const query = arg.join(" ");
    const search = await yts(query);
    const videos = search.videos;

    if (videos && videos.length > 0 && videos[0]) {
      const Element = videos[0];

      let InfoMess = {
        image: { url: videos[0].thumbnail },
        caption: `*Video name :* _${Element.title}_

*Duration :* _${Element.timestamp}_

*URL :* _${Element.url}_


_*BYTE-MD VIDEO DOWNLOADING......*_\n\n`
      };

      zk.sendMessage(origineMessage, InfoMess, { quoted: ms });

      // Download the video using nayan-media-downloader
      const videoUrlObject = await ytdown(Element.url, 'video');  // Ensure correct usage of ytdown
      const videoUrl = videoUrlObject.url;  // Extract URL from the returned object
      const filename = 'video.mp4';

      // Fetch and save the video file
      const response = await fetch(videoUrl);
      const buffer = await response.buffer();
      fs.writeFileSync(filename, buffer);

      // Send the video file
      zk.sendMessage(origineMessage, { video: { url: `./${filename}` }, caption: "*BYTE-MD*", gifPlayback: false }, { quoted: ms });
      console.log("Video file sent successfully!");
    } else {
      repondre('No video found.');
    }
  } catch (error) {
    console.error('Error during video search or download:', error);
    repondre('An error occurred during the search or download of the video.');
  }
});
