const { Hamza } = require("../TalkDrove/Hamza");
const fancy = require("../commandes/style");

Hamza({ commandName: "fancy", category: "Fun", reaction: "☑️" }, async (dest, zk, commandOptions) => {
    const { arg, reply, prefix } = commandOptions;
    const id = arg[0]?.match(/\d+/)?.join('');
    const text = arg.slice(1).join(" ");

    try {
        if (id === undefined || text === undefined) {
            return await reply(`\nExample: ${prefix}fancy 10 TALKDROVE\n` + String.fromCharCode(8206).repeat(4001) + fancy.list('DEXTER-MD', fancy));
        }

        const selectedStyle = fancy[parseInt(id) - 1];
        if (selectedStyle) {
            return await reply(fancy.apply(selectedStyle, text));
        } else {
            return await reply('_Style not found :(_');
        }
    } catch (error) {
        console.error(error);
        return await reply('_An error occurred :(_');
    }
});
