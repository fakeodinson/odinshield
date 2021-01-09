//mod, admin
const Discord = require("discord.js");
const config = require("./cfg.json");

module.exports = {
      name: 'devpurge',
      async run(client, message) {

        const args = message.content.slice(config.prefix.length).trim().split(/ +/g);

        if(message.author.id !== '342962905538363394')
        return;

        const deleteCount = parseInt(args[1] -(-1), 10);

        if(!deleteCount || deleteCount < 2 || deleteCount > 1000)
          return message.reply("provide a number between 1 and 1000 for the number of messages to be deleted.");

        const fetched = await message.channel.fetchMessages({limit: deleteCount});
        message.channel.bulkDelete(fetched)
          .catch(error => message.reply(`Couldn't delete messages because of: ${error}`));
        
          const timeout = 3000
          const embed = new Discord.RichEmbed()
          .setColor('fc9403')
          .setTitle(`:pencil: deleted ${deleteCount - 1} message(s)`)
          .setDescription(`this message will be auto deleted in ${timeout - 2997}s`)

        const waitdelete = await message.channel.send(embed);
        waitdelete.delete(timeout);

      }
  }