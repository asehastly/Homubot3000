exports.run = (homu, message, args) => {
    const Discord = require('discord.js');

    message.channel.send(message.member.guild.icon)
    message.channel.send(message.member.guild.iconUrl)
    const Welemb = new Discord.RichEmbed({
        color: 0x2c2f33,
	    title: 'Welcome Aboard Captain!',
	    author: {
		    name: `${message.member.user.tag} has joined`,
		    icon_url: message.member.user.displayAvatarURL,
        },
        description: `**Welcome Captain ${message.member.displayName}** We've been waiting for you.
        before we start, kindly visit <#621631411392086036> to familiarize yourself with our rules in our armada. then, head over to <#623773208667095070> and pick the color you like.`,
        thumbnail: {
            url: message.member.guild.iconUrl,
        },
        fields: [
            {
                name: '⠀',
                value: 'Have a great day and #JoinTheConversation at <#621536230055739408>',
            },
        ],
        timestamp: new Date(),
        footer: {
            text: `${message.member.guild}™ Armada MMXIX `,
            icon_url: message.member.guild.iconUrl,
        },
    })
    message.channel.sendEmbed(Welemb);
};

exports.help = {
	name: 'react'
}