const Discord = module.require('discord.js');
const fs = module.require('fs');
//const SQLite = module.require("better-sqlite3");

exports.run = (homu, message, args) => {
	message.delete();
	const bossEmb = new Discord.RichEmbed()
	.setColor(0x2c2f33)
	.setAuthor('Boss Invasion Alert!', 'https://i.imgur.com/QrJKwNl.png', ' ')
	.setTitle('Total Damage Report')
	.setDescription(`Ganesha | 13,243,543 DMG`, true)
	.addField('**1. Roz-uwu**', `2,755,231 DMG`, true)
	.addField('**2. Arlyne**', `2,303,704 DMG`, true)
	.addField('**3. Amon**', `1,396,965 DMG`, true)
	.addField('4. Fhyi~', `1,086,856 DMG`, true)
	.addField('5. Schnee', `945,717 DMG`, true)
	.addField('6. Synnex', `764,241 DMG`, true)
	.addField('7. ReD BaroN', `514,991 DMG`, true)
	.addField('8. Emillia', `569,725 DMG`, true)
	.addField('9. Lina', `346,894 DMG`, true)
	.addField('10. Shinowa', `331,328 DMG`, true)
	.addField('11. AnungUnRama', `167,497 DMG`, true)
	.addField('12. **Lord Buckethead**', `2,060,394 DMG`, true)
	//.addBlankField()
	//.setImage(bsimg)
	.setTimestamp()
	.setFooter('Diamond Club Armada', 'https://i.imgur.com/FpIimN1.png');
	message.channel.sendEmbed(bossEmb);
};

exports.help = {
	name: 'test'
}