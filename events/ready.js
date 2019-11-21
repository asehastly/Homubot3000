const Discord = module.require('discord.js');
const moment = module.require('moment-timezone');
const { con } = require('../config.js');
const biconfig = require('../global/bitimer.js');

module.exports = homu => {
    console.log(`${homu.user.tag} logging in...`);
    setTimeout(homuRun => {console.log(`${homu.user.tag} logged and ready to go!\n`);},7000);
    var hour = moment().tz('Asia/Manila').format('HH');
    var stat;
    if (hour >= 0 && hour <= 17) {
        let id = homu.member.guild.id;
        con.query(`SELECT * FROM boss WHERE id = ${id}`, (err, row) => {
            if (err) throw err;
            stat = row[0].stat;
            if(!stat) {
                console.log('*WARNING*\nDatbase is empty!');
            }else if(parseInt(stat) === 1) {
                //if Boss name exist
                console.log(`Boss ${row[0].name} has been set!`);
            } else {
                console.log('No boss was set');
            };
        });
    } else {
        console.log('Boss Invasion is still on-going');
    };
    homu.setInterval(() => {
        if (hour >= 0 && hour <= 17) {
            let id = message.guild.id;
            con.query(`SELECT * FROM boss WHERE id = ${id}`, (err, row) => {
                if (err) throw err;
                stat = row[0].stat;
                if(!stat) {
                    console.log('*WARNING*\nDatbase is empty!');
                }else if(parseInt(stat) === 1) {
                    //if Boss name exist
                    console.log(`Boss ${row[0].name} has been set!`);
                } else {
                    console.log('No boss was set');
                };
            });
        } else {
            console.log('Boss Invasion is still on-going');
        };
    }, 43200000);
}