exports.run = (homu, message, args) => {
    message.delete();
    const Discord = require('discord.js')
    const img1 = new Discord.Attachment('./images/chart.png')
    const disclaim = new Discord.RichEmbed()
        
    .addField('This channel is being updated daily at 12:00 +8GMT and 23:00 +8GMT',"Note: Our 150 contbution quota is on a weelky basis. So don't force yourself into doing dailies if you ran out of stamina. you can always do it the next day.")
    .setColor(0x2e2e2e)
    .setImage('https://i.imgur.com/gDaxAEl.png')
    //build-in purge command for clean update
    message.channel.bulkDelete(3);
    //posting new contbution content
    message.channel.sendEmbed(disclaim).then(message.channel.send(img1)).catch(console.error);
};

exports.help = {
	name: 'con'
};