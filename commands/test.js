const Discord = module.require('discord.js');
const { con, valkProcess, emoji, matchfound, notFound, react } = require('../global/config.js');


exports.run = (homu, message, args) => {
	
	if(!args[0]) return message.channel.send("Please type the name of the valkyrie you're trying to see.").then(update => { update.delete(7000)});
	var valkqueue, valkfound;

	console.log(`${message.author.tag} as entered "${args.join(" ")}"\nwhich is useless because I'm only accepting "${args[0]}"`);
	const valks = valkProcess(args[0]);
	message.delete();
	console.log(valks);
	if(valks < 1) {
		message.channel.send(notFound(args)).then(update => { update.delete(10000)});
	} else if(valks.length > 1) {
		var num = 0;
		if(args.length > 1) {
			console.log(`Length of args: ${args.length}`);
			const valks2 = valkProcess(args[1]);
			console.log(valks2);
			if(valks2 < 1) return message.channel.send(notFound(args)).then(update => { update.delete(10000)});
			console.log(valks2[0].Json);
			message.channel.send(matchfound(valks2[0].Json)).catch(err => console.log(err));
		} else {
			const a = react(valks[0].Json);
			const b = react(valks[1].Json);
			var react1, react2;
			
			const filter = (reaction, user) => [a, b].includes(reaction.emoji.id) && user.id === message.author.id;

			const embDupl = new Discord.RichEmbed()
			.setColor('	#23272a')
				.setAuthor('Valyrie Information', 'https://i.imgur.com/5ejjwD3.png')
				.setTitle(`Which ${args[0]} are you looking for?`)
				for(let i = 0; i < valks.length; i++) {
					console.log(valks[i].Json);
					num = num + 1;
					valkfound = homu.valks[valks[i].Json];
					embDupl.addField(emoji(valkfound.emoji[0].id), valkfound.valkName)
				}
				embDupl.setTimestamp()
				embDupl.setFooter('King Homu™ Archives', 'https://i.imgur.com/SuxUzng.png');
			message.channel.send(embDupl).then(async msg => {
				/* msg.react(a).then(reaction => console.log(reaction.emoji.id))
				msg.react(b).then(reaction => console.log(reaction.emoji.id))
				console.log(`${react1}\n${react2}`) */
				await msg.react(`${a}`).then(reaction => console.log(reaction.emoji.id));
				await msg.react(`${b}`).then(reaction => console.log(reaction.emoji.id));

				msg.awaitReactions(filter, {
					max: 1,
					time: 30000,
					error: ['Time']
				}).then(collected => {
					const reaction = collected.first();

					switch(reaction.emoji.id) {
						case a:
							message.channel.send(matchfound(valks[0].Json)).catch(err => console.log(err));
						break;
						case b:
							message.channel.send(matchfound(valks[1].Json)).catch(err => console.log(err));
						break;
					}
				})
			})
			//message.react(`${a}`);
			//message.react(`${b}`);
			//console.log(`${a}`);
		}
	} else {
		//console.log(valks);
		message.channel.send(matchfound(valks[0].Json)).catch(err => console.log(err));
		console.log(`------------------------------------------------\nUser has selected **something**\n------------------------------------------------`);
	}
	
};

exports.help = {
	name: 'test'
}