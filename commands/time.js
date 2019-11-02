exports.run = (homu, message, args) => {
    var moment = require('moment-timezone');
    var startDate = moment().tz('Asia/Manila');
    var f_noti = moment('9:00:00', 'HH:mm:ss');
    var s_noti = moment('10:00:00', 'HH:mm:ss');
    //var f_display = moment('11:40:00', 'HH:mm:ss');
    var calc_f = f_noti.diff(startDate, 'miliseconds');
    var calc_s = s_noti.diff(startDate, 'miliseconds');

    message.channel.send(`Going to send a message in ${f_noti.format('hh:mm A')} and ${s_noti.format('hh:mm A')}`);
    console.log(`time.js engaged:\nStart time Initiated:\n${startDate.format('hh:mm A')}\nTime Stop initiated:\n${f_noti.format('hh:mm A')} folowed by ${s_noti.format('hh:mm A')}\nTime Elapsed in mil.:\n${calc_f} followed by ${calc_s}`)
    //console.log(calcTime);
    setTimeout(delay1 => {
        message.channel.send("<@&621558338005630978> 1st Time's up!");
        console.log('Timer 1 stopped.');
    },calc_f);
    setTimeout(delay2 => {
        message.channel.send("<@&621558338005630978> 2nd Time's up!");
        console.log('Timer 2 stopped.');
    },calc_s);
};

exports.help = {
	name: 'time'
}


