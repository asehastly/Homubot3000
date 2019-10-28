exports.run = async (homu, message, args) => {
    let testG = homu.emit('guildMemberAdd', message.member);
    message.channel.send(testG);
}
exports.help = {
    name: 'testGreet'
}