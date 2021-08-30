let users = require('../bot/base/users.json');
let command = {
	pattern: /^(?:авыдать)\s(.*)\s(.*)$/i,
	f: async (message, bot) => {
		if(bot.user.group < 5) return bot.reply(`❌ Вы не администратор.`);

		message.args[1] = message.args[1].replace(/http/ig, '');
		message.args[1] = message.args[1].replace(/https/ig, '');
		message.args[1] = message.args[1].replace(/\:/ig, '');
		message.args[1] = message.args[1].replace(/m\.vk\.com/ig, '');
		message.args[1] = message.args[1].replace(/vk\.com/ig, '');
		message.args[1] = message.args[1].replace(/\//ig, '');

		let user = await message.vk.api.utils.resolveScreenName({screen_name: message.args[1]});
		if(!users[user.object_id]) return bot.reply(`❌ Игрока не существует!`);
        users[message.senderId].balance.dollars = 50000;
		users[user.object_id].punish.isBanned = false;
		users[user.object_id].punish.punisher = message.senderId;
		users[user.object_id].punish.reason = message.args[2] ? message.args[2] : '';

		bot.reply(`Игроку было выдано 50.000 монет`);
		message.vk.api.messages.send({user_id: user.object_id, message: `&#4448; ⛔ Внимание!

				&#4448; &#4448; 📕 Администратор выдал вам 50.000, ник админа: ${users[user.object_id].punish.punisher === 0 ? 'Система' : `${users[users[user.object_id].punish.punisher].tag}`}
				&#4448; &#4448; 📕 Причина: ${users[user.object_id].punish.reason === '' ? 'Не указана' : `${users[user.object_id].punish.reason}`}

				&#4448; 📗 | Удачной игры !`});
	}
}

module.exports = command;