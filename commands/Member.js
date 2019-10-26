module.exports = {
	name: 'Member',
	description: 'desc.',
	execute(mem, args) {
        
		mem.delete();
        const Adm = new Discord.Attachment('./images/members-list/A_Nameplate.png')
        const Vim = new Discord.Attachment('./images/members-list/V_Nameplate.png')
        const Cem = new Discord.Attachment('./images/members-list/C_Nameplate.png')
        const Cem2 = new Discord.Attachment('./images/members-list/C_Nameplate-2.png')
        mem.channel.bulkDelete(8);
        setTimeout(Admin,1000);
        setTimeout(Vice,6000);
        setTimeout(Crew,8000);
        setTimeout(Crew2,10000);
        mem.channel.sendMessage('**HOMU is updating member list...\nPlease Stand by...').then(update => {update.delete(11000)});
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
        function Crew2() {
            mem.channel.send(Cem2);
            setTimeout(Upcom => {mem.channel.sendMessage('**HOMU Update Complete**').then(update => {update.delete(3000)});},11000);
        }
	},
};