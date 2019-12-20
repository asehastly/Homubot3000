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
    con.query(``, (err, rows) => {
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

function emoji(id) {
    
    //return 'NAN'
}

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
    emojiDB: function(vCode, stat) {
		return new Promise((resolve, reject) => {
			switch(stat) {
                case 1: //mysql query to show all emoji
                    con.query(`SELECT * FROM emoji WHERE vCode = '${vCode}'`, (err, rows) => {
                        let psh = new Array;
                        if(psh.length > 0) psh.splice(0,psh.length);
                        for(let i = 0;i < rows.length;i++) {
                            psh.push(out = (rows[i].type === 1) ? `<:${rows[i].vEmoji}:${rows[i].suitID}> ${rows[i].name}` : `<a:${rows[i].vEmoji}:${rows[i].suitID}> ${rows[i].name}`);
                            valks.temp = psh;
                        }
                        return err ? reject(err) : resolve(psh);
                    })
                break;
				case 2:
                    con.query(`SELECT * FROM emoji WHERE vCode = '${vCode}' && otype = 'Battlesuit'`, (err, rows) => {
                        let psh = new Array;
                        psh.push({
                            name: rows[0].vEmoji,
                            id: rows[0].suitID
                        });
                        return err ? reject(err) : resolve(psh);
                    })
                break;
                case 3: //function replacement for bSuit()
                    con.query(`SELECT * FROM emoji WHERE vCode = '${vCode}' AND otype ='Battlesuit'`, (err, rows) => {
                        let psh = new Array;
                        for(let i = 0; i < rows.length; i++) {
                            switch(rows[i].type) {
                                case 1:
                                    psh.push({
                                        name: rows[i].name,
                                        vEmoji: `<:${rows[i].vEmoji}:${rows[i].suitID}>`,
                                        cEmoji: `<:${rows[i].cEmoji}:${rows[i].cID}>`
                                    });
                                break;
                                case 0:
                                    psh.push({
                                        name: rows[i].name,
                                        vEmoji: `<a:${rows[i].vEmoji}:${rows[i].suitID}>`,
                                        cEmoji: `<:${rows[i].cEmoji}:${rows[i].cID}>`
                                    });
                                break;
                            }
                        }
                        return err ? reject(err) : resolve(psh);
                    })
                break;
                case 4: //function replacement for cSuit()
                    con.query(`SELECT * FROM emoji WHERE vCode = '${vCode}' AND otype ='Outfit'`, (err, rows) => {
                        let psh = new Array;
                        if(!rows.length) {
                            psh.push({
                                name: "No Costume emoji",
                                vEmoji: '<:noValk:657472633729843200>',
                                cEmoji: '<:logo:642256192244154369>'
                            });
                        } else {
                            for(let i = 0; i < rows.length; i++) {
                                switch(rows[i].type) {
                                    case 1:
                                        psh.push({
                                            name: rows[i].name,
                                            vEmoji: `<:${rows[i].vEmoji}:${rows[i].suitID}>`,
                                            cEmoji: `<:${rows[i].cEmoji}:${rows[i].cID}>`
                                        });
                                    break;
                                    case 0:
                                        psh.push({
                                            name: rows[i].name,
                                            vEmoji: `<a:${rows[i].vEmoji}:${rows[i].suitID}>`,
                                            cEmoji: `<:${rows[i].cEmoji}:${rows[i].cID}>`
                                        });
                                    break;
                                }
                            }
                        }
                        return err ? reject(err) : resolve(psh);
                    })
                break;
                case 5:
                    con.query(`SELECT * FROM emoji WHERE suitID = '${vCode}'`, (err, rows) => {
                        let psh = '';
                        //console.log(rows.length)
                        if(rows[0].type === 1) {
                            psh = `<:${rows[0].vEmoji}:${rows[0].suitID}>`;
                            console.log(psh);
                        } else {
                            psh = `<a:${rows[0].vEmoji}:${rows[0].suitID}>`;
                            console.log(psh);
                        }
                        return err ? reject(err) : resolve(psh);
                    });
                break;
            }
		})
	},
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
	react: (id) => {
        console.log(id);
        let json = vJson[id];
        console.log(json.emoji[0].id)
		return json.emoji[0].id;
	},
    searchAll: (input) => {
        var psh = [];
    }
}