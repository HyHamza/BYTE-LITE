const { Hamza } = require("../TalkDrove/Hamza");
const { getytlink, ytdwn } = require("../TalkDrove/ytdl-core");
const yts = require("yt-search");
const ytdl = require('ytdl-core');
const fs = require('fs');

Hamza({ nomCom: "yts", categorie: "Search", reaction: "✋" }, async (dest, zk, commandeOptions) => {
  const { ms, repondre, arg } = commandeOptions;
  const query = arg.join(" ");

  if (!query[0]) {
    repondre("Please specify what you want to search for.");
    return;
  }

  try {
    const info = await yts(query);
    const results = info.videos;

    let captions = "";
    for (let i = 0; i < 10; i++) {
      captions += `----------------\nTitle: ${results[i].title}\nTime : ${results[i].timestamp}\nUrl: ${results[i].url}\n`;
    }
    captions += "\n======\n*Powered by BYTE-MD*";

    zk.sendMessage(dest, { image: { url: results[0].thumbnail }, caption: captions }, { quoted: ms });
  } catch (error) {
    repondre("Error during the process: " + error);
  }
});

Hamza({
  nomCom: "ytmp4",
  categorie: "Download",
  reaction: "🎥"
}, async (origineMessage, zk, commandeOptions) => {
  const { arg, ms, repondre } = commandeOptions;

  if (!arg[0]) {
    repondre("Please insert a YouTube link.");
    return;
  }

  const url = arg.join(" ");
  try {
    const videoInfo = await ytdl.getInfo(url);
    const format = ytdl.chooseFormat(videoInfo.formats, { quality: '18' });
    const videoStream = ytdl.downloadFromInfo(videoInfo, { format });
    const filename = 'video.mp4';

    const fileStream = fs.createWriteStream(filename);
    videoStream.pipe(fileStream);

    fileStream.on('finish', () => {
      zk.sendMessage(origineMessage, { video: { url: `./${filename}` }, caption: "Powered by *BYTE-MD*", gifPlayback: false }, { quoted: ms });
    });

    fileStream.on('error', (error) => {
      console.error('Error writing video file:', error);
      repondre('An error occurred while writing the video file.');
    });

  } catch (error) {
    console.error('Error searching or downloading video:', error);
    repondre('An error occurred during the search or download of the video.' + error);
  }
});

Hamza({
  nomCom: "ytmp3",
  categorie: "Download",
  reaction: "💿"
}, async (origineMessage, zk, commandeOptions) => {
  const { ms, repondre, arg } = commandeOptions;

  if (!arg[0]) {
    repondre("Please insert a YouTube link.");
    return;
  }

  try {
    const url = arg.join(" ");
    const audioStream = ytdl(url, { filter: 'audioonly', quality: 'highestaudio' });
    const filename = 'audio.mp3';

    const fileStream = fs.createWriteStream(filename);
    audioStream.pipe(fileStream);

    fileStream.on('finish', () => {
      zk.sendMessage(origineMessage, { audio: { url: `./${filename}` }, mimetype: 'audio/mp4' }, { quoted: ms, ptt: false });
      console.log("Audio file sent successfully!");
    });

    fileStream.on('error', (error) => {
      console.error('Error writing audio file:', error);
      repondre('An error occurred while writing the audio file.');
    });

  } catch (error) {
    console.error('Error searching or downloading video:', error);
    repondre('An error occurred during the search or download of the video.');
  }
});
