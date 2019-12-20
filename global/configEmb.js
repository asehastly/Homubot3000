const Discord = require('discord.js');
const homu = new Discord.Client();
const valks = require('./arrays.js');
const vJson = require('../json/valks.json');
const { emojiDB } = require('./config.js');

module.exports = {
    matchfound: async (json) => {
		//console.log(valkfound.emoji);
        let valkfound = vJson[json];
        //console.log(valkfound);
        let pfp = valkfound.pfp;
        let bSuit = await emojiDB(valkfound, 3);
        let cSuit = await emojiDB(valkfound, 4);
		const embTrue = new Discord.RichEmbed()
		.setColor('	#23272a')
			.setAuthor('Valyrie Information', 'https://i.imgur.com/5ejjwD3.png', valkfound.url)
			.setTitle(valkfound.valkName)
			.setDescription(`**Weapon type**:${valkfound.weap}\n**Age**:${valkfound.Age}\t\t\t\t**Birthday**:${valkfound.DOB}\n**Measurements**:${valkfound.Measurements}\n**Height**: ${valkfound.Height}\t\t\t**Weight**:${valkfound.Weight}`)
			.setThumbnail(pfp[Math.floor(Math.random()*pfp.length)])
            .addField('Battlesuit', `${bSuit.map(r => `${r}`).join("\n")}`, true)
			.addField('Outfits', `${cSuit.map(r => `${r}`).join("\n")}`, true)
			.addField('Bio', valkfound.vBio)
			.setTimestamp()
            .setFooter('King Homu™ Archives', 'https://i.imgur.com/SuxUzng.png');
		return embTrue;
    },
    notFound: (input) => {
		let concat = input.join(" ");
		const embFalse = new Discord.RichEmbed()
		.setColor('	#23272a')
			.setAuthor('Valyrie Information', 'https://i.imgur.com/5ejjwD3.png')
			.setTitle(`${concat} was not on the database`)
			.setDescription("Are you sure you are looking for a **playable** valkyrie?")
			.setTimestamp()
			.setFooter('King Homu™ Archives', 'https://i.imgur.com/SuxUzng.png');
		return embFalse;
    },
}