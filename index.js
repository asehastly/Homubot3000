const Discord = require('discord.js');
const bot = new Discord.Client();
require('dotenv-flow').config();

const config = {
    token: process.env.TOKEN,
    owener: process.env.OWNER,
    prefix: process.env.PREFIX
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
            msg.channel.sendMessage('pong!')
        break;

        case 'website':
            msg.channel.sendMessage('reddit.com/r/diamondclub')
        break;
        case ('info'):
            if(args[1] === 'version'){
                msg.channel.sendMessage('Version 1.x.x')
            }else{
                msg.channel.sendMessage('WHAT?!')
            }
        break;
        case 'cls':
            if(!args[1]) return msg.reply('How many post do you want to delete?\njust type h!cls <number>')
            
            msg.channel.bulkDelete(args[1]);
            msg.channel.sendMessage('Messages deleted!').then(d_res => {d_res.delete(3000)});

        break;
        case 'intro':
            msg.delete();
            msg.channel.sendMessage('Hi!\nHomubot3000 Here!\nGlad to meet you all...')
        break;
            
    }
})

bot.on('message', contri =>{
    let args = contri.content.substring(PREFIX.length).split(" ");
//Tag for #Contribution
    switch(args[0]){
        case 'con':
            contri.delete();
            const img1 = new Discord.Attachment('./images/chart.png')
            const disclaim = new Discord.RichEmbed()
        
            .addField('This channel is being updated daily at 12:00 +8GMT and 23:00 +8GMT',"Note: Our 150 contribution quota is on a weelky basis. So don't force yourself into doing dailies if you ran out of stamina. you can always do it the next day.")
            .setColor(0x2e2e2e)
            .setImage('https://i.imgur.com/gDaxAEl.png')

            //const chart = new Discord.RichEmbed()
            //.setImage('https://i.imgur.com/kGiFHvm.png')

            contri.channel.sendEmbed(disclaim);
            contri.channel.send(img1)
            
            //contri.channel.sendEmbed(chart);
        break;
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
