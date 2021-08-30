const rand = require("../plugins/functions.js").rand 
const bank = require('../plugins/autosave.js').bank 
const accs = require("../plugins/autosave.js").accs 
module.exports = { 
r: /(выдать)\s(х|о|л|б|а|к|бк|ба|бб|п|ник|promo)\s([0-9]+)\s([^]+)/i, 
f: (msg, args, vk, bot) => { 
var i = accs.filter(a=> a.id == msg.user).map(a=> a.uid)
if(args[2] == 'х'){ 
bot({text: "Выдать о|л|б|а|к|бк|ба|бб|п ид количество. \nО-Опыт🌟 Лимит: 500 \nЛ-Лвл🌟 Лимит: 100 \nК-Коины$ Лимит: 50000 \nА-Алмазы💎 Лимит: 50000 \nБ-Биткоины💳 Лимит: 50000 \nБК-Коины$ в Банк Лимит: 50000 \nБА-Алмазы💎 в Банк Лимит: 50000 \nББ-Биткоины💳 в Банк Лимит: 50000 \n💳Выдача в банк по ид банка"})
} 
if(args[2] == 'о'){ 
if(Number(args[3]) > 50000) return bot ({text: "\n⚠ Нельзя добавлять больше 50000 Опыта"}) 
accs[args[3]].exp += Number(args[4]) 
bot({text: "✅Успешно выдал на ид:"+args[3]+" [опыта: " + args[4] + "] 🌟"})
}
if(args[2] == 'л'){ 
if(Number(args[3]) > 100) return bot ({text: "\n⚠ Нельзя добавлять больше 100 Лвлов"}) 
accs[args[3]].level += Number(args[4]) 
bot({text: "✅Успешно выдал на ид:"+args[3]+" [лвл: " + args[4] + "] 🌟"})
}
if(args[2] == 'к'){ 
if(Number(args[3]) > 50000) return bot ({text: "\n⚠ Нельзя добавлять больше 50000 Коинов"}) 
accs[args[3]].balance += Number(args[4]) 
bot({text: "✅Успешно выдал на ид:"+args[3]+" [Коинов: " + args[4] + "] $"}) 
}
if(args[2] == 'бк'){ 
if(Number(args[3]) > 50000) return bot ({text: "\n⚠ Нельзя добавлять больше 50000 Коинов в банк"}) 
bank[args[3]].balance.balance += Number(args[4]) 
bot({text: "✅Успешно выдал на ид:"+args[3]+" [банк: " + args[4] + "] $"}) 
}
if(args[2] == 'а'){ 
if(Number(args[3]) > 50000) return bot ({text: "\n⚠ Нельзя добавлять больше 50000 Алмазов 💎"}) 
accs[args[3]].inventory.diamonds += Number(args[4]) 
bot({text: "✅Успешно выдал на ид:"+args[3]+" [Алмазов: " + args[4] + "] 💵"}) 
}
if(args[2] == 'ба'){ 
if(Number(args[3]) > 50000) return bot ({text: "\n⚠ Нельзя добавлять больше 50000 Алмазов в банке 💎"}) 
bank[args[3]].balance.diamonds += Number(args[4]) 
bot({text: "✅Успешно выдал на ид:"+args[3]+" [банк: " + args[4] + "] 💵"}) 
}
if(args[2] == 'б'){ 
if(Number(args[4]) > 50000) return bot ({text: "\n⚠ Нельзя добавлять больше 50000 биткоинов 💳"}) 
accs[args[3]].inventory.bitcoins += Number(args[4]) 
bot({text: "✅Успешно выдал на ид:"+args[3]+" [биткоинов: " + args[4] + "] 💵"}) 
} 
if(args[2] == 'бб'){ 
if(Number(args[4]) > 50000) return bot ({text: "\n⚠ Нельзя добавлять больше 50000 биткоинов в банке 💳"}) 
bank[args[3]].balance.bitcoins += Number(args[4]) 
bot({text: "✅Успешно выдал на ид:"+args[3]+" [банк: " + args[4] + "] 💵"}) 
} 
/*if(args[2] == 'п'){ 
if(Number(args[4]) > 4) return bot ({text: "\n⚠ Нельзя выдать админ-уровень более 4"}) 
accs[args[3]].rights = Number(args[4]) 
bot({text: "Успешно выдал на ид:"+args[3]+" [Права уровня: " + args[4] + "] 💵"}) 
} 
if(args[2] == 'ник'){ 
if(Number(args[4]) > 4) return bot ({text: "\n⚠ Нельзя выдать админ-уровень более 4"}) 
accs[args[3]].nickname = (args[4]) 
bot({text: "Успешно установлен ник на ID:"+args[3]+" [Ник: " + args[4] + "] 💵"}) 
} 
*/
}, 
rights: 4, 
desc: "выдать (о|л|б|а|к|бк|ба|бб|п) <ID> <число>", 
type: "all", 
typ: "game" 
}