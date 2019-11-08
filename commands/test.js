const discord = module.require('discord.js');
const fs = module.require('fs');

exports.run = (homu, message, args) => {
	const server = message.guild.id;

	message.channel.send(server);
};

exports.help = {
	name: 'test'
}