const rand = require("../plugins/functions.js").rand
module.exports = {
	r: /(Игры|game)/i,
	f: function (msg, args, vk, bot){
		var rep = ["\n🎲 Игры: \n👥 РГБ <К|З|Ч> <СТАВКА> — [красное x2], [зеленое x14], [черное x2] тип рулетки  \n👥 Кости <СТАВКА> — игра «Кости» \n👥 Рулетка <СТАВКА> — рулетка " ]
		return bot({text: rand(rep)})
	},
	desc: "Игры -- список игр",
	rights: 0,
	type: "all"
}
