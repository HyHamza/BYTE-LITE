const axios = require('axios');
const { Hamza } = require("../TalkDrove/Hamza");
const fs = require("fs-extra");
const { exec } = require("child_process");
const child_process = require('child_process');
const { unlink } = require('fs').promises;

// Function to sleep
const sleep = (ms) => {
    return new Promise((resolve) => { setTimeout(resolve, ms) });
};

// Function to convert GIF buffer to video buffer
const GIFBufferToVideoBuffer = async (image) => {
    const filename = `${Math.random().toString(36)}`;
    await fs.writeFileSync(`./${filename}.gif`, image);
    child_process.exec(
        `ffmpeg -i ./${filename}.gif -movflags faststart -pix_fmt yuv420p -vf "scale=trunc(iw/2)*2:trunc(ih/2)*2" ./${filename}.mp4`
    );
    await sleep(4000);
    var buffer5 = await fs.readFileSync(`./${filename}.mp4`);
    await Promise.all([unlink(`./${filename}.mp4`), unlink(`./${filename}.gif`)]);
    return buffer5;
};

// Function to generate reaction command
const generateReactionCommand = (reactionName, reactionEmoji) => {
    Hamza({
        nomCom: reactionName,
        categorie: "Reaction",
        reaction: reactionEmoji,
    },
    async (origineMessage, zk, commandeOptions) => {
        const { auteurMessage, auteurMsgRepondu, repondre, ms, msgRepondu } = commandeOptions;

        const url = `https://api.waifu.pics/sfw/${reactionName}`;
        try {
            const response = await axios.get(url);
            const imageUrl = response.data.url;

            // Get GIF buffer using axios
            const gifBufferResponse = await axios.get(imageUrl, {
                responseType: 'arraybuffer'
            });
            const gifBuffer = await gifBufferResponse.data;

            // Convert GIF to video and get video buffer
            const videoBuffer = await GIFBufferToVideoBuffer(gifBuffer);

            // Send video with Hamza
            if (msgRepondu) {
                var txt = `@${auteurMessage.split("@")[0]} ${reactionName} @${auteurMsgRepondu.split("@")[0]}`;
                zk.sendMessage(origineMessage, { video: videoBuffer, gifPlayback: true, caption: txt, mentions: [auteurMessage, auteurMsgRepondu] }, { quoted: ms });
            } else {
                const videoMessage = {
                    video: videoBuffer,
                    gifPlayback: true,
                    caption: `@${auteurMessage.split("@")[0]} ${reactionName} everyone`,
                    mentions: [auteurMessage]
                };
                zk.sendMessage(origineMessage, videoMessage, { quoted: ms });
            }
        } catch (error) {
            repondre('Error fetching data:' + error);
            console.log(error);
        }
    });
};

// Generate reaction commands
generateReactionCommand("bully", "👊");
generateReactionCommand("cuddle", "🤗");
generateReactionCommand("cry", "😢");
generateReactionCommand("hug", "😊");
generateReactionCommand("awoo", "🐺");
generateReactionCommand("kiss", "😘");
generateReactionCommand("lick", "👅");
generateReactionCommand("pat", "👋");
generateReactionCommand("smug", "😏");
generateReactionCommand("bonk", "🔨");
generateReactionCommand("yeet", "🚀");
generateReactionCommand("blush", "😊");
generateReactionCommand("smile", "😄");
generateReactionCommand("wave", "👋");
generateReactionCommand("highfive");
generateReactionCommand("handhold");
generateReactionCommand("nom", "👅");
generateReactionCommand("bite", "🦷");
generateReactionCommand("glomp", "🤗");
generateReactionCommand("slap", "👋");
generateReactionCommand("kill", "💀");
generateReactionCommand("kick", "🦵");
generateReactionCommand("happy", "😄");
generateReactionCommand("wink", "😉");
generateReactionCommand("poke", "👉");
generateReactionCommand("dance", "💃");
generateReactionCommand("cringe", "😬");
