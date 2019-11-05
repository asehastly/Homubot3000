exports.run = (homu, message, args) => {
    const Discord = require('discord.js');

    let mention = message.guild.members.get(args[0]);
    message.delete();
    /* const policy = new Discord.RichEmbed()
            .setColor(0x2c2f33)
            .setTitle('If you recieved a warning or a strike, what can you do?')
            .setAuthor('Rules|Our Warning and Strike Procedure', 'https://i.imgur.com/QrJKwNl.png', ' ')
            .setDescription(`Here are some of the things you can do for your warning or strikes to be lifted.`)
            .addBlankField()
            .addField('If you recieved a warning', `Simply DM, mention, or whisper me on discord or on the game as to why you can't or wasn't able to do it. thusly we can lift your warning as soon as possible.`)
            .addField('If you recieved your 1st Strike', "Giving any reason at this point won't do. but we can still lift you strike if you can complete **150 Contribution** or more the following week.")
            .addField('If you recieved your 2st Strike', "Your strike will only be lifted if you complete at least **300 Contribution** or more by the following week.")
            .addField('If you recieved your 3st Strike', "This will be your last chance to complete **450 Contribution** or more the following week")
            .addField('If you failed to complete your 3rd strike', "Will result in the termination of your membership to our armada.")
            .setFooter('Diamond Club Armada', 'https://i.imgur.com/FpIimN1.png'); */
    message.channel.send(mention);
};

exports.help = {
	name: 'policy'
}