exports.run = (homu, message, args) => {
    
    const arg1 = args[0];
    const arg2 = args[1];
    console.log(`Argument 1 is: "${arg1}"\nArgument 2 is: "${arg2}"\nThe Whole Argument is :${args}`);
    /* switch(arg1,arg2){
        case 'my','name':
            const name = message.member.displayName;
            message.channel.send(`Your name is ${name}`);
        return;
        default:
            const respond = args.join(' ')
            message.delete();
            message.channel.send(`you said, "${respond}"\nI say, No! Fuck you!`);
        return;
    }; */
    if(arg1 === 'my' && arg2 === 'name') {
        const name = message.member.displayName;
        message.channel.send(`Your name is ${name}`);
    } /* else if(arg1 === 'I' && arg2 === 'love'){

    } */else {
        const respond = args.join(' ');
        //message.delete();
        message.channel.send(`Why would I say "${respond}" if it isn't true?`);
    };
    /* if(args === 'myname') {
        const name = message.member.displayName;
        //message.delete();
        message.channel.send(`Your name is ${name}`);
    } else {
        const respond = args.join(' ')
        //message.delete();
        message.channel.send(`you said, "${respond}"\nI say, No! Fuck you!`);
    } */
}
exports.help = {
    name: 'say'
}