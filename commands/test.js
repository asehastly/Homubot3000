const discord = module.require('discord.js');
const fs = module.require('fs');

exports.run = (homu, message, args) => {
	const server = message.guild.id;
	var userid = message.author.id;
	var name = args[0];
	var id = args[1];

	homu.jmem[server] = {
		user: userid,
		info: {
			ign: name,
			gid: id
		}
	}

	fs.writeFile('./json/member.json', JSON.stringify(homu.jmem, null, 4), err => {
		if(err) throw err;
		message.channel.send(`IGN: **${name}**\nGame ID:${id}\nThanks for registering your details.`);
	})
};

exports.help = {
	name: 'test'
}