exports.run = (homu, message, args) => {
    const Discord = require('discord.js');
    
    const stbs = args;
    var boss
    var lvl

    if(stbs[0] === 'yae' && stbs[1] === 'sakura') {
        boss = 'Yae Sakura'
        lvl = stbs[2];
    } else {
        boss = stbs[0].charAt(0).toUpperCase() + stbs[0].substring(1);
        lvl = stbs[1];
    }

    message.channel.send(`Sample:\nBoss Invasion is set!\n**${boss}**\nat level ${lvl}`);
    
};

exports.help = {
	name: 'setboss'
}