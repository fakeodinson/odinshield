//mod, admin
const Discord = require("discord.js");
const config = require("./cfg.json");

module.exports = {
      name: 'purge',
      async run(client, message) {

        const args = message.content.slice(config.prefix.length).trim().split(/ +/g);

        if(!message.member.hasPermission("MANAGE_MESSAGES"))
        return;

        const deleteCount = parseInt(args[1], 10);

        if(!deleteCount || deleteCount < 2 || deleteCount > 1000)
          return message.reply("provide a number between 2 and 1000 for the number of messages to be deleted.");

        const fetched = await message.channel.fetchMessages({limit: deleteCount});
        message.channel.bulkDelete(fetched)
          .catch(error => message.reply(`Couldn't delete messages because of: ${error}`));
      }
  }