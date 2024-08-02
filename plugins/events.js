const { Hamza } = require('../TalkDrove/Hamza');
const { assignValue } = require('../byte-tables/welcome');

async function events(commandName) {
    Hamza({
        commandName: commandName,
        category: 'Group'
    }, async (dest, zk, commandOptions) => {
        const { ms, arg, reply, superUser, verifyAdmin } = commandOptions;

        if (verifyAdmin || superUser) {
            if (!arg[0] || arg.join(' ') === ' ') {
                reply(commandName + ' ' + 'on to activate and ' + commandName + ' ' + 'off to deactivate');
            } else {
                if (arg[0] === 'on' || arg[0] === 'off') {
                    await assignValue(dest, commandName, arg[0]);
                    reply(commandName + " is now " + arg[0]);
                } else {
                    reply('Use "on" to activate and "off" to deactivate');
                }
            }
        } else {
            reply('You don\'t have permission to use this command 🙄.');
        }
    });
}

events('welcome');
events('goodbye');
events('antipromote');
events('antidemote');
