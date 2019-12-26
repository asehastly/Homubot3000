const Discord = module.require('discord.js');
const { icon } = require('../global/config.js');
const { errEMB } = require('../global/configEMB.js');
const { startValk } = require('../global/execute.js');


exports.run = async (homu, message, args) => {
	let numArr = 0;
	let numCount = 1;

	message.delete();

	switch(args[0]) {
		case 'update':
			args.shift();
			
			message.channel.send(args.map(m => `${numCount++}.) *${m}* | ${numArr++}`)).then(msg => msg.delete(1000 * 3600))
		break;
		case 'register':
			args.shift();
			let user = message.author.id;
			let input = {
				uID: user,
				argument: args
			}

			//console.log(input)
			startReg(input.argument)
			//message.channel.send('Kindly check the console logs for output...').then(msg => msg.delete(1000 * 5))
		break;
	}
	async function startReg(x) {
		let arm = '';
		//gid grabs the value of x that has 8 length and a number
		let gid = x.filter(id => id.length === 8 && !isNaN(id)).join();
		//ign removes the last value of x and join as string
		let ign = x.slice(0,-1).join(' ')
		if(message.member.roles.find('name', 'Armada Crew')) {
			arm = 'DiamondClub';
			//message.channel.send(`${message.member.displayName}, you are a member of DiamondClub Armada`).then(msg => msg.delete(1000 * 5))
			message.channel.send(`In-game Name: ${ign}\nin-game ID: ${gid}\nArmada: ${arm}`);
		} else {
			const filter = user => user.author.id === message.author.id;

			const NaAEMb = new Discord.RichEmbed()
				.setColor()
				.setAuthor('Required Info', icon.homu)
				.setTitle(`${message.member.displayName}, Please enter the name of your armada`)
				.setFooter('Youhave 30 seconds to type', icon.timer)
			message.channel.send(NaAEMb).then(emb => emb.delete(30000))
			message.channel.awaitMessages(filter, {
				max: 1,
				time: 30000,
				error: ['Time']
			}).then(collected => {
				arm = collected.first().content;
				message.channel.bulkDelete(1);
				message.channel.send(`In-game Name: ${ign}\nin-game ID: ${gid}\nArmada: ${arm}`);
			}).catch(err => {
				message.channel.send(`${message.member.displayName}, you have failed to proceed with the registration`).then(msg => msg.delete(10000))
			})
		}
		function getArmada(x) {
			return x;
		}
	}
};

exports.help = {
	name: 'test'
}