const discord = module.require('discord.js');
const fs = module.require('fs');
//const SQLite = module.require("better-sqlite3");

exports.run = (homu, message, args) => {
	if (message.author.bot) return;
	let mChan = message.mentions.channels.first().id;

	message.channel.send(mChan);
};

exports.help = {
	name: 'test'
}