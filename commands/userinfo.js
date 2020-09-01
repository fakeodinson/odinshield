const Discord = require("discord.js");
const config = require("./cfg.json");
module.exports = {
    name: 'userinfo',
    async run(client, message) {

        //define values
        const user = message.mentions.users.first() || message.author;
        const guildmember = message.mentions.members.first() || message.member;
        
        const usertag = user.tag;
        const userstatus = user.presence.status;
        const usergame = user.presence.game || '_no activity displayed_'
        const userdetail = user.presence.details;
        const userid = user.id;
        const date1 = new Date(user.createdAt);
        const date2 = new Date(guildmember.joinedAt);
        const serverjoined = new Intl.DateTimeFormat().format(date2);
        const userjoined = new Intl.DateTimeFormat().format(date1);

            const time = {
                hour: 'numeric',
                minute: 'numeric'
            }

        const serverjoinedtime = new Intl.DateTimeFormat('id-ID', time).format(date2);
        const userjoinedtime = new Intl.DateTimeFormat('id-ID', time).format(date1);
        const username = guildmember.nickname || user.username;
        const usercolor = guildmember.displayHexColor;
        const userrole = guildmember.roles.filter(r => r.name !== '@everyone').map(role =>"`" + role.name + "`").join(', ')
        let totalSeconds = (client.uptime / 1000);
        let days = Math.floor(totalSeconds / 86400);
            totalSeconds %= 86400;
        let hours = Math.floor(totalSeconds / 3600);
            totalSeconds %= 3600;
        let minutes = Math.floor(totalSeconds / 60);
        let seconds = Math.floor(totalSeconds % 60);

        const uptime = `${days}d, ${hours}h, ${minutes}m, ${seconds}s!`;
        const bot = message.guild.members.get('595968997950881845');
        const botcolor = bot.displayHexColor;

      // message.channel.send([usertag, userstatus, usergame, userid, userjoined, serverjoined, serverjoinedtime, userjoinedtime, username, usercolor, userrole, botcolor]);

       const embed = new Discord.RichEmbed()
       .setColor(`${botcolor}`)
       .setTitle(`Info for ${usertag}`)
       .setThumbnail(`${user.avatarURL}`)
       .addField('Account Details', `:desktop: Status: **${userstatus}**\n :video_game: Playing: **${usergame}**\n :hourglass: Joined Discord: __${userjoined}__ at __${userjoinedtime}__\n :bookmark_tabs: User ID: ${userid}`)
       .addField('Server Details', `:calling: Joined this server: __${serverjoined}__ at __${serverjoinedtime}__\n :busts_in_silhouette: Nickname: ${username}\n :rainbow: Name Color: **${usercolor}**\n :military_medal: Roles: ${userrole}`)
       .setTimestamp()
       .setFooter(`Online for ${uptime}`, 'https://cdn.discordapp.com/avatars/595968997950881845/3d19a366cfb90d914745d1905f9a96eb.png?size=2048')

       message.channel.send(embed);
    }
}