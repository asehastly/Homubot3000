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
        message.delete();
        if (message.member.roles.find("name", "Vice Admirals") || message.member.roles.find("name", "Admiral")) {
            addUser();
        } else return message.channel.send("You don't have permission to use this command. go away!").then(update => { update.delete(5000) });
       
    } else {
        name = args[0];
        dmg = args[1];
        message.delete();
        if (message.member.roles.find("name", "Vice Admirals") || message.member.roles.find("name", "Admiral")) {
            addUser();
        } else return message.channel.send("You don't have permission to use this command. go away!").then(update => { update.delete(5000) });
    }

    function addUser() {
        con.query(`SELECT * FROM birank WHERE name = '${name}'`, (err, rows) => {
            if(err) throw err;
            
            let sql;
            if(rows.length < 1) {
                sql = `INSERT INTO birank (name, dmg) VALUES ('${name}', '${parseInt(dmg)}')`;
                message.channel.send(`**${name}** had been added to the list\nwith a score of ${dmg}.`).then(update => { update.delete(5000) });
            } else {
                let boss = rows[0].dmg;
                sql = `UPDATE birank SET dmg = '${dmg}' WHERE name = '${name}'`;
                message.channel.send(`**${name}** had been updated to the list\nwith a score of ${dmg}.`).then(update => { update.delete(5000) });
            }

            con.query(sql,console.log);
        })
    }
};

exports.help = {
	name: 'addrank'
}