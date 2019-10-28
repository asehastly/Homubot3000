exports.run = (homu, message, args) => {
    const Discord = require('discord.js');

    var hour = new Date().getHours();

    // between 6 PM and 11 pm respectively
    if (hour >= 0 && hour <= 17) {
        const stbs = args;
        var boss, lvl, bsimg, condition;
        switch (stbs[0]) {
            case 'padrino':
                bsimg = 'https://i.imgur.com/np0XeKg.png'
                break;
            case 'emperor':
                bsimg = 'https://i.imgur.com/cRA80kv.png'
                break;
            case 'ganesha':
                bsimg = 'https://i.imgur.com/zDyGxFb.png'
                break;
            case 'yae':
                bsimg = 'https://i.imgur.com/wvSfTkr.png'
                break;
            case 'bushi':
                bsimg = 'https://i.imgur.com/tzxM9XE.png'
                break;
        }

        if (stbs[0] === 'yae' && stbs[1] === 'sakura') {
            boss = 'Yae Sakura';
            lvl = stbs[2];
            condition = '1';
            console.log(`${boss}\nCondition 1 selected`);
        } else if (stbs[0] === 'bushi' || stbs[0] === 'padrino' || stbs[0] === 'ganesha' || stbs[0] === 'emperor') {
            boss = stbs[0].charAt(0).toUpperCase() + stbs[0].substring(1);
            lvl = stbs[1];
            condition = '1'
            console.log(`${boss}\nCondition 2 selected`);
        } else {
            condition = '0'
            console.log(`${boss}\nCondition 4 selected`);
        }

        const bossEmb = new Discord.RichEmbed()
            .setColor(0x2c2f33)
            .setTitle('Next Boss has been set up!')
            .setAuthor('Boss Invasion Alert!', 'https://i.imgur.com/QrJKwNl.png', ' ')
            .setDescription(`**${boss}**\nLevel ${lvl}`)
            .setThumbnail('https://i.imgur.com/JzDnCGJ.png')
            .addField('this is just a sample', `something something something something\nsetup by: ${message.member.displayName}`)
            .addBlankField()
            .setImage(bsimg)
            .setTimestamp()
            .setFooter('Diamond Club Armada', 'https://i.imgur.com/FpIimN1.png');
        switch (condition) {
            case '1':
                message.channel.sendEmbed(bossEmb);
                return;
            case "0":
                message.channel.send('Boss record not found. please try again...');
                return;
        }

    } else {
        message.channel.send('Boss Invasion is still on going.\nYou can not set the boss yet.');
    }
};

exports.help = {
    name: 'setboss'
}