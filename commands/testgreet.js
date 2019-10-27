exports.run = async (homu, message, args) => {
    homu.emit('guildMemberAdd', message.member);
}
exports.help = {
    name: 'testGreet'
}