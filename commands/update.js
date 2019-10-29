exports.run = (homu, message, args) => {
    const Discord = require('discord.js')
    //const msg = args;
    if (args === undefined || args.length === 0) message.channel.send('uuuhhhh.... wah?!');
    console.log(args.length);
    var arg1, arg2
    if(args.length === 1) {
        arg1 = args[0].toLowerCase();
        console.log(`1 arguments were declared\nOnly "${arg1}"`)
        
    } else {
        arg1 = args[0].toLowerCase();
        arg2 = args[1].toLowerCase();
        console.log(`2 arguments were declared\n"${arg1}" and "${arg2}"`)
    }
    //console.log(`Argument 1 is: "${arg1}"\nArgument 2 is: "${arg2}"\nThe Whole Argument is :${args}`);
    if (arg1 === 'contribution') {
        message.delete();
        const img1 = new Discord.Attachment('./images/chart.png')
        const disclaim = new Discord.RichEmbed()

            .addField('This channel is being updated daily at 12:00 +8GMT and 23:00 +8GMT', "Note: Our 150 contbution quota is on a weelky basis. So don't force yourself into doing dailies if you ran out of stamina. you can always do it the next day.")
            .setColor(0x2e2e2e)
            .setImage('https://i.imgur.com/gDaxAEl.png')
        //build-in purge command for clean update
        message.channel.bulkDelete(3);
        //posting new contbution content
        message.channel.sendEmbed(disclaim).then(message.channel.send(img1)).catch(console.error);
    } else if (arg1 === 'member' && arg2 === 'list') {
        message.delete();
        const Adm = new Discord.Attachment('./images/members-list/A_Nameplate.png')
        const Vim = new Discord.Attachment('./images/members-list/V_Nameplate.png')
        const Cem = new Discord.Attachment('./images/members-list/C_Nameplate.png')
        const Cem2 = new Discord.Attachment('./images/members-list/C_Nameplate-2.png')
        message.channel.bulkDelete(8);
        setTimeout(Admin, 1000);
        setTimeout(Vice, 6000);
        setTimeout(Crew, 8000);
        setTimeout(Crew2, 10000);
        message.channel.sendMessage('**HOMU is updating member list...\nPlease Stand by...').then(update => { update.delete(11000) });
        function Admin() {
            message.channel.sendMessage('> Admiral');
            message.channel.send(Adm);
        }
        function Vice() {
            message.channel.sendMessage('> Vice Admiral');
            message.channel.send(Vim);
        }
        function Crew() {
            message.channel.sendMessage('> Crew Members');
            message.channel.send(Cem);
        }
        function Crew2() {
            message.channel.send(Cem2);
            setTimeout(Upcom => { message.channel.sendMessage('**HOMU Update Complete**').then(update => { update.delete(3000) }); }, 11000);
        }
    } else {
        message.channel.send('What sould I update?');
    };
}
exports.help = {
    name: 'update'
}