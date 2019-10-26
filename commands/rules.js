module.exports = {
	name: 'rules',
	description: 'codes to display rules',
	execute(rules, args) {
        //const Discord = require('discord.js')
        //let channel = message.channel;
        
        //banner
        const Banner = new Discord.Attachment('./images/banner.png')
        
        //Armada Info
        let Info = new Discord.RichEmbed({
            color: 0x2c2f33,
	        title: 'Who are we?',
	        author: {
		        name: 'Diamond Club <> About Us',
		        icon_url: 'https://i.imgur.com/sID7rBB.png',
	        },
	        description: `**"We are The Diamond Club <>"**\nIf you're interested in joining, you can find us from the information below:`,
	        thumbnail: {
		        url: 'https://i.imgur.com/JzDnCGJ.png',
	        },
            fields: [
                {
                    name: 'Armada Name:',
                    value: 'DiamondClub',
                    inline: true,
                },
                {
                    name: 'Armada ID:',
                    value: '1034165',
                    inline: true,
                },
                {
                    name: 'Armada Scale:',
                    value: 'Izanami[Tier II]',
                    inline: true,
                },
                {
                    name: 'Server:',
                    value: 'SEA',
                    inline: true,
                },
            ],
        })

        //Rules
        let Armrule = new Discord.RichEmbed({
            color: 0x2c2f33,
	        title: 'Diamond Club <> Rules',
	        description: `"but before joining in, please read these simple rules:`,
	        fields: [
                {
                    name: '#1',
                    value: "Don't Be Evil, No racist comments, no fighting, don't be rude. Be Respectful with other crew.",
                },
                {
                    name: '#2:',
                    value: 'Contribution is a must. We have 150 Weekly Contribution, that means you must accumulate at least 150 point within a week.',
                },
                {
                    name: '#3',
                    value: "Always finish your commissions. Let's keep the commission area clean. if you can't finish it or you ran out, ask someone to finish it. now, if you are finishing someone's commission, don't accept another commission that you know you can't finish.",
                },
                {
                    name: '#4',
                    value: 'Do Boss Invasion. I have a strict rule with this one. even if the boss is dead, you can still participate in "late kills".',
                },
                {
                    name: '#5',
                    value: "If possible, do some matrix floor run and reach at least floor 10. trust me, it's for your own good.",
                },
                {
                    name: '#6',
                    value: `Salt and flexing is "NOT" prohibited. though, keep in moderation. we don't want everyone to go dehydrate. if you get salted, Calm down and just savor the taste of it's salty goodness.`,
                },
                {
                    name: '#7',
                    value: `If someone is asking for Raid/Coop, respond immediately! Either accept it or deny it is up to you. just don't leave them hangging`,
                },
                {
                    name: '#8',
                    value: `Always express your gratitude if you've received something from the warehouse. a small thank you goes a long way.`,
                },
                {
                    name: '#9',
                    value: `Kindly request something from the warehouse. Even if you don't need it, the funds we collect from it is important.`,
                },
                {
                    name: '#10',
                    value: `Lastly, if you're new here, kindly Introduce yourself over at #main-lounge with you ign.`,
                },
                {
                    name: 'That concludes the reading of the rules. Enjoy staying!!!',
                    value: `Remember, Diamond Club will rule the universe! Diamonds in the Sky <>`,
                },
            ],
        });
        //Write code
        rules.channel.send(Banner);
        setTimeout(delay => {
            rules.channel.send(Info).then(rules.channel.send(Armrule));
        },5000)
        

	},
};