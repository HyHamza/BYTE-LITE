"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { Hamza } = require("../TalkDrove/Hamza");
Hamza({ nomCom: "repo", reaction: "🐼", nomFichier: __filename }, async (dest, zk, commandeOptions) => {


const githubRepo = 'https://api.github.com/repos/HyHamza/BYTE-MD_LITE';
const img = 'https://raw.githubusercontent.com/HyHamza/HyHamza/main/Images/BYTE-MD-LITE.jpeg';


    const response = await fetch(githubRepo); 
        const data = await response.json(); 

        if (data) {
            const repoInfo = {
                stars: data.stargazers_count,
                forks: data.forks_count,
                lastUpdate: data.updated_at,
                owner: data.owner.login
            };
const releaseDate = new Date(data.created_at).toLocaleDateString('en-GB');
            const lastUpdateDate = new Date(repoInfo.lastUpdate).toLocaleDateString('en-GB');

const gitdata = `Hello 👋 
This is *BYTE-MD.* The following is *BYTE-MD's*
*REPOSITORY:* ${data.html_url}
✨ *STARS:* ${repoInfo.stars}
🧧 *FORKS:* ${repoInfo.forks}
📅 *RELEASED:* ${releaseDate}
🕐 *LAST UPDATED:* ${lastUpdateDate}
👨‍💻 *OWNER:* *TalkDrove*`;


await zk.sendMessage(dest, { image: { url: img }, caption: gitdata });

} else {
console.log("Could not fetch data")

}


});
