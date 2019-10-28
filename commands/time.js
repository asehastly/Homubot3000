exports.run = (homu, message, args) => {
	var moment = require('moment')
    var startDate = moment()
    var endDate = moment('01:30:00', 'HH:mm:ss')
    var calcTime = endDate.diff(startDate, 'miliseconds')

    message.channel.send('Going to send a message in 1:30 AM.')
    setTimeout(delay,calcTime);
    function delay() {
        message.channel.send("Time's up!")
    }
};

exports.help = {
	name: 'time'
}


