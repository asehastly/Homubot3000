const Discord = module.require('discord.js');
const mysql = module.require('mysql');
const biTime = module.require('../global/database.js');


exports.run = (homu, message, args) => {
    const input = args;
    console.log(input)

    switch(input[0]) {
        case '1':
            message.channel.send(biTime.startTime());
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