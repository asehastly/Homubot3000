const Discord = module.require('discord.js');
const moment = module.require('moment-timezone');
const { con } = require('../config.js');


exports.run = (homu, message, args) => {
	var valk, vcode, vid, valkqueue;
	message.delete();
	switch(args[0]) {
		case "add":
			args.shift();
			if(args.length < 3) return message.channel.send("Remember the syntax fucker! I don't want to remind you everytime you make a fucking typo\n**Syntax**: `homu emoji |Valkyrie| |Emoji Code| |The Actual Fucking Emoji|`").then(update => { update.delete(15000)});
			var emo = args[2].match(/\d/g);
			emo = emo.join("")
			args[2] = emo;
			valk = args[0].toUpperCase();
			vcode = args[1].toUpperCase();
			vid = args[2];
			
			con.query(`SELECT * FROM emoji WHERE id = '${vid}'`, (err, result) => {
				if(err) throw err;
				
				let sql;
				if(result.length < 1) {
					sql = `INSERT INTO emoji (valk, code, id) VALUES ('${valk}', '${vcode}', '${vid}')`;
					const emb = new Discord.RichEmbed()
						.setColor(0x23272a)
						.addField("Account Information",`Valkyrie: ${valk}\nContribution Code: ${vcode}\nEmoji ID: ${vid}`)
						.setTimestamp()
						.setFooter('Diamond Club Armada', 'https://i.imgur.com/FpIimN1.png');
					message.channel.send("Adding this emoji is complete... I hope you're happy.");
					message.channel.sendEmbed(emb);
				} else {
					message.channel.send(`${valk} as already been added... fucko!`);
				}
				con.query(sql,console.log);
			});
		break;
		case "view":
			args.shift();
			var view = args[0];
			if(!args[0]) return message.channel.send("Who do you want to view? please enter the name").then(update => { update.delete(15000)});
			switch(args[0].toLowerCase()) {
				case 'theresa':
					valkqueue = 'Teri';
				break;
				case 'fu':
					valkqueue = 'Fuka';
				break;
				case 'fuhua':
					valkqueue = 'Fuka';
				break;
				case 'liliya':
					valkqueue = 'Lily';
				break;
				case 'rozaliya':
					valkqueue = 'Roza';
				break;
				default:
					valkqueue = args[0];
			}
			valk = valkqueue.toUpperCase();
			console.log(valk);
			con.query(`SELECT * FROM valky WHERE vcode = '${valk}'`, (err, result) => {
				if(err) throw err;
				console.log(result.length);
				if(result.length < 1) {
					return message.channel.send("Record not found. please verify that the name is a playable valkyrie.").then(update => { update.delete(15000)});
				} else {
					var valkres = result[0].valkname;
					con.query(`SELECT * FROM emoji WHERE valk = '${valk}'`, (err, result) => {
						if(err) throw err;
						
						const emb = new Discord.RichEmbed()
							.setColor(0x23272a)
							.setTitle(`List of ${valkres} emojis`)
							.setAuthor('King Homu Valkyrie Database', 'https://i.imgur.com/5ejjwD3.png', ' ')
							.setDescription('**Disclaimer**: This emojis are only used for contributions')
							for (let i = 0; i < result.length; i++) {
								emb.addField(emoji(result[i].id),`Code **${result[i].code}**`, true)
							}
							emb.setTimestamp()
							emb.setFooter('Diamond Club Armada', 'https://i.imgur.com/FpIimN1.png');
						message.channel.sendEmbed(emb);
						
						function emoji(id) {
						   return homu.emojis.get(id).toString();
						}
					});
				}
			});
			/**/
		break;
		default:
			message.channel.send("what do you want to do?\n**add**\n**vew**\n**remove**\nWHAT **MOTHERFUCKER**!! WHAT!!!!").then(update => { update.delete(15000)});
	}
	
};

exports.help = {
	name: 'emoji'
}