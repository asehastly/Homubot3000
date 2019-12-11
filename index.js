//require('dotenv-flow').config();
const Discord = require('discord.js');
const fs = require('fs');
const Enmap = require('enmap');
const mysql = require('mysql');
const homu = new Discord.Client();
homu.collection = new Discord.Collection();
homu.commands = new Enmap();
homu.jmem = require('./json/member.json')
homu.valks = require('./json/valks.json');
homu.boss = require('./json/boss.json');
const { token } = require('./global/config.js');

/*Discord Bot command array sample,
h!mute @user 12h Posting too many shit memes
[0][1]  [2]  [3]  [4]    [5] [6]   [7]  [8]
h!mute <user> <time> <reason>               */

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