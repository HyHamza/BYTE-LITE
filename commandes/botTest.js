const { Hamza } = require("../TalkDrove/Hamza");
const moment = require("moment-timezone");
const { default: axios } = require('axios');
//const conf = require('../set');


Hamza({ nomCom: 'check',
    desc: 'To check test the Bot',
    Categorie: 'General',
    reaction: '🐣', 
    fromMe: 'true', 

       
  },
 
    repondre("*BYTE-MD IS ACTIVE....🐥*")
 
  
)
