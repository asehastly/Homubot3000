
const mysql = module.require('mysql');
const moment = module.require('moment-timezone');
const { con } = require('../global/config.js');
const biconfig = require('../global/bitimer.js');

exports.run = (homu, message, args) => {
    const Discord = require('discord.js');
    const moment = require('moment-timezone');
    const server = message.guild.id;

    var hour = moment().tz('Asia/Manila').format('HH');
    var boss, lvl, bsimg, stat, pstat;

    // between 6 PM and 11 pm respectively
    switch(args[0]) {
        case 'on':
            //manual trigger for boss alert
            if (hour >= 0 && hour <= 17) {
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
                    }else if(parseInt(pstat) === 1){
                        console.log('Post already been activated');
						message.channel.send('**Boss Invasion Alert** is currently on queue.').then(selfDestroy => { selfDestroy.delete(7000) });
                    }else if(parseInt(stat) === 1) {
                        //if Boss name exist
						message.delete();
                        console.log(`Boss ${row[0].name} has been set!`);
						console.log(`Manual trigger engaged.\nPhase 1 will start in ${biconfig.display1()}`);
						message.channel.send(`**Boss Invasion Alert** is now live.\nSetting up alerts in ${biconfig.display1()} and ${biconfig.display2()} repectively.`).then(selfDestroy => { selfDestroy.delete(7000) });
                        setTimeout(delay1 => {
                            console.log('Executing Phase 1 now.');
                            con.query(`UPDATE boss SET pstat = '1' WHERE id = '${id}'`, err => {
                                if(err) throw err;
                            });
                            homu.channels.get('621547605138341898').send("<@&621558338005630978> Get ready!!!");
                            homu.channels.get('621547605138341898').sendEmbed(biconfig.post(boss, lvl, bsimg, stat));
                            stat = 2;
                        }, biconfig.calc1());
                        setTimeout(delay2 => {
                            console.log('Second timer execute');
                            homu.channels.get('621547605138341898').send("<@&621558338005630978> It's Go time!");
                            homu.channels.get('621547605138341898').sendEmbed(biconfig.post(boss, lvl, bsimg, stat));
                            console.log('prepairing to delete database entires');
                            /* con.query("DELETE FROM boss", function (err, result) {
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
        break;
        default:
            //Code for setting up boss invasion
            if (hour >= 0 && hour <= 17) {

                if (message.member.roles.find("name", "Vice Admirals") || message.member.roles.find("name", "Admiral")) {
                    const stbs = args;
                    var name, lvl, bsimg, condition;
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
                        name = 'Yae Sakura';
                        lvl = stbs[2];
                        condition = '1';
                        console.log(`${name}\nCondition 1 selected`);
                    } else if (stbs[0] === 'bushi' || stbs[0] === 'padrino' || stbs[0] === 'ganesha' || stbs[0] === 'emperor') {
                        name = stbs[0].charAt(0).toUpperCase() + stbs[0].substring(1);
                        lvl = stbs[1];
                        condition = '1'
                        console.log(`${name}\nCondition 2 selected`);
                    } else {
                        condition = '0'
                        console.log(`${name}\nCondition 4 selected`);
                    }
        
                    con.query("DELETE FROM birank", function (err, result) {
                        if (err) throw err;
                        console.log('Database birank has been cleared');
                    });
        
                    con.query(`SELECT * FROM boss WHERE id = '${server}'`, (err, rows) => {
                        if(err) throw err;
                        
                        let sql;
                        if(rows.length < 1) {
                            sql = `INSERT INTO boss (id, name, level, image, stat, pstat) VALUES ('${server}', '${name}', '${parseInt(lvl)}', '${bsimg}', '1', '0')`;
                        } else {
                            let boss = rows[0].name;
                            sql = `UPDATE boss SET name = '${name}', level = '${parseInt(lvl)}', image = '${bsimg}', stat = '1', pstat = '0' WHERE id = '${server}'`;
                        }
        
                        con.query(sql,console.log);
                    });
        
                    const bossEmb = new Discord.RichEmbed()
                        .setColor(0x2c2f33)
                        .setTitle('Next Boss has been set up!')
                        .setAuthor('Boss Invasion Alert!', 'https://i.imgur.com/QrJKwNl.png', ' ')
                        .setDescription(`**${name}**\nLevel ${lvl}`)
                        .setThumbnail('https://i.imgur.com/JzDnCGJ.png')
                        .addField('Post details', `setup by: ${message.member.displayName} on ${biconfig.startTime().ct}\nExpect an alert at ${biconfig.display1()} and ${biconfig.display2()}`)
                        //.addBlankField()
                        .setImage(bsimg)
                        .setTimestamp()
                        .setFooter('Diamond Club Armada', 'https://i.imgur.com/FpIimN1.png');
                        switch (condition) {
                            case '1':
								message.delete();
                                message.channel.sendEmbed(bossEmb);
                            return;
                            default:
								message.delete();
                                message.channel.send('Boss record not found. please try again...');
                            return;
                        }
        
                   /*  fs.writeFile('./json/boss.json', JSON.stringify(homu.boss, null, 4), err => {
                        if(err) throw err;
                        
                    }) */
        
                } else {
					message.delete();
                    message.channel.send('Only Authorized personnel can use this command.\nCome back later, if you have permission...');// not vip
                }
        
            } else {
				message.delete();
                message.channel.send('Boss Invasion is still on going.\nYou can not set the boss yet.');
            }
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
};

exports.help = {
    name: 'setboss'
}