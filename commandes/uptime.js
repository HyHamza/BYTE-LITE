const Hamza = require('../TalkDrove/Hamza');

module.exports = {
  Hamza: {
    nomCom: "uptime",
    aliases: ["up", "upt"],
    version: "1.0",
    author: "Hamza",
    role: 0,
    shortDescription: {
      en: "Displays the uptime of the bot."
    },
    longDescription: {
      en: "Displays the amount of time that the bot has been running for."
    },
    categorie: "New",
    guide: {
      en: "Use {p}uptime to display the uptime of the bot."
    }
  },
  onStart: async function ({ api, event, args }) {
    const uptime = process.uptime();
    const seconds = Math.floor(uptime % 60);
    const minutes = Math.floor((uptime / 60) % 60);
    const hours = Math.floor((uptime / (60 * 60)) % 24);
    const days = Math.floor(uptime / (60 * 60 * 24));
    const uptimeString = `${hours} hours ${minutes} minutes ${seconds} seconds`;
    api.sendMessage(`*UPTIME OF BYTE-MD IS...${uptimeString}.*`, event.threadID);
  }
};
