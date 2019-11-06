const fs = module.require('fs');

exports.run = (homu, message, args) => {
	const input = args;
o
	if (input[0] === 'student') {
		const fs = require('fs');

		fs.readFile('./json/student.json', (err, data) => {
			if (err) throw err;
			let student = JSON.parse(data);
			console.log(student);
		});
		console.log('This is after the read call');
		//message.channel.send(`Name: ${student[name]}\nAge: ${student[age]}`);
	} else {
		return;
	}

};

exports.help = {
	name: 'canvas'
}