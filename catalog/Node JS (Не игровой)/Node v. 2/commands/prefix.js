const accs = require('../plugins/autosave.js').accs
module.exports = {
	r: /(prefix|Префикс) ([^]+)/i,
	f: function (msg, args, vk, bot){
       var i = accs.filter(a=> a.id == msg.user).map(a=> a.uid)
       if(accs[i].level < 3) return bot({text: "🌚 | Чтобы установить префикс нужно иметь хотя бы 3 уровень!"})
       if(accs[i].balance < 10000) return bot({text: "❌ | Чтобы установить префикс нужно иметь на балансе минимум 10000 коинов."})
       if(args[2].length >= 20) return bot({text: "❌ | Превышен максимальный лимит символов ника."})
       accs[i].balance -= 10000
       accs[i].prefix = args[2]
       bot({text: `✔ | Префикс <<${args[2]}>> успешно установлен!`})
	},
	rights: 0,
	desc: "Префикс <Префикс> -- установить себе Префикс | Стоимость: 10000 коинов",
	type: "all",
	typ: "prosto"
}