const fs = module.require('fs');
const moment = module.require('moment-timezone');

module.exports = homu => {
    console.log(`${homu.user.tag} logging in...`);
    setTimeout(homuRun => {
        console.log(`${homu.user.tag} logged and ready to go!`);
    },7000)
    setTimeout(homuRun => {
        console.log(' ');
    },8000)
    homu.setInterval(() => {
        let boss = homu.boss['current'].name;
        let lvl = homu.boss['current'].level;
        let bsimg = homu.boss['current'].image;
        let stat = homu.boss['current'].status;


        if(parseInt(stat) === 1) {
            //Starting time
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
             //Fist post trigger
            homu.channels.get('642033909311209483').send(`BI data found. now setting up setTimeouts\nFirst: ${display_f}\nSecond ${display_s}`);
            setTimeout(delay1 => {
                const firstEmb = new Discord.RichEmbed()
                    .setColor(0xcccc00)
                    .setTitle('Next Boss has been set up!')
                    .setAuthor('Boss Invasion Alert!', 'https://i.imgur.com/QrJKwNl.png', ' ')
                    .setDescription(`**${boss}**\nLevel ${lvl}\nGame Starts in 1 hour`)
                    .setThumbnail('https://i.imgur.com/JzDnCGJ.png')
                    .setImage(bsimg)
                    .setTimestamp()
                    .setFooter('Diamond Club Armada', 'https://i.imgur.com/FpIimN1.png');

                //message.channel.send("<@&621558338005630978> Get ready!!!");
                homu.channels.get('621547605138341898').send("<@&621558338005630978> Get ready!!!");
                homu.channels.get('621547605138341898').sendEmbed(firstEmb);
            }, calc_f);
            //Second post trigger
            setTimeout(delay2 => {
                const SecEmb = new Discord.RichEmbed()
                    .setColor(0xb20000)
                    .setTitle('Next Boss has been set up!')
                    .setAuthor('Boss Invasion Alert!', 'https://i.imgur.com/QrJKwNl.png', ' ')
                    .setDescription(`**${boss}**\nLevel ${lvl}\nBoss Invasion Starts Now\nGood luck!`)
                    .setThumbnail('https://i.imgur.com/JzDnCGJ.png')
                    .setImage(bsimg)
                    .setTimestamp()
                    .setFooter('Diamond Club Armada', 'https://i.imgur.com/FpIimN1.png');

                homu.channels.get('621547605138341898').send("<@&621558338005630978> It's Go time!");
                homu.channels.get('621547605138341898').sendEmbed(SecEmb);
                delete homu.boss['current'];
                
                fs.writeFile('./json/boss.json', JSON.stringify(homu.boss), err => {
                    if(err) throw err;
                    console.log('Boss Invasion Alert Finish')
                    stat = '0'
                })
            }, calc_s);
        } else {
            return;
        }
               
    }, 43200000);
}