exports.run = (homu, message, args) => {
	var moment = require('moment')
    var startDate = moment()
    var endDate = moment('01:25:00', 'HH:mm:ss')
    var calcTime = endDate.diff(startDate, 'miliseconds')

    msg.channel.sendMessage('Going to send a message in 1:25 AM.')
    setTimeout(delay,calcTime);
    function delay() {
        msg.channel.sendMessage("Time's up!")
    }
};

exports.help = {
	name: 'time'
}


