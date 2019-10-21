module.exports = {
	name: 'React',
	description: 'Some dumb idea I need to get out of my head',
    execute(react, args) {
        const Discord = require('discord.js');
        const bot = new Discord.Client();
        function emoji(id) {
            return bot.emojis.get(id).toString();
        }
		switch(args[1]){
            case 'laugh':
                switch(args[2]){
                    case 'gallery':
                        bot.channels.
                    break;
                }
            break;
        }
	},
};