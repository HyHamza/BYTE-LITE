const { Hamza } = require("../TalkDrove/Hamza");
const axios = require('axios');
const translate = require('../TalkDrove/translation');

Hamza({
    commandName: "chifumi",
    category: "Games",
    reaction: "📺"
},
async (sourceMessage, zk, commandOptions) => {
    const { reply, ms, messageAuthor, repliedMessageAuthor, repliedMessage, arg, botId } = commandOptions;

    if (repliedMessage) {
        zk.sendMessage(sourceMessage, {
            text: `@${messageAuthor.split('@')[0]} invites @${repliedMessageAuthor.split('@')[0]} to play the rock-paper-scissors game; To accept the challenge, type yes`,
            mentions: [messageAuthor, repliedMessageAuthor]
        });

        try {
            const replyInvite = await zk.awaitForMessage({
                sender: repliedMessageAuthor,
                chatJid: sourceMessage,
                timeout: 30000 // 30 seconds
            });
            console.log(replyInvite);

            if (replyInvite.message.conversation.toLowerCase() === 'yes' || replyInvite.message.extendedTextMessage.text.toLowerCase() === 'yes') {

                let msg1 = `*Player 1:* @${repliedMessageAuthor.split('@')[0]}
*Player 2:* @${messageAuthor.split('@')[0]}

*Rules:* The game will start soon; you have a maximum of 1 minute each to make a choice in our private chat;`;

                zk.sendMessage(sourceMessage, { text: msg1, mentions: [messageAuthor, repliedMessageAuthor] });

                let msg2 = `You have 3 choices:

                rock
                paper
                scissors

                Please send your choice`;
                let players = [messageAuthor, repliedMessageAuthor];
                let choices = [];

                try {

                    for (const player of players) {

                        zk.sendMessage(sourceMessage, {
                            text: `@${player.split("@")[0]} Please go to this chat to make a choice https://wa.me/${botId.split('@')[0]} `,
                            mentions: [player]
                        });
                        zk.sendMessage(player, { text: msg2 });

                        const receivedMsg = await zk.awaitForMessage({
                            sender: player,
                            chatJid: player,
                            timeout: 30000 // 30 seconds
                        });
                        console.log('Here is the message from' + ' ' + player);
                        console.log(receivedMsg);

                        choices.push(receivedMsg.message.extendedTextMessage.text.toLowerCase());
                    }

                    console.log(choices);
                    const possibleChoices = ["rock", "paper", "scissors"];

                    const player1Choice = choices[0];
                    const player2Choice = choices[1];

                    if (!possibleChoices.includes(player1Choice) || !possibleChoices.includes(player2Choice)) {
                        // Handle case where choices are not valid
                        zk.sendMessage(sourceMessage, {
                            text: `*Player 1:* @${repliedMessageAuthor.split('@')[0]}
*Player 2:* @${messageAuthor.split('@')[0]}

*Result:* One or both choices are not valid.`,
                            mentions: [messageAuthor, repliedMessageAuthor]
                        });

                    } else if (player1Choice === player2Choice) {
                        // It's a tie
                        zk.sendMessage(sourceMessage, {
                            text: `*Player 1:* @${repliedMessageAuthor.split('@')[0]} chose *${player2Choice}* 
*Player 2:* @${messageAuthor.split('@')[0]} chose *${player1Choice}*

Result: It's a tie`,
                            mentions: [messageAuthor, repliedMessageAuthor]
                        });
                    } else if (
                        (player1Choice === "rock" && player2Choice === "scissors") ||
                        (player1Choice === "paper" && player2Choice === "rock") ||
                        (player1Choice === "scissors" && player2Choice === "paper")
                    ) {
                        // Player 1 wins
                        zk.sendMessage(sourceMessage, {
                            text: `*Player 1:* @${repliedMessageAuthor.split('@')[0]} chose *${player2Choice}* 
*Player 2:* @${messageAuthor.split('@')[0]} chose *${player1Choice}*

*Result:* @${messageAuthor.split('@')[0]} wins`,
                            mentions: [messageAuthor, repliedMessageAuthor]
                        });
                    } else {
                        // Player 2 wins
                        zk.sendMessage(sourceMessage, {
                            text: `*Player 1:* @${repliedMessageAuthor.split('@')[0]} chose *${player2Choice}* 
*Player 2:* @${messageAuthor.split('@')[0]} chose *${player1Choice}*

*Result:* @${repliedMessageAuthor.split('@')[0]} wins`,
                            mentions: [messageAuthor, repliedMessageAuthor]
                        });
                    }

                } catch (error) {
                    if (error.message === 'Timeout') {
                        // Timeout
                        zk.sendMessage(sourceMessage, {
                            text: `*Player 1:* @${repliedMessageAuthor.split('@')[0]}
*Player 2:* @${messageAuthor.split('@')[0]}

*Result:* Our players took too long to decide; Therefore, the game is canceled`,
                            mentions: [messageAuthor, repliedMessageAuthor]
                        });
                    } else {
                        // Handle other errors if necessary
                        console.error(error);
                    }
                }

            } else {
                reply('Invitation refused');
            }

        } catch (error) {
            if (error.message === 'Timeout') {
                // Timeout
                zk.sendMessage(sourceMessage, {
                    text: `@${repliedMessageAuthor.split('@')[0]} took too long to respond to the invitation from @${messageAuthor.split('@')[0]}; Therefore, the game is canceled`,
                    mentions: [messageAuthor, repliedMessageAuthor]
                });
            } else {
                // Handle other errors if necessary
                console.error(error);
            }
        }
    } else {
        reply('Chifumi is a rock-paper-scissors game; you need a friend to play. Mention their message when sending chifumi to invite them');
    }
});

Hamza(
    { commandName: "quiz", category: "Games", reaction: "👨🏿‍💻" },
    async (sourceMessage, zk, commandOptions) => {
        const { reply, messageAuthor } = commandOptions;

        try {
            let quiz = await axios.get("https://quizapi.jomoreschi.fr/api/v1/quiz?limit=1&difficulty=easy");

            let msg = `     BYTE-MD-Quiz-Games

*Category:* ${await translate(quiz.data.quizzes[0].category, { to: 'en' })}
*Question:* ${await translate(quiz.data.quizzes[0].question, { to: 'en' })}\n\n*Answers:*\n`;

            let Answers = [];
            for (const answer of quiz.data.quizzes[0].badAnswers) {
                Answers.push(answer);
            }

            Answers.push(quiz.data.quizzes[0].answer);

            async function shuffleArray(array) {
                const shuffledArray = array.slice();

                for (let i = shuffledArray.length - 1; i > 0; i--) {
                    const j = Math.floor(Math.random() * (i + 1));
                    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
                }

                return shuffledArray;
            }

            let choices = await shuffleArray(Answers);

            for (let i = 0; i < choices.length; i++) {
                msg += `*${i + 1}:* ${choices[i]}\n`;
            }

            msg += `\nSend the number of the right answer`;

            reply(msg);

            let response = await zk.awaitForMessage({
                sender: messageAuthor,
                chatJid: sourceMessage,
                timeout: 15000 // 30 seconds
            });
            let responseText;
            try {
                responseText = response.message.extendedTextMessage.text;
            } catch {
                responseText = response.message.conversation;
            }

            if (choices[responseText - 1] === quiz.data.quizzes[0].answer) {
                reply("Great, good answer!");
            } else {
                reply("Bad answer");
            }

        } catch (error) {
            console.log(error);
        }
    }
);
