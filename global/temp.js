if(parseInt(stat) === 1) {
    //Fist post trigger
   let startTime = biTime.startTime().ct;
   let mili1 = biTime.calc1();
   let mili2 = biTime.calc2();
   console.log(`BI data found. Now setting variables...\nBoss: ${boss} Level: ${lvl}\nImage URL: ${bsimg}\nnow setting up setTimeouts\nFirst: ${display_f}\nSecond ${display_s}`);
   setTimeout(delay1 => {
       const firstEmb = new Discord.RichEmbed()
           .setColor(0xcccc00)
           .setTitle('Next Boss has been set up!')
           .setAuthor('Boss Invasion Alert!', 'https://i.imgur.com/QrJKwNl.png', ' ')
           .setDescription(`**${boss}**\nLevel ${lvl}\nGame Starts in 1 hour`)
           .setThumbnail('https://i.imgur.com/JzDnCGJ.png')
           .setImage(bsimg)
           .setTimestamp()
           .setFooter('Diamond Club Armada', 'https://i.imgur.com/FpIimN1.png');

       //message.channel.send("<@&621558338005630978> Get ready!!!");
       console.log('First timer execute');
       homu.channels.get('621547605138341898').send("<@&621558338005630978> Get ready!!!");
       homu.channels.get('621547605138341898').sendEmbed(firstEmb);
   }, biconfig.calc1());
   //Second post trigger
   setTimeout(delay2 => {
       const SecEmb = new Discord.RichEmbed()
           .setColor(0xb20000)
           .setTitle('Next Boss has been set up!')
           .setAuthor('Boss Invasion Alert!', 'https://i.imgur.com/QrJKwNl.png', ' ')
           .setDescription(`**${boss}**\nLevel ${lvl}\nBoss Invasion Starts Now\nGood luck!`)
           .setThumbnail('https://i.imgur.com/JzDnCGJ.png')
           .setImage(bsimg)
           .setTimestamp()
           .setFooter('Diamond Club Armada', 'https://i.imgur.com/FpIimN1.png');
           
       console.log('Second timer execute');
       homu.channels.get('621547605138341898').send("<@&621558338005630978> It's Go time!");
       homu.channels.get('621547605138341898').sendEmbed(SecEmb);
       console.log('prepairing to delete boss.json entires');
       //delete homu.boss[server];
       
/*                 fs.writeFile('./json/boss.json', JSON.stringify(homu.boss), err => {
           if(err) throw err;
           stat = 0;
           if (!homu.jmem.hasOwnProperty(user.id))
           console.log(`BI Procedure complete.\nboss.jason has been cleared.\nNow waiting for data in the next 12 hours.\nHave a good day.\nstat value: ${stat}`);
       }) */
   }, biconfig.calc2());
} else {
   return;
}