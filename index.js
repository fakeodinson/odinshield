const Discord = require('discord.js');
const fs = require('fs');
const client = new Discord.Client();
client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

const config = require("./config.json");

//client stuff down here
//CLIENT ON READY
client.on("ready", async () => {

  console.log(`Bot has activated, server stats: ${client.users.size} users, ${client.channels.size} channels, ${client.guilds.size} guilds.`); 

  //discord presence
  client.user.setActivity(`on Alpha testing. v0.2-alpha`);

});
//CLIENT ON GUILD CREATE
client.on("guildCreate", guild => {

  console.log(`New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`);
});
//CLIENT ON GUILD DELETE
client.on("guildDelete", guild => {

  console.log(`I have been removed from: ${guild.name} (id: ${guild.id})`);
});
//CLIENT ON MESSAGE
client.on("message", async message => {

  if(message.author.bot) return;

  if(message.content.indexOf(config.prefix) !== 0) return;

  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const commandName = args.shift().toLowerCase();

  const cmd = client.commands.get(commandName);

  if (!cmd) return;
  cmd.run(client, message, args);

});


client.login(config.token);