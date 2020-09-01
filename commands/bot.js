const Discord = require("discord.js");
const config = require("./cfg.json");

module.exports = {
    name: 'bot',
    async run(client, message) {

        const args = message.content.slice(config.prefix.length).trim().split(/ +/);
        const guildmember = message.mentions.members.first() || message.member;

        const helpembed = new Discord.RichEmbed()
        .setColor('FFEF00')
        .setTitle('Here are the following sub-commands:  ')
        .addField(':hourglass: runtime', '**uses:** `.bot runtime`\n **for:** to show the bot online time')
        .addField(':newspaper2: info', '**uses:** `.bot info`\n **for:** to show the bot general information')

        let totalSeconds = (client.uptime / 1000);
        let days = Math.floor(totalSeconds / 86400);
            totalSeconds %= 86400;
        let hours = Math.floor(totalSeconds / 3600);
            totalSeconds %= 3600;
        let minutes = Math.floor(totalSeconds / 60);
        let seconds = Math.floor(totalSeconds % 60);

        const uptime = `${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds.`;
        const uptimesecondary = `days ${days}, ${hours}:${minutes}:${seconds}`;
        const uptime3 = `${days}d, ${hours}h, ${minutes}m, ${seconds}s!`;

        const runtimeembed = new Discord.RichEmbed()
        .setColor('FFEF00')
        .setTitle(`Bot Runtime: **${uptime}**`)
        .setDescription(`or in short :arrow_right: ${uptimesecondary}`)

        const infoembed = new Discord.RichEmbed()
        .setColor('FFEF00')
        .setThumbnail('https://emoji.gg/assets/emoji/9375_Information.png')
        .setTimestamp()
        .setFooter(`Online for ${uptime3}`, 'https://cdn.discordapp.com/avatars/595968997950881845/3d19a366cfb90d914745d1905f9a96eb.png?size=2048')
        .setTitle('General Information')
        .addField('About', 'Odinshield is an open-source discord bot mainly serves purposes as auto-moderator. But not only that, it can do so many things as well like funny stuffs so you can brighten up your chat channel. As mentioned, Odinshield is an open-source discord bot meaning you can contribute to make this bot better!')
        .addField('How To Contribute?', "For now, there are two ways to contribute. First is, if you want to improve this bot and know how to code, you can make a pull request in [my GitHub Repository](https://github.com/fakeodinson/odinshield/tree/develop) _(Also, keep in mind to only make pull request in `Develop` branch)_. Feel free to add anything. Just go wild! The second is you can report flaws, bugs, or exploits within the bot to `Odinson#8549`. Or if you want to give suggestions go ahead. I do appreciate it!")
        .addField('Miscellaneous', ":man_construction_worker: **Creator:** `Odinson#8549`\n :tools: **Contributors:** `Odinson#8549`\n :globe_with_meridians: **GitHub Repo:** https://github.com/fakeodinson/odinshield\n :bookmark: **GitHub Wiki:** on progress\n :house: **Discord Server:** homeless for now :(")

        if (args[1] === 'info') {
            return message.channel.send(infoembed);
        }

        else if (args[1] === 'runtime') {
            return message.channel.send(runtimeembed);
        }
        message.channel.send(helpembed);
    }
}