const Discord = module.require('discord.js');
const { con, valkProcess, emoji, matchfound, notFound, react } = require('../global/config.js');


exports.run = async (homu, message, args) => {
	message.delete();

	const arr = new Array;
	var num = 0
	for(let i = 0; i < args.length; i++) {
		arr.push({
			name: args[i],
			num: num++
		})
	}
	message.channel.send(arr.map(r => `[${r.num}] "${r.name}"`).join('\n'));
	console.log(arr.map(r => `[${r.num}] "${r.name}"`).join('\n'));
	
};

exports.help = {
	name: 'count'
}