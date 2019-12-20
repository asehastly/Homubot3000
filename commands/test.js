const Discord = module.require('discord.js');
const { con, valkProcess, emoji, matchfound, notFound, react } = require('../global/config.js');


exports.run = async (homu, message, args) => {
	message.delete();

	const filter = user => user.author.id === message.author.id;

	const testEMB = new Discord.RichEmbed()
		.setColor('#0099ff')
		.setAuthor('Some name', 'https://i.imgur.com/wSTFkRM.png')
		.setTitle('You have 30 seconds to choose 1 word:')
		.setDescription('`Fish` | `Vegetable` | `Bird`')

	message.channel.send(testEMB).then(msg => { msg.delete(30000)});
	message.channel.awaitMessages(filter, {
		max: 1,
		time: 30000,
		error: ['Time']
	}).then(async collected => {
		if(collected.first().content === 'cancel') {
			message.reply('Canceled').then(del =>{del.delete(10000)})
		}

		let capture = collected.first().content;
		let gif = '';
		collected.delete();

		switch(capture.toLowerCase()) {
			case 'fish':
				message.channel.send(resultEMB('https://i.imgur.com/4xGLp0d.gif'));
			break;
			case 'vegetable':
				message.channel.send(resultEMB('https://i.imgur.com/z2qxcPU.gif'));
			break;
			case 'bird':
				message.channel.send(resultEMB('https://i.imgur.com/ocfIWWq.gif'));
			break;
			default:
				message.channel.send(resultEMB('https://i.imgur.com/0t9OsL7.gif'));
			break;

		}

		function resultEMB(img) {
			const resEMB = new Discord.RichEmbed()
				.setColor('#0099ff')
				.setTitle(`You have chosen *${capture}*`)
				.setAuthor('I have a "GIF" for you...', 'https://i.imgur.com/SuxUzng.png', '')
				.setImage(img)
			return resEMB;
		}

	}).catch(err => {
		return message.channel.send("Time's up. too late...").then(del => {del.delete(30000)});
	})
};

exports.help = {
	name: 'test'
}