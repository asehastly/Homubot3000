const discord = module.require('discord.js');
const fs = module.require('fs');

exports.run = (homu, message, args) => {
	const name = args[0];
	const id = args[1];
	const user = message.author.id;
	const vnum = /^[0-9]+$/;

	if(!name && !id) return message.channel.send('To register, Please enter your in-game name and game id by\ntyping homu register <in-game name> <game id>');

	console.log(`User has input:\n${name} and ${id}\n${id.length}`)
	if(typeof parseInt(id) == 'number' && id.length == 8) {
		message.channel.send(`${id} is a number`);
	} else {
		message.channel.send('you must enter your game ID properly');
	}
	/* homu.jmem[user] = {
		name: input[0],
		level: input[1]
	}
	fs.writeFile('./json/member.json', JSON.stringify(homu.jmem, null, 4), err => {
		if(err) throw err;
		message.channel.send('Thank you for registering your info.')

	}) */


};

exports.help = {
	name: 'test'
}