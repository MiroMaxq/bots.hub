let command = {
	pattern: /^(?:донат|help)$/i,
	f: (message, bot) => {
		return bot.reply(`Донат меню 
 
                                   💎
                               30.000.000 - 5 рублей 💵 
                                 60.000.000 - 10 рублей 💵 

💥VIP ник - 40 рублей 
💥VIP клан - 40 рублей 
 🚘VIP тачка - 10 рублей 

                                  👑10 уровень - 10 рублей 



<📖> За покупкой писать сюда > https://vk.com/koder_iriston

			`);
	}
}

module.exports = command;