const cases = require("../settings/chance_cases.json")
module.exports = {
    r: /(хочу в беседу|conversation|хочу в конфу|beseda)$/i,
    f: function (msg, args, vk, bot){
    vk.api.messages.addChatUser({chat_id: 25, user_id: msg.user}).then(res =>
        {bot({text: `😇 >> Бот упешно добавил вас в чат! Надеемся, что вам там понравится :D`})}
    ).catch(err => {
        bot({text: `&#10134; >> Кажется, что-то произошло с ботом, что он не добавил вас в нашу беседу... Возможно, Вы не добавили бота в друзья, либо обратитесь к администратору по этому поводу - [outs1de_yt|*Клац-Клац*]`})
    })
    },
    rights: 0,
    desc: "чат маи -- беседа Маи =)",
    type: "all",
    typ: "prosto"
}