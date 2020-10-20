const Discord = require("discord.js");
const config = require("./cfg.json");

module.exports = {
    name: 'avatar',
    async run(client, message) {
        const user = message.mentions.users.first() || message.author;
        const avatarEmbed = new Discord.RichEmbed()
            .setColor('FFC058')
            .setAuthor(user.tag)
            .setDescription(`[Avatar Link](${user.avatarURL})`)
            .setImage(user.avatarURL);
        message.channel.send(avatarEmbed);
    }
}