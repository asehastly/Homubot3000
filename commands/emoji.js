const Discord = module.require('discord.js');
const valks = require('../global/arrays.js');
const { con, ConvNum, suit, valkProcess, emojiDB } = require('../global/config.js');


exports.run = async (homu, message, args) => {
	message.delete();
	var conStat;
	switch(args[0]) {
		case "add":
			args.shift();
			if(args.length < 5) return message.channel.send('Just a reminder,\n**Syntax: homu emoji add `**cVode**` `**Battlesuit ID**` `**B or O**` `**Creature Emoji**` `**Valk Emoji**` `**Name of valk**`');
			var vCode = args[0].toUpperCase();
			var otype = suit(args[1].toUpperCase());
			var vEmoji = args[2];
			var type = (args[2].startsWith('<a')) ? 0 : 1; 
			vEmoji = vEmoji.split(':').slice(1);
			vEmoji[2] = vEmoji[1].match(/\d/g).join("");
			vEmoji[1] = vEmoji[0].split('_').slice(1,2).join();
			var cEmoji = args[3].split(':').slice(1);
			cEmoji[2] = cEmoji[1].match(/\d/g).join("");
			cEmoji[1] = cEmoji[0].split('_').shift();
			args = args.slice(4);
			var suitName = args.join(" ");
			//const match = valkProcess(vCode);
			console.log(`${suitName}\t${vCode}\t${otype}`);
			console.log(vEmoji);
			console.log(cEmoji);
			con.query(`SELECT * FROM emoji WHERE suitID = '${vEmoji[2]}'`, (err, rows) => {
				if(err) throw err;
				console.log(rows);
				let sql;
				if(rows.length < 1) {
					sql = `INSERT INTO emoji (vCode, otype, name, vEmoji, suitName, suitID, cEmoji, cName, cID, type) VALUES ("${vCode}", "${otype}", "${suitName}", "${vEmoji[0]}", "${vEmoji[1]}", "${vEmoji[2]}", "${cEmoji[0]}", "${cEmoji[1]}", "${cEmoji[2]}", "${type}")`;
					const addEmb =  new Discord.RichEmbed()
						.setAuthor('Valyrie Information', 'https://i.imgur.com/5ejjwD3.png', '')
						.setTitle(`${suitName} has been added to the database.`)
						.setDescription(`Valkyrie Code:**${vCode}**\nSuit Type:**${otype}**`)
						.addField(`Suit Emoji:**${vEmoji[0]}**`,`Name:**${vEmoji[1]}**\nID:**${vEmoji[2]}** (${vEmoji[2].length})`)
						.addField(`Suit Emoji:**${cEmoji[0]}**`,`Name:**${cEmoji[1]}**\nID:**${cEmoji[2]}** (${cEmoji[2].length})`)
						.setTimestamp()
						.setFooter('King Homu™ Archives', 'https://i.imgur.com/SuxUzng.png');
					message.channel.send(addEmb).then(update => { update.delete(60000)});
				} else {
					sql = `UPDATE emoji SET vCode = "${vCode}", otype = "${otype}", name = "${suitName}", vEmoji = "${vEmoji[0]}", suitName = "${vEmoji[1]}", cEmoji = "${cEmoji[0]}", cName = "${cEmoji[1]}", cID = "${cEmoji[2]}", type = "${type}" WHERE suitID = "${vEmoji[2]}"`;
					const upEmb =  new Discord.RichEmbed()
						.setAuthor('Valyrie Information', 'https://i.imgur.com/5ejjwD3.png', '')
						.setTitle(`${suitName} has been updated on the database.`)
						.setDescription(`Valkyrie Code:**${vCode}**\nSuit Type:**${otype}**`)
						.addField(`Suit Emoji:**${vEmoji[0]}**`,`Name:**${vEmoji[1]}**\nID:**${vEmoji[2]}** (${vEmoji[2].length})`)
						.addField(`Suit Emoji:**${cEmoji[0]}**`,`Name:**${cEmoji[1]}**\nID:**${cEmoji[2]}** (${cEmoji[2].length})`)
						.setTimestamp()
						.setFooter('King Homu™ Archives', 'https://i.imgur.com/SuxUzng.png');
					message.channel.send(upEmb).then(update => { update.delete(60000)});
				}
				con.query(sql,console.log);
			});
		break;
		case "generate":
			args.shift();
			switch(args[0]) {
				case 'list':
					args.shift();
					const match2 = valkProcess(args[0]);
					if(match2 === undefined) {

						const listEmb =  new Discord.RichEmbed()
						message.channel.send(`${args.join(' ')} doesn't exist in my archives... try again.`).then(nan => {nan.delete(10000)});
					} else {
						const vCode = match2[0].vCode[0];
						const json = match2[0].Json;
						console.log(vCode);
						var forCon = [];
						//console.log(homu.valks[match2.Json].valkName);
						message.channel.send(`**${args.join(' ')}** was found with the keyword \`${args[0]}\``).then(found => {found.delete(10000)});
						con.query(`SELECT * FROM emoji WHERE vCode = '${vCode}'`, (err, rows) => {
							if(err) throw err;
							console.log(rows);
							const listEmb =  new Discord.RichEmbed()
								.setAuthor('Valyrie Information', 'https://i.imgur.com/5ejjwD3.png', '')
								.setTitle(homu.valks[json].valkName)
							for(let i = 0; i < rows.length; i++) {
								if(rows[i].type === 0) {
									listEmb.addField(`<a:${rows[i].vEmoji}:${rows[i].suitID}> || <:${rows[i].cEmoji}:${rows[i].cID}>`, `${rows[i].name}(\`${rows[i].suitName}\`)\nsuit type: ${rows[i].otype}`, true);
									forCon.push(`<a:${rows[i].vEmoji}:${rows[i].suitID}> || <:${rows[i].cEmoji}:${rows[i].cID}>`);
								} else {
									listEmb.addField(`<:${rows[i].vEmoji}:${rows[i].suitID}> || <:${rows[i].cEmoji}:${rows[i].cID}>`, `${rows[i].name}(\`${rows[i].suitName}\`)\nsuit type: ${rows[i].otype}`, true);
									forCon.push(`<:${rows[i].vEmoji}:${rows[i].suitID}> || <:${rows[i].cEmoji}:${rows[i].cID}>`);
								}
							}
							listEmb.setTimestamp()
							listEmb.setFooter('King Homu™ Archives', 'https://i.imgur.com/SuxUzng.png');
							message.channel.send(listEmb);
							console.log(forCon);
						});
					}
				break;
				case "code":
					args.shift();
					const match3 = valkProcess(args[0]);
					if(match3 === undefined) {
						message.channel.send(`${args.join(' ')} doesn't exist in my archives... try again.`).then(nan => {nan.delete(10000)});
					} else {
						console.log(match3.vCode);
						message.channel.send(`**${args.join(' ')}** was found with the keyword \`${args[0]}\``).then(found => {found.delete(10000)});
						con.query(`SELECT * FROM emoji WHERE vCode = '${match3.vCode[0]}'`, (err, rows) => {
							if(err) throw err;
							console.log(rows);
							const codeEmb =  new Discord.RichEmbed()
								.setAuthor('Valyrie Information', 'https://i.imgur.com/5ejjwD3.png', '')
								.setTitle(`${homu.valks[match3.Json].valkName} json codes`)
							for(let i = 0; i < rows.length; i++) {
								codeEmb.addField(`${rows[i].name}`, `{"name":"${rows[i].name}","id":"${rows[i].id}","otype":"${rows[i].otype}","ctype":"${rows[i].ctype}"}`, true)
							}
							codeEmb.setTimestamp()
							codeEmb.setFooter('King Homu™ Archives', 'https://i.imgur.com/SuxUzng.png');
							message.channel.sendEmbed(codeEmb);
						});
					}
				break;
				case 'test':
					args.shift();
					var psh = new Array;
					const testEmb =  new Discord.RichEmbed()
						.setAuthor('Valyrie Information', 'https://i.imgur.com/5ejjwD3.png', '')
						.setTitle(`All available valkyrie emojis`)
					for(let i = 0; i < valks.length; i++) {
						let pshemo = await emojiDB(valks[i].vCode[0], 1)
						//console.log(pshemo)
						testEmb.addField(homu.valks[valks[i].Json].valkName, pshemo.map(r => `${r}`).join("\n"), true);
					}
					testEmb.setTimestamp();
					testEmb.setFooter('King Homu™ Archives', 'https://i.imgur.com/SuxUzng.png');

					message.channel.send(testEmb).then(async rct => {
						if(psh.length > 0) psh.splice(0,psh.length);
						let result = new Array, pshemo = new Array;
						for(let i = 0; i < valks.length; i++) {
							pshemo = await emojiDB(valks[i].vCode[0], 2);
							//result.push(pshemo)
						}
						console.log(pshemo);
					});
				break;
			}
	} //End tag for switch condition.
};

exports.help = {
	name: 'emoji'
}