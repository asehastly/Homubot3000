const discord = module.require('discord.js');
const fs = module.require('fs');

exports.run = (homu, message, args) => {
	
	var name,id;
	//const i = args[1];

	if(args.length === 3) {
		name = `${args[0]} ${args[1]}`;
		id = args[2];
		console.log('statement 1')
	} else {
		name = args[0];
		id = args[1];
		console.log('Else statement')
	}
	const userid = message.author.id;
	const vnum = /^[0-9]+$/;

	if(!name && !id) return message.channel.send('To register, Please enter your in-game name and game id by\ntyping homu register <in-game name> <game id>');

	console.log(`User has input:\n${name} and ${id}\n\n${args}`)
	if(typeof parseInt(id) == 'number' && id.length == 8) {
		homu.jmem[userid] = {
			name: name,
			gid: id
		}
		fs.writeFile('./json/member.json', JSON.stringify(homu.jmem, null, 4), err => {
			if(err) throw err;
			message.channel.send(`IGN: **${name}**\nGame ID:${id}\nThanks for registering your details.`);
		})
	} else {
		message.channel.send('invalid ID number.\nID must contain 8 numbers.');
	}
};

exports.help = {
	name: 'test'
}