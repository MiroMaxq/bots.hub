let command = {
	pattern: /^(?:помощь|help)$/i,
	f: (message, bot) => {
		return bot.reply(`Мои команды:
👓 Мои команды ( напиши , чего ты хочешь ):

ᅠ 💼 Работа: 
ᅠ ᅠ 🔨 Устроиться 
ᅠ ᅠ ❌ Уволиться 
ᅠ ᅠ 💰 Вывести 

🏆Топ баланс
🏆Топ биткоины
🏁Топ кланы
🏁Топ уровень

ᅠ 📊 Бизнес: 
ᅠ ᅠ 💸 Бизнес купить 
ᅠ ᅠ ❌ Бизнес продать 

ᅠ 📒 Игры: 
ᅠ ᅠ 📈 Трейд [вверх/вниз] [ставка] 
ᅠ ᅠ 🦅 Монетка [орёл/решка] [ставка] 
      🎰 Казино играть [ставка]
 
ᅠ ♻ Разное: 
ᅠ ᅠ 💲 Профиль 
ᅠ ᅠ 💰 Банк 
ᅠ ᅠ 🔋 Ферма 
ᅠ ᅠ ☎ Телефон 
ᅠ ᅠ 🚘 Авто 
ᅠ ᅠ  🔖 Лицензия 
ᅠ ᅠ 🤝 Передать [сумма] + пересл.сообщение 
ᅠ ᅠ 💎 Бонус 
      💰Донат 
	  
ᅠ ᅠ  🌍 Биткоин продать 
ᅠ ᅠ  🌍 Биткоин купить 
ᅠ 💞 Браки: 
ᅠ ᅠ 💍 Брак [ссылка] 
ᅠ ᅠ 💔 Развод 

ᅠ 🚪 Кланы: 
ᅠ ᅠ 💬 Кинфо 
ᅠ ᅠ 📢 Создать [название] (20000$) 
ᅠ ᅠ 📜 Вступить [название] 
ᅠ ᅠ 📝 Покинуть 
ᅠ ᅠ 📋 Внести [сумма] 
ᅠ ᅠ 💸 Взять [сумма]

                          💥ahelp - админ команды

			`);
	}
}

module.exports = command;