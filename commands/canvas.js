exports.run = (homu, message, args) => {
	const input = args;

	if (input[0] === 'student') {
		const fs = require('fs');
		homu.jvaule = require('./json/student.json');

		fs.readFile('./json/student.json', (err, data) => {
			if (err) throw err;
			let student = JSON.parse(data);
			console.log(student);
		});
		console.log('This is after the read call');
		message.channel.send(`Name: ${student[name]}\nAge: ${student[age]}`);
	} else {
		return;
	}

};

exports.help = {
	name: 'canvas'
}