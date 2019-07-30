const Discord = require("discord.js");
const client = new Discord.Client();
client.on('message', async message => {
 
   if (message.content.startsWith("$new")) {  
        const reason = message.content.split(" ").slice(1).join(" ");  
        if (!message.guild.roles.exists("name", "Support Team")) return message.channel.send(`???? ???? ???? ????? \`Support Team\` ????? ????? ??????? ??? ???? ???? ??????? ????? ???????`);
        if (message.guild.channels.exists("name", "ticket-{message.author.id}" + message.author.id)) return message.channel.send(`You already have a ticket open.`);    /// ALPHA CODES
        message.guild.createChannel(`ticket-${message.author.username}`, "text").then(c => {
            let role = message.guild.roles.find("name", "Support Team");
            let role2 = message.guild.roles.find("name", "@everyone");
            c.overwritePermissions(role, {
                SEND_MESSAGES: true,
                READ_MESSAGES: true
            });  
            c.overwritePermissions(role2, {
                SEND_MESSAGES: false,
                READ_MESSAGES: false
            });
            c.overwritePermissions(message.author, {
                SEND_MESSAGES: true,
                READ_MESSAGES: true
            });
            message.channel.send(`:white_check_mark: ?? ????? ??????, #${c.name}.`);
            const embed = new Discord.RichEmbed()
                .setColor(d1631e)
                .addField(`Hey ${message.author.username}!`, `:white_check_mark:  ?? ????? ??????, #ticket`)
                .setTimestamp();
            c.send({
                embed: embed
            });
        }).catch(console.error);
    }
 
 
  if (message.content.startsWith("-close")) {
        if (!message.channel.name.startsWith(`ticket-`)) return message.channel.send(`You can't use the close command outside of a ticket channel.`);
 
       message.channel.send(`?? ??? ????? ?? ?????? ??????? ??? ????? ????confirm`)
           .then((m) => {
               message.channel.awaitMessages(response => response.content === 'confirm', {
                       max: 1,
                       time: 10000,
                       errors: ['time'],
                   })  
                   .then((collected) => {
                       message.channel.delete();
                   })  
                   .catch(() => {
                       m.edit('?? ??? ????? ?????').then(m2 => {
                           m2.delete();
                       }, 3000);
                   });
           });
   }
 
});
 
 
client.login("NjA1NTE2NTA3MDg2MDYxNTY5.XT9qEA.w8Y7PtMEhLHcefIsN-Ue8u66KJQ");