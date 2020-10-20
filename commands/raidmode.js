//admin
const Discord = require("discord.js");
const config = require("./cfg.json");

module.exports = {
    name: 'raidmode',
    run (client, message) {

        const args = message.content.slice(config.prefix.length).trim().split(/ +/g);

        if(!message.member.hasPermission("ADMINISTRATOR"))
        return;

        client.on("guildMemberAdd", async() => {
            let reason = 'Kicked because anti-raid mode is activated.'
            let reasondm = 'Kicked because anti-raid mode is activated. You can contact admin(s) on your server that you are trying to join if you do nothing wrong.'

            await message.member.send(reasondm)
            member.kick(reason);
            message.channel.send('Anti-raid mode activated.')

        })
    }
}