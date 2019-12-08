const Discord = module.require('discord.js');
const valks = require('../global/valks.js');
const { con } = require('../config.js');


exports.run = (homu, message, args) => {
	
	var valkqueue;
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
	//message.delete();
	for(let i = 0; i < valks.length; i++) {
		//console.log(`${valks[i].valkName} | ${valks[i].vCode}`);
		if(valkqueue.toUpperCase() === valks[i].vCode) {
			let pfp = valks[i].pfp;
			const emb = new Discord.RichEmbed()
				.setColor('	#23272a')
				.setAuthor('Valyrie Information', 'https://i.imgur.com/5ejjwD3.png', valks[i].url)
				.setTitle(valks[i].valkName)
				.setThumbnail(pfp[Math.floor(Math.random()*pfp.length)])
				.addField('Weapon type', valks[i].weap)
				.addField('Age', valks[i].Age, true)
				.addField('Birthday', valks[i].DOB, true)
				.addField('Height', valks[i].Height, true)
				.addField('Weight', valks[i].Weight, true)
				.addField('Measurements', valks[i].Measurements)
				.addField('Bio', valks[i].vBio)
			message.channel.sendEmbed(emb);
			console.log(`------------------------------------------------\nUser has selected **${valks[i].vCode}**`);
			console.log(`${pfp[Math.floor(Math.random()*pfp.length)]}\n------------------------------------------------`);
		}
	};
	
};

exports.help = {
	name: 'test'
}