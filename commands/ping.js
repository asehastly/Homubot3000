exports.run = (bot, message, args) => {
	message.channel.send('pong').catch(console.error);
};

exports.help = {
	name: 'ping'
};