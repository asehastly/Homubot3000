const fs = module.require('fs');

exports.run = (homu, message, args) => {
    const Discord = require('discord.js');
    const moment = require('moment-timezone');
    
    if(!args[0]) return message.channel.send('Please mention someone');

    let user =  message.mentions.users.first();
    let gmem = message.mentions.members.first();
    let DateJoin = moment(gmem.joinedAt).format('ddd DD MMM, YYYY | h:mm A');
    let DateCreate = moment(user.createdAt).format('ddd DD MMM, YYYY | h:mm A');
    let avt = user.displayAvatarURL
    //const role = gmem.roles.find("name", "admiral");
    
    console.log(user.id);
    const memEMB = new Discord.RichEmbed()
            .setColor(0x2c2f33)
            .setAuthor(`${message.guild.name} Membership Card`, 'https://i.imgur.com/1K2pdQH.png', ' ')
            .setThumbnail(avt)
            //.addBlankField()
            .addField(`${gmem.displayName}`, `${user.username}#${user.discriminator}`, true)
            .addField(`Status:`, `${user.presence.status}`, true)
            .addField('Joined Discord:', `${DateCreate}`, true)
            .addField(`Joined ${message.guild.name}:`, `${DateJoin}`, true)
            .addField('Roles:',gmem.roles.map(r => `${r}`).join(' | '))
            //.addField('Age:', "35", true)
            //.addField('Country of Origin:', "4chan", true)
            //.addField('Nationality:', "anonymous", true)
            .addField('In-game name:', "アーセハスリー<>", true)
            .addField('Game ID:', "13688079", true)
            //.addField('[Insert detail name here]:', "[insert detail here]", true)
            .setFooter('DiamondClub Armada | 1034165 SEA', 'https://i.imgur.com/FpIimN1.png');
        
        //message.delete();
        message.channel.sendEmbed(memEMB);
    
    if(message.member.roles.find("name", "Vice Admirals") || message.member.roles.find("name", "Admiral")){
        message.channel.send("Yo' Admin");// Rest of your code
    }else{
        message.channel.send(' was expecting an admin would use this...');// not vip
    }

    function getUserFromMention(mention) {
        if (!mention) return;
        
        if (mention.startsWith('<@') && mention.endsWith('>')) {
            mention = mention.slice(2, -1);
        
            if (mention.startsWith('!')) {
                mention = mention.slice(1);
            }
        
            return homu.users.get(mention);
        }
    }
};

exports.help = {
	name: 'policy'
}