/* const config = {
    token: process.env.TOKEN,
    owner: process.env.OWNER,
    prefix: process.env.PREFIX
};
module.exports = { config };
 events/message.js
    to use a property in another file, see the line below 
{ config } = require('./index');
const prefix = config.prefix;
  This is an alternative way of doing instanceof, as the one above
    is using object destructuring (google it if need be)
    const { config: {prefix } } = require('./index');
    
    then you can use the prefix simply by getting the variable "prefix"  */
const { prefix } = require('../config.js');

module.exports = async (homu, message) => {
    if(message.author.bot) return;
    if(message.content.indexOf(prefix)!== 0) return;
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    const cmd = homu.commands.get(command);
    if(!cmd) return;

    cmd.run(homu, message, args);
}