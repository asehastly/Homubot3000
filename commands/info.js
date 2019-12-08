const Discord = module.require('discord.js');
const valks = require('../global/valks.js');
const { con } = require('../config.js');


exports.run = (homu, message, args) => {
    console.log(`------------------------------------------------\nUser has typed |${args}|\n------------------------------------------------`);
    message.delete();
    switch(args[0]) {
        case undefined:
            message.channel.send('Please tell me what to do... I am not a mind reader, you know...').then(update => { update.delete(7000)});
        break;
        case "uptime":
            let totalSeconds = (homu.uptime / 1000);
            let days = Math.floor(totalSeconds / 86400);
            let hours = Math.floor(totalSeconds / 3600);
            totalSeconds %= 3600;
            let minutes = Math.floor(totalSeconds / 60);
            let seconds = totalSeconds % 60;

            message.channel.send(`I am running at\n${days} days\n${hours} hrs.\n${minutes} min.\n${seconds} sec.`).then(update => { update.delete(15000)});
        break;
        default: message.channel.send("I have no idea what you've just said... can you clarify that?").then(update => { update.delete(7000)});
    }
	
};

exports.help = {
	name: 'test'
}