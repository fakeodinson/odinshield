//mod, admin
const Discord = require("discord.js");
const config = require("./cfg.json");

module.exports = {
    name: 'kick',
    async run(client, message) {
        
        const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
        
        if(!message.member.hasPermission("KICK_MEMBERS"))
        return;
        let member = message.mentions.members.first() || message.guild.members.get(args[0]);
        if(!member)
            return message.reply('mention a valid member of this server.');
        if(!member.kickable)
        return message.reply('i cannot kick this user. Do they have higher role?');
        
        let reason = args.slice(2).join(' ');
        if(!reason) reason = "no reason provided.";

        await member.kick(reason)
            .catch(error => message.reply(`sorry, ${message.author}. I could not kick this user because of ${error}.`))
            const user = message.mentions.users.first();
            const embed = new Discord.RichEmbed()
                .setColor('F21111')
                .addField(`:boot:${user.tag} kicked from the server.`, `reason: ${reason}`)
        message.channel.send(embed);        
    }
}