const config = require("../settings/config.js")
const autosave = require("../plugins/autosave.js"),
      accs = autosave.accs,
      banlist = autosave.banlist
module.exports = {
    r: /(Товары|Привелегии)/i,
    f: function (msg, args, vk, bot){
        const main = require("../main.js").main
        var gone = `\n📝Привелегии\n&#8195;🔝 VIP - 10 Рублей \n&#8195;Ⓜ MODERATOR - 50 Рублей \n&#8195;🅰 Администратор - 65 Рублей \n&#8195;⚠ Гл.Администратор - 95 Рублей\n&#8195;🔧Президент🔧 - 350 Рублей \n\n🔥 Разрешение на нарушение правил - 200 рублей. \n💰 100.000.000.000.000.000 Коинов - 100 Рублей \n⛔ Анти-бан - 100 рублей \n🐩 Разбан - 30 рублей \n⚠ Скрипт Бота - 500 Рублей \n\n💬 | Покупать у ${config.donate}⚕❄`
        bot({text: gone}) 
    },
    rights: 0,
    desc: "донат - Привелегии Бота",
    type: "all",
    typ: "prosto"
}
