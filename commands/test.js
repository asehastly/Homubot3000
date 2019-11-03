exports.run = (homu, message, args) => {
    const Discord = require('discord.js');
    const moment = require('moment-timezone');
    var date = moment(message.author.createdAt).format('ddd DDD MMM, YYYY h:mm A');
    var zone =  moment.tz.guess();
    //var abb = moment.tz(zone_name).zoneAbbr()

    const Welemb = new Discord.RichEmbed({
        color: 0x2c2f33,
	    title: 'Welcome Aboard Captain!',
	    author: {
		    name: `${homu.user.tag} has joined`,
		    icon_url: homu.user.displayAvatarURL,
        },
        description: `**Welcome Captain ${message.displayName}** We've been waiting for you.
        before we start, kindly visit <#621631411392086036> to familiarize yourself with our rules in our armada. then, head over to <#623773208667095070> and pick the color you like.`,
        thumbnail: {
            url: 'https://i.imgur.com/JzDnCGJ.png',
        },
        fields: [
            {
                name: '⠀',
                value: 'Have a great day and #JoinTheConversation at <#621536230055739408>',
            },
        ],
        //timestamp: new Date(),
        footer: {
            text: `${message.guild}™ Armada\n${date} ${zone}`,
            icon_url: message.guild.iconUrl,
        },
    })
    message.channel.send(Welemb);
};

exports.help = {
	name: 'test'
}