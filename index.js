// Load up the discord.js library
const Discord = require("discord.js");
// Load the rest of the things we need in this file:
const { promisify } = require('util');
const readdir = promisify(require("fs").readdir);

// Load? client.
const client = new Discord.Client();

//Load the config.json file that contains bot token and prefix values. 
client.config = require("./config.json");
// client.config.token contains the bot's token
// client.config.prefix contains the message prefix

// Useful functions used throughout the bot, like logs and elevation features.
require("./modules/functions.js")(client);

// Commands and aliases are put in collections where they can be read from, catalogued, listed, etc.
client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();

//Fancy node 8 async/await setup, requires in an anonymous function.
(async function() {

  //load **commands** into memory, as a collection, so they're accessible here and everywhere. 
  const cmdFiles = await readdir('./commands/');
  client.log("log", `Loading a total of ${cmdFiles.length} commands.`);
  cmdFiles.forEach(f => {
    try {
      let props = require(`./commands/${f}`);
      client.log("log", `Loading Command: ${props.help.name}. 👌`);
      client.commands.set(props.help.name, props);
      props.conf.aliases.forEach(alias => {
        client.aliases.set(alias, props.help.name);
      });
    } catch (e) {
      client.log(`Unable to load command ${f}: ${e}`);
    }
  });

  //load events, which will include our message and ready event.
  const evtFiles = await readdir('./events/');
  client.log("log", `Loading a total of ${evtFiles.length} events.`);
  evtFiles.forEach(file => {
    const eventName = file.split(".")[0];
    const event = require(`./events/${file}`);
    // This line is awesome by the way. Just sayin'.
    client.on(eventName, event.bind(null, client));
    delete require.cache[require.resolve(`./events/${file}`)];
  });

  //login the client.
  client.login(client.config.token);

// End top-level async/await function.  
}());
