const {
  Hamza
} = require("../TalkDrove/Hamza");
const s = require("../set");
const fs = require('fs');
function getDescriptionFromEnv(_0x17fef1) {
  filePath = "./app.json";
  const _0x345754 = fs.readFileSync(filePath, "utf-8");
  const _0x2b5786 = JSON.parse(_0x345754);
  const _0x591f7d = _0x2b5786.env[_0x17fef1];
  return _0x591f7d && _0x591f7d.description ? _0x591f7d.description : "The environment variable description was not found.";
}
Hamza({
  'nomCom': "settings",
  'categorie': "HEROKU"
}, async (_0x2ab1fb, _0x2fdedb, _0x2e0b9d) => {
  const {
    ms: _0x210c54,
    repondre: _0x4126d6,
    superUser: _0x17303a,
    auteurMessage: _0x1c8e53
  } = _0x2e0b9d;
  if (!_0x17303a) {
    _0x4126d6("This command is for my owner only!");
    return;
  }
  ;
  let _0x3e4f2b = [{
    'nom': "AUTO_REACTION",
    'choix': ['on', "off"]
  }, {
    'nom': "AUTO_VIEW_STATUS",
    'choix': ['on', "off"]
  }, {
    'nom': "AUTO_SAVE_STATUS",
    'choix': ['on', "off"]
  }, {
    'nom': "PM_PERMIT",
    'choix': ['on', "off"]
  }, {
    'nom': "BOT_MODE",
    'choix': ["public", "private"]
  }, {
    'nom': "STARTING_MESSAGE",
    'choix': ['on', "off"]
  }, {
    'nom': "AUTO_READ_MESSAGES",
    'choix': ['on', "off"]
  }, {
    'nom': "PRESENCE",
    'choix': ["online", "typing", "recording"]
  }, {
    'nom': "CHAT_BOT",
    'choix': ['on', "off"]
  }];
  let _0x54dce5 = " ╭──────༺♡༻──────╮\n BYTE-LITE Settings\n ╰──────༺♡༻──────╯\n\n";
  for (v = 0; v < _0x3e4f2b.length; v++) {
    _0x54dce5 += v + 1 + "- *" + _0x3e4f2b[v].nom + "*\n";
  }
  _0x54dce5 += "\n*Please Choose a variable by its number*";
  let _0x18e4cd = await _0x2fdedb.sendMessage(_0x2ab1fb, {
    'text': _0x54dce5
  }, {
    'quoted': _0x210c54
  });
  console.log(_0x18e4cd);
  let _0x1e23fa = await _0x2fdedb.awaitForMessage({
    'chatJid': _0x2ab1fb,
    'sender': _0x1c8e53,
    'timeout': 0xea60,
    'filter': _0xc99161 => _0xc99161.message.extendedTextMessage && _0xc99161.message.extendedTextMessage.contextInfo.stanzaId == _0x18e4cd.key.id && _0xc99161.message.extendedTextMessage.text > 0 && _0xc99161.message.extendedTextMessage.text <= _0x3e4f2b.length
  });
  let _0x2057c1 = _0x1e23fa.message.extendedTextMessage.text - 1;
  let {
    nom: _0x445a3c,
    choix: _0x14fe3a
  } = _0x3e4f2b[_0x2057c1];
  let _0x1995c4 = " ╭──────༺♡༻──────╮\n BYTE-LITE settings\n ╰──────༺♡༻──────╯\n\n";
  _0x1995c4 += "*Variable Name* :" + _0x445a3c + "\n";
  _0x1995c4 += "*Description* :" + getDescriptionFromEnv(_0x445a3c) + "\n\n";
  _0x1995c4 += "┌────── ⋆⋅☆⋅⋆ ──────┐\n\n";
  for (i = 0; i < _0x14fe3a.length; i++) {
    _0x1995c4 += "* *" + (i + 1) + "* => " + _0x14fe3a[i] + "\n";
  }
  _0x1995c4 += "\n└────── ⋆⋅☆⋅⋆ ──────┘\n\n*Now reply this message with the number that matches your choice.*";
  let _0x248936 = await _0x2fdedb.sendMessage(_0x2ab1fb, {
    'text': _0x1995c4
  }, {
    'quoted': _0x1e23fa
  });
  let _0x5582ff = await _0x2fdedb.awaitForMessage({
    'chatJid': _0x2ab1fb,
    'sender': _0x1c8e53,
    'timeout': 0xea60,
    'filter': _0x51f401 => _0x51f401.message.extendedTextMessage && _0x51f401.message.extendedTextMessage.contextInfo.stanzaId == _0x248936.key.id && _0x51f401.message.extendedTextMessage.text > 0 && _0x51f401.message.extendedTextMessage.text <= _0x14fe3a.length
  });
  let _0x1b7dea = _0x5582ff.message.extendedTextMessage.text - 1;
  const _0xb9658c = require("heroku-client");
  const _0x590960 = new _0xb9658c({
    'token': s.HEROKU_APY_KEY
  });
  let _0x273628 = "/apps/" + s.HEROKU_APP_NAME;
  await _0x590960.patch(_0x273628 + "/config-vars", {
    'body': {
      [_0x445a3c]: _0x14fe3a[_0x1b7dea]
    }
  });
  await _0x4126d6("That Heroku variable is changing, The bot is restarting....");
});
function changevars(_0x2cb3f3, _0x5ad9fd) {
  Hamza({
    'nomCom': _0x2cb3f3,
    'categorie': "HEROKU"
  }, async (_0x2c3d5e, _0x485844, _0xec8374) => {
    const {
      arg: _0x5dc77b,
      superUser: _0x3dfa17,
      repondre: _0x4a69d7
    } = _0xec8374;
    if (!_0x3dfa17) {
      _0x4a69d7("This command is for my owner only!");
      return;
    }
    ;
    if (s.HEROKU_APP_NAME == null || s.HEROKU_APY_KEY == null) {
      _0x4a69d7("Fill in the HEROKU_APP_NAME and HEROKU_API_KEY environment variables");
      return;
    }
    ;
    if (!_0x5dc77b[0]) {
      _0x4a69d7(getDescriptionFromEnv(_0x5ad9fd));
      return;
    }
    ;
    const _0x303e60 = require("heroku-client");
    const _0x326e78 = new _0x303e60({
      'token': s.HEROKU_APY_KEY
    });
    let _0x5ba5d3 = "/apps/" + s.HEROKU_APP_NAME;
    await _0x326e78.patch(_0x5ba5d3 + "/config-vars", {
      'body': {
        [_0x5ad9fd]: _0x5dc77b.join(" ")
      }
    });
    await _0x4a69d7("That Heroku variable is changing, The bot is restarting....");
  });
}
;
changevars("setprefix", "PREFIX");
changevars("menulinks", "BOT_MENU_LINKS");
