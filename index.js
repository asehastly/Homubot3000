require('dotenv-flow').config();
const fs = require('fs');
const Discord = require('discord.js');
const homu = new Discord.Client();

const config = {
    token: process.env.TOKEN,
    owner: process.env.OWNER,
    prefix: process.env.PREFIX
}
const prefix = config.prefix;

homu.on('ready', () => {
    console.log(`${homu.user.tag} logging in...`);
    setTimeout(homuRun => {
        console.log('HomuBot3000 logged and ready to go!');
    },7000)
    setTimeout(homuRun => {
        console.log(' ');
    },8000)
})
/*Discord Bot command array sample,
h!mute @user 12h Posting too many shit memes
[0][1]  [2]  [3]  [4]    [5] [6]   [7]  [8]
h!mute <user> <time> <reason>               */
homu.on('message', message => {
    if(message.author.bot) return;
    if(message.content.indexOf(prefix)!== 0) return;
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    switch(command) {
        case 'ping':
            message.channel.send('pong');
        break;
        case 'myname':
            const name = message.member.displayName;
            message.delete();
            message.channel.send(`Your name is ${name}`);
        break;
        case 'say':
            const respond = args.join(' ')
            message.delete();
            message.channel.send(`you said, "${respond}"\nI say, No! Fuck you!`)
        break;
        default:
            message.channel.send('uh.... What?')
    }
});

homu.login(config.token);