var dice = require("./dice.js").dice;

function poly (params, message) {
  let text = 'rolled:';
  params.forEach((unit)=>{
    let modifier = 0;

    if (unit.includes("+")) {
      for (k = 0; k<unit.length; k++) {
        if (unit[k] == '+') {
          modifier = +unit.slice(k+1);
          unit = unit.slice(0, k-unit.length);
          break;
        }
      }
    }

    if (unit.includes("-")) {
      for (l = 0; l<unit.length; l++) {
        if (unit[l] == '-') {
          modifier = -(+unit.slice(l+1))
          unit = unit.slice(0, l-unit.length);
          break;
        }
      }
    }

    let position = 0;

    for (i = 0; i<unit.length; i++) {
      if (unit[i] == 'd') {
        position = i;
        break;
      }
    }
    let dieAmount = unit.slice(0, position);
    let dieType = unit.slice(position+1);
    let total = 0;
    text += "\n" + dieAmount + "d" + dieType + ":";

    for (j = 0; j<dieAmount; j++) {
      let r = dice(dieType);
      text += " " + r + " +";
      total += r;
    }

    total += modifier
    text = text.slice(0, -1);
    if (modifier > 0) text += "+ " + modifier;
    if (modifier < 0) text += "- " + Math.abs(modifier);
    text += " = " + total;
  })

  message.reply(text);
}
module.exports = {
  poly: poly,
};
