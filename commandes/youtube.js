const { Hamza } = require("../TalkDrove/Hamza");
const yts = require('yt-search');
const ytdl = require('ytdl-core');
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

      // Get the audio stream of the video
      const audioStream = ytdl(urlElement, { filter: 'audioonly', quality: 'highestaudio' });

      // Local filename to save the audio file
      const filename = 'audio.mp3';

      // Write audio stream to local file
      const fileStream = fs.createWriteStream(filename);
      audioStream.pipe(fileStream);

      fileStream.on('finish', () => {
        // Send the audio file using the local file URL
        zk.sendMessage(origineMessage, { audio: { url: `./${filename}` }, mimetype: 'audio/mp4' }, { quoted: ms, ptt: false });
        console.log("Audio file sent successfully!");
      });

      fileStream.on('error', (error) => {
        console.error('Error writing audio file:', error);
        repondre('An error occurred while writing the audio file.');
      });
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

      // Get video information from YouTube link
      const videoInfo = await ytdl.getInfo(Element.url);
      // Format video with best available quality
      const format = ytdl.chooseFormat(videoInfo.formats, { quality: '18' });
      // Download the video
      const videoStream = ytdl.downloadFromInfo(videoInfo, { format });

      // Local filename to save the video file
      const filename = 'video.mp4';

      // Write video stream to local file
      const fileStream = fs.createWriteStream(filename);
      videoStream.pipe(fileStream);

      fileStream.on('finish', () => {
        // Send the video file using the local file URL
        zk.sendMessage(origineMessage, { video: { url: `./${filename}` }, caption: "*BYTE-MD*", gifPlayback: false }, { quoted: ms });
        console.log("Video file sent successfully!");
      });

      fileStream.on('error', (error) => {
        console.error('Error writing video file:', error);
        repondre('An error occurred while writing the video file.');
      });
    } else {
      repondre('No video found.');
    }
  } catch (error) {
    console.error('Error during video search or download:', error);
    repondre('An error occurred during the search or download of the video.');
  }
});
