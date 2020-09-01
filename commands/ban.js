//mod, admin
const Discord = require("discord.js");
const config = require("./cfg.json");

module.exports = {
    name: 'ban',
    async run(client, message) {

        const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
        
        if(!message.member.hasPermission("BAN_MEMBERS"))
        return;
        let member = message.mentions.members.first() || message.guild.members.get(args[0]);
        if(!member)
            return message.reply('mention a valid member of this server.');
        if(!member.bannable)
        return message.reply('i cannot ban this user. Do they have higher role?');

        let reason = args.slice(2).join(' ');
        if(!reason) reason = "no reason provided.";

        await member.ban(reason)
            .catch(error => message.reply(`sorry, ${message.author}. I could not ban this user because of ${error}.`))
            const user = message.mentions.users.first();
            const embed = new Discord.RichEmbed()
                .setColor('F21111')
                .addField(`:hammer:${user.tag} banned from the server.`, `reason: ${reason}`)
        message.channel.send(embed);     
    }
}