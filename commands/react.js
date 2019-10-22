module.exports = {
	name: 'React',
	description: 'Some dumb idea I need to get out of my head',
    execute(react, args) {
        const Discord = require('discord.js');
        const bot = new Discord.Client();

        function emoji(id) {
            //return bot.emojis.get(id).toString();
            return react.client.emojis.get(id).toString();
        }
		switch(args[1]){
            case 'laugh':
                switch(args[2]){
                    case 'gallery':
                        //bot.channels.get('621572547325984769').sendMessage(`${emoji('624579235138240512')}`);
                        react.client.channels.get('621572547325984769').sendMessage(`Funny ${emoji('624579235138240512')}\n**Being Sarcastic*`);
                    break;
                    case 'main':
                        //bot.channels.get('621572547325984769').sendMessage(`${emoji('624579235138240512')}`);
                        react.client.channels.get('621536230055739408').sendMessage(`Funny ${emoji('624579235138240512')}\n**Being Sarcastic*`);
                    break;
                }
            break;
        }
	},
};