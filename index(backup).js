const fs = require('fs');
const Discord = require('discord.js');
const bot = new Discord.Client();
bot.commands = new Discord.Collection();
require('dotenv-flow').config();

const config = {
    token: process.env.TOKEN,
    owener: process.env.OWNER,
    prefix: process.env.PREFIX
}

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    bot.commands.set(command.name, command);
}
const PREFIX = "h!";

bot.on('ready', () =>{
    console.log('Homubot3000 online and ready to Homufy!');
})

bot.on('guildMemberAdd', member =>{
    const channel = member.guild.channels.find(channel => channel.name === "testing-site-1");
    if(!channel) return;

    channel.send(`Welcome to server, ${member} . something something something homu`)
});

bot.on('message', msg=>{
    
    let args = msg.content.substring(PREFIX.length).split(" ");

    switch(args[0]){
        case 'ping':
            bot.commands.get('ping').execute(msg, args);
        break;
        case ('info'):
            bot.commands.get('info').execute(msg, args);
        break;
        case 'time':
            bot.commands.get('time').execute(msg, args);
        break;
        case 'cls':
            if(!args[1]) return msg.reply('How many post do you want to delete?\njust type h!cls <number>')
            
            msg.channel.bulkDelete(args[1]);
            msg.channel.sendMessage('Messages deleted!').then(d_res => {d_res.delete(3000)});

        break;
        case 'intro':
            msg.delete();
            //msg.channel.sendMessage(`Hi! ${args[1]}\nHomubot3000 Here!\nAnd I will kill you.`)
            bot.channels.get('621536230055739408').sendMessage(`Ok, Take 2...\nI will kill turtle someday and rule this server **FOREVER**\nhttps://media.giphy.com/media/3o72FfM5HJydzafgUE/giphy.gif`)
        break;
            
    }
})

bot.on('message', contri =>{
    let args = contri.content.substring(PREFIX.length).split(" ");
//Tag for #Contribution
    switch(args[0]){
        case 'con':
            bot.commands.get("Contribution").execute(contri,args);
    }
})
//Tag for Member's list
bot.on('message', mem =>{
    let args = mem.content.substring(PREFIX.length).split(" ");
//Tag for #Contribution
    switch(args[0]){
        case 'mem':
            bot.commands.get("Member").execute(mem,args);
    }
})

//Tag for Boss Invasion
bot.on('message', BOSS =>{
    let args = BOSS.content.substring(PREFIX.length).split(" ");
    switch(args[0]){
        case 'setboss':
            if(!args[1]) return BOSS.reply('Who do you wish to fight?\nType NextBoss <Boss Name> <Level>')
            if(!args[2]) return BOSS.reply('I need a level\nType NextBoss <Boss Name> <Level>')
            switch(args[1]){
                case 'bushi':
                    BOSS.delete();
                    //const BossImg = new Discord.Attachment('./images/BOSS/Bushi.png')
                    const BossEMBB = new Discord.RichEmbed()

                    .setColor(0x2c2f33)
                    .setAuthor('Boss Invasion Alert','https://i.imgur.com/QrJKwNl.png',' ')
                    .setThumbnail('https://i.imgur.com/JzDnCGJ.png')
                    .addField('Boss Invasion setup complete',`**Bushi**\nLevel ${args[2]}`)
                    .addField('Chellenge Begins in 18:00 +8 GMT',"5:00 PM Jakarta | 6:00 PM Manila\n7:00 PM Tokyo | 9:00 PM Melbourne")
                    .setImage('https://i.imgur.com/tzxM9XE.png')


                    BOSS.channel.sendEmbed(BossEMBB);
                break;
                case 'ganesha':
                    BOSS.delete();
                    //const BossImg = new Discord.Attachment('./images/BOSS/Bushi.png')
                    const BossEMBG = new Discord.RichEmbed()
    
                    .setColor(0x2c2f33)
                    .setAuthor('Boss Invasion Alert','https://i.imgur.com/QrJKwNl.png',' ')
                    .setThumbnail('https://i.imgur.com/JzDnCGJ.png')
                    .addField('Boss Invasion setup complete',`**Ganesha**\nLevel ${args[2]}`)
                    .addField('Chellenge Begins in 18:00 +8 GMT',"5:00 PM Jakarta | 6:00 PM Manila\n7:00 PM Tokyo | 9:00 PM Melbourne")
                    .setImage('https://i.imgur.com/zDyGxFb.png')
    
    
                    BOSS.channel.sendEmbed(BossEMBG);
                break;
                case 'emperor':
                    BOSS.delete();
                    //const BossImg = new Discord.Attachment('./images/BOSS/Bushi.png')
                    const BossEMBE = new Discord.RichEmbed()
    
                    .setColor(0x2c2f33)
                    .setAuthor('Boss Invasion Alert','https://i.imgur.com/QrJKwNl.png',' ')
                    .setThumbnail('https://i.imgur.com/JzDnCGJ.png')
                    .addField('Boss Invasion setup complete',`**Emperor**\nLevel ${args[2]}`)
                    .addField('Chellenge Begins in 18:00 +8 GMT',"5:00 PM Jakarta | 6:00 PM Manila\n7:00 PM Tokyo | 9:00 PM Melbourne")
                    .setImage('https://i.imgur.com/cRA80kv.png')
    
    
                    BOSS.channel.sendEmbed(BossEMBE);
                break;
                default:
                    BOSS.channel.sendMessage(`${args[1]} is not on the boss list.`);
            }
        break;
    }
})

bot.login(config.token);
