require('dotenv-flow').config();
const Discord = module.require('discord.js');
//const homu = new Discord.Client();
const mysql = require('mysql');
const valks = require('./arrays.js');
/* const vJson = require('../json/valks.json'); */

let con = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: 'homu',
    charset : 'utf8mb4'
});

con.connect(err => {
    if(err) throw err;
    console.log('connected to homu database');
    //con.query('SHOW TABLES', console.log);
});

module.exports = {
    token: process.env.TOKEN,
    owner: process.env.OWNER,
    prefix: process.env.PREFIX,
    con,
    valkProcess: function(args) {
        let valkqueue, output;
    
        valkqueue = args.toUpperCase()
        console.log(`String input was converted to ${valkqueue}`)
        const match = valks.find(code => {
            for(let i = 0; i < code.vCode.length; i++) {
                console.log(code.vCode[i]);
                if(code.vCode[i] === valkqueue) {
                    return true;
                }
            }
            
        })
        return match;
    },
    emoji: function(id) {
        console.log(homu.emojis.get(id))
        //const emo = `${homu.emojis.get(id)}`;
        return homu.emojis.get(id);
        //return 'NAN'
     },
     ConvNum: function(id) {
        var emo = id.match(/\d/g);
        emo = emo.join("")
        const temp = emo;
        console.log(temp);
        return temp;
    },
    suit: function(btype) {
        switch(btype) {
            case 'B':
                return "Battlesuit";
            case 'O':
                return "Outfit";
            default:
                return null;
        }
    },
    findSuit: function(suit) {
        const match = valks.find(code => {
            for(let i = 0; i < code.sCode.length; i++) {
                console.log(code.sCode[i]);
                if(code.sCode[i] === suit) {
                    return true;
                }
            }
            
        })
    },
    valkMap: function() {
        const map = valks.map()
    }
}