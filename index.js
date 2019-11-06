//require('dotenv-flow').config();
const Discord = require('discord.js');
const fs = require('fs');
const Enmap = require('enmap');
const homu = new Discord.Client();
homu.collection = new Discord.Collection();
homu.commands = new Enmap();
homu.jmem = require('./json/member.json')
homu.jstud = require('./json/student.json');
homu.boss = require('./json/boss.json')
const { token } = require('./config.js');

/* const config = {
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

/* homu.on('message', message => {
    if(message.author.bot) return;
    if(message.content.indexOf(prefix)!== 0) return;
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    const cmd = homu.commands.get(command);
    if(!cmd) return;

    cmd.run(homu, message, args);

}); */

fs.readdir('./events/', (err, files) => {
    if(err) return console.error;
    files.forEach(file => {
        if(!file.endsWith('.js')) return;
        const evt = require(`./events/${file}`);
        let evtName = file.split('.')[0];
        console.log(`${evtName} has been loaded...`);
        homu.on(evtName, evt.bind(null, homu));
    })
})

fs.readdir('./commands/', async (err, files) => {
    if(err) return console.error;
    files.forEach(file => {
        if(!file.endsWith('.js')) return;
        let props = require(`./commands/${file}`);
        let cmdName = file.split('.')[0];
        console.log(`${cmdName} has been loaded...`);
        homu.commands.set(cmdName, props);
    });

});

homu.login(token);