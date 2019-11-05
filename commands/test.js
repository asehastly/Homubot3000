exports.run = (homu, message, args) => {
    const Discord = require('discord.js');
    const moment = require('moment-timezone');

    let user =  message.mentions.users.first();
    let gmem = message.mentions.members.first();
    let DateJoin = moment(gmem.joinedAt).format('ddd DD MMM, YYYY | h:mm A');
    let DateCreate = moment(user.createdAt).format('ddd DD MMM, YYYY | h:mm A');
    let avt = user.displayAvatarURL
    
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
            .addField('Game ID:', "XXXXXXXX", true)
            .addField('In-Game Name:', "anonymous", true)
            //.addField('[Insert detail name here]:', "[insert detail here]", true)
            //.addField('If you recieved your 2st Strike', "Your strike will only be lifted if you complete at least **300 Contribution** or more by the following week.")
            //.addField('If you recieved your 3st Strike', "This will be your last chance to complete **450 Contribution** or more the following week")
            //.addField('If you failed to complete your 3rd strike', "Will result in the termination of your membership to our armada.")
            .setFooter('Diamond Club Armada', 'https://i.imgur.com/FpIimN1.png');
        
        //message.delete();
        message.channel.send(memEMB);

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