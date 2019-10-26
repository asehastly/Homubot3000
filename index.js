require('dotenv-flow').config();
const fs = require('fs');
const Discord = require('discord.js');
const homu = new Discord.Client();
homu.Command = new Discord.Collection;

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
        case 'contribute':
            const chart = new Discord.Attachment('./images/chart.png')
            const disclaim = new Discord.RichEmbed()
            .addField('This channel is being updated daily at 12:00 +8GMT and 23:00 +8GMT',"Note: Our 150 contbution quota is on a weelky basis. So don't force yourself into doing dailies if you ran out of stamina. you can always do it the next day.")
            .setColor(0x2e2e2e)
            .setImage('https://i.imgur.com/gDaxAEl.png')

            //reserve this line for purge command
            message.channel.sendEmbed(disclaim).then(message.channel.send(chart));
        break;
        default:
            message.channel.send('uh.... What?')
    }
});

homu.login(config.token);