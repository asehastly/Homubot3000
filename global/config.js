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

function valkProcess(args) {
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
}

function emoji(id) {
    console.log(id)
    return homu.emojis.get(id).toString();
    //return 'NAN'
 }

module.exports = {
    token: process.env.TOKEN,
    owner: process.env.OWNER,
    prefix: process.env.PREFIX,
    con,
    valkProcess,
    emoji
}