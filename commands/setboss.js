const fs = module.require('fs');
const mysql = module.require('mysql');

exports.run = (homu, message, args) => {
    const Discord = require('discord.js');
    const moment = require('moment-timezone');
    const server = message.guild.id;

    var con = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'D!e in_@_fIr3<>',
        database: 'homu'
    });
    
    con.connect(err => {
        if(err) throw err;
        console.log('connected to homu database');
        //con.query('SHOW TABLES', console.log);
    });

    var hour = moment().tz('Asia/Manila').format('HH');
    var local = moment();
    var startDate = moment().tz('Asia/Manila').format('HH:mm:ss');
    var f_noti = moment('9:00:00', 'HH:mm:ss').tz('Asia/Manila').format('HH:mm:ss');
    var s_noti = moment('10:00:00', 'HH:mm:ss').tz('Asia/Manila').format('HH:mm:ss');
    //Computation from the time boss was set to 5:00 PM
    var mf = moment(f_noti, "HH:mm:ss").diff(moment(startDate, "HH:mm:ss"));
    var hf = moment.duration(mf);
    //Computation from the time boss was set to 6:00 PM
    var ms = moment(s_noti, "HH:mm:ss").diff(moment(startDate, "HH:mm:ss"));
    var hs = moment.duration(ms);
    //Computed number of milliseconds for the first post
    var calc_f = Math.floor(hf.asHours()) + moment.utc(mf)
    var display_f = Math.floor(hf.asHours()) + moment.utc(mf).format(":mm:ss");
    //Computed number of milliseconds for the second post
    var calc_s = Math.floor(hs.asHours()) + moment.utc(ms)
    var display_s = Math.floor(hs.asHours()) + moment.utc(ms).format(":mm:ss");
    // between 6 PM and 11 pm respectively
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

            con.query(`SELECT * FROM boss WHERE id = '${server}'`, (err, rows) => {
                if(err) throw err;
                
                let sql;
                if(rows.length < 1) {
                    sql = `INSERT INTO boss (id, name, level, image, stat) VALUES ('${server}', '${name}', '${parseInt(lvl)}', '${bsimg}', 'true')`;
                } else {
                    let boss = rows[0].name;
                    sql = `UPDATE boss SET name = '${name}', level = '${parseInt(lvl)}', image = '${bsimg}', stat = 'true' WHERE id = '${server}'`;
                }

                con.query(sql,console.log);
            })

            const bossEmb = new Discord.RichEmbed()
                .setColor(0x2c2f33)
                .setTitle('Next Boss has been set up!')
                .setAuthor('Boss Invasion Alert!', 'https://i.imgur.com/QrJKwNl.png', ' ')
                .setDescription(`**${name}**\nLevel ${lvl}`)
                .setThumbnail('https://i.imgur.com/JzDnCGJ.png')
                .addField('Post details', `setup by: ${message.member.displayName} on ${startDate}\nExpect an alert at ${display_f} and ${display_s}`)
                //.addBlankField()
                .setImage(bsimg)
                .setTimestamp()
                .setFooter('Diamond Club Armada', 'https://i.imgur.com/FpIimN1.png');
                switch (condition) {
                    case '1':
                        message.channel.sendEmbed(bossEmb);
                    return;
                    default:
                        message.channel.send('Boss record not found. please try again...');
                    return;
                }

           /*  fs.writeFile('./json/boss.json', JSON.stringify(homu.boss, null, 4), err => {
                if(err) throw err;
                
            }) */

        } else {
            message.channel.send('Only Authorized personnel can use this command.\nCome back later, if you have permission...');// not vip
        }

    } else {
        message.channel.send('Boss Invasion is still on going.\nYou can not set the boss yet.');
    }
};

exports.help = {
    name: 'setboss'
}