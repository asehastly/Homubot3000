exports.run = (homu, message, args) => {
	var moment = require('moment')
    var startDate = moment()
    var endDate = moment('00:50:00', 'HH:mm:ss')
    var calcTime = endDate.diff(startDate, 'miliseconds')

    msg.channel.sendMessage('Going to send a message in 8:00 PM.')
    setTimeout(delay,calcTime);
    function delay() {
        msg.channel.sendMessage("Time's up!")
    }
};

exports.help = {
	name: 'time'
}


