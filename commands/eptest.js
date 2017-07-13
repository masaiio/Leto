exports.run = async (client, msg, args) => {
  //vet imporper input 
  client.log("debug", "value: " + args[0]);
  //check if args a defined value
  if(args[0] == undefined) {
    return msg.reply("Must provide a Skill Value. Integer 0-99");
  };
  // check if arg has only one defined value
  if(args[1] != undefined) {
    return msg.reply("Must provide only one Skill Value. Integer 0-99");
  };
  //check if number is integer
  const check = parseInt(args[0], 10);
  if(!Number.isInteger(check)){
    return msg.reply("Must provide Integer Skill Value. Integer 0-99");
  }
  //check if arg is in range 
  if(check < 0 || check > 99) {
    return msg.reply("Must provide integer 0-99");
  };
  //place initial statement
  const m = await msg.channel.send("Calcuating...");
  
  // get number 0 through 99
 const roll = Math.floor(Math.random() * 100); //The maximum is exclusive and the minimum is inclusive
  // compare roll to argument
  const margin = check - roll;
  if(check < roll) {
    return Promise.resolve(m.edit("fail! Roll:" + roll + " test: " + check + " MOF: " + margin));
  }
  //return generated number
  return Promise.resolve(m.edit("sucess!! Roll:" + roll + " test: " + check + " MOS: +" + margin));
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: "eptest",
  description: "Makes a simple test for Eclipse Phase",
  usage: "eptest [Integer 0-99]"
};
