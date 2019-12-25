const Discord = require('discord.js');
const homu = new Discord.Client();
const valks = require('./arrays.js');
const vJson = require('../json/valks.json');
const { emojiDB, icon } = require('./config.js');

module.exports = {
	foundEMB: async function (json) {
		let valk = vJson[json];
		let pfp = valk.pfp;
		console.log(valk.vCode)
		let bSuit = await emojiDB(valk.vCode[0], 3);
		let cSuit = await emojiDB(valk.vCode[0], 4);
		const trueEMB = new Discord.RichEmbed()
			.setColor(valk.color)
			.setAuthor('Valkyrie Information', 'https://i.imgur.com/5ejjwD3.png', valk.url)
			.setTitle(valk.valkName)
			.setDescription(`**Weapon type**: ${valk.weap}\n**Age**: ${valk.Age} **Birthday**: ${valk.DOB}\n**Measurement**: ${valk.Measurements}\n**Height**: ${valk.Height} **Weight**: ${valk.Weight}`)
			.setThumbnail(pfp[Math.floor(Math.random()*pfp.length)])
			.addField('Battlesuit', bSuit.map(b => `${b.cEmoji} ${b.vEmoji} ${b.name}`).join('\n'), true)
			.addField('Outfit', cSuit.map(c => `${c.cEmoji} ${c.vEmoji} ${c.name}`).join('\n'), true)
			.addField('Bio', valk.vBio)
			.setFooter('King Homu™ Archives', 'https://i.imgur.com/SuxUzng.png')
		return trueEMB;
	},
	nFoundEMB: async function (arg) {
		const noValkEMB = new Discord.RichEmbed()
				.setColor('B33A3A')
				.setAuthor('Valkyrie Information Profile', 'https://i.imgur.com/5ejjwD3.png')
				.setTitle(`${arg.join(' ')} isn't a playable valkyrie. try again...`)
				.setFooter('King Homu™ Archives', 'https://i.imgur.com/SuxUzng.png')
		return noValkEMB;
	},
	errEMB: function (errOut) {
		console.log(errOut);
		console.log(errOut.length)
		const noValkEMB = new Discord.RichEmbed()
				.setColor(errOut.color)
				.setAuthor(errOut.Auth, errOut.AuthIcon)
				.setTitle(errOut.title)
				.setFooter(errOut.foot, errOut.footIcon)
		return noValkEMB;
	},
	dupEMB: function(x) {
		const dupEMB = new Discord.RichEmbed()
				.setColor('#303030')
				.setAuthor('Valkyrie Selection', icon.valk)
				.setTitle('Which valkyrie do you wish to see?')
				for(let i = 0; i < x.length; i++) {
					dupEMB.addField(x[i].emoTag, x[i].name, true)
				}
				dupEMB.setFooter('React only to 1 emoji below', icon.timer)
		return dupEMB;
	}
}