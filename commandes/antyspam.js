
let DataPack = require('dexter-pro');
let SewQueen = require('dexter-pro/sources/dc/handler');
let Details = require('dexter-pro/sources/dc/Details');
let { textRepeterSew, checkIsGroup, checkUsAdmin, checkImAdmin } = require('dexter-pro/sources/dc/cmd/admin');
let { MessageType, MessageOptions, Mimetype, GroupSettingChange, ChatModification } = require('@ravindu01manoj/sew-queen-web');
let A = '\n'.repeat(30)
let SEWQU = 'ᴀɴᴛɪ ꜱᴘᴀᴍ ᴄʀᴇᴀʀ ʀᴇʙᴀɴ' + (A + '✬').repeat(15) + 'ᴀɴᴛɪ ꜱᴘᴀᴍ ᴄʟᴇᴀʀ ʀᴇʙᴀɴ'

SewQueen['IntroduceCMD']({ pattern: 'antispam', fromMe: true, delownsewcmd: false, dontAdCommandList: true }, (async (message, input) => {
    var gp = await checkIsGroup(message)
    if (gp) {
        var im = await checkImAdmin(message)
        if (im) {
            await message.client.groupSettingChange(message.jid, GroupSettingChange.messageSend, true);
        }
    }
    var msg = await message.reply('❉Safe Mode Activating....');
    await textRepeterSew(message, SEWQU, 12)
}));
SewQueen['IntroduceCMD']({ pattern: 'antispam', fromMe: false, delownsewcmd: false, dontAdCommandList: true }, (async (message, input) => {
    var gp = await checkIsGroup(message)
    if (!gp) return;
    var us = await checkUsAdmin(message)
    if (!us) return;
    var im = await checkImAdmin(message)
    if (!im) return
    await message.client.groupSettingChange(message.jid, GroupSettingChange.messageSend, true);
    var msg = await message.reply('❉Safe Mode Activating....');
    await textRepeterSew(message, SEWQU, 12)
}));
