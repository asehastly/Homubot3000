const Discord = module.require('discord.js');
const moment = module.require('moment-timezone');
const { con } = require('../config.js');


exports.run = (homu, message, args) => {
	
	var a = args[0];
	var tag, ign, gid,armada,pfp;
	
	console.log(args.length);
	message.delete();
	if(!tag && !ign && !gid) return message.channel.send("Please include atleast a in-game name and game ID.\n**Syntax**: `homu addmember <**mention** *if applicable*> <**in-game name**> <**in-game ID number**>").then(update => { update.delete(15000)});
	if(a.startsWith("<")) {
		if(args.length >= 5) {
			tag = args[0];
			ign = `${args[1]} ${args[2]}`;
			gid = args[3];
			if(!args[4]) {
				armada = 'No armada';
			} else {
				armada = args[4];
			}
			pfp = args[5];
			console.log('Option 1.1');
		} else {
			tag = args[0];
			ign = args[1];
			gid = args[2];
			if(!args[3]) {
				armada = 'No armada';
			} else {
				armada = args[3];
			}
			pfp = args[4];
			console.log('Option 1.2');
		}
	} else {
		if(args.length > 3) {
			tag = 'No discord Account';
			ign = `${args[0]} ${args[1]}`;
			gid = args[2];
			if(!args[3]) {
				armada = 'No armada';
			} else {
				armada = args[3];
			}
			pfp = args[4];
			console.log('Option 2.1');
		} else {
			tag = 'No discord Account';
			ign = args[0];
			gid = args[1];
			if(!args[2]) {
				armada = 'No armada';
			} else {
				armada = args[2];
			}
			pfp = args[3];
			console.log('Option 2.2');
		}
	}
	
	con.query(`SELECT * FROM memlistdummy WHERE gid = '${gid}'`, (err, rows) => {
		if(err) throw err;
		
		let sql;
		if(rows.length < 1) {
			sql = `INSERT INTO memlistdummy (id, name, gid, armada) VALUES ('${tag}', '${ign}', '${parseInt(gid)}', '${armada}')`;
		} else {
			let boss = rows[0].name;
			sql = `UPDATE memlistdummy SET id = '${tag}', name = '${ign}', armada = '${armada}' WHERE gid = '${gid}'`;
		}
		con.query(sql);
	});
	
	const emb = new Discord.RichEmbed()
		.setColor(0x23272a)
		.addField("Account Information",`Discord tag: ${tag}\nIn-game name: ${ign}\nIn-game ID: ${gid}\nArmada: ${gid}`, true)
		.setTimestamp()
		.setFooter('Diamond Club Armada', 'https://i.imgur.com/FpIimN1.png');
	message.channel.sendEmbed(emb);
	console.log(args);
	//message.channel.send(args).then(update => { update.delete(15000)});
};

exports.help = {
	name: 'test'
}