exports.run = (homu, message, args) => {

    //const msg = args;
    const arg1 = args[0].toLowerCase();
    const arg2 = args[1].toLowerCase();
    console.log(`Argument 1 is: "${arg1}"\nArgument 2 is: "${arg2}"\nThe Whole Argument is :${args}`);
    if (arg1 === 'my' && arg2 === 'name') {
        const name = message.member.displayName;
        message.channel.send(`Your name is ${name}`);
    } else if (arg1 === 'i' && arg2 === 'love') {
        
        switch (args[2]) {
            case 'you':
                message.channel.send('Well... fuck you!')
                return;
            case 'turtle':
                message.channel.send("Fuck him! and fuck you for asking me to say that!\nI'll cook him into soup.");
            return;
            default:
                const rand_res = ['burn it to ash...', 'throw it in the window', 'dump it the the nearest iceburg you see', 'smash it wth a hammer']
                vtr = ['I', 'love']
                remlv = args.filter(item => !vtr.includes(item));
                lv = remlv.join(' ');
                console.log(`${remlv}\n${lv}`)
                message.channel.send(`you don't love " **${lv}** " at all.\nin fact, you hate it so much, you want to ${rand_res[Math.floor(Math.random() * rand_res.length)]}`);
                return;
        }
    } else {
        const respond = args.join(' ');
        //message.delete();
        message.channel.send(`Why would I say "${respond}" if it isn't true?`);
    };
}
exports.help = {
    name: 'say'
}