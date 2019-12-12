const Discord = module.require('discord.js');
const valks = require('../global/arrays.js');
const { con, ConvNum, suit, valkProcess, emoji } = require('../global/config.js');


exports.run = (homu, message, args) => {
	message.delete();

	switch(args[0]) {
		case "add":
			args.shift();
			if(args.length < 1) return message.channel.send('Just a reminder,\n**Syntax: homu emoji add `**cVode**` `**Battlesuit ID**` `**B or O**` `**Creature Emoji**` `**Valk Emoji**` `**Name of valk**`');
			var vCode = args[0].toUpperCase();
			var sID = args[1].toUpperCase();
			var otype = suit(args[2].toUpperCase());
			var ctype = ConvNum(args[3]);
			var valkID = ConvNum(args[4]);
			args = args.slice(5);
			var valkName = args.join(" ");
			const match = valkProcess(vCode);
			console.log(otype);
			if(match === undefined) return message.channel.send("**Syntax**: homu emoji add `**cVode**` `**Battlesuit ID**` `**B or O**` `**Creature Emoji**` `**Valk Emoji**` `**Name of valk**` *vCode*").then(update => { update.delete(10000)});
			if(sID.length < 1 ) return message.channel.send("**Syntax**: homu emoji add `**cVode**` `**Battlesuit ID**` `**B or O**` `**Creature Emoji**` `**Valk Emoji**` `**Name of valk**` *sID*").then(update => {update.delete(10000)});
			if(!otype) return message.channel.send("**Syntax**: homu emoji add `**cVode**` `**Battlesuit ID**` `**B or O**` `**Creature Emoji**` `**Valk Emoji**` `**Name of valk**` *otype*").then(update => {update.delete(10000)});
			if(valkID.length != 18 || ctype.length != 18) return message.channel.send("**Syntax**: homu emoji add `**cVode**` `**Battlesuit ID**` `**B or O**` `**Creature Emoji**` `**Valk Emoji**` `**Name of valk**` *emojiID*").then(update => {update.delete(10000)});
			con.query(`SELECT * FROM emoji WHERE id = '${valkID}'`, (err, rows) => {
				if(err) throw err;
				console.log(rows);
				let sql;
				if(rows.length < 1) {
					sql = `INSERT INTO emoji (vcode, suitID, name, id, otype, ctype) VALUES ("${vCode}", "${sID}", "${valkName}", "${valkID}", "${otype}", "${ctype}")`;
					const addEmb =  new Discord.RichEmbed()
						.setAuthor('Valyrie Information', 'https://i.imgur.com/5ejjwD3.png', '')
						.setTitle(`${valkName} has been added to the database.`)
						.addField('Valkyrie Code:', vCode, true)
						.addField('Suit Code:', sID, true)
						.addField('Details:', `Suit type: ${otype}\nValkyrie Emoji ID: ${valkID}\nCreature type Emoji ID: ${ctype}`)
						.setTimestamp()
						.setFooter('King Homu™ Archives', 'https://i.imgur.com/SuxUzng.png');
					message.channel.sendEmbed(addEmb).then(update => { update.delete(60000)});
					message.channel.send(`*added info*\n{"name":"${valkName}","id":"${valkID}","otype":"${otype}","ctype":"${ctype}"}`);
				} else {
					let boss = rows[0].vCode;
					sql = `UPDATE emoji SET vCode = "${vCode}", suitID = "${sID}", name = "${valkName}", otype = "${otype}", ctype = "${ctype}" WHERE id = "${valkID}"`;
					const upEmb =  new Discord.RichEmbed()
						.setAuthor('Valyrie Information', 'https://i.imgur.com/5ejjwD3.png', '')
						.setTitle(`${valkName} has been updated on the database.`)
						.addField('Valkyrie Code:', vCode, true)
						.addField('Suit Code:', sID, true)
						.addField('Details:', `Suit type: ${otype}\nValkyrie Emoji ID: ${valkID}\nCreature type Emoji ID: ${ctype}`)
						.setTimestamp()
						.setFooter('King Homu™ Archives', 'https://i.imgur.com/SuxUzng.png');
					message.channel.sendEmbed(upEmb).then(update => { update.delete(60000)});
					message.channel.send(`*updated info*\n{"name":"${valkName}","id":"${valkID}","otype":"${otype}","ctype":"${ctype}"}`);
				}
				con.query(sql,console.log);
			});
		break;
		case "list":
			args.shift();
			switch(args[0]) {
				case "all":
					for(let i = 0; i < 3; i++) {
						con.query(`SELECT * FROM emoji WHERE vCode = '${valks[i].vCode[0]}'`, (err, rows) => {
							if(err) throw err;
							//console.log(rows.length);
							for(let i = 0; i < rows.length; i++) {
								//console.log(rows.length);
								//addEmb.addField(rows[i].name, `${homu.emojis.get(rows[i].id)}`, true)
								message.channel.send(`${homu.emojis.get(rows[i].id)} ${homu.emojis.get(rows[i].ctype)}\n**${rows[i].name}** | ${rows[i].suitID} - ${rows[i].otype}`);
							}
						});

					}
					
					
					//message.channel.send(`${homu.emojis.get("652909399739727873")}`).then(all => {all.delete(10000)});
				break;
				default:

			}
		break;
		default:
			message.channel.send("need command....");
	} //End tag for switch condition.
	function verify() {

	}
};

exports.help = {
	name: 'emoji'
}