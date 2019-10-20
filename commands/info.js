module.exports = {
	name: 'info',
	description: 'something that involves the h!info command',
	execute(msg, args) {
        //code here
        switch(args[1]){
            case 'ver':
                msg.channel.sendMessage('Version 1.x.x')
            break;
            case 'time':
                var moment = require('moment')
                var startDate = moment()
                var endDate = moment('20:00:00', 'HH:mm:ss')
                var calcTime = endDate.diff(startDate, 'miliseconds')


                msg.channel.sendMessage(`the time difference between ${startDate.format('hh:mm:ss')} and ${endDate.format('hh:mm:ss')} is\n${calcTime} in miliseconds`)
            break;
            default:
                msg.channel.sendMessage('WHAT?!')
        }
	},
};