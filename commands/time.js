module.exports = {
	name: 'time',
	description: 'testing command for setTimeOut command',
	execute(msg, args) {
		var moment = require('moment')
        var startDate = moment()
        var endDate = moment('22:25:00', 'HH:mm:ss')
        var calcTime = endDate.diff(startDate, 'miliseconds')

        msg.channel.sendMessage('Going to send a message in 8:00 PM.')
        setTimeout(delay,calcTime);
        function delay() {
            msg.channel.sendMessage("Time's up!")
        }
	},
};