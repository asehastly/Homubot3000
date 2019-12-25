const Discord = module.require('discord.js');
const { con, valkProcess, emoji, matchfound, notFound, react } = require('../global/config.js');


exports.run = async (homu, message, args) => {
    const helpEMB = new Discord.RichEmbed()
    .setColor('#2c2f33')
	.setURL('https://discord.js.org/')
    .setAuthor('King Homu Commands', 'https://i.imgur.com/SuxUzng.png')
    .setTitle('Before using this commands, please read this:')
	.setDescription("In order to use King Homu properly, you have to use the prefix **homu** at the beginning of every commands. this prefix is case sensitive and must be typed in **lowercase** at all times, or else the command will not work.\nremember **homu** not Homu, nor home.")
	.addField('_**Disclaimer:**_', "In-case something went wrong or you mistyped, please contact the fucker who made me, **Don't blame me.**")
	.addField('**whois**', 'This command will display the information of a mentioned member.\n**Reminder**: You have to mention someone in order for this command to work.\n*Syntax*: `homu whois <@someone>`')
	.addField('**register**', "Use this command to register your in-game information so that it will show up to the member's card.\n*Syntax*: `homu register <your in-game name> <your game id>`")
    .addField('**showrank**', "This command will display the current ranking of today's boss invasion.\n*Syntax*: `homu showrank`")
    .addField('**Info**', "This command will display a valkyrie's profile including its available emojis.\ndon't ask me why it's in here. *I think master is a pervert*.\n*Syntax*: `homu info valk/valks/valkyrie <valk's first name, family name, or nickname>`")
    .setFooter('Diamond Club Armada', 'https://i.imgur.com/sID7rBB.png');
    
    message.channel.send(helpEMB);
};

exports.help = {
	name: 'help'
}