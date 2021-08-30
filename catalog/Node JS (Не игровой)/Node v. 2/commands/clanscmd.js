const config = require("../settings/config.js")
const autosave = require("../plugins/autosave.js"),
      accs = autosave.accs,
      banlist = autosave.banlist
module.exports = {
    r: /(Кланы|clans)/i,
    f: function (msg, args, vk, bot){
        const main = require("../main.js").main
        var gone = `🕹 Клановые команды: 
(🏆) -> клан создать <НАЗВАНИЕ> — создать клан
(🏆) -> клан удалить ID — удалить модера из клана
(🏆) -> клан пополнить — пополнить баланс клана
(🏆) -> клан покинуть — выйти из клана
(🏆) -> клан инфо — информация о вашем клане
(🏆) -> клан кик ID — кикнуть из клана
(🏆) -> клан лист — список участников клана
(🏆) -> клан модер ID — сделать модером клана
(🏆) -> клан снять — снять баланс клана
(🏆) -> клан тип — установить тип клана 1 - Открыт 2 - закрыт
(🏆) -> клан вступить <НОМЕР КЛАНА> — Вступить в клан`
        bot({text: gone}) 
    },
    rights: 0,
    desc: "о боте -- информация о боте",
    type: "all",
    typ: "prosto"
}
