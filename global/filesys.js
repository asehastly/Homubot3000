const fs = require('fs');
module.exports = (bot) => {
    
    const handlerFiles = fs.readdirSync('./event').filter(file => file.endsWith('.js'));

    for (let file of handlerFiles) {
        const event = require(`./event/${file}`);
        bot.commands.set(event.name, event);
    }

    const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

    for (let file of commandFiles) {
        const command = require(`./commands/${file}`);
        bot.commands.set(command.name, command);
    }
};