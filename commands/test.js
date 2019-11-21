const Discord = module.require('discord.js');
const moment = module.require('moment-timezone');
const biTime = module.require('../global/bitimer.js');


exports.run = (homu, message, args) => {
    const input = args;
    var startTime = biTime.startTime().ct;
    var display_f = biTime.calc1();
    var display_s = biTime.calc2();
    var boss = 'bushi';
    var lvl = 55;
    var bsimg = 'https://i.imgur.com/tzxM9XE.png';
    var stat = 1;
    var current = moment();
    console.log(`${startTime}\n${display_f}\n${display_s}\n`)
    
    //message.channel.send(output).then(update => { update.delete(10000) });
    switch(input[0]) {
        case '1':
            message.delete();
            message.channel.send(display_f)
            stat = 2;
        break;
        case '2':
            message.delete();
            message.channel.send(display_s)
            stat = 1;
        break;
        case '3':
            message.delete();
            message.channel.send(`AWS: ${current}   Home: ${startTime}\nTime left before 5:00 PM is ${biTime.display2()}\n${biTime.calc2()} in miliseconds`).then(update => { update.delete(10000) });
        break;
        default:
            message.channel.send('wah???').then(update => { update.delete(10000) });
        break;
    }
};

function bsEmbed(name, level, image, status) {
    console.log(`${name}   ${level}\n${image}\n${status}`)
    const emb = new Discord.RichEmbed()
       .setColor(0xcccc00)
       .setTitle('Next Boss has been set up!')
       .setAuthor('Boss Invasion Alert!', 'https://i.imgur.com/QrJKwNl.png', ' ')
       if(parseInt(status) === 1) {
        emb.setDescription(`**${name}**\nLevel ${level}\nGame Starts in 1 hour`)
       } else {
        emb.setDescription(`**${name}**\nLevel ${level}\nBoss Invasion starts now.`)
       };
       emb.setThumbnail('https://i.imgur.com/JzDnCGJ.png')
       emb.setImage(image)
       emb.setTimestamp()
       emb.setFooter('Diamond Club Armada', 'https://i.imgur.com/FpIimN1.png');
    return emb;
}

exports.help = {
	name: 'test3'
}