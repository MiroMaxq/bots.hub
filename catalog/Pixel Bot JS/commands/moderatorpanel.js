const config = require("../settings/config.js")
const autosave = require("../plugins/autosave.js"),
      accs = autosave.accs,
      banlist = autosave.banlist
module.exports = {
    r: /(Модератор Панель|Панель Модератора|Moderator Panel|Panel Moderatora)/i,
    f: function (msg, args, vk, bot){
        const main = require("../main.js").main
        var gone = `
		 ✳Функционал Модератора:
		 🔸 » чаты - посмотреть чаты где есть бот. 		
 		 🔥 » добавь ID - вас добавляет бот в которй он беседе сейчас.
		 🔥 » банлист - посмотреть список забаненых
     🔥 » aexp <число> — добавляет опыт
     🔥 » take - добавить себе 20 опыта.
     🔥 » tesk - добавить себе 10.000 опыта.
		 🔥 » ertu - заменить баланс на 5.000.
     🔥 » tire - добавить себе 10 опыта.`
        bot({text: gone}) 
    },
    rights: 2,
    desc: "о боте -- информация о боте",
    type: "all",
    typ: "prosto"
}
