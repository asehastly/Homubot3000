const Discord = module.require('discord.js');
const moment = module.require('moment-timezone');
const biTime = module.require('../global/bitimer.js');


exports.run = (homu, message, args) => {
    const input = args;
    var startTime = biTime.startTime().ct;
    var display_f = biTime.calc1();
    var display_s = biTime.calc2();
    console.log(`${startTime}\n${display_f}\n${display_s}\n`)

    //message.channel.send(output).then(update => { update.delete(10000) });
    switch(input[0]) {
        case '1':
            let time = startTime;
            let from = moment().tz('Asia/Manila').format('h:mm a Z');
            message.delete();
            message.channel.send(from).then(update => { update.delete(10000) });
            message.channel.send(time).then(update => { update.delete(10000) });
        break;
        case '2':
            message.delete();
            message.channel.send(`Time left before 5:00 PM is ${biTime.display1()}\n${biTime.calc1()} in miliseconds`).then(update => { update.delete(10000) });
        break;
        case '3':
            message.delete();
            message.channel.send(`Time left before 5:00 PM is ${biTime.display2()}\n${biTime.calc2()} in miliseconds`).then(update => { update.delete(10000) });
        break;
        default:
            message.channel.send('wah???').then(update => { update.delete(10000) });
        break;
    }
};

exports.help = {
	name: 'test3'
}