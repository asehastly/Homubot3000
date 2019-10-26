const fs = require('fs');
const Discord = require('discord.js');
const bot = new Discord.Client();
//bot.commands = new Discord.Collection();
require('dotenv-flow').config();
//trying enmap for handlers
const enmap = require('enmap');
bot.commands = new Discord.enmap


//require('./global/filesys.js')(bot);
/*Old fs code
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

    for (let file of commandFiles) {
        const command = require(`./commands/${file}`);
        bot.commands.set(command.name, command);
    }

const config = {
    token: process.env.TOKEN,
    owner: process.env.OWNER,
}*/
//enmap

const PREFIX = process.env.PREFIX;

//Nerd Cave Example only
bot.on('message', message =>{
    if(message.author.bot) return;
    if(message.content.indexOf(PREFIX) !== 0) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    const cmd = bot.commands.get(command);
    if(!cmd) return;
    cmd.run(bot, message, args);
});

function emoji(id) {
    return bot.emojis.get(id).toString();
}

bot.on('ready', async () => {
    console.log('Homubot3000 online\nReady to go...');

    bot.generateInvite(['ADMINISTRATOR']).then(link => {
        console.log(link);
    }).catch(err => {
        console.log(err.stack)
    });
})
/*
//Codes below

//Reception Welcome and Goodbye Code
bot.on('guildMemberAdd', member =>{
    const channel = member.guild.channels.find(channel => channel.name === "testing-site-1");
    if(!channel) return;

    const defaultChannel = member.guild.channels.find(channel => channel.permissionsFor(guild.me).has("SEND_MESSAGES"));
    defaultChannel.send(`Welcome ${member.user} to this server.`).catch(console.error);
    channel.send(`Welcome to server, ${member} . something something something homu`)
});
//#Rules Code
bot.on('message', rules => {
    let args = rules.content.substring(PREFIX.length).split(' ');

    if(args[0] === 'rules') {
        if(!rules.member.roles.find(r => r.name === "MOD")) return rules.channel.send('This is a Moderator command only').then(d_msg => d_msg.delete(5000));
        rules.channel.bulkDelete(4);
        rules.channel.sendMessage(`Homu Writing the rules at the moment.\n*Please Stand By...*`).then(upWait => {upWait.delete(10000)});
        bot.commands.get('rules').execute(rules,args);
    } else {
        return;
    }
})
//Member's list codes
bot.on('message', memlist => {
    let args = memlist.content.substring(PREFIX.length).split(' ');

    if(args[0] === 'mem') {
        if(!memlist.member.roles.find(r => r.name === "MOD")) return memlist.channel.send('This is a Moderator command only').then(d_msg => d_msg.delete(5000));
        bot.commands.get('Member').execute(memlist,args);
    } else {
        return;
    }
})

//#Contribution Code
bot.on('message', async cont => {
    let args = cont.content.substring(PREFIX.length).split(" ");

    if(args[0] === 'con') {
        bot.commands.get('Contribution').execute(cont,args); 
    } else {
        return;
    }
})
//Boss Invasion

// Chat Reaction
bot.on('message', react => {
    let args = react.content.substring(PREFIX.length).split(' ');

    switch(args[0]){
        case 'react':
            //bot.channels.get('621572547325984769').sendMessage('Hello');
            if(!args[1]) return react.reply(`I'm not so sure how to react? ${emoji('624616931772596254')}`);
            if(!args[2]) return react.reply(`In what room should I react too? ${emoji('624616931772596254')}`);
            bot.commands.get('React').execute(react,args);
            
        break;
    }
    

})

//end of Codes
/*module.exports = {
    bot: bot
};*/
//enmap file system
fs.readdir('./commands/', async (err, files) => {
    if(err) return console.error;
    files.forEach(files => {
        if(!files.endsWith('.js')) return;
        let props = require(`./commands/${file}`);
        let cmdName = file.split('.')[0];
        console.log(`Loaded command '${cmdName}'.`);
        bot.commands.set(cmdName, props);
    });
});

bot.login(config.token);