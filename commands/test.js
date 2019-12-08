const Discord = module.require('discord.js');
const valks = require('../global/valks.js');
const { con } = require('../config.js');


exports.run = (homu, message, args) => {
	
	if(!args[0]) return message.channel.send("Please type the name of the valkyrie you're trying to see.").then(update => { update.delete(7000)});
	var valkqueue, valkfound, stat;
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
	
	const match = valks.find(item => {
		if(item.vCode === valkqueue.toUpperCase()) {
			return true;
		}
	})
	message.delete();
	console.log(match);
	if(match === undefined) {
		let concat = args.join(" ");
		const embFalse = new Discord.RichEmbed()
		.setColor('	#23272a')
			.setAuthor('Valyrie Information', 'https://i.imgur.com/5ejjwD3.png')
			.setTitle(`${concat} was not on the database`)
			.setDescription("Are you sure you are looking for a **playable** valkyrie?")
			.setTimestamp()
			.setFooter('King Homu™ Archives', 'https://i.imgur.com/SuxUzng.png');
		message.channel.sendEmbed(embFalse).then(update => { update.delete(10000)});
	} else{
		let pfp = match.pfp;
		const embTrue = new Discord.RichEmbed()
		.setColor('	#23272a')
			.setAuthor('Valyrie Information', 'https://i.imgur.com/5ejjwD3.png', match.url)
			.setTitle(match.valkName)
			.setThumbnail(pfp[Math.floor(Math.random()*pfp.length)])
			.addField('Weapon type', match.weap)
			.addField('Age', match.Age, true)
			.addField('Birthday', match.DOB, true)
			.addField('Height', match.Height, true)
			.addField('Weight', match.Weight, true)
			.addField('Measurements', match.Measurements, true)
			.addField('Bio', match.vBio)
			.setTimestamp()
			.setFooter('King Homu™ Archives', 'https://i.imgur.com/SuxUzng.png');
		message.channel.sendEmbed(embTrue);
		console.log(`------------------------------------------------\nUser has selected **${match.vCode}**`);
		console.log(`${pfp[Math.floor(Math.random()*pfp.length)]}\n------------------------------------------------`);
	}
};

exports.help = {
	name: 'test'
}