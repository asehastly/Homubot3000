const fs = require('fs');
const Discord = require('discord.js');
const bot = new Discord.Client();
bot.commands = new Discord.Collection();
require('dotenv-flow').config();

const config = {
    token: process.env.TOKEN,
    owner: process.env.OWNER,
}

const PREFIX = process.env.PREFIX;

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    bot.commands.set(command.name, command);
}

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

//Codes below

//Reception Welcome and Goodbye Code
bot.on('guildMemberAdd', member =>{
    const channel = member.guild.channels.find(channel => channel.name === "testing-site-1");
    if(!channel) return;

    channel.send(`Welcome to server, ${member} . something something something homu`)
});
//#Rules Code
bot.on('message', rules => {
    let args = rules.content.substring(PREFIX.length).split(' ');

    if(args[0] === 'rules') {
        if(!rules.member.roles.find(r => r.name === "MOD")) return rules.channel.send('This is a Moderator command only').then(d_msg => d_msg.delete(5000));
        rules.delete();
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
bot.login(config.token);