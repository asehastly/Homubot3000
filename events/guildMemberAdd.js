module.exports = (homu, member) => {
    const moment = require('moment');
    let welcome = member.guild.channels.find(c => c.name === 'reception');
    //let memDate = moment(moment(member.joinedAt).format("lll"));
    var rule = '';
    const Discord = require('discord.js')
    const Welemb = new Discord.RichEmbed({
        color: 0x2c2f33,
	    title: 'Welcome Aboard Captain!',
	    author: {
		    name: `${member.user.tag} has joined`,
		    icon_url: member.user.displayAvatarURL,
        },
        description: `**Welcome Captain ${member.displayName}** We've been waiting for you.
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
        timestamp: new Date(),
        footer: {
            text: `${member.guild}™ Armada MMXIX `,
            icon_url: member.guild.iconUrl,
        },
    })

    welcome.sendEmbed(Welemb);

}
