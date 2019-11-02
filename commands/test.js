exports.run = (homu, message, args) => {
    const Discord = require('discord.js');
    const moment = require('moment-timezone');

    var hour = moment().tz('Asia/Manila').format('HH');
	var startDate = moment().tz('Asia/Manila').format('HH:mm:ss');
	var f_noti = moment('9:00:00', 'HH:mm:ss').tz('Asia/Manila').format('HH:mm:ss');
    var s_noti = moment('10:00:00', 'HH:mm:ss').tz('Asia/Manila').format('HH:mm:ss');
	//Computation from the time boss was set to 5:00 PM
    var mf = moment(f_noti,"HH:mm:ss").diff(moment(startDate,"HH:mm:ss"));
    var hf = moment.duration(mf);
	//Computation from the time boss was set to 6:00 PM
    var ms = moment(s_noti,"HH:mm:ss").diff(moment(startDate,"HH:mm:ss"));
    var hs = moment.duration(ms);
	
	//Computed number of milliseconds for the first post
    var calc_f = Math.floor(hf.asHours()) + moment.utc(mf)
    var display_f= Math.floor(hf.asHours()) + moment.utc(mf).format(":mm:ss");
	//Computed number of milliseconds for the second post
    var calc_s = Math.floor(hs.asHours()) + moment.utc(ms)
    var display_s= Math.floor(hs.asHours()) + moment.utc(ms).format(":mm:ss");

    message.channel.send(`${hour}\n${startDate}\n${f_noti}\n${s_noti}`);
	message.channel.send(`${display_f}\n${display_s}`);
    // between 6 PM and 11 pm respectively
    if (hour >= 0 && hour <= 17) {
        message.channel.send("Wow! you can access this command now.\nGood on ya'");
    } else {
        message.channel.send('Boss Invasion is still on going.\nYou can not set the boss yet.');
    }
};

exports.help = {
	name: 'test'
}