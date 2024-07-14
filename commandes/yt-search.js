const { Hamza } = require("../TalkDrove/Hamza");
const ytdl = require('ytdl-core');
const fs = require('fs');

// Assuming Hamza function structure is used for command registration

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

  const url = arg[0];  // Only take the first argument as the URL

  try {
    const videoInfo = await ytdl.getInfo(url);
    const format = ytdl.chooseFormat(videoInfo.formats, { quality: '18' });
    const videoStream = ytdl.downloadFromInfo(videoInfo, { format });
    const filename = 'video.mp4';

    const fileStream = fs.createWriteStream(filename);
    videoStream.pipe(fileStream);

    fileStream.on('finish', () => {
      zk.sendMessage(origineMessage, { video: { url: `./${filename}` }, caption: "Powered by *BYTE-MD*", gifPlayback: false }, { quoted: ms });
      console.log("Video file sent successfully!");
    });

    fileStream.on('error', (error) => {
      console.error('Error writing video file:', error);
      repondre('An error occurred while writing the video file.');
    });

  } catch (error) {
    console.error('Error searching or downloading video:', error);
    repondre('An error occurred during the search or download of the video.');
  }
});
