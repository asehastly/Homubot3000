const Discord = module.require('discord.js');
const moment = module.require('moment-timezone');
const { con } = require('../config.js');
const biTime = module.require('../global/bitimer.js');


exports.run = (homu, message, args) => {
    message.delete();
    const emb = new Discord.RichEmbed()
       .setColor(0xcccc00)
       .setTitle('Before using this commands, please read this:')
       .setAuthor('King Homu Commands', 'https://i.imgur.com/SuxUzng.png', ' ')
       .setDescription(`In order to use King Homu properly, you have to use the prefix **homu** at the beggining of every commands. this prefix is case sensitive and must be typed in **lowercase** at all times, or else the command will not work.\n__Remember__ **homu** not Homu, nor home.`)
       .addField('__**Disclaimer**__:', `In-case something went wrong or you mistyped, please contact the fucker who made me, **Don't blame me**.`)
       .addField('**whois**', "This command will display the information of a mentioned member.\n**Reminder**: You have to mention someone in order for this command to work.\n*Syntax:* `homu whois <@someone>`")
       .addField('**register**', "Use this command to register your in-game information so that it will show up to the member's card.\n*Syntax:* `homu register <your in-game name> <your game id>`")
       .addField('**showrank**', "This command will display the current ranking of today's boss invasion.\n*Syntax:* `homu showrank`")
       .setTimestamp()
       .setFooter('Diamond Club Armada', 'https://i.imgur.com/FpIimN1.png');

       message.channel.sendEmbed(emb);

}
exports.help = {
	name: 'test'
}