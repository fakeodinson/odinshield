// Load up the discord.js library
const Discord = require("discord.js");
const ytdl = require("ytdl-core");

// This is your client. Some people call it `bot`, some people call it `self`, 
// some might call it `cootchie`. Either way, when you see `client.something`, or `bot.something`,
// this is what we're refering to. Your client.
const client = new Discord.Client();

var gphapiclient = require('giphy-js-sdk-core');
giphy = gphapiclient('M0HEHRacgyIxYDNNj97sebeZg90HfKte')

//YT api key: AIzaSyDI5Waf6cRhon6yy3bAugvQKOW5cwVieyU

// Here we load the config.json file that contains our token and our prefix values. 
const config = require("./config.json");
// config.token contains the bot's token
// config.prefix contains the message prefix.

client.on("ready", () => {
  // This event will run if the bot starts, and logs in, successfully.
  console.log(`Bot has activated, server stats: ${client.users.size} users, ${client.channels.size} channels, ${client.guilds.size} guilds.`); 
  // Example of changing the bot's playing game to something useful. `client.user` is what the
  // docs refer to as the "ClientUser".

  //client.user.setActivity(`.help | Serving ${client.guilds.size} servers`);

  client.user.setActivity(`${client.users.size} kindly users | .help`, { type: 'WATCHING' });
});

client.on("guildCreate", guild => {
  // This event triggers when the bot joins a guild.
  console.log(`New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`);
});

client.on("guildDelete", guild => {
  // this event triggers when the bot is removed from a guild.
  console.log(`I have been removed from: ${guild.name} (id: ${guild.id})`);
});

