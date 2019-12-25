const Discord = module.require('discord.js');
const { con, valkProcess, emojiDB, react, icon } = require('../global/config.js');
const { foundEMB, nFoundEMB, errEMB, dupEMB } = require('../global/configEMB.js');


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
				console.log(id)
				startValk(id);
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
		startValk(args);
	}
	async function startValk(x) {
		args = x;
		if(args[0].toLowerCase() === 'apocalypse' && args[1].toLowerCase() === 'otto') return message.channel.send(await nFoundEMB(args)).then(del => del.delete(10000));
		const valks = valkProcess(x[0]);
		
		if(valks.length < 1) {
			message.channel.send(await nFoundEMB(args)).then(del => del.delete(10000));
		} else if(valks.length > 1) {
			//Multiple Matches
			if(x.length > 1) {
				const valks2 = valkProcess(x[1]).pop();
				let num = 1;
				message.channel.send(await foundEMB(valks2.Json)).catch(err => console.log(err));
			} else {
				//awaitReaction
				id = new Array;

				for(let i = 0; i < valks.length; i++) {
					emoDup = await emojiDB(valks[i].vCode[0], 6);
					//console.log(emoDup)
					id.push({
						name: homu.valks[valks[i].Json].valkName,
						id: emoDup[0].id,
						emoName: emoDup[0].vEmoji,
						emoTag: emoDup[0].emoTag
					})
				}

				const filter = (reaction, user) => [id[0].emoName, id[1].emoName].includes(reaction.emoji.name) && user.id === message.author.id;

				message.channel.send(dupEMB(id)).then(async msg => {
					await msg.react(id[0].id)
					await msg.react(id[1].id)

					msg.awaitReactions(filter, {
						max: 1,
						time: 30000,
						error: ['Time']
					}).then(async collected => {
						const reaction = collected.first();

						switch(reaction.emoji.name) {
							case id[0].emoName:
								message.channel.bulkDelete(1);
								message.channel.send(await foundEMB(valks[0].Json));
							break;
							case id[1].emoName:
								message.channel.bulkDelete(1);
								message.channel.send(await foundEMB(valks[1].Json));
							break;
						}
					}).catch(collected => {
						message.channel.bulkDelete(1);
						errMessage = {
							color: '#910007',
							Auth: "You've not reacted",
							AuthIcon: icon.homu,
							title: "You have failed to react to a valkyrie, I guess you're not interested...",
							foot: " Time's up...",
							footIcon: icon.timer
						}
						return message.channel.send(errEMB(errMessage)).then(del => del.delete(10000));
					})
				});
			}
		} else {
			let vPop = valks.pop();
			message.channel.send(await foundEMB(vPop.Json));
		}
		//console.log(valkJson)
		//return `you have typed ${valks.length}`;
	}
};

exports.help = {
	name: 'test'
}