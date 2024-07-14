const yts = require('youtube-yts');
const readline = require('readline');
const ffmpeg = require('fluent-ffmpeg');
const NodeID3 = require('node-id3');
const fs = require('fs');
const { fetchBuffer } = require("./Function");
const { randomBytes } = require('crypto');
const { ytdown } = require("nayan-media-downloader");
const ytIdRegex = /(?:youtube\.com\/\S*(?:(?:\/e(?:mbed))?\/|watch\?(?:\S*?&?v\=))|youtu\.be\/)([a-zA-Z0-9_-]{6,11})/;

class YT {
    constructor() { }

    static isYTUrl = (url) => {
        return ytIdRegex.test(url);
    }

    static getVideoID = (url) => {
        if (!this.isYTUrl(url)) throw new Error('is not YouTube URL');
        return ytIdRegex.exec(url)[1];
    }

    static WriteTags = async (filePath, Metadata) => {
        NodeID3.write(
            {
                title: Metadata.Title,
                artist: Metadata.Artist,
                originalArtist: Metadata.Artist,
                image: {
                    mime: 'jpeg',
                    type: { id: 3, name: 'front cover' },
                    imageBuffer: (await fetchBuffer(Metadata.Image)).buffer,
                    description: `Cover of ${Metadata.Title}`,
                },
                album: Metadata.Album,
                year: Metadata.Year || ''
            },
            filePath
        );
    }

    static search = async (query, options = {}) => {
        const search = await yts.search({ query, hl: 'id', gl: 'ID', ...options });
        return search.videos;
    }

    static downloadMusic = async (query) => {
        try {
            const getTrack = Array.isArray(query) ? query : await this.search(query);
            const search = getTrack[0];
            const videoUrl = await ytdown(`https://www.youtube.com/watch?v=${search.id}`);
            let songPath = `./dustbin/${randomBytes(3).toString('hex')}.mp3`;

            const file = await new Promise((resolve) => {
                ffmpeg(videoUrl)
                    .audioFrequency(44100)
                    .audioChannels(2)
                    .audioBitrate(128)
                    .audioCodec('libmp3lame')
                    .audioQuality(5)
                    .toFormat('mp3')
                    .save(songPath)
                    .on('end', () => resolve(songPath));
            });

            const videoInfo = await ytdown.getInfo(`https://www.youtube.com/watch?v=${search.id}`);
            await this.WriteTags(file, {
                Title: search.title,
                Artist: search.artist,
                Image: search.image,
                Album: search.album,
                Year: videoInfo.upload_date.split('-')[0]
            });

            return {
                meta: search,
                path: file,
                size: fs.statSync(songPath).size
            };
        } catch (error) {
            throw new Error(error);
        }
    }

    static mp4 = async (query, quality = 134) => {
        try {
            if (!query) throw new Error('Video ID or YouTube Url is required');
            const videoId = this.isYTUrl(query) ? this.getVideoID(query) : query;
            const videoInfo = await ytdown.getInfo(`https://www.youtube.com/watch?v=${videoId}`);
            const format = videoInfo.formats.find(f => f.quality === quality && f.type === 'videoandaudio');

            return {
                title: videoInfo.title,
                thumb: videoInfo.thumbnail,
                date: videoInfo.upload_date,
                duration: videoInfo.duration,
                channel: videoInfo.uploader,
                quality: format.quality,
                contentLength: format.filesize,
                description: videoInfo.description,
                videoUrl: format.url
            };
        } catch (error) {
            throw error;
        }
    }

    static mp3 = async (url, metadata = {}, autoWriteTags = false) => {
        try {
            if (!url) throw new Error('Video ID or YouTube Url is required');
            const videoUrl = this.isYTUrl(url) ? `https://www.youtube.com/watch?v=${this.getVideoID(url)}` : url;
            const videoInfo = await ytdown.getInfo(videoUrl);
            let stream = await ytdown(videoUrl);
            let songPath = `./${randomBytes(3).toString('hex')}.mp3`;

            let starttime;
            stream.once('response', () => {
                starttime = Date.now();
            });

            stream.on('end', () => process.stdout.write('\n\n'));
            stream.on('error', (err) => console.log(err));

            const file = await new Promise((resolve) => {
                ffmpeg(stream)
                    .audioFrequency(44100)
                    .audioChannels(2)
                    .audioBitrate(128)
                    .audioCodec('libmp3lame')
                    .audioQuality(5)
                    .toFormat('mp3')
                    .save(songPath)
                    .on('end', () => {
                        resolve(songPath);
                    });
            });

            if (Object.keys(metadata).length !== 0) {
                await this.WriteTags(file, metadata);
            }
            if (autoWriteTags) {
                await this.WriteTags(file, {
                    Title: videoInfo.title,
                    Album: videoInfo.uploader,
                    Year: videoInfo.upload_date.split('-')[0],
                    Image: videoInfo.thumbnail
                });
            }

            return {
                meta: {
                    title: videoInfo.title,
                    channel: videoInfo.uploader,
                    seconds: videoInfo.duration,
                    description: videoInfo.description,
                    image: videoInfo.thumbnail
                },
                path: file,
                size: fs.statSync(songPath).size
            };
        } catch (error) {
            throw error;
        }
    }
}

module.exports = YT;
