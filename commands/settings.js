const discord = module.require('discord.js');
const fs = module.require('fs');
//const SQLite = module.require("better-sqlite3");

exports.run = (homu, message, args) => {
    if (message.author.bot) return;
    const input = args[0];
    const server = message.guild.id;
    let mChan = message.mentions.channels.first().id;
    var boss, wel, lev, bossStat, welStat, levStat;

    if (homu.config.hasOwnProperty(server)) {
        if(homu.cofig[server].bossStat.hasOwnProperty(bossStat)) {
            bossStat = homu.config[server].bossStat
        } else {
            bossStat = false;
        }
        if(homu.cofig[server].welStat.hasOwnProperty(welStat)) {
            bossStat = homu.config[server].welStat
        } else {
            bossStat = false;
        }
        if(homu.cofig[server].levStat.hasOwnProperty(levStat)) {
            bossStat = homu.config[server].levStat
        } else {
            bossStat = false;
        }
        if(bossStat = true) {
            boss = homu.config[server].bossrm;
            console.log(boss);
        } else {
            boss = 'not set';
        }
        if(welStat = true) {
            wel = homu.config[server].welrm;
            console.log(`${boss}\n${wel}`);
        } else {
            wel = 'not set';
        }
        if(levStat = true) {
            lev = homu.config[server].levrm;
            console.log(`${boss}\n${wel}\n${lev}`);
        } else {
            lev = 'not set';
        }
    }
    else {
        boss = 'not set';
        bossStat = false;
        wel = 'not set';
        welStat = false;
        lev = 'not set';
        levStat = false;
    }

    if (message.member.roles.find("name", "Vice Admirals") || message.member.roles.find("name", "Admiral")) {
        switch(input) {
            case 'boss':
                bossStat = true;
                homu.config[server] = {
                    bossrm: mChan,
                    bossStat: bossStat,
                    welrm: wel,
                    welStat: welStat,
                    levrm: lev,
                    levStat: levStat
                }
                fs.writeFile('./json/config.json', JSON.stringify(homu.config, null, 4), err => {
                    if(err) throw err;
                    message.channel.send('Got it! thanks for reminding me.');
                });
            return;
            case 'welcome':
                welStat = true;
                homu.config[server] = {
                    bossrm: boss,
                    bossStat: bossStat,
                    welrm: mChan,
                    welStat: welStat,
                    levrm: lev,
                    levStat: levStat
                }
                fs.writeFile('./json/config.json', JSON.stringify(homu.config, null, 4), err => {
                    if(err) throw err;
                    message.channel.send('Got it! thanks for reminding me.');
                });
            return;
            case 'leave':
                levStat = true;
                homu.config[server] = {
                    bossrm: boss,
                    bossStat: bossStat,
                    welrm: wel,
                    welStat: welStat,
                    levrm: mChan,
                    levStat: levStat
                }
                fs.writeFile('./json/config.json', JSON.stringify(homu.config, null, 4), err => {
                    if(err) throw err;
                    message.channel.send('Got it! thanks for reminding me.');
                });
            return;
            default:

        }
    } else {
        message.channel.send('Only Authorized personnel can use this command.\nCome back later, if you have permission...');// not vip
    }
    

};

exports.help = {
	name: 'settings'
}