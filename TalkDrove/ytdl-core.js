const yts = require('yt-search');
const { ytdown } = require('nayan-media-downloader');
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

/* Function to download videos */

async function downloadYoutubeVideo(url) {
  try {
    const videoUrl = await ytdown(url);
    return videoUrl;
  } catch (error) {
    console.error('Error downloading video:', error);
    throw new Error('An error occurred while downloading the video.');
  }
}

module.exports = { downloadYoutubeVideo };
