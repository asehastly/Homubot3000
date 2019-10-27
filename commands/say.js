exports.run = (homu, message, args) => {
    if(args[2] === 'myname') {
        const name = message.member.displayName;
        message.delete();
        message.channel.send(`Your name is ${name}`);
    } else {
        const respond = args.join(' ')
        //message.delete();
        message.channel.send(`you said, "${respond}"\nI say, No! Fuck you!`);
    }
}
exports.help = {
    name: 'say'
}