client.on("message", async message => {
  // This event will run on every single message received, from any channel or DM.
  
  // It's good practice to ignore other bots. This also makes your bot ignore itself
  // and not get into a spam loop (we call that "botception").
  if(message.author.bot) return;
  
  // Also good practice to ignore any message that does not start with our prefix, 
  // which is set in the configuration file.
  if(message.content.indexOf(config.prefix) !== 0) return;
  
  // Here we separate our "command" name, and our "arguments" for the command. 
  // e.g. if we have the message "+say Is this the real life?" , we'll get the following:
  // command = say
  // args = ["Is", "this", "the", "real", "life?"]
  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  
  // Let's go with a few common example commands! Feel free to delete or change those.
  
  if(command === "ping") {
    // Calculates ping between sending a message and editing it, giving a nice round-trip latency.
    // The second ping is an average latency between the bot and the websocket server (one-way, not round-trip)
    const m = await message.channel.send("Ping?");
    m.edit(`${m.createdTimestamp - message.createdTimestamp}ms.`);
  }
  
  if(command === "say") {
    const pembacot = message.author;
    // makes the bot say something and delete the message. As an example, it's open to anyone to use. 
    // To get the "message" itself we join the `args` back into a string with spaces: 
    const sayMessage = args.join(" ");
    // Then we delete the command message (sneaky, right?). The catch just ignores the error with a cute smiley thing.
    message.delete().catch(O_o=>{}); 
    // And we get the bot to say the thing:  
    message.channel.send(`${sayMessage} *-${pembacot.username}*`);
  }

  if (command === "avatar") {
    const user = message.mentions.users.first() || message.author;
    const avatarEmbed = new Discord.RichEmbed()
        .setColor('FFC058')
        .setAuthor(user.username)
        .setDescription(`[Avatar Link](${user.avatarURL})`)
        .setImage(user.avatarURL);
    message.channel.send(avatarEmbed);
  }

  if(command === 'help') {
    const user = message.author;

    { const listembed = new Discord.RichEmbed()
      .setColor('FFC058')
      .addField(`:mailbox_with_mail: Odin's Bot command list has been sent to ${user.tag}`, 'check your DMs!')
      message.channel.send(listembed);

    }
    const helpembed = new Discord.RichEmbed()
       .setColor('FFC058')
       .setTitle("**Odin's Bot Help Command**")
       .setDescription('Here is the list of the Bot commands! [`click here!`](https://discordapp.com/oauth2/authorize?client_id=595968997950881845&scope=bot&permissions=805314622) to invite this bot to your server')
       .setAuthor(`here is your help, ${user.username} !`, user.avatarURL)
       .setThumbnail('https://cdn.discordapp.com/attachments/453157830862569473/607409189429575690/Odin_SU.png')
       .addField('.ping', `Checks your latency time. ('ping' depends on the bot's connection)`)
       .addField('.say [say anything!]', 'Tells the bot to say something')
       .addField('.avatar', "Checks your avatar or mentioned user's avatar")
       .addField('.slap [member]', 'slap your friends or even yourself (thats weird)')
       .addField('.hug [member]', 'hug your friends... and yes, even yourself.')
       .addField('.pat [member]', 'pat your friends to support them')
       .addField('.kiss [member]', 'kiss your loved one!, or maybe two, or three...')
       .addBlankField()
       .addField('**Moderatoration Commands**', 'Permission needed')
       .addBlankField()
       .addField('.purge [input amount]', 'Clears messages in a particular channel')
       .addField('.kick [member] (optional reason)','Kicks someone out from the server')
       .addField('.ban [member] (optional reason)', 'Bans someone out from the server')
       .setFooter('This bot was created by Rahman Odinson#8549', 'https://cdn.discordapp.com/avatars/342962905538363394/a1ff184aa262f16fff1880b4dfff9966.png?size=2048');
    message.author.send(helpembed);
  }

  //FUN STUFFs

  if(command === 'slap') {
    const user = message.mentions.users.first();
    const slapgif = giphy.search('gifs', {"q": "slap"})
     .then((Response) => {
       var totalresponses = Response.data.length;
       var ResponseIndex = Math.floor((Math.random() * 10) + 1) % totalresponses;
       var ResponseFinal = Response.data[ResponseIndex];

       if(!user)
        return message.channel.send(`${message.author} you slapped yourself! LOL`, { files: [ResponseFinal.images.fixed_height.url]})

      message.channel.send(`${user} have been slapped by ${message.author}!`, { files: [ResponseFinal.images.fixed_height.url]})
     })
  };

  if(command === 'hug') {
    const user = message.mentions.users.first();
    const huggif = giphy.search('gifs', {"q": "hug"})
     .then((Response) => {
       var totalresponses = Response.data.length;
       var ResponseIndex = Math.floor((Math.random() * 10) + 1) % totalresponses;
       var ResponseFinal = Response.data[ResponseIndex];

       if(!user)
        return message.channel.send(`${message.author} seriously, hugged yourself? JOMBLO!`, { files: [ResponseFinal.images.fixed_height.url]})

      message.channel.send(`${user} hugged by ${message.author}! aaaaww :hugging: :heart:`, { files: [ResponseFinal.images.fixed_height.url]})
     })
  };

  if(command === 'pat') {
    const user = message.mentions.users.first();
    const patgif = giphy.search('gifs', {"q": "pat"})
     .then((Response) => {
       var totalresponses = Response.data.length;
       var ResponseIndex = Math.floor((Math.random() * 10) + 1) % totalresponses;
       var ResponseFinal = Response.data[ResponseIndex];

       if(!user)
        return message.channel.send(`${message.author} puk puk puk to myself`, { files: [ResponseFinal.images.fixed_height.url]})

      message.channel.send(`${user} puk puk puked by ${message.author}`, { files: [ResponseFinal.images.fixed_height.url]})
     })
  };

  if(command === 'kiss') {
    const user = message.mentions.users.first();
    const kissgif = giphy.search('gifs', {"q": "kiss"})
     .then((Response) => {
       var totalresponses = Response.data.length;
       var ResponseIndex = Math.floor((Math.random() * 10) + 1) % totalresponses;
       var ResponseFinal = Response.data[ResponseIndex];

       if(!user)
        return message.channel.send(`${message.author} selflove! :heart:`, { files: [ResponseFinal.images.fixed_height.url]})

      message.channel.send(`${user} kissed by ${message.author} MUAACHH :kissing_closed_eyes:`, { files: [ResponseFinal.images.fixed_height.url]})
     })
  };

  //HIDDEN

  if(command === 'pleasework') {

    if(!message.member.hasPermission("ADMINISTRATOR"))
      return;

    message.channel.send(`This bot is running perfectly.`);
  }


  //MODERATION COMMANDS SECTION!!!

  if(command === "kick") {

    if(!message.member.hasPermission(["KICK_MEMBERS", "ADMINISTRATOR"]))
      return message.reply("Sorry, you don't have permissions to use this!");
    
    let member = message.mentions.members.first() || message.guild.members.get(args[0]);
    if(!member)
      return message.reply("Please mention a valid member of this server");
    if(!member.kickable) 
      return message.reply("I cannot kick this user! Do they have a higher role? Do I have kick permissions?");
    
    let reason = args.slice(1).join(' ');
    if(!reason) reason = "No reason provided";
    
    await member.kick(reason)
      .catch(error => message.reply(`Sorry ${message.author} I couldn't kick because of : ${error}`));
      const user = message.mentions.users.first();
      const kickembed = new Discord.RichEmbed()
      .setColor('F21111')
      .addField(`:boot:${user.tag} has been kicked from the server by ${message.author.tag}`, `Reason: ${reason}`)
      .setImage('https://media.giphy.com/media/l1J3AS8RShMebsmgU/giphy.gif')
    message.channel.send(kickembed);

  }
  
  if(command === "ban") {
    if(!message.member.hasPermission(["ADMINISTRATOR", "BAN_MEMBERS"]))
      return message.reply("Sorry, you don't have permissions to use this!");
    
    let member = message.mentions.members.first();
    if(!member)
      return message.reply("Please mention a valid member of this server");
    if(!member.bannable) 
      return message.reply("I cannot ban this user! Do they have a higher role? Do I have ban permissions?");

    let reason = args.slice(1).join(' ');
    if(!reason) reason = "No reason provided";
    
    await member.ban(reason)
      .catch(error => message.reply(`Sorry ${message.author} I couldn't ban because of : ${error}`));
    const user = message.mentions.users.first();
    const banembed = new Discord.RichEmbed()
      .setColor('F21111')
      .addField(`:hammer:${user.tag} has been banned from the server by ${message.author.tag}`, `Reason: ${reason}`)
      .setImage('https://media.giphy.com/media/C51woXfgJdug/giphy.gif')
    message.channel.send(banembed);
  }
  
  if(command === "purge") {

    if(!message.member.hasPermission(["KICK_MEMBERS", "MANAGE_ROLES", "MUTE_MEMBERS", "ADMINISTRATOR", "DEAFEN_MEMBERS"]))
    return message.reply("Sorry, you don't have permissions to use this!");
    const deleteCount = parseInt(args[0], 10);
    
    if(!deleteCount || deleteCount < 2 || deleteCount > 1000)
      return message.reply("Please provide a number between 2 and 1000 for the number of messages to delete");

    const fetched = await message.channel.fetchMessages({limit: deleteCount});
    message.channel.bulkDelete(fetched)
      .catch(error => message.reply(`Couldn't delete messages because of: ${error}`));
}

  // "});" yang dibawah ini, TIDAK BOLEH DIHAPUS ATAU DIGANTI KEDUDUKANNYA!!


});
client.login(config.token);