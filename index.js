const Discord = require('discord.js');
const fs = require('fs');
const bot = new Discord.Client();
bot.commands = new Discord.Collection();
require('dotenv-flow').config();

const config = {
    token: process.env.Token,
    owner: process.env.OWNER,
    PREFIX: process.env.PREFIX
}

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    bot.commands.set(command.name, command);
}

bot.on('ready', async () => {
    console.log('Homubot3000 online\nReady to go...');

    bot.generateInvite(['ADMINISTRATOR']).then(link => {
        console.log(link);
    }).catch(err => {
        console.log(err.stack)
    });
})

//Codes below


//end of Codes
bot.login(config.token);