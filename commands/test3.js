const Discord = module.require('discord.js');
const moment = module.require('moment-timezone');
const biTime = module.require('../global/bitimer.js');


exports.run = (homu, message, args) => {
    const input = args;
    console.log(input)

    switch(input[0]) {
        case '1':
            let time = biTime.startTime();
            let from = moment().tz('Asia/Manila').format('h:mm a Z');

            message.channel.send(from);
            message.channel.send(time);
        break;
        case '2':
            message.channel.send(biTime.display1());
        break;
        case '3':
            message.channel.send(biTime.display2());
        break;
        default:
            message.channel.send('wah???');
        break;
    }
};

exports.help = {
	name: 'test3'
}