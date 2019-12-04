const Discord = module.require('discord.js');
const moment = module.require('moment-timezone');
const { con } = require('../config.js');
const biconfig = require('../global/bitimer.js');

module.exports = homu => {
    console.log(`${homu.user.tag} logging in...`);
    setTimeout(homuRun => {console.log(`${homu.user.tag} logged and ready to go!\n`);},7000);
    console.log(homu.guilds.get('id'));
    var hour = moment().tz('Asia/Manila').format('HH');
    var boss, lvl, bsimg, stat, pstat;
    homu.setInterval(() => {
        if (hour >= 0 && hour <= 17) {
            let id = '621517685750235157'
            con.query(`SELECT * FROM boss WHERE id = ${id}`, (err, row) => {
                if(err) throw err;
                if(row.length < 1) return console.log('Table Boss is empty');
                boss = row[0].name;
                lvl = row[0].level;
                bsimg = row[0].image;
                stat = row[0].stat;
                console.log(stat);
                if(!stat) {
                    console.log('*WARNING*\nDatbase is empty!');
                }else if(parseInt(pstat) === 1) {
                    console.log('Post already been activated');
                }else if(parseInt(stat) === 1) {
                    //if Boss name exist
                    console.log(`Boss ${row[0].name} has been set!`);
                    setTimeout(delay1 => {
                        console.log('First timer execute');
                        con.query(`UPDATE boss SET pstat = '1' WHERE id = '${id}'`, err => {
                            if(err) throw err;
                        });
                        homu.channels.get('621547605138341898').send("<@&621558338005630978> Get ready!!!");
                        homu.channels.get('621547605138341898').sendEmbed(bsEmbed(boss, lvl, bsimg, stat));
                        stat = 2;
                    }, biconfig.calc1());
                    setTimeout(delay2 => {
                        console.log('Second timer execute');
                        homu.channels.get('621547605138341898').send("<@&621558338005630978> It's Go time!");
                        homu.channels.get('621547605138341898').sendEmbed(bsEmbed(boss, lvl, bsimg, stat));
                        /* console.log('prepairing to delete database entires');
                        con.query("DELETE FROM boss", function (err, result) {
                            if (err) throw err;
                            console.log('Databse has been cleared');
                        }); */
                    }, biconfig.calc2());
                } else {
                    console.log('No boss was set');
                };
            });
        } else {
            console.log('Boss Invasion is still on-going');
        };
    }, 43200000);
}

function bsEmbed(name, level, image, status) {
    console.log(`${name}   ${level}\n${image}\n${status}`)
    const emb = new Discord.RichEmbed()
       .setColor(0xcccc00)
       .setTitle('Next Boss has been set up!')
       .setAuthor('Boss Invasion Alert!', 'https://i.imgur.com/QrJKwNl.png', ' ')
       if(parseInt(status) === 1) {
        emb.setDescription(`**${name}**\nLevel ${level}\nGame Starts in 1 hour`)
       } else {
        emb.setDescription(`**${name}**\nLevel ${level}\nBoss Invasion starts now.`)
       };
       emb.setThumbnail('https://i.imgur.com/JzDnCGJ.png')
       emb.setImage(image)
       emb.setTimestamp()
       emb.setFooter('Diamond Club Armada', 'https://i.imgur.com/FpIimN1.png');
    return emb;
}