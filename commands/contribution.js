const Discord = module.require('discord.js');
const moment = module.require('moment-timezone');
const { con } = require('../global/config.js');


exports.run = (homu, message, args) => {
    con.query("SELECT * FROM memlist WHERE armada = 'DiamondClub'", function (err, result) {
		if (err) throw err;
		if(result.length < 1) return message.channel.send('Records not found!').then(update => { update.delete(5000) });
		const bossEmb = new Discord.RichEmbed()
			.setColor(0x2c2f33)
			.setAuthor('TESTING TESTING TESTING', 'https://i.imgur.com/QrJKwNl.png', ' ')
			.setTitle('Some title')
			.setDescription(`Testing New Contribution`)
		for (let i = 0; i < result.length; i++) {
			//let dam = result[i].dmg.toLocaleString()
			if(!result[i].id) {
				bossEmb.addField(`**${result[i].name}** | ${result[i].gid}`, '**NOT** Present on Discord', true)
			} else {
				bossEmb.addField(`**${result[i].name}** | ${result[i].gid}`, 'Present on Discord', true)
			}
		}
		bossEmb.setTimestamp()
		bossEmb.setFooter('Diamond Club Armada', 'https://i.imgur.com/FpIimN1.png');
		message.channel.sendEmbed(bossEmb);
		
	});
};

exports.help = {
	name: 'test3'
}