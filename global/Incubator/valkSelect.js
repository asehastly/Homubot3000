const Discord = module.require('discord.js');
const { icon } = require('../global/config.js');
const { errEMB } = require('../global/configEMB.js');
const { startValk } = require('../global/execute.js');


exports.run = async (homu, message, args) => {
	message.delete();
	//console.log(icon)

	const filter = user => user.author.id === message.author.id;
	var errMessage = new Array;
	var id, emoDup;

	if(args.length === 0) {
		//awaitMessage
		errMessage = {
			color: '#bfa600',
			Auth: 'King Homu demands an answer!!!',
			AuthIcon: icon.homu,
			title: "Please enter the name of the Valkyrie you're looking for?",
			foot: "You have 30 seconds to type the name",
			footIcon: icon.timer
		}
		message.channel.send(errEMB(errMessage))
		message.channel.awaitMessages(filter, {
			max: 1,
			time: 30000,
			error: ['Time']
		}).then(collected => {
			let reply = collected.first().content;
			console.log(reply)
			//reply = reply.toLowerCase();
			if(reply === 'cancel') {
				message.channel.bulkDelete(2)
				message.channel.send("Fine! if you don't want too...").then(del => del.delete(10000));
			} else {
				id = collected.first().content
				id = id.split(' ')
				message.channel.bulkDelete(2)
				startValk(message, id);
			}
			
		}).catch(err => {
			message.channel.bulkDelete(1)
			errMessage = {
				color: '#910007',
				Auth: 'You have disappointed King Homu',
				AuthIcon: icon.homu,
				title: "You have failed to enter something",
				foot: " Time's up...",
				footIcon: icon.timer
			}
			return message.channel.send(errEMB(errMessage)).then(del => del.delete(10000));
		});
		
	} else {
		//Standard Procedure
		console.log(args)
		startValk(message, args);
	}
	
};

exports.help = {
	name: 'test'
}