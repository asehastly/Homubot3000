const Discord = module.require('discord.js');
const fs = module.require('fs');
//const SQLite = module.require("better-sqlite3");

exports.run = (homu, message, args) => {
	message.delete();
	const bossEmb = new Discord.RichEmbed()
	.setColor(0x2c2f33)
	.setAuthor('Boss Invasion Alert!', 'https://i.imgur.com/QrJKwNl.png', ' ')
	.setTitle('Bushi Total Damage Report')
	.setDescription(`12,600,000 DMG`, true)
	.addField('1. Emilia', `2,298,352 DMG`, true)
	.addField('2. Roz-uwu', `2,273,520 DMG`, true)
	.addField('3. Fhyi~', `1,436,374 DMG`, true)
	.addField('4. Amon', `1,215,761 DMG`, true)
	.addField('5. Schnee', `1,049,177 DMG`, true)
	.addField('6. Schnee', `1,049,177 DMG`, true)
	.addField('7. Rahvaana', `942,446 DMG`, true)
	.addField('8. Lina', `60,6147 DMG`, true)
	.addField('9. Shinowa', `420,848 DMG`, true)
	.addField('10. **REDACTED**', `1.476418 DMG`, true)
	//.addBlankField()
	//.setImage(bsimg)
	.setTimestamp()
	.setFooter('Diamond Club Armada', 'https://i.imgur.com/FpIimN1.png');
	message.channel.sendEmbed(bossEmb);
};

exports.help = {
	name: 'test'
}