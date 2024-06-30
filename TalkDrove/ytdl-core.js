const yts = require('yt-search');
const ytdl = require('ytdl-core');
const fs = require('fs');

/* Function to get YouTube video data */

async function getYoutubeLink(key) {
  try {
    const result = await yts(key);
    const videos = result.videos;
    const choice = videos[0];
    return {
      link: choice.url,
      thumbnail: choice.thumbnail,
      title: choice.title,
      duration: choice.timestamp,
      id: choice.videoId,
    };
  } catch (error) {
    console.error('Error searching YouTube:', error);
    return null;
  }
}

module.exports = { getYoutubeLink };

/* Function to download videos using ytdl-core */

async function downloadYoutubeVideo(url) {
  try {
    const info = await ytdl.getInfo(url);
    const format = ytdl.chooseFormat(info.formats, { quality: '18' });
    const video = ytdl.downloadFromInfo(info, format);
    return video;
  } catch (error) {
    console.error('Error downloading video:', error);
    throw new Error('An error occurred while downloading the video.');
  }
}

module.exports = { downloadYoutubeVideo };
