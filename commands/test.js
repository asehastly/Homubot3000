const Discord = module.require('discord.js');
const { con, valkProcess, emoji } = require('../global/config.js');


exports.run = (homu, message, args) => {
	
	if(!args[0]) return message.channel.send("Please type the name of the valkyrie you're trying to see.").then(update => { update.delete(7000)});
	var valkqueue, valkfound;

	console.log(`${message.author.tag} as entered "${args.join(" ")}"\nwhich is useless because I'm only accepting "${args[0]}"`);
	const valks = valkProcess(args[0]);
	message.delete();
	console.log(valks);
	if(valks === undefined) {
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
		valkfound = homu.valks[valks.Json];
		//console.log(valkfound.emoji);
		let pfp = valkfound.pfp;
		const embTrue = new Discord.RichEmbed()
		.setColor('	#23272a')
			.setAuthor('Valyrie Information', 'https://i.imgur.com/5ejjwD3.png', valkfound.url)
			.setTitle(valkfound.valkName)
			.setDescription(`**Weapon type**:${valkfound.weap}\n**Age**:${valkfound.Age}\t\t\t\t**Birthday**:${valkfound.DOB}\n**Measurements**:${valkfound.Measurements}\n**Height**: ${valkfound.Height}\t\t\t**Weight**:${valkfound.Weight}`)
			.setThumbnail(pfp[Math.floor(Math.random()*pfp.length)])
			.addField('Battlesuit', `${bSuit(valkfound)}`, true)
			.addField('Outfits', `${cSuit(valkfound)}`, true)
			.addField('Bio', valkfound.vBio)
			.setTimestamp()
			.setFooter('King Homu™ Archives', 'https://i.imgur.com/SuxUzng.png');
		message.channel.sendEmbed(embTrue);
		console.log(`------------------------------------------------\nUser has selected **${valkfound.vCode}**`);
		console.log(`${pfp[Math.floor(Math.random()*pfp.length)]}\n------------------------------------------------`);
		
		function emoji(id) {
			console.log(id)
			return homu.emojis.get(id).toString();
			//return 'NAN'
		 }

		function bSuit() {
			 const bMatch = valkfound.emoji.filter(look => {
				 if(look.otype === "Battlesuit") return true;
			 });
			 //console.log(bMatch);
			 return bMatch.map(suit => `${emoji(suit.ctype)} | ${emoji(suit.id)}${suit.name}`).join('\n')
		}

		function cSuit() {
			const cMatch = valkfound.emoji.filter(look => {
				if(look.otype === "Outfit") return true;
			});
			//console.log(bMatch);
			return cMatch.map(suit => `${emoji(suit.ctype)} | ${emoji(suit.id)}${suit.name}`).join('\n')
	   }
	}
};

exports.help = {
	name: 'test'
}