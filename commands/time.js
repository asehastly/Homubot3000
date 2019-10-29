exports.run = (homu, message, args) => {
	var moment = require('moment');
    var startDate = moment();
    var endDate = moment('22:30:00', 'HH:mm:ss');
    var calcTime = endDate.diff(startDate, 'miliseconds');

    message.channel.send('Going to send a message in 1:30 PM.');
    console.log(calcTime);
    setTimeout(delay => {
        message.channel.send("Time's up!");
    },calcTime);
    /* const h = new Date().getHours();
    const m = new Date().getMinutes();
    const s = new Date().getSeconds();
    rH, rM, rS, cH, cM, cS, mm, cm;
    rH = 17-h;
    rM = 55-m;
    rS = 59-s;

    message.channel.send(`Current time: ${h}:${m}:${s}\n Time out in: ${rH}:${rM}:${rS}`)
    rH = parseint(h*3600000);
    rM = parseint(m*60000);
    rS = parseint(s*1000);


    if(rH === 0) {
        cM = rM*60000;
        cS = rS*1000;
        console.log(`zero hour`);
    } else if(rH === 0 && rM === 0) {
        cS = rS*1000;
        console.log('zero hour and minutes');
    } else {
        cH = rH*3600000;
        cM = rM*60000;
        cS = rS*1000;
        console.log('else');
    }
    
    mm = rH+rM+rS;
    cm = cH+cM+cS;

    message.channel.send(`Current time in milliseconds: ${mm}`);
    message.channel.send(`Elapsed time in milliseconds: ${cm}`);
    
    setTimeout(delay => {
        message.channel.send("Time's up!")
    }, cm) */
};

exports.help = {
	name: 'time'
}


