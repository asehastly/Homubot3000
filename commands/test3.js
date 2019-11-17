const Discord = module.require('discord.js');
const moment = module.require('moment-timezone');
const biTime = module.require('../global/bitimer.js');


exports.run = (homu, message, args) => {
    const input = args;
    var output= biTime;
    console.log(`User input ${input}\nValues of biTime Function ${output}`)

    /* switch(input[0]) {
        case '1':
            let time = startDate;
            let from = moment().tz('Asia/Manila').format('h:mm a Z');

            message.channel.send(from);
            message.channel.send(time);
        break;
        case '2':
            message.channel.send(display_f);
        break;
        case '3':
            message.channel.send(display_s);
        break;
        default:
            message.channel.send('wah???');
        break;
    } */
};

exports.help = {
	name: 'test3'
}