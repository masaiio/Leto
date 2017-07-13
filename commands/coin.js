exports.run = async (client, msg, args) => {
  const m = await msg.channel.send("Coin?");
  const number = Math.floor(Math.random() * 2) + 1;
  if (number === 1) return Promise.resolve(m.edit(`Heads!`));
  return Promise.resolve(m.edit(`Tails!`));
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'coin',
  description: 'Flips a coin for you.',
  usage: 'coin'
};