if(parseInt(stat) === 1) {
    //Fist post trigger
   let startTime = biTime.startTime().ct;
   let mili1 = biTime.calc1();
   let mili2 = biTime.calc2();
   console.log(`BI data found. Now setting variables...\nBoss: ${boss} Level: ${lvl}\nImage URL: ${bsimg}\nnow setting up setTimeouts\nFirst: ${display_f}\nSecond ${display_s}`);
   setTimeout(delay1 => {
       console.log('First timer execute');
       homu.channels.get('621547605138341898').send("<@&621558338005630978> Get ready!!!");
       homu.channels.get('621547605138341898').sendEmbed(firstEmb);
   }, biconfig.calc1());
   //Second post trigger
   setTimeout(delay2 => {
       
       console.log('Second timer execute');
       homu.channels.get('621547605138341898').send("<@&621558338005630978> It's Go time!");
       homu.channels.get('621547605138341898').sendEmbed(SecEmb);
       console.log('prepairing to delete database entires');
       
   }, biconfig.calc2());
} else {
   return;
}







