var print = require("./printValues.js").print;
var roll = require("./roll.js").roll;
const config = require("../config.js").config;

function destiny(params, destinyBalance, message, bot, channelEmoji) {
  if (Object.keys(destinyBalance).length === 0) destinyBalance = initdestinyBalance();

  //!destiny commands
  var command = params[0];
  switch(command) {
    //Sets Denstiny balance per color
    case "set":
    case "s":
      destinyBalance = initdestinyBalance();
      console.log("Setting current Destiny Balance for " + message.author.username);
      //check if numbers are used
      if (params.length > 1) {
        if ((params[1].match(/\d+/g)) != null) {
          for (var i = 0; i < params.length; i++) {
            var color = params[i].replace(/\d/g, "");
            switch(color) {
              case "l":
                destinyBalance.light = (params[i]).replace(/\D/g, "");
                break;
              case "d":
                destinyBalance.dark = (params[i]).replace(/\D/g, "");
                break;
              default:
                break;
              }
          }
        } else {
          for(var i = 0; i < params[1].length; i++) {
            var color = params[1][i];
            switch(color) {
              case "l":
                destinyBalance.light = destinyBalance.light + 1;
                break;
              case "d":
                destinyBalance.dark = destinyBalance.dark + 1;
                break;
              default:
                break;
              }
            }
          }
        }
        break;

    //Reset the Destiny pool
    case "reset":
      console.log(message.author.username + " resets the Destiny Pool");
      destinyBalance = initdestinyBalance();
      message.reply(" resets the Destiny Pool");
      break;
    //Use a lightside from the Destiny pool
    case "light":
    case "l":
      if (destinyBalance.light <= 0){
        message.channel.send("No lightside points available, request will be ignored");
        break;
      } else {
        console.log(message.author.username + " uses a Lightside point");
        destinyBalance.light--;
        destinyBalance.dark++;
        message.reply(" uses a Lightside point");
        break;
      }
    //Use a darkside from the Destiny pool
    case "dark":
    case "d":
      if (destinyBalance.dark <= 0){
        message.channel.send("No Darkside points available, request will be ignored");
        break;
      } else {
        console.log(message.author.username + " uses a Darkside point");
        destinyBalance.dark--;
        destinyBalance.light++;
        message.reply(" uses a Darkside point");
        break;
      }
    case "roll":
    case "r":
      console.log("Rolling Destiny for " + message.author.username);
      let destinyRoll = roll(["w"], message, bot, "Destiny roll", channelEmoji).results;
      destinyBalance.light = +destinyBalance.light + +destinyRoll.lightside;
      destinyBalance.dark = +destinyBalance.dark + +destinyRoll.darkside;
      break;
    default:
      console.log("Just printing destinyBalance");
      break;
  }
  printdestinyBalance(destinyBalance, bot, channelEmoji, message);
  return destinyBalance;

  //Prints out destiny pool to channel
}

function initdestinyBalance() {
  console.log('initing');
  return {
      light: 0,
      dark: 0,
      face: "",
      };
}

function printdestinyBalance(destinyBalance, bot, channelEmoji, message) {
  destinyBalance.face = "";
  for (var i = 1; i <= destinyBalance.light; i++) {
      destinyBalance.face += print("lightside", bot, channelEmoji);
      }
  for (var i = 1; i <= destinyBalance.dark; i++) {
      destinyBalance.face += print("darkside", bot, channelEmoji);
      }
  message.channel.send("Destiny Pool: ");
  if (destinyBalance.face != "") {
    message.channel.send(destinyBalance.face);
  }
}

module.exports = {
    destiny: destiny,
};
