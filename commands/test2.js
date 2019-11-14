const Discord = module.require('discord.js');
const mysql = module.require('mysql');
const { con } = require('../config.js');

exports.run = (homu, message, args) => {
    const input = args;
    let name, dmg;
    if(input.length <= 0) {
        message.channel.send("where's the name and score, dude?");
    } else if(input.length === 3) {
        name = `${args[0]} ${args[1]}`;
        dmg = args[2];
        message.channel.send(`Array length: ${input.length}\nname: **${name}**\nDamage score: ${dmg}`);

        con.query(`SELECT * FROM birank WHERE name = '${name}'`, (err, rows) => {
            if(err) throw err;
            
            let sql;
            if(rows.length < 1) {
                sql = `INSERT INTO birank (name, dmg) VALUES ('${name}', '${parseInt(dmg)}')`;
            } else {
                let boss = rows[0].dmg;
                sql = `UPDATE boss SET dmg = '${dmg}' WHERE name = '${name}'`;
            }

            con.query(sql,console.log);
        })
    } else {
        name = args[0];
        dmg = args[1];
        message.channel.send(`Array length: ${input.length}\nname: **${name}**\nDamage score: ${dmg}`);

        con.query(`SELECT * FROM birank WHERE name = '${name}'`, (err, rows) => {
            if(err) throw err;
            
            let sql;
            if(rows.length < 1) {
                sql = `INSERT INTO birank (name, dmg) VALUES ('${name}', '${parseInt(dmg)}')`;
            } else {
                let boss = rows[0].dmg;
                sql = `UPDATE boss SET dmg = '${dmg}' WHERE name = '${name}'`;
            }

            con.query(sql,console.log);
        })
    }
};

exports.help = {
	name: 'test2'
}