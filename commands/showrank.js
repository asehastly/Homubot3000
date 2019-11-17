const Discord = module.require('discord.js');
const fs = module.require('fs');
const { con } = require('../config.js');

exports.run = (homu, message, args) => {
	message.delete();
	var total = 0
	var bossName;
	con.query("SELECT * FROM boss", function (err, bi) {
		if (err) throw err;
		bossName = bi[0].name;
		if(!bossName) return bossName = 'Not set';
	});
	con.query("SELECT * FROM birank ORDER BY dmg DESC", function (err, result) {
		if (err) throw err;
		if(result.length < 1) return message.channel.send('Records not found!');
		for (let i = 0; i < result.length; i++) {
			var previous = total + parseInt(result[i].dmg);
			total = previous;
		}
		const bossEmb = new Discord.RichEmbed()
			.setColor(0x2c2f33)
			.setAuthor('Boss Invasion Alert!', 'https://i.imgur.com/QrJKwNl.png', ' ')
			.setTitle('Total Damage Report')
			.setDescription(`${bossName} | ${total.toLocaleString()} DMG`, true)
		for (let i = 0; i < result.length; i++) {
			//let dam = result[i].dmg.toLocaleString()
			if(result[i].dmg < 1) {
				bossEmb.addField(`${i+1}. ${result[i].name}`, `**LATE KILL**`, true)
			} else {
				bossEmb.addField(`${i+1}. ${result[i].name}`, `${result[i].dmg.toLocaleString()} DMG`, true)
			}
		}
		bossEmb.setTimestamp()
		bossEmb.setFooter('Diamond Club Armada', 'https://i.imgur.com/FpIimN1.png');
		message.channel.sendEmbed(bossEmb);
		
	});
};

exports.help = {
	name: 'showrank'
}