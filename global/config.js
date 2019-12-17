require('dotenv-flow').config();
const Discord = require('discord.js');
const homu = new Discord.Client();
const mysql = require('mysql');
const valks = require('./arrays.js');
const vJson = require('../json/valks.json');

let con = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: 'homu',
    charset : 'utf8mb4'
});

con.connect(err => {
    if(err) throw err;
    console.log('connected to homu database');
    //con.query('SHOW TABLES', console.log);
});

function bSuit(valk) {
    //console.log(valk.emoji);
    const out = [];
    con.query(`SELECT * FROM emoji WHERE vCode = '${valk.vCode}' AND otype ='Battlesuit'`, (err, rows) => {
        if(err) throw err;
        if(rows[0].emoType === 1) {
            for(let i = 0;i < rows.length; i++) {
                out.push({name:rows[i].name,
                    valkEmo:`<:${rows[i].vCode[0]}_${rows[i].suitID}_Avatar:${rows[i].id}>`,
                    
                });
                console.log(out);
            }
        } else {

        }
    })
    /* const bMatch = valk.emoji.filter(look => {
        if(look.otype === "Battlesuit") return true;
    });
    //console.log(bMatch);
    //return bMatch
    return bMatch.map(suit => `${emoji(suit.ctype)} | ${emoji(suit.id)}${suit.name}`).join('\n') */
}

function cSuit(valk) {

    console.log(valk)
    return "Nothing";
    /* const cMatch = valk.emoji.filter(look => {
        if(look.otype === "Outfit") return true;
    });
    console.log(cMatch);
    if(cMatch.length < 1) return "**No Costume emoji**"
    return cMatch.map(suit => `${emoji(suit.ctype)} | ${emoji(suit.id)}${suit.name}`).join('\n') */
}

/* function emoji(id) {
    con.query(`SELECT * FROM emoji WHERE id = '${id}'`, (err, rows) => {
        if(err) throw err;
        console.log(rows.length)

        if(rows[0].emoType === 1) {
            console.log(`<:${rows[0].vCode}_${rows[0].suitID}:${rows[0].id}>`);
            return `something`;
        } else {
            console.log(`<a:${rows[0].vCode}_${rows[0].suitID}:${rows[0].id}>`)
            return `something`
        }
    });
    //return 'NAN'
} */

module.exports = {
    token: process.env.TOKEN,
    owner: process.env.OWNER,
    prefix: process.env.PREFIX,
    con,
    valkProcess: function(args) {
        let valkqueue, output;
    
        valkqueue = args.toUpperCase()
        console.log(`String input was converted to ${valkqueue}`)
        const match = valks.filter(code => {
            for(let i = 0; i < code.vCode.length; i++) {
                //console.log(code.vCode[i]);
                if(code.vCode[i] === valkqueue) {
                    return true;
                }
            }
        })
        console.log(`Length of match: ${match.length}`)
        return match;
    },
    /* emoji: function(id) {
        console.log(homu.emojis.get(id))
        //const emo = `${homu.emojis.get(id)}`;
        return homu.emojis.get(id);
        //return 'NAN'
     }, */
     ConvNum: function(id) {
        var emo = id.match(/\d/g);
        emo = emo.join("")
        const temp = emo;
        //console.log(temp);
        return temp;
    },
    suit: function(btype) {
        switch(btype) {
            case 'B':
                return "Battlesuit";
            case 'O':
                return "Outfit";
            default:
                return null;
        }
    },
    findSuit: function(suit) {
        const match = valks.find(code => {
            for(let i = 0; i < code.sCode.length; i++) {
                //console.log(code.sCode[i]);
                if(code.sCode[i] === suit) {
                    return true;
                }
            }
            
        })
    },
    valkMap: function() {
        const map = valks.map()
    },
    matchfound: (json) => {
		//console.log(valkfound.emoji);
        let valkfound = vJson[json];
        //console.log(valkfound);
		let pfp = valkfound.pfp;
		const embTrue = new Discord.RichEmbed()
		.setColor('	#23272a')
			.setAuthor('Valyrie Information', 'https://i.imgur.com/5ejjwD3.png', valkfound.url)
			.setTitle(valkfound.valkName)
			.setDescription(`**Weapon type**:${valkfound.weap}\n**Age**:${valkfound.Age}\t\t\t\t**Birthday**:${valkfound.DOB}\n**Measurements**:${valkfound.Measurements}\n**Height**: ${valkfound.Height}\t\t\t**Weight**:${valkfound.Weight}`)
			.setThumbnail(pfp[Math.floor(Math.random()*pfp.length)])
			.addField('Battlesuit', `${bSuit(valkfound)}`, true)
			.addField('Outfits', `${cSuit(valkfound)}`, true)
			.addField('Bio', valkfound.vBio)
			.setTimestamp()
            .setFooter('King Homu™ Archives', 'https://i.imgur.com/SuxUzng.png');
		return embTrue;
	},

	react: (id) => {
		return homu.valks[id].emoji[0].id;
	},
	notFound: (input) => {
		let concat = input.join(" ");
		const embFalse = new Discord.RichEmbed()
		.setColor('	#23272a')
			.setAuthor('Valyrie Information', 'https://i.imgur.com/5ejjwD3.png')
			.setTitle(`${concat} was not on the database`)
			.setDescription("Are you sure you are looking for a **playable** valkyrie?")
			.setTimestamp()
			.setFooter('King Homu™ Archives', 'https://i.imgur.com/SuxUzng.png');
		return embFalse;
	}
}