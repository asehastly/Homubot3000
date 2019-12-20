const Discord = module.require('discord.js');
const valks = require('../global/arrays.js');
const { con, valkProcess, emojiDB, react } = require('../global/config.js');


exports.run = async (homu, message, args) => {
    console.log(`------------------------------------------------\nUser has typed |${args}|\n------------------------------------------------`);
    //message.delete();
    switch(args[0]) {
        case undefined:
            message.delete();
            message.channel.send('Please tell me what to do... I am not a mind reader, you know...').then(update => { update.delete(7000)});
        break;
        case "uptime":
            message.delete();
            let totalSeconds = (homu.uptime / 1000);
            let days = Math.floor(totalSeconds / 86400);
            let hours = Math.floor(totalSeconds / 3600);
            totalSeconds %= 3600;
            let minutes = Math.floor(totalSeconds / 60);
            let seconds = totalSeconds % 60;

            message.channel.send(`I am running at\n${days} days\n${hours} hrs.\n${minutes} min.\n${seconds} sec.`).then(update => { update.delete(15000)});
        break;
        case "delete":
            args.shift();
            message.delete();
            message.channel.bulkDelete(args[0]);
            message.channel.send(`${args[0]} has been deleted... I hope you're happy...`).then(update => { update.delete(7000)});
        break;
        case 'valks': case 'valk': case 'valkyrie':
            args.shift();
            if(!args[0]) return message.channel.send("Please type the name of the valkyrie you're trying to see.").then(update => { update.delete(7000)});
            var pfp, bSuit, cSuit, valkfound;

            console.log(`${message.author.tag} as entered "${args.join(" ")}"\nwhich is useless because I'm only accepting "${args[0]}"`);
            const valks = valkProcess(args[0]);
            message.delete();
            console.log(valks);
            if(valks < 1) {
                message.channel.send(notFound(args)).then(update => { update.delete(10000)});
            } else if(valks.length > 1) {
                var num = 0;
                if(args.length > 1) {
                    console.log(`Length of args: ${args.length}`);
                    const valks2 = valkProcess(args[1]);
                    console.log(valks2);
                    if(valks2 < 1) return message.channel.send(notFound(args)).then(update => { update.delete(10000)});
                    console.log(valks2[0].Json);
                    message.channel.send(matchfound(valks2[0].Json)).catch(err => console.log(err));
                } else {
                    const a = react(valks[0].Json);
                    const b = react(valks[1].Json);
                    var react1, react2;
                    
                    const filter = (reaction, user) => [a, b].includes(reaction.emoji.id) && user.id === message.author.id;

                    const embDupl = new Discord.RichEmbed()
                    .setColor('	#23272a')
                        .setAuthor('Valyrie Information', 'https://i.imgur.com/5ejjwD3.png')
                        .setTitle(`Which ${args[0]} are you looking for?`)
                        for(let i = 0; i < valks.length; i++) {
                            //console.log(valks[i].Json);
                            num = num + 1;
                            valkfound = homu.valks[valks[i].Json];
                            //console.log(`${valkfound.emoji[0].id} ${valkfound.valkName}`)
                            embDupl.addField(await emojiDB(valkfound.emoji[0].id, 5), valkfound.valkName)
                        }
                        embDupl.setTimestamp()
                        embDupl.setFooter('King Homu™ Archives', 'https://i.imgur.com/SuxUzng.png');
                    message.channel.send(embDupl).then(async msg => {
                        await msg.react(`${a}`);
                        await msg.react(`${b}`);

                        msg.awaitReactions(filter, {
                            max: 1,
                            time: 30000,
                            error: ['Time']
                        }).then(async collected => {

                            const reaction = collected.first();

                            switch(reaction.emoji.id) {
                                case a:
                                    message.channel.send(await foundEmb(valks[0].Json)).catch(err => console.log(err));
                                    await msg.delete();
                                break;
                                case b:
                                    message.channel.send(await foundEmb(valks[1].Json)).catch(err => console.log(err));
                                    await msg.delete();
                                break;
                            }
                        }).catch(collected => {
                            msg.delete();
                            return message.channel.send("Time's up. too late...").then(del => {del.delete(30000)});
                        })
                    })
                }
            } else {
                message.channel.send(await foundEmb(valks[0].Json)).catch(err => console.log(err));
                console.log(`------------------------------------------------\nUser has selected **something**\n------------------------------------------------`);
            }
        break;
        default: message.channel.send("I have no idea what you've just said... can you clarify that?").then(update => { update.delete(7000)});
    }
    
    async function foundEmb(json) {
        let valkfound = homu.valks[json];
        //console.log(valkfound);
        let pfp = valkfound.pfp;
        let bSuit = await emojiDB(valkfound.vCode[0], 3);
        let cSuit = await emojiDB(valkfound.vCode[0], 4);
        console.log(bSuit);
        console.log(cSuit);
        const embTrue = new Discord.RichEmbed()
        .setColor(valkfound.color)
            .setAuthor('Valyrie Information', 'https://i.imgur.com/5ejjwD3.png', valkfound.url)
            .setTitle(valkfound.valkName)
            .setDescription(`**Weapon type**:${valkfound.weap}\n**Age**:${valkfound.Age}\t\t\t\t**Birthday**:${valkfound.DOB}\n**Measurements**:${valkfound.Measurements}\n**Height**: ${valkfound.Height}\t\t\t**Weight**:${valkfound.Weight}`)
            .setThumbnail(pfp[Math.floor(Math.random()*pfp.length)])
            .addField('Battlesuit', `${bSuit.map(r => `${r.cEmoji} ${r.vEmoji} ${r.name}`).join("\n")}`, true)
            .addField('Outfits', `${cSuit.map(r => `${r.cEmoji} ${r.vEmoji} ${r.name}`).join("\n")}`, true)
            .addField('Bio', valkfound.vBio)
            .setTimestamp()
            .setFooter('King Homu™ Archives', 'https://i.imgur.com/SuxUzng.png');
        return embTrue;
    }
};


exports.help = {
	name: 'test'
}