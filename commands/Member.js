module.exports = {
	name: 'Member',
	description: 'desc.',
	execute(mem, args) {
		const Discord = require('discord.js');
        const bot = new Discord.Client();
        
		mem.delete();
        const Adm = new Discord.Attachment('./images/members-list/A_Nameplate.png')
        const Vim = new Discord.Attachment('./images/members-list/V_Nameplate.png')
        const Cem = new Discord.Attachment('./images/members-list/C_Nameplate.png')
        mem.channel.bulkDelete(6);
        setTimeout(Admin,1000);
        setTimeout(Vice,6000);
        setTimeout(Crew,8000);
        function Admin() {
            mem.channel.sendMessage('> Admiral');
            mem.channel.send(Adm);
        }
        function Vice() {
            mem.channel.sendMessage('> Vice Admiral');
            mem.channel.send(Vim);
        }
        function Crew() {
            mem.channel.sendMessage('> Crew Members');
            mem.channel.send(Cem);
        }
	},
};