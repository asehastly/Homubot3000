const Discord = module.require('discord.js');
const moment = module.require('moment-timezone');
const { con } = require('../config.js');
const biTime = module.require('../global/bitimer.js');


exports.run = (homu, message, args) => {
    const input = args;
    var startTime = biTime.startTime().ct;
    var display_f = biTime.calc1();
    var display_s = biTime.calc2();
    var boss = 'bushi';
    var lvl = 55;
    var bsimg = 'https://i.imgur.com/tzxM9XE.png';
    var stat = 1;
    var current = moment();
    console.log(`${startTime}\n${display_f}\n${display_s}\n`)
    
    //message.channel.send(output).then(update => { update.delete(10000) });
    switch(input[0]) {
        case '1':
            let id = '621517685750235157'
            con.query(`SELECT * FROM boss WHERE id = ${id}`, (err, row) => {
                if(err) throw err;
                if(row.length < 1) return console.log('Table Boss is empty');
                boss = row[0].name;
                lvl = row[0].level;
                bsimg = row[0].image;
                stat = row[0].stat;
                pstat = row[0].pstat;
                console.log(stat);
                if(!stat) {
                    console.log('*WARNING*\nDatbase is empty!');
                } else if(parseInt(pstat) === 1) {
                    console.log('Post already been activated');
                    message.channel.send('**Boss Invasion Alert** is currently on queue.').then(selfDestroy => { selfDestroy.delete(7000) });
                } else if(parseInt(stat) === 1) {
                    //if Boss name exist
                    message.delete();
                    console.log(`Boss ${row[0].name} has been set!`);
                    console.log(`Manual trigger engaged.\nPhase 1 will start in ${biTime.display1()}`);
                    message.channel.send(`**Boss Invasion Alert** is now live.\nSetting up alerts in ${biTime.display1()} and ${biTime.display2()} repectively.`).then(selfDestroy => { selfDestroy.delete(7000) });
                    setTimeout(delay1 => {
                        console.log('Executing Phase 1 now.');
                        con.query(`UPDATE boss SET pstat = '1' WHERE id = '${id}'`, err => {
                            if(err) throw err;
                        });
                        homu.channels.get('634607472560308234').send("<@&621558338005630978> Get ready!!!");
                        homu.channels.get('634607472560308234').sendEmbed(biTime.post(boss, lvl, bsimg, stat));
                        stat = 2;
                    }, biTime.calc1());
                    setTimeout(delay2 => {
                        console.log('Second timer execute');
                        homu.channels.get('634607472560308234').send("<@&621558338005630978> It's Go time!");
                        homu.channels.get('634607472560308234').sendEmbed(biTime.post(boss, lvl, bsimg, stat));
                        console.log('prepairing to delete database entires');
                        /* con.query("DELETE FROM boss", function (err, result) {
                            if (err) throw err;
                            console.log('Databse has been cleared');
                        }); */
                    }, biTime.calc2());
                } else {
                    console.log('No boss was set');
                };
            });
        break;
        case '2':
            message.delete();
            homu.channels.get('621547605138341898').sendEmbed(biTime.post(boss, lvl, bsimg, stat));
            stat = 1;
        break;
        case '3':
            message.delete();
            message.channel.send(`AWS: ${current}   Home: ${startTime}\nTime left before 5:00 PM is ${biTime.display2()}\n${biTime.calc2()} in miliseconds`).then(update => { update.delete(10000) });
        break;
        default:
            message.channel.send('wah???').then(update => { update.delete(10000) });
        break;
    }
};

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

exports.help = {
	name: 'test3'
}