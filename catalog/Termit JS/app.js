console.log('TermitBot loaded...');
const {VK, Keyboard} = require('vk-io');
const vk = new VK();
const token_user = new VK();
const fs = require("fs");
const acc = require("./base/acc.json");
const uid = require("./base/uid.json");
const log = require("./base/log.json");
const clan = require("./base/clan.json");
const rep = require("./base/rep.json");
const config = require("./setting/config.json");

token_user.setOptions({ 
	token: 'bc4443a9a188f1237a2dceff321a493249777a45ae6a6f05262b6054cf776c274185c41e0e9255db33059', // токен страницы
	call: 'execute'
});

vk.setOptions({
    token: 'f022db5229bcc1e10698ad0da3a6efc7a201013a5667ca4deb025b97d8fab61242b2442fd18c02497a9fc', // токен группы
    apiMode: 'parallel',
    pollingGroupId: 160410582 // группа
}); 

for(i in acc.users){
	acc.users[i].bloks.cases = false;
	acc.users[i].bloks.bonus = false;
	acc.users[i].bloks.random_game = false;
	acc.users[i].bloks.gun_case = false;
	acc.users[i].bloks.clan = false;
	acc.users[i].bloks.pay = false;
	acc.users[i].bloks.a_case = false;
	acc.users[i].bloks.giverub = false;
	acc.users[i].job.stop = false;
	acc.users[i].bizs.one.stop = false;
	acc.users[i].bizs.two.stop = false;
	acc.users[i].ferm.one.stop = false;
	acc.users[i].ferm.two.stop = false;
	acc.users[i].safe.status = false;
	acc.users[i].safe.key = false;
};

for(i in clan){
	clan[i].war = false;
}

process.env.TZ = "Europe/Moscow";

vk.updates.use(async (message, next) => {  
    if (message.is("message") && message.isOutbox) return; 
    message.user = message.senderId;
    message.text = message.payload.text;  

    if (!message.text) return;
 
    if(!uid[message.user]){
	 	acc.number += 1;
		let numm = acc.number;
		uid[message.user] = {
			id: numm
		}

 		let id = user_id(message.user); 
		
		acc.users[numm] = {
			balance: 100000,
			level: 0, 
			adm_time: 0,
			bitcoin: 1, 
			donate: 1,
               geocoin: 1,
               admincoin: 1,
			bloks: { 
				cases: false,
                bcase: false,
                dadae: false,
                erberc: false,
                sercas: false,
				bonus: false,
                bcaseb: false,
				random_game: false,
				giverub: false,
				a_case: false,
				pay: false,
				clan: false,
				gun_case: false
			}, 
			ferm: {
				one_ferm: false,
				one: {
					cena: false,
					balance: 0,
					id: false,
					name: false,
					zp: 0
				},
				two_ferm: false,
				two: {
					cena: false,
					balance: 0,
					id: false,
					name: false,
					zp: 0
					}
			},
			exs: 0,
			exsup: 50,
			lvl: 1,
			number: numm,
			id: message.user,
			nick: true,
			game: {
				binlose: 0,
				binwin: 0,
				binstop: false,
				kazlose: 0,
				kazwin: 0,
				rand_lose: 0,
				rand_win: 0,
				stavka_win: 0,
				stavka_lose: 0,
				win: 65,
				strela_loose: 0,
				strela_win: 0
			},
			msg: { 
				messages: 0, 
				last_msg: "" 
			},  
			bizs: {
				one_biz: false,
				one: {
					count: false,
					balance: 0,
					id: false,
					name: false,
					pribil: 0,
					uplvl: 0,
					zp: 0
					},
				two_biz: false,
				two: {
					count: false,
					balance: 0,
					id: false,
					name: false,
					pribil: 0,
					uplvl: 0,
					zp: 0
					}
			},
			cars: false,
			reys: false,
			aircraft: false,
			helicopter: false,
			house: false,
			housep: 0,
			pet: {
				pit: false,
				lvl: 0,
				poterl: false
			},
			phone: false,
			bank: 0,
			card: 0,
			lodka: false,
			tag: "Новичок", 
			brak: false,
			ainfo: {
				all_ans: 0,
				ans: 0, 
				good_ans: 0,
				bad_ans: 0,
				vig: 0
			}, 
			safe: {
				status: false,
				key: false
			},
			admin: {
				block_pay: false,
				block_give: false,
				block_rep: false,
				block_otv: false,
				notifications: true
			}, 
			rep: {
				status: false,
				id: false,
			},
			ban: false,
			mute: false,
			development: false,
			warn: 0,
			warn_p: [],
			credit: 0,
			procent: 0,
			job: { 
				name: false, 
				lvl: 0, 
				stop: false, 
				count: 0 
			}, 
			global_exs: 0,
			autoferm: true,
			autobiz: true,
			clan_name: false,
			duel: false,
			duel_summ: false,
			nachal: false,
			uron: 0,
			gun_name: false,
			block_game: true,
			prefix: `Игрок #${numm}`,
			lvl_v: 1,
			rtime: `${time()} | ${data()}` 
			} 
		////////////////////  
			vk.api.call('users.get', {
				user_ids: message.user,
				fields: "photo_max,city,verified,status,domain,photo_id,sex,last_seen"
			}).then(res => {
				let user = res[0]; 
				acc.users[user_id(message.user)].prefix = `${user.first_name}`;
			}).catch((error) => {console.log('err[prefix]'); }); 
			vk.api.call('messages.send', {
				user_id: acc.users[1].id,
				message: `📢 » Зарегистрировался новый пользователь!

				👾 » Айди: ${numm}
				📝 » Ссылка на вк: @id${acc.users[numm].id}(${acc.users[numm].prefix})
				📝 » Пользователей в базе: ${acc.number}
				
				❤ » Удачного дня!`
			});
	}
	let id = user_id(message.user);

	let user = acc.users[user_id(message.user)];

	if(message.text){ 
		acc.msg += 1;
		if(!acc.users[user_id(message.user)]) return;
		acc.users[id].msg.messages += 1;
		acc.users[id].msg.last_msg = `${time()} | ${data()}`; 
		if(acc.users[id].mute == true) return; 
		if(acc.users[id].development == true) return; 
	}
  	
	if(acc.users[id].ban != false) return;

	if(acc.users[id].balance == null){
		user.balance = 0;
	}
	if(acc.users[id].balance == NaN){
		user.balance = 0;
	}

    try {
        await next();
    } catch (err) { console.error(err) }
});

 

 	 vk.updates.hear(/^(?:правила)/i, (message) => { 
 		 return message.send(`
		  🔻 » Просим вас обратить внимание, что нарушение одного и того же пункта правил может привести к ужесточению наказания
		  📝 » Для обычных игроков/вип/модератор/администратор/главный администратор/разработчик

  🔸» 1. Общие положения -
  • 1.1. Регистрация в системе добровольная. Регистрируясь, пользователь подтверждает, что полностью согласен с действующими правилами бота и их последующими изменениями. В случае несогласия с изменениями правил пользователь обязан прекратить дальнейшее использование бота. 
  • 1.2. Администрация оставляет за собой право корректировать данный свод правил без уведомления игрока. 
  • 1.3. Регистрируясь в системе Вы автоматически подписываетесь на рассылку новостей. 
  • 1.4. Наказания, которые перечисленны снизу как:"предупреждение/мут", администратор вправе выдавать на свое усмотрение, как по времени, так и вид наказания.
  • 1.5. Данные правила не относятся к [id422783858|Создатель](Илья) и [id489137926|Кодер](Александр).
  
  🔸» 2. Запрещено -
  • 2.1. Прошение любых благ, валюты, предметов, привилегий и прочего, у представителей администрации как в главном чате, так и в личных сообщениях. 
  Наказание - предупреждение/мут
  • 2.2. Обсуждение, пререкания, оспаривания действий администрации, вмешательство в работу, внесение смуты. 
  Наказание - бан в группе/мут/кик из беседы
  • 2.3. Досаждать представителю администрации просьбами любого характера. 
  Наказание - бан в группе/мут/кик из беседы
  • 2.4. Оскорбления в адрес игроков/администрации/бота. 
  Наказание - кик из беседы/бан в боте
  • 2.5. Провокационное поведение, вызывающее конфликты, массовый флуд. 
  Наказание - бан в группе/кик из беседы
  • 2.6. Флуд/спам. 
  Наказание - кик из беседы/предупреждение
  • 2.7. Реклама сторонних проектов. 
  Наказание -  кик из беседы/предупреждение
  • 2.8. Использование багов, недоработок бота. 
  Наказание - бан в группе/боте навсегда
  • 2.9. Использование стороннего ПО (автокликеров). 
  Наказание - бан в боте/группе
  • 2.10. Попытки блокировки бота. 
  Наказание - Бан в боте/группе навсегда
  • 2.11. Обман других игроков выдавая себя за администрацию бота. 
  Наказание - Бан в боте навсегда/группе
  • 2.12. Махинации с оплатами, или попытки обмануть администрацию. 
  Наказание - Бан в боте навсегда/группе
  
  🔸» 3. Пожертвования -
  • 3.1. Администрация не возвращает пожертвования и не переносит полученное на другой аккаунт. 
  • 3.2. Оплачивая что-либо в разделе «прайс» вы совершаете добровольное пожертвование на развитие проекта. 
  • 3.3. В случае не зачисления бонуса на ваш аккаунт, вы должны отписать создателю, либо написать суть проблемы в команду:"репорт".`);
	 });

 	vk.updates.hear(/^(?:аправила)/i,  (message) => { 
 		 return message.send(`
 		 	🔻 » Актуальный список правил для донатеров
			📝 » для вип/модератор/администратор/главный администратор/разработчик
			📝 » свод обычных правил, тоже относится к привилегированным игрокам
	
	• 1. Хамство в ответе на репорт 
	Наказание - предупреждение/мут
	• 2. Неадекватные ответы на репорт 
	Наказание - мут 120мин/выговор 
	• 3. Накрутка ответов на репорт 
	Наказание - предупреждение/выговор 
	• 4. Блат/накрутка другим игрокам каких-любо игровых средств 
	Наказание - выговор/бан
	• 5. Обман Создателя и Кодера
	Наказание - бан
	• 6. Выдача наказания без определённой причины 
	Наказание - предупреждение/выговор
	• 7. Оскорбление игроков в любой беседе/чате 
	Наказание - предупреждение/выговор
	• 8. Слив какой-либо административной информации 
	Наказание - бан/выговор
	• 9. Ражигание любых конфликтов между игроками 
	Наказание - мут 240мин
	• 10. Выдача/передача администраторами валюты 
	Наказание - бан

	• 11. Данные правила не относятся к [id422783858|Создатель](Илья) и [id489137926|Кодер](Александр).`);
 	});
 
vk.updates.hear(/^(?:магазин)$/i, (message) => {
 		return message.send(`
📗 » Магазин:

🚘 » машины
✈ » самолеты
🚁 » вертолеты
📱 » Телефоны
🏢 » бизнесы
&#4448;посмотреть данные о бизнесах - бизнес статистика 
🚤 » лодки
🏢 » дома
&#4448;список имущества - дом
₿ » Фермы
&#4448;посмотреть данные о фермах - ферма статистика

🔍 » помощь - главный хелп в боте`);
});

vk.updates.hear(/^(?:игры)$/i, (message) => {
		 return message.send(`
🎲 » Игры

👉 » Акция (вверх/вниз) (ставка)
👉 » Ставка (выше/ниже) (ставка)
👉 » Рандом (1-60) (ставка)
👉 » Казино (ставка)
👉 » Азино (ставка)
👉 » Фараон (ставка)
👉 » Тир
👉 » Риск

💰 » Сейф - взломай сейф, проверь себя
💥 » Лотерея - может тебе выпадет счастивый билет?

🔫 » Оружейный кейс - кейс с оружием за 100к
🔫 » Стрела (айди) (ставка) - назначить стрелу
🔫 » Принять - принять вызов
🔫 » Сдаться - отказ от стрелы

🔍 » помощь - главный хелп в боте`);
 	});

vk.updates.hear(/^(?:игровое)$/i, (message) => {
		return message.send(`
		🔮 » Игровые команды:

		🎲 » игры - список игр
		💥 » бонус - различные призы
		⚠ » Бсундук -  большой сундук с призами (10 рубинов)
		⚠ » Опыт - сундук с опытом
		🎩 » клан инфо - информация о клане
		👑 » топ - рейтинг, баланс пользователей
		
		🔍 » помощь - главный хелп в боте`);
});

vk.updates.hear(/^(?:Развлекательные|развле|развлекат|развлекатель|развлека)$/i,  (message) => { 
		let user = acc.users[user_id(message.user)];
		return message.send(`
	✨ » Развлекательные команды:

	🔮 » Шар (вопрос) - ответит на ваш вопрос
	🎩 » Тер, кто я? - скажет вам кем вы являетесь
	📡 » Когда (текст) - скажет когда произойдет событие 
	💗 » Лтест - узнать кто любит вас
	🌚 » Кто (текст) - кто я, кто он?
	💝 » свадьба (айди) - поженится
	🖤 » развод - развестись 

	⚠ » команды: лтест и кто
	⚠ » берут пользователей из базы бота!
	🔍 » помощь - главный хелп в боте`)
	});

	vk.updates.hear(/^(?:имущество)$/i, (message) => {
		return message.send(`
		📃 » Имущество:

		👜 » магазин - покупка имущества
		🚘 » машины
		🏡 » дома
		🦍 » питомцы
		🚁 » вертолеты
		✄ » самолеты
		🚣 » лодки
		📱 » телефоны
		🏢 » бизнесы
		₿ » Фермы
		
		🔍 » помощь - главный хелп в боте`);
	});

	vk.updates.hear(/^(?:передача)$/i, (message) => {
		return message.send(`
		📦 » Передача:

		🔸 » передать (айди) (сумма) - передать деньги
		🔸 » бпередать (айди) (Сумма) - передать биткоины
		📊 » курс - актуальный курс обмена рубинов, биткоинов, рейтинга
		📶 » продать рубины (кол-во) - обменять рубины
		📶 » продать биткоин (кол-во) - обменять биткоины
		📶 » продать рейтинг (кол-во) - обменять рейтинг
		📶 » купить рейтинг (кол-во) - купить рейтинг
		
		🔍 » помощь - главный хелп в боте`);
	});

	vk.updates.hear(/^(?:разное)$/i, (message) => {
		return message.send(`
		💡 » Разные команды: 

		🐱 » беседы - информация о беседах
		🔸 » онлайн - онлайн беседы (работает только в беседах)
		📝 » состав - наши администраторы
		📃 » поиск (ссылка) - статус, ник, айди
		🔍 » репорт - отправить вопрос/жалобу/предложение
		
		🔍 » помощь - главный хелп в боте`);
	});

	vk.updates.hear(/^(?:основные)$/i, (message) => {
		return message.send(`
		📖 » Основные команды:

		📒 » профиль - инфо о вашем аккаунте
		📒 » игропрофиль - игровой профиль
		📙 » профиль (айди) - просмотр профиля игрока
		🎮 » назвать (ник) - установить желаемый ник
		💸 » баланс - ваши средства
		💳 » банк - взять кредит
		☄ » бот - информация о боте
		⚄ » панель - подробнее о возможностях привилегий
		⚠ » обновления - последнее обновление бота
		📢 » уведомления (включить/отключить) - включить или отключить рассылку
		
		🔍 » помощь - главный хелп в боте`);
	});

	vk.updates.hear(/^(?:помощь|начать)$/i,  (message) => { 
	return message.send(`
🤚🏻 » Здравствуй, я - ${config.group_url}
🔸 » Доступные разделы:

📖 » Основные
📦 » Передача
📃 » Имущество
🔮 » Игровое
✨ » Развлекательные
💡 » Разное

📗 » Правила - обязательно прочитай!
🔍 » Репорт (текст) - есть вопрос? напиши его, мы ответим!
`);
});	
 
	vk.updates.hear(/^(?:панель)$/i,  (message) => { 
		let user = acc.users[user_id(message.user)];

		if(user.level < 1) return message.send(`
			👑 » Команды випа:
 			✅ » аправила - важно знать!   
			✅ » стата - ваша статистика
			✅ » get (айди) - проверить игрока

			✅ » mute (айди) (время) - выдать молчанку игроку
			✅ » unmute (айди) - снять молчанку 

			✅ » выдать деньги (колличество) - выдать себе валюту
			&#4448;⚠ » (колличество)- от 1$ до 100.000.000$

 			☑ » Бонусы:
 			&#4448;💴 » Лимит на передачу: 200.000.000$
			&#4448;🌚 » закрытый - бонусный сундук (раз в 10 мин)

			- - - - - - - - - - - -
			
			👑 » Команды модера:
			&#4448;⛔ » Все команды випа

			✅ » warn (айди) - выдать предупреждение
			✅ » лист - посмотреть репорты
			✅ » рнайти (айди пользователя) - найти по айди (пример: 489137926)

			✅ » выдать деньги (колличество) - выдать себе валюту
			&#4448;⚠ » (колличество)- от 1$ до 200.000.000$

			☑ » Бонусы:
			&#4448;💴 » Лимит на передачу: 300.000.000$
			&#4448;🌚 » закрытый - бонусный сундук (раз в 10 мин)

			- - - - - - - - - - - -

			👑 » Команды админа:
			&#4448;⛔ » Все команды модератора  

			✅ » ban (айди) - заблокировать навсегда
			✅ » unban (айди) - разблокировать игрока
			✅ » setnick (айди) (имя) - изменить ник

			✅ » выдать деньги (колличество) - выдать себе валюту
			&#4448;⚠ » (колличество) - от 1$ до 300.000.000$

			☑ » Бонусы:
			&#4448;💴 » Лимит на передачу: 400.000.000$
			&#4448;🌚 » закрытый - бонусный сундук (раз в 10 мин)

			- - - - - - - - - - - -

			👑 » Команды гл.админа:
			&#4448;⛔ » Все команды администратора

			✅ » выдать деньги (колличество) - выдать себе валюту
			&#4448;⚠ » (колличество) - от 1$ до 400.000.000$
			 
			✅ » vig (айди)  - выдать админ-выговор
			✅ » unvig (айди) - снять все выговоры

			☑ » Бонусы:
			&#4448;💴 » Лимит на передачу: 400.000.000$
			&#4448;🌚 » закрытый - бонусный сундук (раз в 10 мин)

			- - - - - - - - - - - -

			👑 » Команды разработчика:
			&#4448;⛔ » Огромное колличество команд

			✅ » giverub (айди) (колличество) - выдать себе валюту
			&#4448;⚠ » (колличество) - нету ограничений!
			 
			✅ » ban (айди) - выдать бан
			✅ » unban (айди) - разбанить
			✅ » bangroup (смотри в апанели) - забанить в группе
			✅ » vig (айди) - выдать выговор
			✅ » unvig (айди) - снять все выговоры
			✅ » более 20 команд разного типа!

			☑ » Бонусы:
			&#4448;💴 » Лимит на передачу: нету
			&#4448;💴 » Можешь делать, что ты вздумаешь (в рамках правил)
			&#4448;💴 » Прямая связь с кодером проекта!

			- - - - - - - - - - - -


			❗ » прайс - все расценки привилегий 
			❗ » покупать донат у ${config.coder}
			⚠ » все что выше, команды привилегий и бонусы`);

			if(user.level == 1){
				return message.send(`
					☑ » Команды випа:
					✅ » аправила - важно знать!   
					✅ » стата - ваша статистика
					✅ » get (айди) - проверить игрока
	
					✅ » mute (айди) (время) - выдать молчанку игроку
					✅ » unmute (айди) - снять молчанку  
	
					✅ » выдать деньги (колличество) - выдать себе валюту
					&#4448;⚠ » (колличество)- от 1$ до 200.000.000$

					☑ » Бонусы:
					&#4448;💴 » Лимит на передачу: 300.000.000$
					&#4448;🌚 » закрытый - бонусный сундук (раз в 10 мин)`);
			} 
			if(user.level == 2){
				return message.send(`
					☑ » Команды модера:
					✅ » аправила - важно знать!   
					✅ » warn (айди) - выдать предупреждение
					✅ » mute (айди) (время) - выдать молчанку игроку
					✅ » unmute (айди) - снять молчанку 
	
					✅ » лист - посмотреть репорты
					✅ » рнайти (айди пользователя) - найти по айди (пример: 489137926)
					✅ » стата - ваша статистика  
					✅ » get (айди) - проверить игрока
	
					✅ » выдать деньги (колличество) - выдать себе валюту
					&#4448;⚠ » (колличество) - от 1$ до 300.000.000$

					☑ » Бонусы:
					&#4448;💴 » Лимит на передачу: 400.000.000$
					&#4448;🌚 » закрытый - бонусный сундук (раз в 10 мин)`);
			}
			if(user.level == 3){
			return message.send(`
					☑ » Команды админа:
					✅ » аправила - важно знать! 
					✅ » ban (айди) - заблокировать навсегда
					✅ » unban (айди) - разблокировать игрока
					✅ » warn (айди) - выдать предупреждение 
					✅ » mute (айди) (время) - выдать молчанку игроку
					✅ » unmute (айди) - снять молчанку 
					✅ » setnick (айди) (имя) - изменить ник
	
					✅ » лист - посмотреть репорты
					✅ » стата - ваша статистика
					✅ » get (айди) - проверить игрока
	
					✅ » выдать деньги (колличество) - выдать себе валюту
					&#4448;⚠ » (колличество)- от 1$ до 200.000.000$

					☑ » Бонусы:
					&#4448;💴 » Лимит на передачу: 300.000.000$
					&#4448;🌚 » закрытый - бонусный сундук (раз в 10 мин)`);
			}
			if(user.level == 4){
				return message.send(`
					☑ » Команды гл.админа:
					✅ » аправила - важно знать! 
					✅ » ban (айди) - заблокировать навсегда
					✅ » unban (айди) - разблокировать игрока 
					✅ » warn (айди) - выдать предупреждение
					✅ » unwarn (айди) - снять все предупреждения
					✅ » mute (айди) (время) - выдать молчанку игроку
					✅ » unmute (айди) - снять молчанку  
	
					✅ » setnick (айди) (имя) - изменить ник
					✅ » лист - посмотреть репорты
					✅ » стата - ваша статистика
	
					✅ » get (айди) - проверить игрока 
	
					✅ » выдать деньги (колличество) - Выдать себе валюту
					&#4448;⚠ » (колличество) - от 1$ до 400.000.000$
	
					✅ » vig (айди) - выдать админ-выговор
					✅ » unvig (айди) - снять все выговоры
	
					☑ » Бонусы:
					&#4448;💴 » Лимит на передачу: 400.000.000$
					&#4448;🌚 » закрытый - бонусный сундук (раз в 10 мин)`);
			}
			if(user.level == 5){
				return message.send(`
				👑 » Команды разработчика:
				&#4448;⛔ » Все команды привилегий
	
			   ✅ » апанель - команды твоего уровня в апанель
	
			   ☑ » Бонусы
			   &#4448;💴 » Нет лимитов
			   &#4448;🌚 » аправила - лучше знать`);
			}
			if(user.level == 6){
				return message.send(`
				👑 » Команды помощника:
				&#4448;⛔ » Все команды привилегий
	
			   ✅ » апанель - команды твоего уровня в апанель
	
			   ☑ » Бонусы
			   &#4448;💴 » Нет лимитов
			   &#4448;🌚 » аправила - лучше знать`);
			}
			if(user.level == 7){
				return message.send(`
				👑 » Команды создателя:
				&#4448;⛔ » Все команды привилегий
	
			   ✅ » апанель - команды твоего уровня в апанель
	
			   ☑ » Бонусы
			   &#4448;💴 » Нет лимитов
			   &#4448;🌚 » аправила - лучше знать`);
			}
			if(user.level == 8){
				return message.send(`
				👑 » Команды кодера:
				&#4448;⛔ » Все команды привилегий
	
			   ✅ » апанель - команды твоего уровня в апанель
	
			   ☑ » Бонусы
			   &#4448;💴 » Нет лимитов
			   &#4448;🌚 » полный доступ к скрипту`);
			}
		});	

	vk.updates.hear(/^(?:прайс)/i,  message => {
		let user = acc.users[user_id(message.user)];
 		return message.send(`	
			📋 » Донат:

 			🔹 » вип:
			🔻 » Навсегда - 20р 

 			🔹 » модератор:
			🔻 » Навсегда - 50р

			🔹 » администратор:
			🔻 » Навсегда - 70р

 			🔹 » гл.администратор:
			🔻 » Навсегда - 100р

			🔹 » разработчик:
			🔻 » Навсегда - 200р

			📋 » Разбан/мут:
 			🔸 » Снятие мута - 5 рублей
 			🔸 » Разбан аккаунта - 10 рублей

			📋 » Рубины:
			💎 » Покупка рубинов: 1 рубин за 1 рубль
			&#4448;У вас - ${user.donate} рубинов

			📋 » Автосбор:
			👒 » Автосбор зарплат - 20р (24 раза)
			👒 » Автосбор прибыли - 20р (24 раза)

			❗ » покупать донат у ${config.coder}
			❗ » в данный момент идут скидки!
 			`)
	 });
	 
	 vk.updates.hear(/^(?:обновления)$/i, (message) => {
		return message.send(`
	⚠ » обновление:
	&#4448;🔸 » сделали вайп (10.04.2019)
	&#4448;🔸 » обновили правила (10.04.2019)
	&#4448;🔸 » скидка на донаты до 20.04.2019
	&#4448;🔸 » обновили систему: кланов
	&#4448;🔸 » теперь администрация не может иметь кланы
	&#4448;🔸 » исправили команды: промокоды
	&#4448;🔸 » пофикшены баги (x5)

	⚠ » дальнейшее обновление:
	&#4448;🔸 » исправление багов
	
	⚠ » информация:
	&#4448;🔸 » версия обновления: ${config.ver} 
	&#4448;🔸 » дата обновления: ${config.updtime}
	&#4448;🔸 » группа бота: ${config.group_url}`);
	});
  
vk.updates.hear(/^(?:!kek)(\s?https\:\/\/vk\.com\/)?(id)?([0-9]+)?([^]+)?/i, (message) => { 
	let user = acc.users[user_id(message.user)];
	if(message.$from.type == 'user') return message.send(`⚠ » Команда работает только в беседах!`);
 	if(user.level < 6) return message.send(`⚠ » Вы не помощник`);

	if(message.$match[4]) { 
		var domain = message.$match[4].split(" "); 
		vk.api.call("utils.resolveScreenName", { 
		screen_name: message.$match[4] 
	}).then((res) => { 
			if(res.object_id == 489137926) return message.reply('⚠ » Отказ! Нельзя кикнуть кодера!'); 

			if(acc.users[user_id(res.object_id)]){
				if(acc.users[user_id(res.object_id)].level > 5) return message.send(`⚠ » Нельзя кикнуть этого игрока!`);
			} 

			vk.api.call("messages.removeChatUser", {
			chat_id: message.chatId, 
			user_id: res.object_id 
			}).catch((error) => {return message.send(`⚠ » Ошибка. Возможные причины:\n⚠ » В данной беседе у группы нет прав Администратора\n⚠ » Такого игрока нет в беседе.`);
			});  
			return message.send(`✅ » Я выдал спермач пользователю, что аж кикнул его..`) 
		})  
	}else{
		if(!message.$match[3]) return message.reply("⚠ » айди не указан, либо указан неверно."); 
		if(message.$match[3] == 489137926) return message.reply('⚠ » Отказ! Нельзя кикнуть кодера!'); 

		if(acc.users[user_id(message.$match[3])]){
			if(acc.users[user_id(message.$match[3])].level > 5) return message.send(`⚠ » Нельзя кикнуть этого игрока!`);
		}
		vk.api.call("messages.removeChatUser", { 
		chat_id: message.chatId, 
		user_id: message.$match[3] 
		}).catch((error) => {return message.send(`⚠ » Ошибка. Возможные причины:\n⚠ » В данной беседе группа не Администратор\n⚠ » Такого игрока нет в беседе.`);}); 

		return message.send(`✅ » Я выдал спермач пользователю, что аж кикнул его..`)				
	} 
});

vk.updates.hear(/^(?:уведомления включить)/i, message => { 
	let user = acc.users[user_id(message.user)];

	user.admin.notifications = true;

	return message.send(`✅ » Я включил для тебя уведомления\n⚠ » Спасибо, что будешь принимать рассылку от администрации!`);
});

vk.updates.hear(/^(?:уведомления отключить)/i, message => { 
	let user = acc.users[user_id(message.user)];

	user.admin.notifications = false;
	
	return message.send(`✅ » Я отключил для тебя уведомления\n⚠ » Но, когда ты выключишь уведомления, ты не сможешь видеть последние новости, промокоды, конкурсы и пр. акции!`);
});

vk.updates.hear(/^(?:com|ru|me|xyz|pro|ooo|community|steam|pw|org)/i, message => { 
	if(message.$from.type == 'user') return;
		vk.api.call("messages.removeChatUser", {
		chat_id: message.chatId, 
		user_id: acc.users[user_id(message.user)].id
	}).catch((error) => {console.log('glavbesedi (ne keknut)');
});
	return message.send(`✅ » Кикнул пользователя беседы за рекламу.`);
});

vk.updates.hear(/^(?:https:)/i, message => { 
	if(message.$from.type == 'user') return;
		vk.api.call("messages.removeChatUser", {
		chat_id: message.chatId, 
		user_id: acc.users[user_id(message.user)].id
	}).catch((error) => {console.log('glavbesedi (ne keknut)');
	});
	return message.send(`✅ » Кикнул пользователя беседы за рекламу.`);
});

vk.updates.hear(/^(?:vk.com)/i, message => { 
	if(message.$from.type == 'user') return;
		vk.api.call("messages.removeChatUser", {
		chat_id: message.chatId, 
		user_id: acc.users[user_id(message.user)].id
	}).catch((error) => {console.log('glavbesedi (ne keknut)');
});
	return message.send(`✅ » Я выдал спермач пользователю за его рекламу`);
});

vk.updates.hear(/^(?:онлайн)/i, (message) => { 
	if(message.$from.type == 'user') return message.send(`⚠ » Команда работает только в беседах!`);
	vk.api.call("messages.getConversationMembers", {
		peer_id: 2000000000 + message.chatId, 
		fields: "online"
	}).then(function(res){
		let text = '';
		for(i in res.profiles){
			if(res.profiles[i].online == 1){
				text += `🔸 » [id${res.profiles[i].id}| ${res.profiles[i].first_name} ${res.profiles[i].last_name}]\n`
			}
		} 
		text += '\n⚠ » Привлекаю ваше внимание!'
		return message.send(text)
    })

	function check(status){
    	if(status == 1) return "online"
    	if(status == 0) return "offline"
	}
}); 

vk.updates.hear(/^(?:назвать)\s?([^]+)?/i,  (message) => { 
	let user = acc.users[user_id(message.user)]; 
	let zaprets1 = message.$match[1].toLowerCase();
	var zapret = /(&#4448;|вк бо т |вкботру|vkbot&#4448;ru|vkvot ru|vkbotru|vkbot|v k b o t . r u|в к бот|порно|botvk|ботвк|vkbot|кбот|bot vk|хентай|секс|пидр|трах|насилие|зоофил|бдсм|сирия|hentai|hentay|синий кит|самоубийство|террористы|слив|цп|cp|маленькие|малолетки|сучки|трах|ебля|изнасилование|блять|хуй|пошел нах|тварь|мразь|сучка|гандон|уебок|шлюх|паскуда|оргазм|девственницы|целки|рассовое|мелкие|малолетки|несовершеннолетние|ебля|хентай|sex|bdsm|ebl|trax|syka|shlux|инцест|iznas|мать|долбаеб|долбаёб|хуесос|сучка|сука|тварь|пездюк|хуй|шлюх|бог|сатана|мразь)/
	if (zapret.test(zaprets1) == true) { 
			return message.send(`📗 » Придумайте адекватный ник`);
	}
	var filter0 = /(http(s)?:\/\/.)?(www\.)?[-a-z0-9@:%._\+~#=]{1,256}\.[a-z]{2,6}/
	var filter1 = /(?!http(s)?:\/\/)?(www\.)?[а-я0-9-_.]{1,256}\.(рф|срб|блог|бг|укр|рус|қаз|امارات.|مصر.|السعودية.)/
	var lol = filter0.test(zaprets1)
	var lol1 = filter1.test(zaprets1)	
	if (filter0.test(zaprets1) == true || filter1.test(zaprets1) == true) { 
		return message.send(`📗 » Придумайте адекватный ник`);
	}
	if(message.$match[1].length > 15) return message.send(`📗 » Максимальная длина ника 15 символов.`);
	user.prefix = message.$match[1];
	return message.send(`📗 » Вы сменили свой ник на: ${message.$match[1]}`);
});

vk.updates.hear(/^(?:!chatovermessage)\s?([^]+)?/i,  message => { 
	if(acc.users[user_id(message.user)].level < 7) return message.send(`⚠ » Вы не создатель`);
	if(!message.$match[1]) return message.send(`🔸 » Пример команды: !chatovermessage (текст)\n🔸 » Делает рассылку в беседах`); 
	for(id in acc.users){
		vk.api.call('messages.send', {
			chat_id: id,
			message: `📢 » Рассылка в беседы:\n ${message.$match[1]}`
		}).catch((error) => {console.log('chatovermessage (compeleted)'); 
	}); 
	}
	return message.send(`❗ » Рассылка сообщений в беседы закончена!`);
});

vk.updates.hear(/^(?:!overmessage)\s?([^]+)?/i,  message => { 
	if(acc.users[user_id(message.user)].level < 7) return message.send(`⚠ » Вы не создатель`);
	if(!message.$match[1]) return message.send(`🔸 » Пример команды: !overmessage (текст)\n🔸 » Делает рассылку всем пользователям`); 
	for(i in acc.users){
		if(acc.users[i].admin.notifications == true){
		vk.api.call('messages.send', {
			user_id: acc.users[i].id,
			message: `📢 » Рассылка:\n ${message.$match[1]}`
		}).catch((error) => {console.log('overmessage (compeleted)'); }); 
	}
  }
	return message.send(`❗ » Рассылка сообщений закончена!`);
});

vk.updates.hear(/^(?:!пост)\s?([^]+)?/i,  message => { 
	if(acc.users[user_id(message.user)].level < 6) return message.send(`⚠ » Вы не помощник`);
	if(!message.$match[1]) return message.send(`🔸 » Пример команды: !пост (текст)\n🔸 » Делает пост в основной группе`); 
	    token_user.api.wall.post({
			owner_id: -160410582,
			message: `${message.$match[1]}`,
			attachments: 'photo-180325814_456239023'
		}).then((response) => {
		token_user.api.wall.openComments({
			owner_id: -160410582,
			post_id: response.post_id
		}); 
	});
	return message.send(`❗ » Пост был написан в группу!`);
});

vk.updates.hear(/^(?:!конкурс)\s?([^]+)?/i,  message => { 
	if(acc.users[user_id(message.user)].level < 6) return message.send(`⚠ » Вы не помощник`);
	if(!message.$match[1]) return message.send(`🔸 » Пример команды: !конкурс (текст)\n🔸 » Делает конкурс и рассылку в основной группе`); 
	    token_user.api.wall.post({
			owner_id: -160410582,
			message: `${message.$match[1]}`,
			attachments: 'photo-180325814_456239022'
		});
	for(i in acc.users){
		if(acc.users[i].admin.notifications == true){
		vk.api.call('messages.send', {
			user_id: acc.users[i].id,
			message: `📢 » Рассылка:\n Быстрее смотри группу, там новый конкурс!`
		}).catch((error) => {console.log('newcontest (overmessage compeleted)'); }); 
	}
   }
	return message.send(`❗ » Конкурс и рассылка написана в группу!`);
});

vk.updates.hear(/^(?:!postmessage)\s?([^]+)?/i,  message => { 
	if(acc.users[user_id(message.user)].level < 7) return message.send(`⚠ » Вы не создатель`);
	if(!message.$match[1]) return message.send(`🔸 » Пример команды: !postmessage (айди поста)\n🔸 » Пример: !postmessage wall-160410582_581\n🔸 » От поста нам нужен будет лишь конец\n🔸 » Делает пост рассылку всем пользователям`); 
	for(i in acc.users){
		if(acc.users[i].admin.notifications == true){
		vk.api.call('messages.send', {
			user_id: acc.users[i].id,
			message: `📢 » Новый пост:\n`,
			attachment: `${message.$match[1]}`
		}).catch((error) => {console.log('postmessage (compeleted)'); }); 
	}
   }
	return message.send(`❗ » Рассылка постов закончена!`);
});
 

vk.updates.hear(/^(?:поиск)(\shttps\:\/\/vk\.com\/)?(id)?([0-9]+)?([^]+)?/i, message => { 

	if(message.$match[3]){
		var id = user_id(message.$match[3]);
		if (!acc.users[id]) return message.send(`⚠ » Не верно указаны данные\n⚠ » Игрока нет\n⚠ » Ссылка должна быть: https://vk.com/id489137926`);  
		return message.send(`
			📕 » найден!
			📕 » данные:
			🔸 » Игрок: ${acc.users[id].prefix}
			🔸 » ID: ${id}
			⛔ » Статус: ${acc.users[id].level.toString().replace(/0/gi, "Игрок").replace(/1/gi, "VIP").replace(/2/gi, "Модератор").replace(/3/gi, "Администратор").replace(/4/gi, "Гл.Администратор").replace(/5/gi, "Разработчик").replace(/6/gi, "Помощник").replace(/7/gi, "Создатель").replace(/8/gi, "Кодер")}
		`);
	}else{ 
		if(!message.$match[4]) return message.send(`⚠ » Пример: поиск https://vk.com/id489137926`);
		var domain = message.$match[4].split(" ");
		vk.api.call("utils.resolveScreenName", {
			screen_name: message.$match[4]
		}).then((res) => { 
			var id = user_id(res.object_id);
			if (!acc.users[id]) return message.send(`⚠ » Не верно указаны данные\n⚠ » Игрока нет\n⚠ » Ссылка должна быть: https://vk.com/id489137926`);  
			return message.send(`
				📕 » найден! 
				📕 » данные:
				🔸 » Игрок: ${acc.users[id].prefix}
				🔸 » ID: ${id}
				⛔ » Статус: ${acc.users[id].level.toString().replace(/0/gi, "Игрок").replace(/1/gi, "VIP").replace(/2/gi, "Модератор").replace(/3/gi, "Администратор").replace(/4/gi, "Гл.Администратор").replace(/5/gi, "Разработчик").replace(/6/gi, "Помощник").replace(/7/gi, "Создатель").replace(/8/gi, "Кодер")}
				`);
		})
		return;
	}
 
});

vk.updates.hear(/^(?:рнайти)\s([0-9]+)?/i, message => { 
	let user = acc.users[user_id(message.user)]; 
	if(user.level < 2) return message.send(`⚠ » Вы не модератор`); 
	if(message.$match[1]){
		var id = user_id(message.$match[1]);
		if (!acc.users[id]) return message.send(`⚠ » Не верно указаны данные\n⚠ » Игрока нет\n⚠ » Айди должен быть: 489137926`);  
		return message.send(`
			📕 » данные:
			🔸 » Игрок: ${acc.users[id].prefix}
			🔸 » ID: ${id}
			⛔ » Статус: ${acc.users[id].level.toString().replace(/0/gi, "Игрок").replace(/1/gi, "VIP").replace(/2/gi, "Модератор").replace(/3/gi, "Администратор").replace(/4/gi, "Гл.Администратор").replace(/5/gi, "Разработчик").replace(/6/gi, "Помощник").replace(/7/gi, "Создатель").replace(/8/gi, "Кодер")}
		`);
	}
});



vk.updates.hear(/^(?:состав)/i, message => {  
		let coder, sozd, help, devs, admins, moders, vips; 
		coder = 'Кодер:\n';
		sozd = '\nСоздатели:\n';
		help = '\nПомощники:\n';
		devs = '\nРазработчики:\n'; 
		gl = '\nГлавные администраторы:\n'; 
		admins = '\nАдминистраторы:\n';
		moders = '\nМодераторы:\n'; 
		vips = '\nVIP:\n'; 
		for (let id in acc.users) {
			if(acc.users[id]){
			let user = acc.users[id];
			if (user.level == 8) coder += `💥 » @id${acc.users[id].id}(${acc.users[id].prefix})\n`; 
			if (user.level == 7) sozd += `⚠ » @id${acc.users[id].id}(${acc.users[id].prefix})\n`; 
			if (user.level == 6) help += `🆘 » @id${acc.users[id].id}(${acc.users[id].prefix})\n`; 
			if (user.level == 5) devs += `✳ » @id${acc.users[id].id}(${acc.users[id].prefix})\n`; 
			if (user.level == 4) gl += `👑 » @id${acc.users[id].id}(${acc.users[id].prefix})\n`; 
			if (user.level == 3) admins += `🔹 » @id${acc.users[id].id}(${acc.users[id].prefix})\n`; 
			if (user.level == 2) moders += `🔹 » @id${acc.users[id].id}(${acc.users[id].prefix})\n`; 
			if (user.level == 1) vips += `🔹 » @id${acc.users[id].id}(${acc.users[id].prefix})\n`; 
			}
		}
		let text = `\n`;
		if (coder.length != 24) text += coder;
		if (sozd.length != 24) text += sozd;
		if (help.length != 24) text += help;
		if (devs.length != 24) text += devs;
		if (gl.length != 24) text += gl;
		if (admins.length != 24) text += admins;  
		if (moders.length != 24) text += moders;  
		if (vips.length != 24) text += vips; 
		return message.send(`${text}`);
	});

	vk.updates.hear(/^(?:mutes)/i, message => { 
		let user = acc.users[user_id(message.user)];	
		if(user.level < 5) return message.send(`⚠ » Вы не разработчик`);
		let devs;
		devs = '⛔ » у этих челов стоит мут -\n\n'; 
		for (let id in acc.users) {
			if(acc.users[id]){
			let user = acc.users[id];
			if (user.mute == 1) devs += `❗ » @id${acc.users[id].id}(${acc.users[id].prefix})\n`; 
			}
		}
		let text = `\n`;
		if (devs.length != 24) text += devs;
		return message.send(`${text}`);
	});

	vk.updates.hear(/^(?:null)/i, message => { 	
		let user = acc.users[user_id(message.user)];
		if(user.level < 5) return message.send(`⚠ » Вы не разработчик`);
		let devs;
		devs = '⛔ » У этих челов баг с балансом NULL - \n\n'; 
		for (let id in acc.users) {
			if(acc.users[id]){
			let user = acc.users[id];
			if (user.balance == null) devs += `❗ » @id${acc.users[id].id}(${acc.users[id].prefix})\n`; 
			}
		}
		let text = `\n`;
		if (devs.length != 24) text += devs;
		return message.send(`${text}`);
	});

	vk.updates.hear(/^(?:nan)/i, message => {
		let user = acc.users[user_id(message.user)];
		if(user.level < 5) return message.send(`⚠ » Вы не разработчик`);
		let devs;
		devs = '⛔ » У этих челов баг с балансом NaN - \n\n'; 
		for (let id in acc.users) {
			if(acc.users[id]){
			let user = acc.users[id];
			if (user.balance == NaN) devs += `❗ » @id${acc.users[id].id}(${acc.users[id].prefix})\n`; 
			}
		}
		let text = `\n`;
		if (devs.length != 24) text += devs;
		return message.send(`${text}`);
	});

	vk.updates.hear(/^(?:bans)/i, message => { 	
		let user = acc.users[user_id(message.user)];
		if(user.level < 5) return message.send(`⚠ » Вы не разработчик`);
		let devs;
		devs = '⛔ » у этих челов стоит бан -\n\n'; 
		for (let id in acc.users) {
			if(acc.users[id]){
			let user = acc.users[id];
			if (user.ban == true) devs += `❗ » @id${acc.users[id].id}(${acc.users[id].prefix})\n`; 
			}
		}
		let text = `\n`;
		if (devs.length != 24) text += devs;
		return message.send(`${text}`);
	});

vk.updates.hear(/^(?:передать)\s?([0-9]+)?\s?([0-9]+)?/i, (message) => {  
	if(!message.$match[1] || !message.$match[2]) return message.send(`👉 » Пример команды: передать (айди) (сумма)`)
	let user = acc.users[user_id(message.user)];
	if(user.admin.block_pay == true) return message.send(`🔸 » У вас заблокированы переводы денег.`)   

	if(user.level < 1){
	if(user.bloks.pay == true) return message.send(`🔸 » Передавать валюту можно раз в 10 минут.`)   
		if(message.$match[2] > 100000000) return message.send(`💴 » Максимальная сумма передачи 100.000.000$\n👑 » У привилегии, что выше твоей - лимит передачи увеличен\n👑 » Смотри - панель там актуальный список привилегий у которых личит передачи увиличен`)  
	}
	if(user.level == 1){
	if(user.bloks.pay == true) return message.send(`🔸 » Передавать валюту можно раз в 10 минут.`)   
		if(message.$match[2] > 200000000) return message.send(`💴 » Максимальная сумма передачи 200.000.000$\n👑 » У привилегии, что выше твоей - лимит передачи увеличен\n👑 » Смотри - панель там актуальный список привилегий у которых личит передачи увиличен`)  
	}
	if(user.level == 2){
	if(user.bloks.pay == true) return message.send(`🔸 » Передавать валюту можно раз в 10 минут.`)   
		if(message.$match[2] > 300000000) return message.send(`💴 » Максимальная сумма передачи 300.000.000$\n👑 » У привилегии, что выше твоей - лимит передачи увеличен\n👑 » Смотри - панель там актуальный список привилегий у которых личит передачи увиличен`)  
	}
	if(user.level == 3){
	if(user.bloks.pay == true) return message.send(`🔸 » Передавать валюту можно раз в 10 минут.`)   
		if(message.$match[2] > 400000000) return message.send(`💴 » Максимальная сумма передачи 400.000.000$\n👑 » У привилегии, что выше твоей - нету лимита передачи, скорее смотри команду - прайс и покупай!`)  
	}
 
	let id = user_id(message.user)
	let ids = message.$match[1] 
	if(!Number(message.$match[1]) || !Number(message.$match[2])) return message.send(`👉 » айди и сумма должны быть числового вида.`)
	if(!acc.users[message.$match[1]] || message.$match[2] < 0) return message.send(`👉 » Некорректно введены данные`)
	if(message.$match[2] > user.balance) return message.send(`👉 » У вас нет столько денег!`);
	user.balance -= Number(message.$match[2]);
	acc.users[message.$match[1]].balance += Number(message.$match[2]);
	logs(user_id(message.user), ids, message.$match[2], type = 1)
 	
 	user.bloks.pay = true; 
		setTimeout(() => {
			user.bloks.pay = false;
	}, 360000);

	vk.api.call("messages.send", {
		peer_id: acc.users[message.$match[1]].id,
		message: `💴 » Игрок Айди: ${id} - ${user.prefix}\n💴 » Перевел вам ${message.$match[2]}$ | В ${time()}`
	}).then((res) => {}).catch((error) => {console.log('pay(peredacha) error'); });	
	return message.send(`💴 » Вы успешно перевели ${acc.users[message.$match[1]].prefix} » ${utils.sp(message.$match[2])}$.`);
});

vk.updates.hear(/^(?:бпередать)\s?([0-9]+)?\s?([0-9]+)?/i,  (message) => {  
	let user = acc.users[user_id(message.user)];
	if(user.admin.block_pay == true) return message.send(`🔸 » У вас заблокированы переводы денег.`)  
	let id = user_id(message.user)
	let ids = message.$match[1]
	if(!message.$match[1] || !message.$match[2]) return message.send(`👉 » Пример команды: бпередать (айди) (сумма)`)
	if(!Number(message.$match[1]) || !Number(message.$match[2])) return message.send(`👉 » айди и сумма должны быть числового вида.`)
	if(!acc.users[message.$match[1]] || message.$match[2] < 0) return message.send(`👉 » Некорректно введены данные`)
	if(message.$match[2] > user.bitcoin) return message.send(`👉 » У вас нет столько Биткоинов`);
	user.bitcoin -= Number(message.$match[2]);
	acc.users[message.$match[1]].bitcoin += Number(message.$match[2]);
	logs(user_id(message.user), ids, message.$match[2], type = 1)
 
	vk.api.call("messages.send", {
		peer_id: acc.users[message.$match[1]].id,
		message: `💴 » Игрок Айди: ${id} - ${user.prefix}\n💴 » Перевел вам ${message.$match[2]}฿ | В ${time()}`
	}).then((res) => {}).catch((error) => {console.log('pay(peredacha) error'); });	
	return message.send(`💴 » Вы успешно перевели ${acc.users[message.$match[1]].prefix} » ${utils.sp(message.$match[2])}฿`);
});				 
 
////// Система машин

	vk.updates.hear(/^(?:машины)\s?([0-9]+)?/i, (message) => {  
 	let user = acc.users[user_id(message.user)];
 	let houses = ['Коробка', 'Подвал' , 'Палатка'] // дом
	for(z in houses){
		if(user.house == houses[z]){return message.send(`👉 » Ваш дом слишком дешевый, чтобы иметь данную машину`)}
	}
 	if(user.house == false) return message.send(`👉 » Чтобы купить машину Вам нужен дом!`);  
		if(!message.$match[1]){
			return message.send(`
			🚘 » Машины:

			1. Mercedes S-Class - 35.000.000$
			2. Volkswagen Phaeton - 45.000.000$
			3. Lexus LS 430 - 60.000.000$
			4. Skoda Rapid - 75.000.000$
			5. Audi A8 -  95.000.000$
			6. Range Rover - 119.000.000$
			7. BMW X6 - 120.000.000$
			8. Porsche Cayenne - 155.000.000$
			9. BMW 7 Series - 164.000.000$
			10. Lexus LX - 190.000.000$
			11. Audi R8 - 250.000.000$
			 
			🚘 » Чтобы купить - машины (номер)
			🚘 » Чтобы продать - машина продать
			👉 » Чтобы отправить машину - в путь
			👉 » При продаже вернется 75% от суммы.
			`)
		}
	let i = message.$match[1]; 
	let ids = [0,1,2,3,4,5,6,7,8,9,10,11]
 	let count = [0, 35000000,45000000,60000000,75000000,95000000,119000000,120000000,155000000,164000000,190000000,250000000];
 	let names = [0, 'Mercedes S-Class','Volkswagen Phaeton','Lexus LS 430','Skoda Rapid','Audi A8','Range Rover','BMW X6','Porsche Cayenne','BMW 7 Series','Lexus LX','Audi R8']
 	if(i < 0 || i > 11) return;
 	if(user.cars != false) return message.send(`🚘 » У вас уже куплена машина`);
 	if(i > 0 && i <= 11){
 		if(user.balance < count[i]) return message.send(`🚘 » У вас не достаточно денег.`);
 		user.balance -= count[i]; 
 		user.cars = ids[i]; 
 		return message.send(`🚘 » Вы купили машину ${names[i]} за ${utils.sp(count[i])}$`)
 	} 
 }); 
 
	vk.updates.hear(/^(?:машина продать)/i, (message) => {
		let count = [0, 1000000,5000000,10000000,15000000,25000000,39000000,49000000,55000000,64000000,70000000,80000000];
		let user = acc.users[user_id(message.user)];
		if(user.cars == false) return message.send(`🚘 » У вас нет машины`)
		let sum = count[user.cars] / 100 * 75;
		user.balance += sum; 
		user.cars = false; 
		return message.send(`🚘 » Вы продали свой автомобиль за ${utils.sp(sum)}$`)
	});

	vk.updates.hear(/^(?:в путь)\s?([0-9]+)?/i, (message) => {  
 	let user = acc.users[user_id(message.user)];
	if(user.cars == false) return message.send(`🚘 » У вас нет машины`)
		if(!message.$match[1]){
			return message.send(`
			🚘 »  Места для отправки машины в рейс:

			1. За город - 1ч 
			2. В Москву - 2ч
			3. За границу - 3ч 
			4. На Северный полюс - 4ч 
 
			🚘 » Вернувшись из рейса вы получите трофеи.
			🚘 » Чем ценнее машина, тем лучше трофеи.
			⚠ » Также, случайно может сломаться машина и она пропадет.
			`)
		}
	let i = message.$match[1]; 
	let name = [0, 'за город','в Москву','за границу','на северный полюс']
	let ids = [0,1,2,3,4]
 	let time = [0,3600000,7200000,10800000,14400000]
 	let times = [0,1,2,3,4]
 	if(i < 0 || i > 4) return;
 	if(user.reys != false) return message.send(`🚘 » У вас уже отправлена машина в рейс`);
 	if(i > 0 && i <= 4){   
 		user.reys = true;
 		message.send(`🚘 » Вы отправили машину в рейс ${name[i]} на ${times[i]} часов.`)
 		if(rand(1,100) < 80){

 			setTimeout(() => {
 				let a = 0;
 				if(i==1){a = rand(1500,5000,10000,20000,50000)}
 				if(i==2){a = rand(5000,9000,15000,30000,50000)}
 				if(i==3){a = rand(10000,15000,30000,50000,150000)}
 				if(i==4){a = rand(20000,30000,50000,150000,500000)}
 				let id_car = user.car;
				if(id_car < 3){a += rand(100000,300000)}
				if(id_car > 3 && id_car < 6){a += rand(5000000,8000000)}
				if(id_car > 6){a += rand(900000,1200000)}
				user.reys = false;
				return message.send(`🚘 » Ваша машина успешно вернулась с рейса.\n 🚘 » Вы получили - ${utils.sp(a)}$`)
			}, time[message.$match[1]]);

 		}else{
 			setTimeout(() => {
	 			user.reys = false;
				user.cars = false;
				return message.send(`🚘 » К несчастью ваша машина попала в аварию.\n🚘 » Груз не был доставлен, машину унилизировали.`)
			}, time);
 		} 
 	 
 	} 
 }); 

 
/////// Система вертолетов/самолетов

	vk.updates.hear(/^(?:вертолеты)\s?([0-9]+)?/i, (message) => {  
 	let user = acc.users[user_id(message.user)]; 
	let houses = ['Коробка', 'Подвал' , 'Палатка','Домик на дереве','Полуразрушенный Дом'] // car 
	for(z in houses){
		if(user.house == houses[z]){return message.send(`👉 » Ваш дом слишком дешевый, чтобы иметь данный самолет`)}
	}
 	if(user.house == false) return message.send(`👉 » Чтобы купить вертолет Вам нужен дом!`); /// ДОМ НЕ НИЖЕ 5
		if(!message.$match[1]){
			return message.send(`
			🚁 » Вертолеты: 

			1. Agusta A129 Mangusta - 15.000.000$
			2. Ми-24 - 25.000.000$ 
			3. AH-2 - 35.000.000$
			4. CAIC WZ-10 - 39.000.000$
			5. HAL LCH - 43.000.000$ 
			6. Eurocopter Tiger - 50.000.000$
			7. Ка-52 - 65.000.000$
			8. Apache - 80.000.000$

			🚁 » Чтобы купить - вертолеты (номер) 
			🚁 » Чтобы продать - вертолет продать
			👉 » При продаже вернется 75% от суммы
			`)
		}
	let i = message.$match[1]; 
	let ids = [0,1,2,3,4,5,6,7,8,9,10]
 	let count = [0, 150000000,25000000,35000000,39000000,43000000,50000000,6500000,80000000];
 	let names = [0, 'Agusta A129 Mangusta','Ми-24','AH-2','CAIC WZ-10','HAL LCH','Eurocopter Tiger','Ка-52','Apache']
 	if(i < 0 || i > 8) return;
 	if(user.helicopter != false) return message.send(`🚁 » У вас уже куплен вертолет`);
 	if(i > 0 && i <= 8){
 		if(user.balance < count[i]) return message.send(`🚁 » У вас не достаточно денег.`);
 		user.balance -= count[i];
 		user.helicopter = ids[i];
 		return message.send(`🚁 » Вы купили вертолет ${names[i]} за ${utils.sp(count[i])}$`)
 	} 
 }); 

 	vk.updates.hear(/^(?:самолеты)\s?([0-9]+)?/i,  (message) => {  

 	let user = acc.users[user_id(message.user)];  
	let houses = ['Коробка', 'Подвал' , 'Палатка','Домик на дереве','Полуразрушенный Дом','Дом в лесу'] 
	for(z in houses){
		if(user.house == houses[z]){return message.send(`👉 » Ваш дом слишком дешевый, чтобы иметь данный самолет`)}
	}
 	if(user.house == false) return message.send(`👉 » Чтобы купить самолет Вам нужен дом!`); /// ДОМ НЕ НИЖЕ 7
		if(!message.$match[1]){
			return message.send(`
			✈ » Самолеты:

			1. Fokker DR1 Triplane - 30.000.000$
			2. Mitsubishi A6M Zero - 85.000.000$
			3. Су-35С - 90.000.000$ 
			 
			✈ » Чтобы купить - самолеты (номер)
			✈ » Чтобы продать - самолет продать
			👉 » При продаже вернется 75% от суммы.
			`)
		}
	let i = message.$match[1]; 
	let ids = [0,1,2,3,4,5,6,7,8,9,10]
 	let count = [0, 30000000,85000000,90000000];
 	let names = [0, 'Fokker DR1 Triplane','Mitsubishi A6M Zero','Су-35С']
 	if(i < 0 || i > 3) return;
 	if(user.aircraft != false) return message.send(`✈ » У вас уже куплен самолет`);
 	if(i > 0 && i <= 3){
 	if(user.balance < count[i]) return message.send(`✈ » У вас не достаточно денег.`);
 	user.balance -= count[i];
 	user.aircraft = ids[i];
 	return message.send(`✈ » Вы купили самолет ${names[i]} за ${utils.sp(count[i])}$`)
 	} 
 }); 
 

	vk.updates.hear(/^(?:самолет продать)/i,  (message) => {
		let count = [0, 30000000,85000000,90000000];
		let user = acc.users[user_id(message.user)];
		if(user.aircraft == false) return message.send(`✈ » У вас нет самолета`)
		let sum = count[user.aircraft] / 100 * 75;
		user.balance += sum;
		user.aircraft = false;
		return message.send(`✈ » Вы продали свой самолет за ${utils.sp(sum)}$`)
	});

	vk.updates.hear(/^(?:вертолет продать)/i,  (message) => {
		let count = [0, 50000000, 15000000, 35000000, 39000000, 43000000, 50000000, 6500000, 80000000];
		let user = acc.users[user_id(message.user)];
		if(user.helicopter == false) return message.send(`🚁 » У вас нет вертолета`)
		let sum = count[user.helicopter] / 100 * 75;
		user.balance += sum;
		user.helicopter = false;
		return message.send(`🚁 » Вы продали свой вертолет за ${utils.sp(sum)}$`)
	});

////// Телефоны

vk.updates.hear(/^(?:Телефоны)\s?([0-9]+)?/i, message => {
    if(!message.$match[1]){
        return message.send(`
			📱 » Телефоны:
			  
			1. Nokia 3310 - 1000$
			2. Xiaomi Mi8 - 13000$
			3. Samsung Galaxy S9 - 30.000$
			4. iPhone X - 75.000$
			5. iPhone XR - 76.000$
			6. iPhone XS Max - 150.000$
			7. Xiaomi Mi Mix - 180.000$
			8. Torex FS1 - 200.000$
			9. Мегафон С1 - 250.000$
			 
			📱 » Чтобы купить - телефоны (номер)
			📱 » Чтобы продать - телефон отдать
			👉 » Деньги не возвращаются
            `);
    }
    let i = message.$match[1];
    let user = acc.users[user_id(message.user)];
    let count = [0, 1000,13000,30000,75000,76000,150000,180000,200000,250000];
    let names = [0, 'Nokia 108','Xiaomi Mi8','Samsung Galaxy S9',' iPhone X','iPhone XR','iPhone XS Max','Xiaomi Mi Mix','Torex FS1','Мегафон С1']
    if(i < 0 || i > 9) return;
    if(user.phone != false) return message.send(`&#128241; » У вас уже куплен телефон`);
    if(i > 0 && i <= 9){
        if(user.balance < count[i]) return message.send(`&#128241; » У вас не достаточно денег`);
        user.balance -= count[i];
        user.phone = names[i];
        return message.send(`&#128241; » Вы купили Телефон ${names[i]} за ${utils.sp(count[i])}$`)
    }else{
        if(user.donate < count[i]) return message.send(`У вас не достаточно рубинов`);
        user.donate -= count[i];
        user.phone = names[i];
        return message.send(`&#128241; » Вы купили Телефон ${names[i]} за ${utils.sp(count[i])} рубинов`)
	}
 });

   vk.updates.hear(/^(?:телефон отдать)/i, message => {
    let user = acc.users[user_id(message.user)];
    if(user.phone == false) return message.send(`&#128241; » У вас нет телефона`);
    user.phone = false;
    return message.send(`&#128241; » Вы успешно отдали телефон`);
 });

///// Бизнес система

	vk.updates.hear(/^(?:бизнес статистика)\s?([0-9]+)?/i,  (message) => {  
		let user = acc.users[user_id(message.user)]; 
		let text = '🏢 » Статистика бизнесов:\n⚠ » Каждые 20 минут прибыль пополняется автоматически в прибыли\n\n';
		if(user.bizs.one_biz == true){ text +=  `🏢 » Первый бизнес: ${user.bizs.one.name}\n📝 » Прибыль: ${utils.sp(user.bizs.one.pribil)}$\n`}
		if(user.bizs.two_biz == true){ text +=  `🏢 » Второй бизнес: ${user.bizs.two.name}\n📝 » Прибыль: ${utils.sp(user.bizs.two.pribil)}$\n`}
		return message.send(text)
	});

 vk.updates.hear(/^(?:бизнесы)\s?([0-9]+)?/i, message => {
 	if(!message.$match[1]){
 		return message.send(`
            🏢 » Бизнесы:

			1. Палатка - 5.000.000$ 
			2. Ларек - 10.000.000$ 
			3. Магазин - 50.000.000$
			4. Гипермаркет - 75.000.000$
			5. Универмаг - 90.000.000$ 
			6. АЗС - 150.000.000$
			7. Атомная станция - 200.000.000$
			8. Интернет провайдер - 400.000.000$
			9. Банк - 500.000.000$
			10. Московский наркопритон - 900.000.000$
			11. МГУ - 5.000.000.000$
			12. Государственная дума - 20.000.000.000$

			🏢 » Чтобы купить - бизнесы (номер)
			🏢 » Чтобы продать - бизнес продать (бизнес 1 или 2)
			👉 » Купить напишите - бизнесы (номер)
			👉 » Посмотреть данные о бизнесах - бизнес статистика 
			👉 » Получить деньги с бизнеса - бизнес прибыль
			👉 » При продаже вернется вся сумма!
 			`);
 	}
 	let i = message.$match[1];
 	let user = acc.users[user_id(message.user)];
	let count = [0, 5000000, 10000000, 50000000, 75000000, 90000000, 150000000, 200000000, 400000000, 500000000, 900000000, 5000000000, 20000000000];
	let pribil = [0, 3500000, 5000000, 25000000, 35000000, 40000000, 75000000, 100000000, 200000000, 250000000, 400000000, 2500000000, 10000000000];
 	let names = [0, 'Палатка','Ларек','Магазин','Гипермаркет','Универмаг','АЗС','Атомная станция','Интернет провайдер','Банк','Московский наркопритон','МГУ','Государственная дума'] 
	if(i < 0 || i > 12) return message.send(`🏢 » Неверный номер бизнеса.`)
	if(user.balance < count[i]) return message.send(`🏢 » У вас нет такой суммы.`);
 	if(!Number(message.$match[1])) return message.send(`🏢 » Укажите номер бизнеса`)
	if(Number(i) == user.bizs.one.id) return message.send(`🏢 » У вас уже куплен такой вид бизнеса.`)
	if(Number(i) == user.bizs.two.id) return message.send(`🏢 » У вас уже куплен такой вид бизнеса.`)	

 	if(user.bizs.one_biz == false){
 		user.balance -= count[i];
		user.bizs.one_biz = true;
		user.bizs.one.count = Number(count[i]);
		user.bizs.one.id = Number(i);
		user.bizs.one.uplvl = 1;
		user.bizs.one.name = names[i];
		user.bizs.one.pribil = pribil[i];
		user.bizs.one.zp = pribil[i];
		return message.send(`🏢 » Вы купили бизнес - ${names[i]} за ${utils.sp(count[i])}$`) 
	}
	if(user.bizs.two_biz == false){
		user.balance -= count[i];
		user.bizs.two_biz = true;
		user.bizs.two.count = Number(count[i])
		user.bizs.two.id = Number(i) 
		user.bizs.two.uplvl = 1;
		user.bizs.two.name = names[i];
		user.bizs.two.pribil = pribil[i];
		user.bizs.two.zp = pribil[i];
		return message.send(`🏢 » Вы купили бизнес ${names[i]} - за ${utils.sp(count[i])}$`) 
	}
	return message.send(`🏢 » У вас уже куплено 2 бизнеса`) 
 
 });

 vk.updates.hear(/^(?:питомцы)\s?([0-9]+)?/i, message => {
	if(!message.$match[1]){  
		return message.send(`
		🦍 » Питомцы:

		   🐌 1. Улитка -100.000$
		   🐋 2. Кит - 150.000$
		   🐑 3. Овца - 200.000$
		   🐔 4. Курица - 250.000$
		   🐨 5. Коала - 350.000$
		   🐝 6. Оса - 450.000$
		   🐷 7. Свинья - 600.000$
		   🐘 8. Слон - 850.000$
		   🐵 9. Мартышка - 950.000$
		   🐧 10. Пингвин - 1.000.000$
		   🦊 11. Лиса - 1.500.000$
		   🐶 12. Собака - 2.500.000$
		   🐼 13. Панда - 3.500.000$
		   🦍 14. Горилла - 4.000.000.000$

		   🦍 » Чтобы купить - питомцы (номер)
		   🦍 » Чтобы продать - питомец отдать
		   ⚠ » Деньги не возвращаются
			`);
	}
	let i = message.$match[1];
	let user = acc.users[user_id(message.user)];  
	let count = [0, 100000, 150000, 200000, 250000, 350000, 450000, 600000, 850000, 950000, 1000000, 1500000, 2500000, 3500000, 4000000000];
	let names = [0,'Улитка','Кит','Овца','Курица','Коала','Оса','Свинья','Слон','Мартышка','Пингвин','Лиса','Собака','Панда','Горилла']
	if(i < 0 || i > 14) return;
	if(user.pet.pit != false) return message.send(`🦍 » У вас уже куплен питомец`);
	if(i > 0 && i <= 14){
		if(user.balance < count[i]) return message.send(`🦍 » У вас не достаточно денег.`);
		user.balance -= count[i];
		user.pet.pit = names[i];
		return message.send(`🦍 » Вы купили питомца ${names[i]} за ${utils.sp(count[i])}$`)
	}
});

vk.updates.hear(/^(?:питомец отдать)/i, (message) => {
	let user = acc.users[user_id(message.user)];
	if(user.pet.pit == false) return message.send(`🦍 » У вас нет питомца`)
	user.pet.pit = false; 
	return message.send(`🦍 » Вы отдали своего питомца`)
});

	vk.updates.hear(/^(?:бизнес продать)\s?([0-9]+)?/i,  (message) => { 
		let user = acc.users[user_id(message.user)];
		if(user.bizs.one_biz == false && user.bizs.two_biz == false) return message.send(`🏢 » У вас нет бизнесов`)
		if(message.$match[1] < 0 || message.$match[1] > 2) return message.send(`🏢 » Укажите верный номер бизнеса (один или два)`);
		if(message.$match[1] == 1){
			let sum = user.bizs.one.count
			user.balance += sum;
			user.bizs.one_biz = false;
			user.bizs.one.count = false;
			user.bizs.one.id = false;
			user.bizs.one.name = false;
			user.bizs.one.pribil = 0; 
			user.bizs.one.uplvl = 0;
			user.bizs.one.zp = 0;
			return message.send(`🏢 » Вы продали свой бизнес за ${utils.sp(sum)}$`);
		}
		if(message.$match[1] == 2){
			let sum = user.bizs.two.count
			user.balance += sum;
			user.bizs.two_biz = false;
			user.bizs.two.count = false;
			user.bizs.two.id = false;
			user.bizs.two.name = false;
			user.bizs.two.pribil = 0; 
			user.bizs.two.uplvl = 0;
			user.bizs.two.zp = 0;
			return message.send(`🏢 » Вы продали свой бизнес за ${utils.sp(sum)}$`);
		}		  
	 
	});

	vk.updates.hear(/^(?:бизнес прибыль)/i, message => {
 	let user = acc.users[user_id(message.user)]; 
 	let text = '';
 	if(user.bizs.one_biz == false && user.bizs.two_biz == false) return message.send(`🏢️ » У вас нет бизнесов.`); 
	if(user.bizs.one.stop == true || user.bizs.two.stop == true) return message.send(`🏢️ » Прибыль можно брать раз в 20 минут.`)
 	
 	if(user.bizs.one_biz == true){
		let sum = user.bizs.one.pribil
 		text += `📝 » Прибыль бизнеса: ${user.bizs.one.name} - составила: ${utils.sp(sum)}$\n`;
		user.balance += Number(sum)
		user.bizs.one.pribil = 0 
 	}
 	if(user.bizs.two_biz == true){
		let sum = user.bizs.two.pribil
 		text += `📝 » Прибыль бизнеса: ${user.bizs.two.name} - составила: ${utils.sp(sum)}$\n`;
		user.balance += Number(sum)
		user.bizs.two.pribil = 0
 	}

 	user.bizs.one.stop = true;
 	user.bizs.two.stop = true;
 
	setTimeout(() => {
			user.bizs.one.stop = false;
			user.bizs.two.stop = false;
	}, 1200000);
 	return message.send(`
 		${text} 
 		`);
 });

///// АДМИН КОМАНДЫ - - - -- - - 

 	vk.updates.hear(/^(?:стата)/i,(message) => { 
 		let user = acc.users[user_id(message.user)];
		if(user.level < 1) return;
		let id = user_id(message.user)
 		return message.send(`
 			🔔 Статистика привилегированного игрока:

			🔸 » Твой айди: ${id}
			🔸 » Цифровой: ${user.id}
 			🔸 » Уровень: ${user.level.toString().replace(/1/gi, "Вип").replace(/2/gi, "Модератор").replace(/3/gi, "Администратор").replace(/4/gi, "Гл.Администратор").replace(/5/gi, "Разработчик").replace(/6/gi, "Помощник").replace(/7/gi, "Создатель").replace(/8/gi, "Кодер")}
 			🔸 » Часов до снятия: ${user.adm_time}

 			✉ » Количество ответов: ${user.ainfo.all_ans}
			♻ » Репутация: (${user.ainfo.good_ans} хороших | ${user.ainfo.bad_ans} плохих)
			⚠ » Выговоров: ${user.ainfo.vig}
			⚠ » Предупреждений: ${user.warn}
 			`);
	 });

	 vk.updates.hear(/^(?:репорт|report|жалоба|вопрос)\s?([^]+)?/i, (message) => { 
		let user = acc.users[user_id(message.user)];
		if(message.$from.type != 'user') return message.send(`⚠ » Обращаться в репорт можно только в лс бота!\n⚠ » Ссылка - ${config.group_url}`);
		if(user.admin.block_rep == true) return message.send(`⚠ » У вас заблокированы репорты`)
		let id = acc.users[user_id(message.user)].id;
		if(!message.$match[1]) return message.send(`🔍 » вы не написали текст! | репорт (текст)`);
		let a = zapret(message.$match[1]);
		if(a != 0) return message.send(a);

		rep.number += 1;
		rep.reports[rep.number] = {
			user: id,
			report: message.$match[1],
		}

		for(i in acc.users){
			if(acc.users[i].level >= 2){ 
				vk.api.call("messages.send", {
					user_id: acc.users[i].id,
					message: `⚠ » Репорт система:\n\n💡 » Поступил новый репорт!\n🔍 » Айди репорта: ${rep.number}\n✉ » Для просмотра текста репорта напишите - рапорт лист`
				}).then((res) => {}).catch((error) => {console.log('report error'); });	
			}
		}
		return message.send(`💡 » Вы успешно отправили репорт.`);
	});
	
	vk.updates.hear(/^(?:рапорт лист)/i,(message) => { 
		let user = acc.users[user_id(message.user)];
		if(user.level < 2) return message.send(`⚠ » Вы не модератор`); 
		let text = '';
		message.send('⚠ » Репорт система:');
		for(let id in rep.reports){
			text += `
        	💼 » Айди репорта: ${id}
        	💼 » Айди пользователя: ${rep.reports[id].user} 
			📃 » Жалоба/вопрос: ${rep.reports[id].report}
			`;
		}
		message.send(text).catch((error) => {console.log('promocode none'); }); 
		return message.send('🔍 » Найти пользователя: рнайти (айди пользователя)\n✉ » Для ответа: ответ (айди репорта) (айди пользователя) (ответ)');
	});

	vk.updates.hear(/^(?:респект)\s?([^]+)?/i, (message) => { 
		let user = acc.users[user_id(message.user)];
		if(!message.$match[1]) return message.send(`🔍 » Пример команды: респект +/-\n💡 » [+ » хороший ответ/ - » плохой ответ]`);
		if(user.rep.status == false) return message.send(`⚠ » Проверьте вводимые данные.`); 
		if(message.$match[1] == '+' || message.$match[1] == '-'){
			user.rep.status = false; 
			if(message.$match[1] == '+') acc.users[user.rep.id].ainfo.good_ans += 1; 
			if(message.$match[1] == '-') acc.users[user.rep.id].ainfo.bad_ans += 1;  
			let id = user.rep.id;
			user.rep.id = false;
			return message.send(`💡 » Вы успешно оценили ответ \n💼 » Администратора [${acc.users[id].prefix}] - ${message.$match[1].toString().replace(/\+/gi, 'Положительно').replace(/-/gi, 'Отрицательно')}.`)
		}
		return message.send(`⚠ » Проверьте вводимые данные.`); 
	});
 
	vk.updates.hear(/^(?:ответ)\s?([0-9]+)?\s?([0-9]+)\s([^]+)?/i, (message) => { 
		let user = acc.users[user_id(message.user)];
		if(user.admin.block_otv == true) return message.send(`⚠ » У вас заблокированы ответы на репорты`)
		if(user.level < 2) return
		if(!message.$match[1]) return;
		if(!rep.reports[message.$match[1]]) return message.send(`⚠ » Вы не можете ответить по причинам:\n💡 » Данного айди репорта нету\n💡 » Репортов из указанного чата не было\n💡 » Проверьте данные в команде - лист`);
		let a = zapret(message.$match[3]);
		if(a != 0) return message.send(a); 
		let id = (message.$match[2]);
		vk.api.call("messages.send", {
			peer_id: id,
			message: `💼 » Администратор: ${user.prefix}\n📃 » Ответил Вам:\n\n💡 » ответ: ${message.$match[3]}\n\n🔍 » Оцените ответ: респект +/- (хорошо/плохо)`
		}).then((res) => {}).catch((error) => {console.log('ans error'); });
		message.send(`💡 » Ответ отправлен.`)	
		var is = [user_id(message.user), message.text] 
		adm_log(is)
		for(i in acc.users){
			if(acc.users[i].level >= 2){ 
				vk.api.call("messages.send", {
					user_id: acc.users[i].id,
					message: `⚠ » Репорт система:\n\n💡 » Номер репорта: ${rep.number}\n⚠ » Игрок создавший репорт: ${id}\n⚠ » Ответил администратор: ${user.prefix}!\n🔍 » Репорт #${rep.number} был удален.`
				}).catch((error) => {console.log('repans (overmessage >= 2 level compeleted)'); }); 
			}
		}
		rep.number -= 1;
		delete rep.reports[message.$match[1]];
		rep.ans += 1;
		user.ainfo.all_ans += 1;
		user.ainfo.ans += 1;
	});

	vk.updates.hear(/^(?:репудалить)\s?([0-9]+)?/i, (message) => { 
		let user = acc.users[user_id(message.user)];
		if(user.level < 5) return message.send(`⚠ » Вы не разработчик`); 
		if(!message.$match[1]) return message.send(`⚠ » Пример использования: репудаить (айди репорта)`);

		var is = [user_id(message.user), message.text] 
		adm_log(is)

		delete rep.reports[message.$match[1]];
		rep.number -= 1;

		return message.send(`✅ » Вы удалили репорт\n⚠ » Осталось репортов: ${rep.number}`);
	});

	vk.updates.hear(/^(?:setnick)\s?([0-9]+)?\s([^]+)?/i, (message) => { 
		let user = acc.users[user_id(message.user)];
		if(user.level < 3) return message.send(`🔸 » Вы не гл.админ`); 
		if(!message.$match[1] || !message.$match[2]) return message.send(`🔸 » Пример команды: setnick (айди) (имя)`);
		let zaprets1 = message.$match[2].toLowerCase();
		var zapret = /(вк бо т |сова не спит|сова никогда не спит|с о в а н е с п и т|сованикогданеспит|сова не спит никогда|вкботру|vkvot ru|vkbotru|vkbot|v k b o t . r u|в к бот|порно|botvk|ботвк|vkbot|кбот|bot vk|хентай|секс|пидр|трах|насилие|зоофил|бдсм|сирия|hentai|hentay|синий кит|самоубийство|террористы|слив|цп|cp|маленькие|малолетки|сучки|трах|ебля|изнасилование|блять|хуй|пошел нах|тварь|мразь|сучка|гандон|уебок|шлюх|паскуда|оргазм|девственницы|целки|рассовое|мелкие|малолетки|несовершеннолетние|ебля|хентай|sex|bdsm|ebl|trax|syka|shlux|инцест|iznas|мать|долбаеб|долбаёб|хуесос|сучка|сука|тварь|пездюк|хуй|шлюх|бог|сатана|мразь)/
		if (zapret.test(zaprets1) == true) { 
				return message.send(`📗 » Придумайте адекватный ник`);
		}
		var filter0 = /(http(s)?:\/\/.)?(www\.)?[-a-z0-9@:%._\+~#=]{1,256}\.[a-z]{2,6}/
		var filter1 = /(?!http(s)?:\/\/)?(www\.)?[а-я0-9-_.]{1,256}\.(рф|срб|блог|бг|укр|рус|қаз|امارات.|مصر.|السعودية.)/
		var lol = filter0.test(zaprets1)
		var lol1 = filter1.test(zaprets1)	
		if (filter0.test(zaprets1) == true || filter1.test(zaprets1) == true) { 
			return message.send(`📗 » Придумайте адекватный ник`);
		}
		var is = [user_id(message.user), message.text] 
		adm_log(is)
		acc.users[message.$match[1]].prefix = message.$match[2];
		user.ainfo.nicks += 1;
		return message.send(`📗 » Вы сменили ник игрока на: ${message.$match[2]}`);
	});

	vk.updates.hear(/^(?:ban)\s?([0-9]+)?\s([^]+)?/i, (message) => {  
		let user = acc.users[user_id(message.user)];
		if(!message.$match[1] || !acc.users[message.$match[1]] || !message.$match[2]) return message.send(`🔸 » Пример команды: ban (айди) (причина)`);
		if(!Number(message.$match[1])) return message.send(`🔸 » Число должно быть цифрового вида.`);
		if(user.level < 3) return message.send(`🔸 » Вы не модератор`);
		if(message.$match[1] == 1){
			var is = [user_id(message.user), message.text] 
			adm_log(is)
			return message.send(`⚠ » Этому игроку нельзя выдавать бан.\n ⚠ » Я пишу на тебя репорт создателю и кодеру!`);
		};
		if(!acc.users[message.$match[1]]) return message.send(`❎ » Такого игрока нет!`);
		acc.users[message.$match[1]].ban = message.$match[2]; 
		user.ainfo.bans += 1;
		vk.api.call('messages.send', {
			peer_id: acc.users[message.$match[1]].id,
			message: `✅ » ${user.prefix} заблокировал Вас навсегда.\n✅ » Причина: ${message.$match[2]}\n ⚠ » Если Вас забанили не по правилам и Вы хотите обжаловать это решение напишите в обсуждение - ${config.ban_topic}`
		});
		var is = [user_id(message.user), message.text] 
		adm_log(is)
		return message.send(`✅ » Вы заблокировали игрока ${acc.users[message.$match[1]].prefix} - навсегда.\n✅ » Причина: ${message.$match[2]}`);
	}); 

	vk.updates.hear(/^(?:bangroup)\s?([0-9]+)?\s?([0-9]+)?\s([^]+)?/i, (message) => {  
		let user = acc.users[user_id(message.user)];
		if(acc.users[user_id(message.user)].level < 6) return message.send(`⚠ » Вы не помощник`);
		if(!message.$match[1] || !message.$match[2] || !acc.users[message.$match[1]] || !message.$match[3]) return message.send(`🔸 » Пример команды: ban (айди) (причина вк 0-4) (причина)`);
		if(!Number(message.$match[1])) return message.send(`🔸 » Число должно быть цифрового вида.`);
		if(!Number(message.$match[2]) > 0) return message.send(`🔸 » Число должно быть цифрового вида (от 0 до 4)\n🔸 » 0 — другое (по умолчанию);1 — спам;2 — оскорбление участников;3 — нецензурные выражения;4 — сообщения не по теме`);
		if(message.$match[1] == 1){
			var is = [user_id(message.user), message.text] 
			adm_log(is)
			return message.send(`⚠ » Этому игроку нельзя выдавать бан.\n ⚠ » Я пишу на тебя репорт создателю и кодеру!`);
		};
		token_user.api.call('groups.ban', {
			group_id: 160410582,
			owner_id: acc.users[message.$match[1]].id,
			reason: message.$match[2],
			comment: '⚠ » Если Вам выдали бан в группе не по правилам, отпишитесь Кодеру проекта - vk.com/remdey',
			comment_visible: 1
		});
		acc.users[message.$match[1]].ban = message.$match[3]; 
		user.ainfo.bans += 1;
		vk.api.call('messages.send', {
			peer_id: acc.users[message.$match[1]].id,
			message: `✅ » ${user.prefix} заблокировал Вас в группе навсегда.\n✅ » Причина: ${message.$match[3]}\n ⚠ » Если Вам выдали бан в группе не по правилам, отпишитесь Кодеру проекта - vk.com/remdey`
		});
		var is = [user_id(message.user), message.text] 
		adm_log(is)
		return message.send(`✅ » Вы заблокировали игрока ${acc.users[message.$match[1]].prefix} - в группе навсегда.\n✅ » Причина: ${message.$match[3]}`);
	}); 

vk.updates.hear(/^(?:выдать деньги)\s?([0-9]+)?/i, message => {
		let user = acc.users[user_id(message.user)];
		if(user.admin.block_give == true) return message.send(`🔸 » У вас заблокирована выдача валюты.`)
		if(user.level < 1) return message.send(`🔸 » Вы не администратор`);
		if(user.bloks.giverub == true) return message.send(`💰 » Выдавать валюту можно раз в 10 минут`);
		if(user.level == 1){
			if(!message.$match[1] || message.$match[1] < 0 || message.$match[1] > 100000000) return message.send(`💰 » Пример: setmoney (1-100000000)'`);
			user.balance += Number(message.$match[1]);
		}
		if(user.level == 2){
			if(!message.$match[1] || message.$match[1] < 0 || message.$match[1] > 200000000) return message.send(`💰 » Пример: setmoney (1-200000000)`);
			user.balance += Number(message.$match[1]);
		}
		if(user.level == 3){
			if(!message.$match[1] || message.$match[1] < 0 || message.$match[1] > 300000000) return message.send(`💰 » Пример: setmoney (1-300000000)`);
			user.balance += Number(message.$match[1]);
		}
		if(user.level == 4){
			if(!message.$match[1] || message.$match[1] < 0 || message.$match[1] > 400000000) return message.send(`💰 » Пример: setmoney (1-400000000)`);
			user.balance += Number(message.$match[1]);
		}
	user.bloks.giverub = true;
		setTimeout(() => {
			user.bloks.giverub = false;
	}, 360000);
	
	return message.send(`💰 » Вы выдали себе ${utils.sp(message.$match[1])}$`);
});

vk.updates.hear(/^(?:giverub)\s?([0-9]+)?\s?([0-9]+)?/i,  message => {
	let user = acc.users[user_id(message.user)];
	let id = user_id(message.user)
	let i = config;
	if(acc.users[id].level < 5) return;
			if(!message.$match[1] || !acc.users[message.$match[1]] || !message.$match[2] || message.$match[2] < 0) return message.send(`💰 » Пример команды: giverub (айди) (кол-во)`); 
			acc.users[message.$match[1]].balance += Number(message.$match[2]);
		 	
			logs(user_id(message.user), message.$match[1], message.$match[2], type = 2)
			var is = [user_id(message.user), message.text] 
			adm_log(is)
			return message.send(`💰 » Вы выдали @id${acc.users[message.$match[1]].id}(${acc.users[message.$match[1]].prefix}) - ${utils.sp(message.$match[2])}$`);
});

vk.updates.hear(/^(?:givecard)\s?([0-9]+)?\s?([0-9]+)?/i,  message => {
	let user = acc.users[user_id(message.user)];
	let id = user_id(message.user)
	let i = config;
	if(acc.users[id].level < 5) return;
			if(!message.$match[1] || !acc.users[message.$match[1]] || !message.$match[2] || message.$match[2] < 0) return message.send(`💰 » Пример команды: givecard (айди) (кол-во)`); 
			acc.users[message.$match[1]].card += Number(message.$match[2]);
		 	
			var is = [user_id(message.user), message.text] 
			adm_log(is)
			return message.send(`💰 » Вы выдали на карту @id${acc.users[message.$match[1]].id}(${acc.users[message.$match[1]].prefix}) - ${utils.sp(message.$match[2])}$`);
});

vk.updates.hear(/^(?:ungiverub)\s?([0-9]+)?\s?([0-9]+)?/i,  message => {
	let user = acc.users[user_id(message.user)];
	let id = user_id(message.user)
	let i = config;
	if(acc.users[id].level < 5) return;
			if(!message.$match[1] || !acc.users[message.$match[1]] || !message.$match[2] || message.$match[2] < 0) return message.send(`💰 » Пример команды: ungiverub (айди) (кол-во)`); 
			acc.users[message.$match[1]].balance -= Number(message.$match[2]);
		 	
			logs(user_id(message.user), message.$match[1], message.$match[2], type = 2)
			var is = [user_id(message.user), message.text] 
			adm_log(is)
			return message.send(`💰 » Вы отняли у [@id${acc.users[message.$match[1]].id}(${acc.users[message.$match[1]].prefix})] - ${utils.sp(message.$match[2])}$`); 
});

vk.updates.hear(/^(?:removerub)\s?([0-9]+)?/i, message => {
	let user = acc.users[user_id(message.user)];
	let id = user_id(message.user)
	let i = config;
	if(acc.users[id].level < 4) return; 
			if(!message.$match[1] || !acc.users[message.$match[1]]) return message.send(`💰 » Пример команды: removerub (айди)`); 
			acc.users[message.$match[1]].balance = 0;
				logs(user_id(message.user), message.$match[1], message.$match[2], type = 3)
			return message.send(`💰 » Вы забрали деньги у [@id${acc.users[message.$match[1]].id}(${acc.users[message.$match[1]].prefix})]`); 
});

vk.updates.hear(/^(?:removedon)\s?([0-9]+)?/i, message => {
	let user = acc.users[user_id(message.user)];
	let id = user_id(message.user)
	let i = config;
	if(acc.users[id].level < 4) return; 
			if(!message.$match[1] || !acc.users[message.$match[1]]) return message.send(`💰 » Пример команды: removerub (айди)`); 
			acc.users[message.$match[1]].donate = 0;
				logs(user_id(message.user), message.$match[1], message.$match[2], type = 3)
			return message.send(`💰 » Вы забрали донат деньги у [@id${acc.users[message.$match[1]].id}(${acc.users[message.$match[1]].prefix})]`); 
});

vk.updates.hear(/^(?:removecard)\s?([0-9]+)?/i, message => {
	let user = acc.users[user_id(message.user)];
	let id = user_id(message.user)
	let i = config;
	if(acc.users[id].level < 4) return; 
			if(!message.$match[1] || !acc.users[message.$match[1]]) return message.send(`💰 » Пример команды: removecard (айди)`); 
			acc.users[message.$match[1]].card = 0;

			var is = [user_id(message.user), message.text] 
			adm_log(is)
			return message.send(`💰 » Вы забрали деньги на карте у [@id${acc.users[message.$match[1]].id}(${acc.users[message.$match[1]].prefix})]`); 
});

vk.updates.hear(/^(?:ungivecard)\s?([0-9]+)?\s?([0-9]+)?/i,  message => {
	let user = acc.users[user_id(message.user)];
	let id = user_id(message.user)
	let i = config;
	if(acc.users[id].level < 5) return;
			if(!message.$match[1] || !acc.users[message.$match[1]] || !message.$match[2] || message.$match[2] < 0) return message.send(`💰 » Пример команды: ungivecard (айди) (кол-во)`); 
			acc.users[message.$match[1]].card -= Number(message.$match[2]);
		 	
			logs(user_id(message.user), message.$match[1], message.$match[2], type = 2)
			var is = [user_id(message.user), message.text] 
			adm_log(is)
			return message.send(`💰 » Вы отняли у пользователя на карте [@id${acc.users[message.$match[1]].id}(${acc.users[message.$match[1]].prefix})] - ${utils.sp(message.$match[2])}$`); 
});

vk.updates.hear(/^(?:giverate)\s?([0-9]+)?\s?([0-9]+)?/i,  message => {
	let user = acc.users[user_id(message.user)];
	let id = user_id(message.user)
	let i = config;
	if(acc.users[id].level < 5) return;
			if(!message.$match[1] || !acc.users[message.$match[1]] || !message.$match[2] || message.$match[2] < 0) return message.send(`💰 » Пример команды: giverate (айди) (кол-во)`); 
			acc.users[message.$match[1]].global_exs += Number(message.$match[2]);
			logs(user_id(message.user), message.$match[1], message.$match[2], type = 6)
			var is = [user_id(message.user), message.text] 
			adm_log(is)
			return message.send(`💰 » Вы выдали игроку [@id${acc.users[message.$match[1]].id}(${acc.users[message.$match[1]].prefix})] ${utils.sp(message.$match[2])} рейтинга`);
});

vk.updates.hear(/^(?:removerate)\s?([0-9]+)?/i, message => {
	let user = acc.users[user_id(message.user)];
	let id = user_id(message.user)
	let i = config;
	if(acc.users[id].level < 5) return; 
			if(!message.$match[1] || !acc.users[message.$match[1]]) return message.send(`💰 » Пример команды: removerate (айди)`); 
			acc.users[message.$match[1]].global_exs = 0;
			logs(user_id(message.user), message.$match[1], message.$match[2], type = 7)
			var is = [user_id(message.user), message.text] 
			adm_log(is)
			return message.send(`💰 » Вы забрали весь рейтинг у [@id${acc.users[message.$match[1]].id}(${acc.users[message.$match[1]].prefix})]`);
});

vk.updates.hear(/^(?:ungiverate)\s?([0-9]+)?\s?([0-9]+)?/i,  message => {
	let user = acc.users[user_id(message.user)];
	let id = user_id(message.user)
	let i = config;
	if(acc.users[id].level < 5) return;
			if(!message.$match[1] || !acc.users[message.$match[1]] || !message.$match[2] || message.$match[2] < 0) return message.send(`💰 » Пример команды: ungiverate (айди) (кол-во)`); 
			acc.users[message.$match[1]].global_exs -= Number(message.$match[2]);

			var is = [user_id(message.user), message.text] 
			adm_log(is)
			return message.send(`💰 » Вы отняли у [@id${acc.users[message.$match[1]].id}(${acc.users[message.$match[1]].prefix})] ${utils.sp(message.$match[2])} рейтинга`);
});

vk.updates.hear(/^(?:givedonate)\s?([0-9]+)?\s?([0-9]+)?/i,  message => {
	let id = user_id(message.user)
	
	let i = config;
	let user = acc.users[user_id(message.user)];
	if(acc.users[id].level < 5) return;
	if(user.level < 3) return message.send(`🔍 » Вы не разработчик`); 
	if(!message.$match[1] || !acc.users[message.$match[1]] || !message.$match[2] || message.$match[2] < 0) return message.send(`🔍 » Пример команды: givedonate (айди) (кол-во)`); 
	acc.users[message.$match[1]].donate += Number(message.$match[2]);
 	
	var is = [user_id(message.user), message.text] 
	adm_log(is)
	return message.send(`💡 » Вы выдали игроку @id${acc.users[message.$match[1]].id}(${acc.users[message.$match[1]].prefix}) - ${utils.sp(message.$match[2])} рубинов.`);
});

vk.updates.hear(/^(?:removedonate)\s?([0-9]+)?\s?([0-9]+)?/i, message => {
	let id = user_id(message.user)
	let i = config;
	if(acc.users[id].level < 5) return;
			if(!message.$match[1] || !acc.users[message.$match[1]] || !message.$match[2] || message.$match[2] < 0) return message.send(`🔍 » Пример команды: removedonate (айди) (кол-во) \n🔍 » кол-во - количество отнимаемой донат-валюты`); 
			let user = acc.users[user_id(message.user)];
			if(user.level < 3) return message.send(`🔍 » Вы не разработчик`); 
			acc.users[message.$match[1]].donate -= Number(message.$match[2]);
			return message.send(`💎 » Вы забрали  у @id${acc.users[message.$match[1]].id}(${acc.users[message.$match[1]].prefix}) - ${message.$match[2]} рубинов`);
});

vk.updates.hear(/^(?:апанель)$/i,  message => {
	let user = acc.users[user_id(message.user)];
	let id = user_id(message.user)
	if(acc.users[id].level < 5) return;
	if(user.level < 3) return message.send(`⚠ » Вы не разработчик`); 
			return message.send(`
			⚠ » Команды разработчика

			🔸 » выдача - команды на выдачу валюты и пр.
			🔸 » убрать - команды на аннулированиие валюты и пр.
			🔸 » бан - команды на вадачу бана, удаление, вайп и пр.
			🔸 » рас-пром - команды на рассылки, промокоды 
			🔸 » статистика - статистика null, nan, ban, mute`);
});

vk.updates.hear(/^(?:выдача)$/i,  message => {
	let user = acc.users[user_id(message.user)];
	let id = user_id(message.user)
	if(acc.users[id].level < 5) return;
	if(user.level < 3) return message.send(`⚠ » Вы не разработчик`); 
			return message.send(`
			⚠ » выдача - команды на выдачу валюты и пр.

			🔸 » giverub (айди) (кол-во) - выдать валюту
			🔸 » givecard (айди) (кол-во) - выдать валюту на карту
			🔸 » giverate (айди) (кол-во) - выдать рейтинг
			🔸 » givedonate (айди) (кол-во) - выдать рубины
			🔸 » givevip (айди) (время) - выдать на время вип
			🔸 » givemoder (айди) (время) - выдать на время модера
			🔸 » giveadm (айди) (время) - выдать на время админа
			🔸 » setadm (айди) (лвл 1-5) - выдать привилегию
			🔸 » adset (айди) (лвл 1-8) - выдать привилегию (доступно только кодеру)

			🔍 » bonus (0-1) - выключить/включить
			🔍 » апанель - главный хелп команд разработчика`);
});

vk.updates.hear(/^(?:убрать)$/i,  message => {
	let user = acc.users[user_id(message.user)];
	let id = user_id(message.user)
	if(acc.users[id].level < 5) return;
	if(user.level < 3) return message.send(`⚠ » Вы не разработчик`); 
			return message.send(`
			⚠ » убрать - команды на аннулированиие валюты и пр.

			🔸 » removerub (айди) - убрать валюту
			🔸 » removedon (айди) - убрать донат валюту
			🔸 » removecard (айди) - убрать валюту на карте
			🔸 » ungivecard (айди) (кол-во) - забрать кол-во валюты на карте
			🔸 » ungiverub (айди) (кол-во) - забрать кол-во валюты
			🔸 » removerate (айди) - убрать рейтинг
			🔸 » ungiverate (айди) (кол-во) - забрать кол-во рейтинга
			🔸 » removedonate (айди) (кол-во) - убрать кол-во рубинов
			🔸 » unmute (айди) - разбл. доступ к боту
			🔸 » репудалить (айди репорта) - удалить репорт
			🔸 » промудалить (промокод) - удалить промокод
			🔸 » unban (айди) - разбанить игрока
			🔸 » unbgroup (айди) - разбанить в группе (доступ у помощника)
			🔸 » unvig (айди) - снять админ-выговоры
			
			🔍 » айди репорта - айди можно найти в команде: лист
			🔍 » апанель - главный хелп команд разработчика`); 
});

vk.updates.hear(/^(?:бан)$/i,  message => {
	let user = acc.users[user_id(message.user)];
	let id = user_id(message.user)
	if(acc.users[id].level < 5) return;
	if(user.level < 3) return message.send(`⚠ » Вы не разработчик`); 
			return message.send(`
			⚠ » бан - команды на вадачу бана, удаление, вайп и пр.
			
			🔸 » blockgive (айди) (0-1) - запрет на выдачу валюту
			🔸 » blockrep (айди) (0-1) - запрет на репорт
			🔸 » blockotv (айди) (0-1) - запрет на ответ
			🔸 » blockpay (айди) (0-1) - запрет на переводы
			🔸 » zeroinguser (айди) - обнулить аккаунт игроку
			🔸 » !kek (ссылка на вк) - кекает игрока из беседы, ес стоит у бота админ (доступ у помощника)
			🔸 » вайп - делает обнуление всего у пользователей (доступ у кодера)
			🔸 » development - ставит бота на тех. работы (доступ у кодера)
			🔸 » undevelopment - снимает бота с тех. работ (доступ у кодера)
			🔸 » вбонус - позволяет игрокам взять бонус (доступ у кодера)
			🔸 » ban (айди) (причина) - выдать бан
			🔸 » bangroup (айди) (причина вк 0-4) (причина) - выдать бан в группе (доступ у помощника)
			🔸 » mute (айди) (время 1-999) - забл. доступ к боту
			🔸 » vig (айди) - выдать админ-выговор

			🔍 » unbgroup причина вк - 0 — другое (по умолчанию);
			🔍 » прд.: 1 — спам;2 — оскорбление участников;3 — нецензурные выражения;4 — сообщения не по теме
			🔍 » blockgive (0-1) - включить/выключить
			🔍 » blockrep (0-1) - включить/выключить
			🔍 » blockpay (0-1) - включить/выключить
			🔍 » blockotv (0-1) - включить/выключить
			🔍 » апанель - главный хелп команд разработчика`); 
});

vk.updates.hear(/^(?:рас-пром)$/i,  message => {
	let user = acc.users[user_id(message.user)];
	let id = user_id(message.user)
	if(acc.users[id].level < 5) return;
	if(user.level < 3) return message.send(`⚠ » Вы не разработчик`); 
			return message.send(`
			⚠ » рас-пром - команды на рассылки, промокоды

			🔸 » !overmessage (текст) - сделать рассылку (доступ у создателя)
			🔸 » !postmessage (айди поста) - делает рассылку поста (доступ у создателя)
			🔸 » !chatovermessage (текст) - делает рассылку в чатах где состоит бот (доступ у создателя)
			🔸 » !пост (текст) - делает пост в группе (доступ у помощника)
			🔸 » !конкурс (текст) - делает пост конкурса и рассылку пользователям (доступ у помощника)
			🔸 » раздача - делает раздачу в группе по репостам (доступ у помощника)
			🔸 » addpromocode (разновидность 1-3) (активаций) (кол-во) - добавить промокод на монеты (доступ у помощника)
			🔸 » addprompogdon (версия активации) (кол-во активаций) (кол-во валюты) (название) - добавить подгон на бабки (доступ у помощника)
			🔸 » промчек (промокод) - увидете статистику использования промокодов
			
			🔍 » разновидность - 1 коины, 2 рубины, 3 биткоины
			🔍 » разновидность- 1 коины, 2 рубины
			🔍 » апанель - главный хелп команд разработчика`); 
});

vk.updates.hear(/^(?:статистика)$/i,  message => {
	let user = acc.users[user_id(message.user)];
	let id = user_id(message.user)
	if(acc.users[id].level < 5) return;
	if(user.level < 3) return message.send(`⚠ » Вы не разработчик`); 
			return message.send(`
			⚠ » статистика - статистика о разном в боте

			🔸 » bans - выдает все баны (вечные)
			🔸 » mutes - выдает все муты 
			🔸 » null - выдает всех пользователей с балансом null
			🔸 » nan - выдает всех пользователей с балансом nan
			🔸 » рапорт лист - выдает все репорты пользователей
			🔸 » пром лист - выдает все промокоды и их активации

			🔍 » апанель - главный хелп команд разработчика`);
});

vk.updates.hear(/^(?:zeroinguser)\s?([0-9]+)?/i,  message => {
	let id = user_id(message.user)

	let i = config;
	if(acc.users[id].level < 5) return;

			let user = acc.users[user_id(message.user)];
			if(user.level < 3) return message.send(`⚠ » Вы не разработчик`);
			if(message.$match[1] == 1){
				var is = [user_id(message.user), message.text] 
				adm_log(is)
				return message.send(`⚠ » Этому игроку нельзя удалять аккаунт..\n ⚠ » Я пишу на тебя репорт создателю и кодеру!`);
			};
			if(!message.$match[1] || !acc.users[message.$match[1]]) return message.send(`🔍 » Пример команды: zeroinguser (айди)`); 

			acc.users[message.$match[1]].balance = 0;
		 	acc.users[message.$match[1]].bitcoin = 0;
		 	acc.users[message.$match[1]].donate = 0;
		 	acc.users[message.$match[1]].exs = 0;
		 	acc.users[message.$match[1]].exsup = 50;
		 	acc.users[message.$match[1]].lvl = 0;
		 	acc.users[message.$match[1]].game.binlose = 0;
		 	acc.users[message.$match[1]].game.binwin = 0;
		 	acc.users[message.$match[1]].game.binstop = false;
		 	acc.users[message.$match[1]].game.kazlose = 0;
		 	acc.users[message.$match[1]].game.kazwin = 0;
		 	acc.users[message.$match[1]].game.rand_lose = 0;
		 	acc.users[message.$match[1]].game.rand_win = 0;
		 	acc.users[message.$match[1]].game.stavka_win = 0;
		 	acc.users[message.$match[1]].game.stavka_lose = 0;
		 	acc.users[message.$match[1]].game.win = 50;
		 	acc.users[message.$match[1]].msg.messages = 0;
		 	acc.users[message.$match[1]].msg.last_msg = '';
		 	acc.users[message.$match[1]].prefix = `Удален | ${time()} | ${data()}`;
		 	acc.users[message.$match[1]].cars = false;
		 	acc.users[message.$match[1]].house = false;
		 	acc.users[message.$match[1]].lodka = false;
		 	acc.users[message.$match[1]].rep.status = false;
		 	acc.users[message.$match[1]].rep.id = false;
		 	acc.users[message.$match[1]].warn = 0;
		 	acc.users[message.$match[1]].warn_p = [];
		 	acc.users[message.$match[1]].aircraft = false;
		 	acc.users[message.$match[1]].helicopter = false; 
		 	acc.users[message.$match[1]].level = 0;
		 	acc.users[message.$match[1]].bizs.one_biz = false;
		 	acc.users[message.$match[1]].bizs.two_biz =  false;
		 	acc.users[message.$match[1]].bizs.one.count = false;
		 	acc.users[message.$match[1]].bizs.one.balance = 0;
		 	acc.users[message.$match[1]].bizs.one.id = false;
		 	acc.users[message.$match[1]].bizs.one.name = false;
		 	acc.users[message.$match[1]].bizs.one.people = 0;
		 	acc.users[message.$match[1]].bizs.one.uplvl = 0;
		 	acc.users[message.$match[1]].bizs.one.zp = 0;
		 	acc.users[message.$match[1]].bizs.two.count = false;
		 	acc.users[message.$match[1]].bizs.two.balance = 0;
		 	acc.users[message.$match[1]].bizs.two.id = false;
		 	acc.users[message.$match[1]].bizs.two.name = false;
		 	acc.users[message.$match[1]].bizs.two.people = 0;
		 	acc.users[message.$match[1]].bizs.two.uplvl = 0;
		 	acc.users[message.$match[1]].bizs.two.zp = 0;
		 	acc.users[message.$match[1]].bizs.two.max_peop = 0; 
		 	acc.users[message.$match[1]].bizs.one.max_peop = 0;
		 	acc.users[message.$match[1]].job.name = false;
		 	acc.users[message.$match[1]].job.count = 0;
		 	acc.users[message.$match[1]].job.stop = false;
		 	acc.users[message.$match[1]].job.lvl = 0;
		 	acc.users[message.$match[1]].mute = false;
		 	acc.users[message.$match[1]].ferm.id = false;
		 	acc.users[message.$match[1]].ferm.zp = 0;
		 	acc.users[message.$match[1]].reys = false;
		 	acc.users[message.$match[1]].housep = 0;
		 	acc.users[message.$match[1]].pit = false;
		 	acc.users[message.$match[1]].bank = 0;
		 	acc.users[message.$match[1]].brak = false;
		 	acc.users[message.$match[1]].safe.status = false;
		 	acc.users[message.$match[1]].safe.key = false;
		 	acc.users[message.$match[1]].credit = 0;
		 	acc.users[message.$match[1]].procent = 0;
		 	acc.users[message.$match[1]].global_exs = 0;
		 	acc.users[message.$match[1]].autozp = false;
		 	acc.users[message.$match[1]].autobiz = false;
		 	acc.users[message.$match[1]].clan_name = false;
		 	acc.users[message.$match[1]].duel = false;
		 	acc.users[message.$match[1]].duel_summ = false;
		 	acc.users[message.$match[1]].uron = 0;
		 	acc.users[message.$match[1]].gun_name = false;
		 	acc.users[message.$match[1]].block_game = true;
		 	acc.users[message.$match[1]].nachal = false;
					 
			return message.send(`🔍 » Вы удалили аккаунт игрока @id${acc.users[message.$match[1]].id}(${acc.users[message.$match[1]].prefix})`);
	
});

vk.updates.hear(/^(?:вайп)$/i,  (message) => { 
	let id = user_id(message.user)
	if(acc.users[id].level < 8) return;
			if(acc.users[id].level < 8) return message.send(`⚠ » Вы не кодер`);
	for(i in acc.users){ 
		let user = acc.users[i]; 
		user.balance = 0;
		user.donate = 0;
	    user.game.binlose = 0;
		user.game.binwin = 0;
		user.game.kazlose = 0;
		user.game.kazwin = 0;
		user.game.rand_lose = 0;
		user.game.rand_win = 0;
		user.game.stavka_win = 0;
		user.game.stavka_lose = 0;
		user.game.strela_loose = 0;
		user.game.strela_win = 0;
		user.cars = false;
		user.house = false;
		user.lodka = false;
		user.aircraft = false;
		user.helicopter = false;
		user.bitcoin = 0;
		user.exs = 0;
		user.exsup = 50;
		user.lvl  = 0;
		user.global_exs = 0;
		user.bizs.one_biz = false;
		user.bizs.two_biz =  false;
		user.bizs.one.count = false;
		user.bizs.one.balance = 0;
		user.bizs.one.id = false;
		user.bizs.one.name = false;
		user.bizs.one.people = 0;
		user.bizs.one.uplvl = 0;
		user.bizs.one.zp = 0; 
		user.bizs.two.count = false;
		user.bizs.two.balance = 0;
		user.bizs.two.id = false;
		user.bizs.two.name = false;
		user.bizs.two.people = 0;
		user.bizs.two.uplvl = 0;
		user.bizs.two.zp = 0;
		user.bizs.two.max_peop = 0;
		user.bizs.one.max_peop = 0;
		user.job.name = false;
		user.job.count = 0;
		user.job.lvl = 0;
		user.ferm.id = false;
		user.ferm.zp = 0;
		user.gun_name = false;
		user.phone = false;
		vk.api.call('messages.send', {
			user_id: acc.users[i].id,
			message: `📢 » Рассылка:\n Был произведен вайп.\n Посмотри команду: обновление (там есть новые обновления)`
		});
	}
		return message.send(`🔍 » Вайп сделал и разослал всем уведомления!`)
   });	

vk.updates.hear(/^(?:вбонус)$/i,  (message) => { 
 let id = user_id(message.user)
  if(acc.users[id].level < 8) return;
    if(acc.users[id].level < 8) return message.send(`⚠ » Вы не кодер`);
for(i=1;i < 200000; i++){  
	if(acc.users[i]){
 acc.users[i].bloks.bcaseb = false;
}
} 
return message.send(`🔍 » Обнулил бонус!`)
});	

//////////////// mute /////////
vk.updates.hear(/^(?:mute)?\s([0-9]+)?\s?([0-9]+)?/i, (message) => { 
	let user = acc.users[user_id(message.user)];
	if(user.level < 1) return message.send(`⚠ » Вы не вип`);
	if(message.$match[1] == 1){
		var is = [user_id(message.user), message.text] 
		adm_log(is)
		return message.send(`⚠ » Этому игроку нельзя выдавать мут..\n ⚠ » Я пишу на тебя репорт создателю и кодеру!`);
	};
	if(!message.$match[2] || !Number(message.$match[1]) || !Number(message.$match[2]) || !acc.users[message.$match[1]] || message.$match[2] > 999 || message.$match[2] < 1) return message.send(`⏺ » Проверьте вводимые данные:\n⏺ » mute (айди) (время 1-999)`);
	let time = message.$match[2] * 60000;
	let id = Number(message.$match[1])
	acc.users[id].mute = true;

	var is = [user_id(message.user), message.text] 
	adm_log(is)

	setTimeout(() => {
			acc.users[id].mute = false;
			vk.api.call('messages.send', {
				peer_id: acc.users[id].id,
				message: `⏺ » Временная блокировка была снята!`
			});
	}, time);

	vk.api.call('messages.send', {
		peer_id: acc.users[id].id,
		message: `⏺ » ${user.prefix} временно заблокировал доступ к боту на ${message.$match[2]} минут(ы).\n⏺ » Через ${message.$match[2]} минут блокировка пропадет. \n ⚠ » Если Вас замутили не по правилам и Вы хотите обжаловать это решение напишите в обсуждение - ${config.ban_topic}`
	});
	return message.send(`🔍 » Вы заблокировали временно доступ к боту, игроку @id${acc.users[message.$match[1]].id}(${acc.users[message.$match[1]].prefix}) на ${time/60000} минут`); 
});

vk.updates.hear(/^(?:development)$/i,  (message) => { 
	let id = user_id(message.user)
	if(acc.users[id].level < 8) return;
			if(acc.users[id].level < 8) return message.send(`⚠ » Вы не кодер`);
	for(i in acc.users){ 
		let user = acc.users[i]; 
		user.development = true;
		vk.api.call('messages.send', {
			user_id: acc.users[i].id,
			message: `📢 » Рассылка:\nБот на тех. работах.\nВ данный момент Вы не сможете писать боту\nКак только тех. работы закончатся мы Вам сообщим!`
		}).catch((error) => {console.log('overmessage (development compeleted)'); 
	}); 
	}
		return message.send(`⚠ » Бот на тех. работах, всем разослал сообщения!`)
   });	

vk.updates.hear(/^(?:undevelopment)$/i,  (message) => { 
	let id = user_id(message.user)
	if(acc.users[id].level < 8) return;
			if(acc.users[id].level < 8) return message.send(`⚠ » Вы не кодер`);
	for(i in acc.users){ 
		let user = acc.users[i]; 
		user.development = false;
		vk.api.call('messages.send', {
			user_id: acc.users[i].id,
			message: `📢 » Рассылка:\n Тех. работы закончились, приятной игры!`
		}).catch((error) => {console.log('overmessage (undevelopment compeleted)'); 
	}); 
	}
		return message.send(`⚠ » Снял бота с тех. работ и разослал сообщения!`)
   });	

vk.updates.hear(/^(?:вбонус)$/i,  (message) => { 
 let id = user_id(message.user)
  if(acc.users[id].level < 8) return;
    if(acc.users[id].level < 8) return message.send(`⚠ » Вы не кодер`);
for(i=1;i < 200000; i++){  
	if(acc.users[i]){
 acc.users[i].bloks.bcaseb = false
}
} 
return message.send(`🔍 » Обнулил бонус!`)
});	

vk.updates.hear(/^(?:unmute)\s?([0-9]+)?/i, (message) => { 
	let user = acc.users[user_id(message.user)];
	if(user.level < 1) return message.send(`⚠ » Вы не вип`);
	if(!message.$match[1] || !Number(message.$match[1]) || !acc.users[message.$match[1]]) return message.send(`⚠ » Проверьте вводимые данные:\n⚠ » unmute (айди)`);
		var is = [user_id(message.user), message.text] 
		adm_log(is)
 	
	acc.users[message.$match[1]].mute = false;  
	vk.api.call('messages.send', {
		peer_id: acc.users[message.$match[1]].id,
		message: `✅ » Временная блокировка была снята досрочно`
	});
	return message.send(`✅ » Вы сняли блокировку игроку @id${acc.users[message.$match[1]].id}(${acc.users[message.$match[1]].prefix})`);
	 
});

////////////////////////////// 

	vk.updates.hear(/^(?:unban)\s?([0-9]+)?/i, (message) => { 
		let user = acc.users[user_id(message.user)];
		if(!message.$match[1]) return message.send(`⚠ » Пример команды: unban (айди)`);
		if(!Number(message.$match[1])) return message.send(`⚠ » Число должно быть цифрового вида.`);
		if(user.level < 3) return message.send(`⚠ » Вы не администратор`);
		if(!acc.users[message.$match[1]]) return message.send(`❎ » Такого игрока нет!`);
		acc.users[message.$match[1]].ban = false 
		vk.api.call('messages.send', {
			peer_id: acc.users[message.$match[1]].id,
			message: `✅ » ${user.prefix} разблокировал Вас.`
		});
		var is = [user_id(message.user), message.text] 
		adm_log(is)
		return message.send(`✅ » Вы разблокировали игрока ${acc.users[message.$match[1]].prefix}`);
	}); 

	vk.updates.hear(/^(?:unbgroup)\s?([0-9]+)?/i, (message) => { 
		let user = acc.users[user_id(message.user)];
		if(acc.users[user_id(message.user)].level < 6) return message.send(`⚠ » Вы не помощник`);
		if(!message.$match[1]) return message.send(`⚠ » Пример команды: unbgroup (айди)`);
		if(!Number(message.$match[1])) return message.send(`⚠ » Число должно быть цифрового вида.`);
		if(!acc.users[message.$match[1]]) return message.send(`❎ » Такого игрока нет!`);
		acc.users[message.$match[1]].ban = false 
		token_user.api.call('groups.unban', {
			group_id: 160410582,
			owner_id: acc.users[message.$match[1]].id
		});
		vk.api.call('messages.send', {
			peer_id: acc.users[message.$match[1]].id,
			message: `✅ » ${user.prefix} разблокировал Вас в группе.`
		});
		var is = [user_id(message.user), message.text] 
		adm_log(is)
		return message.send(`✅ » Вы разблокировали игрока ${acc.users[message.$match[1]].prefix} в группе`);
	}); 

	vk.updates.hear(/^(?:warn)\s?([0-9]+)?\s([^]+)?/i, (message) => { 
		let user = acc.users[user_id(message.user)];
		if(!message.$match[1] || !message.$match[2]) return message.send(`⚠ » Пример команды: warn (айди) (причина)`);
		if(message.$match[1] == 1){
			var is = [user_id(message.user), message.text] 
			adm_log(is)
			return message.send(`⚠ » Этому игроку нельзя выдавать предупреждение..\n ⚠ » Я пишу на тебя репорт создателю и кодеру!`);
		};
		if(!Number(message.$match[1])) return message.send(`⚠ » Число должно быть цифрового вида.`);
		if(user.level < 2) return message.send(`⚠ » Вы не модератор`);
		if(!acc.users[message.$match[1]]) return message.send(`❎ » Такого игрока нет!`);

		acc.users[message.$match[1]].warn += 1;
		acc.users[message.$match[1]].warn_p.push(message.$match[2]);
		logs(user_id(message.user), message.$match[1], message.$match[2], type = 6)

		var is = [user_id(message.user), message.text] 
		adm_log(is)

		message.send(`✅ » Вы выдали предупреждение игроку ${acc.users[message.$match[1]].prefix}.`);
		let text = `✅ » ${user.prefix} выдал вам warn(предупреждение)\n Причина: ${acc.users[message.$match[1]].warn_p}.`
		if(acc.users[message.$match[1]].warn == 3){
			acc.users[message.$match[1]].warn = 0;
			acc.users[message.$match[1]].ban = true;
			acc.users[message.$match[1]].warn_p = []
			text += `\n⚠ » У вас 3 предупреждения.\n✅ » Ваш аккаунт заблокирован.`
			vk.api.call("messages.removeChatUser", {
				chat_id: message.chatId, 
				user_id: acc.users[message.$match[1]].id
			})
			return message.send(`✅ » Я выдал спермач пользователю, что аж кикнул его..`)
		}
		vk.api.call('messages.send', {
			peer_id: acc.users[message.$match[1]].id,
			message: text
		});
		user.ainfo.warns += 1;
	}); 
	
	vk.updates.hear(/^(?:unwarn)\s?([0-9]+)?/i, (message) => { 
		let user = acc.users[user_id(message.user)];
		if(!message.$match[1]) return message.send(`⚠ » Пример команды: unwarn (айди)`);
		if(!Number(message.$match[1])) return message.send(`⚠ » Число должно быть цифрового вида.`);
		if(user.level < 4) return message.send(`⚠ » Вы не Гл.Администратор`);
		if(!acc.users[message.$match[1]]) return message.send(`❎ » Такого игрока нет!`);

		acc.users[message.$match[1]].warn = 0; 
		acc.users[message.$match[1]].warn_p = []

		vk.api.call('messages.send', {
			peer_id: acc.users[message.$match[1]].id,
			message: `✅ » Администратор снял Вам все предупреждения`
		});
		var is = [user_id(message.user), message.text] 
		adm_log(is)
		return message.send(`✅ » Вы сняли все предупреждения игроку ${acc.users[message.$match[1]].prefix}.`);
	}); 

 


vk.updates.hear(/^(?:vig)\s?([0-9]+)?/i, (message) => { 
		let user = acc.users[user_id(message.user)];
		if(user.level < 4) return message.send(`⚠ » Вы не Гл.Администратор`);
		if(!message.$match[1]) return message.send(`⚠ » Пример команды: vig (айди)`);
		if(message.$match[1] == 1){
			var is = [user_id(message.user), message.text] 
			adm_log(is)
			return message.send(`⚠ » Этому игроку нельзя выдавать админ-выговор..\n ⚠ » Я пишу на тебя репорт создателю и кодеру!`);
		};
		if(!Number(message.$match[1])) return message.send(`⚠ » Число должно быть цифрового вида.`);
		if(user.level < 4) return message.send(`⚠ » Вы не Гл.Администратор`);
		if(!acc.users[message.$match[1]]) return message.send(`⚠ » Такого игрока нет!`);

		acc.users[message.$match[1]].ainfo.vig += 1; 

		var is = [user_id(message.user), message.text] 
		adm_log(is)
		message.send(`✅ » Вы выдали выговор игроку ${acc.users[message.$match[1]].prefix}.`);
		let text = `⚠ » ${user.prefix} выдал вам админ-выговор.\n💡 » После 3 вас снимет с админ-поста.`
		if(acc.users[message.$match[1]].ainfo.vig == 3){
			acc.users[message.$match[1]].ainfo.vig = 0;  
			acc.users[message.$match[1]].level = 0;
			text += `\n⚠ » У вас 3 админ-выговоров.\n✅ » Вы лишились админ-прав.`
			vk.api.call("messages.removeChatUser", {
				chat_id: message.chatId, 
				user_id: acc.users[message.$match[1]].id
			})
			return message.send(`✅ » Я выдал спермач пользователю, что аж кикнул его..`)
		}
		vk.api.call('messages.send', {
			peer_id: acc.users[message.$match[1]].id,
			message: text
		})
	}); 


	vk.updates.hear(/^(?:unvig)\s?([0-9]+)?/i, (message) => { 
		let user = acc.users[user_id(message.user)];
          if(user.level < 4) return message.send(`⚠ » Недоступно`);
		if(!message.$match[1]) return message.send(`⚠ » Пример команды: unvig (айди)`);
		if(!Number(message.$match[1])) return message.send(`⚠ » Число должно быть цифрового вида.`);
		if(user.level < 4) return message.send(`⚠ » Вы не Гл.Администратор`);
		if(!acc.users[message.$match[1]]) return message.send(`❎ » Такого игрока нет!`);

		acc.users[message.$match[1]].ainfo.vig = 0; 

		vk.api.call('messages.send', {
			peer_id: acc.users[message.$match[1]].id,
			message: `✅ » Администратор снял Вам все выговоры`
		});
		var is = [user_id(message.user), message.text] 
		adm_log(is)
		return message.send(`✅ » Вы сняли все выговоры игроку ${acc.users[message.$match[1]].prefix}.`);
	}); 

///////////////////////////////////////////////////////////////////////////

	vk.updates.hear(/^(?:бот)$/i, (message) => {
		return message.send(`
		📝 » Основная информация:
		&#4448;📝 » Проект: ${config.group_url}
		&#4448;&#4448;&#4448;Версия: ${config.ver}
		&#4448;📝 » Платформа: ${config.platform}

		&#4448;💼 » Создатель: ${config.sozd}
		&#4448;💼 » Кодер: ${config.coder}

		📝 » Статистика:
		&#4448;📗 » Аккаунтов: ${acc.number}
		&#4448;📗 » Сообщений: ${acc.msg}
		&#4448;📗 » Репортов: ${rep.number}
		&#4448;📗 » Отвеченных репортов: ${rep.ans}
		&#4448;📗 » Работаем: 
		&#4448;&#4448;&#4448;Дней: ${uptime.days}
		&#4448;&#4448;&#4448;Часов: ${uptime.hours}
			`);
	});
	vk.updates.hear(/^(?:беседы)$/i,  (message) => { 
		return message.send(`
	📘 » Ссылки на наши беседы, скорее заходи: 

   1. https://vk.cc/9f8Ti1 (официальная беседа)
   2. https://vk.cc/99DgPV (беседа игрока | [id223486886|Павел Морозов])
   3. https://vk.cc/9avkTh (беседа игрока | [id203807770|Макс Киров])
   4. https://vk.cc/9bs2AJ (беседа игрока | [id367081452|Евгений Калашников])`);
	});

/////
vk.updates.hear(/^(?:баланс|счёт)/i,  (message) => { 
	let user = acc.users[user_id(message.user)]; 
	return message.send(`
		🔍 » ID: ${user_id(message.user)} 
		💴 » Баланс: ${utils.sp(user.balance)}$ 
		💴 » Баланс на карте: ${utils.sp(user.card)}$
		💽 » Биткоинов: ${utils.sp(user.bitcoin)}฿
		🎲 » Рубинов: ${utils.sp(user.donate)} 
		🔸 » Уровень: ${user.lvl} 
		👑 » Рейтинг: ${utils.sp(user.global_exs)}
		🏆 » Опыт: ${user.exs}/${user.exsup}`)
});

vk.updates.hear(/^(?:get)\s?([0-9]+)?/i, (message) => {  
	let user = acc.users[user_id(message.user)]; 
	let warns = '';
	if(!message.$match[1] || !Number(message.$match[1]) || !acc.users[message.$match[1]]) return message.send(`🔸 » Проверьте вводимые данные.`);
	for(i=0;i<acc.users[message.$match[1]].warn_p.length;i++){warns += `⛔ » ${acc.users[message.$match[1]].warn_p[i]}\n`}
	if(user.level < 1) return; 
	let id = acc.users[message.$match[1]]
	let cars = [0, 'Mercedes S-Class','Volkswagen Phaeton','Lexus LS 430','Skoda Rapid','Audi A8','Range Rover','BMW X6','Porsche Cayenne','BMW 7 Series','Lexus LX', 'Audi R8']
	let hel = [0, 'Agusta A129 Mangusta','Ми-24','AH-2','CAIC WZ-10','HAL LCH','Eurocopter Tiger','Ка-52','Apache']
	let air = [0, 'Fokker DR1 Triplane','Mitsubishi A6M Zero','Су-35С']
	return message.send(`
		📋 Информация об игроке: ${id.prefix}
		🔸 » Имя: ${id.prefix}
		🔹 » ID: ${message.$match[1]}
		🔹 » Цифровой: ${id.id}
		🔹 » VK: @id${id.id}(${id.prefix})
		🔹 » Баланс: ${utils.sp(id.balance)}$
		🔹 » Баланс на карте: ${utils.sp(id.card)}$
		🔹 » Биткоинов: ${utils.sp(id.bitcoin)}฿
		🔹 » Рубинов: ${utils.sp(id.donate)}
		🔹 » Привилегия: ${id.level.toString().replace(/0/gi, "Игрок").replace(/1/gi, "Вип").replace(/2/gi, "Модератор").replace(/3/gi, "Администратор").replace(/4/gi, "Гл.Администратор").replace(/5/gi, "Разработчик").replace(/6/gi, "Помощник").replace(/7/gi, "Создатель").replace(/8/gi, "Кодер")}
		🔹 » Часов до снятия: ${id.adm_time}
		`+(id.clan_name == false ? `🔹 » Клан: отсутствует\n` : `🔹 » Клан: ${id.clan_name}\n`)+`

		💞 » Брак:\n`+
		(id.brak == false ? `💖 » Не женат\n` : `💖 » Муж/жена: ${acc.users[id.brak].prefix}\n`)+`

		✒ » Имущество:\n`+
		(user.level >= 3 ? id.aircraft == false ? `✈ » Самолет:  отсутствует\n` : `✈ » Самолет:  ${air[id.aircraft]}\n` : ``)+
		(user.level >= 3 ? id.helicopter == false ? `🚁 » Вертолет: отсутствует\n` : `🚁 » Вертолет: ${hel[id.helicopter]}\n` : ``)+
		(user.level >= 3 ? id.cars == false ? `🚘 » Автомобиль: отсутствует\n` : `🚘 » Автомобиль: ${cars[id.cars]}\n` : ``)+  
		(user.level >= 3 ? id.lodka == false ? `🚤 » Лодка: отсутствует\n` : `🚤 » Лодка: ${id.lodka}\n` : ``)+
		(user.level >= 3 ? id.phone == false ? `📱 » Телефон: отсутствует\n` : `📱 » Телефон: ${id.phone}\n` : ``)+ 
		(user.level >= 3 ? id.house == false ? `🏡 » Дом: отсутствует\n` : `🏡 » Дом: ${id.house}\n` : ``)+   
		(user.level >= 3 ? id.pet.pit == false ? `🦍 » Питомец: отсутствует\n` : `🦍 » Питомец: ${id.pet.pit}\n` : ``)+   
		(user.level >= 2 ? id.gun_name == false ? `🔫 » Оружие: отсутствует\n` : `🔫 » Оружие: ${id.gun_name}\n` : ``)+ `

		🏨 » Бизнесы:\n`+
		(user.level >= 3 ? id.bizs.one.name == false ? `1&#8419; » отсутствует\n` : `1&#8419; » ${id.bizs.one.name} » Прибыль(20мин): ${utils.sp(id.bizs.one.pribil)}$\n` : ``)+  
		(user.level >= 3 ? id.bizs.two.name == false ? `2&#8419; » отсутствует\n` : `2&#8419; » ${id.bizs.two.name} » Прибыль(20мин): ${utils.sp(id.bizs.two.pribil)}$\n` : ``)+`

		₿ » Фермы:\n`+
		(user.level >= 3 ? id.ferm.one.name == false ? `1&#8419; » отсутствует\n` : `1&#8419; » ${id.ferm.one.name} » Прибыль(20мин): ${utils.sp(id.ferm.one.pribil)}฿\n` : ``)+  
		(user.level >= 3 ? id.ferm.two.name == false ? `2&#8419; » отсутствует\n` : `2&#8419; » ${id.ferm.two.name} » Прибыль(20мин): ${utils.sp(id.ferm.two.pribil)}฿\n` : ``)+`

		🔔 » Статистика:\n`+
		(user.level >= 3 ? `🔸 » Последнее смс боту: ${id.msg.last_msg}\n` : ``)+  
		(user.level >= 3 ? `🔸 » Сообщений боту: ${utils.sp(id.msg.messages)}\n` : ``)+ 
		(user.level >= 2 ? `🔸 » Уровень: ${id.lvl}\n` : ``)+ 
		(user.level >= 2 ? `🔸 » Опыт: ${id.exs}\n` : ``)+  

		(user.level >= 2 ? `\n⚠ » Предупреждений: ${id.warn}\n` : ``)+ 
		(user.level >= 2 ? `⚠ » Причины: [${id.warn}]\n${warns}\n` : ``)+ 
		(user.level >= 4 ? `⛔ » Админ-выговоров: ${id.ainfo.vig}\n` : ``)+  
		(id.ban == false ? `⚠ » Аккаунт не заблокирован\n` : `⚠ » Аккаунт заблокирован [${id.ban}]`)+`

		📚 » Дата регистрации: ${id.rtime}`);
});

vk.updates.hear(/^(?:свадьба)\s?([0-9]+)?/i, (message) => {  
	let user = acc.users[user_id(message.user)]; 
	if(user.brak != false) return message.send(`🙅 » Вы уже женаты`);
	if(!acc.users[message.$match[1]]) return message.send(`🚶 » Такого игрока нет`);
	if(acc.users[message.$match[1]].brak != false) return message.send(`🙅 » Этот игрок уже женат!`);
	user.brak = Number(message.$match[1]);
	acc.users[message.$match[1]].brak = user_id(message.user);
	return message.send(`👫 » Поздравляю! Вы женились: \n👫 » ${user.prefix} и ${acc.users[message.$match[1]].prefix}`)
});

vk.updates.hear(/^(?:развод)/i, (message) => {  
	let user = acc.users[user_id(message.user)]; 
	if(user.brak == false) return message.send(`🙅 » Вы не женаты`); 
	user.brak = false;
	return message.send(`🙎‍ » Вы успешно развелись`)
});

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

vk.updates.hear(/^(?:игропрофиль)/i, (message) => { 
	let user = acc.users[user_id(message.user)];
	return message.send(`
		📕 » Ваш игровой профиль
		🔸 » Имя: ${user.prefix}
		🔸 » ID: ${user_id(message.user)}
		🔸 » Баланс: ${utils.sp(user.balance)}$
		🔸 » Баланс на карте: ${utils.sp(user.card)}$
	
		🎲 » Игры:

		🎰 » Казино: [Побед: ${user.game.kazwin} | Поражений: ${user.game.kazlose}]
		📊 » Акции: [Побед: ${user.game.binwin} | Поражений: ${user.game.binlose}]
		🎲 » Ставка: [Побед: ${user.game.stavka_win} | Поражений: ${user.game.stavka_lose}]
		💰 » Рандом: [Побед: ${user.game.rand_win} | Поражений: ${user.game.rand_lose}]
		🔫 » Стрелы: [Побед: ${user.game.strela_loose} | Поражений: ${user.game.strela_win}] 
		`);

});

 

vk.updates.hear(/^(?:профиль|проф)\s?([0-9]+)?/i, (message) => { 
	 let cars = [0, 'Mercedes S-Class','Volkswagen Phaeton','Lexus LS 430','Skoda Rapid','Audi A8','Range Rover','BMW X6','Porsche Cayenne','BMW 7 Series','Lexus LX', 'Audi R8']
	 let hel = [0, 'Agusta A129 Mangusta','Ми-24','AH-2','CAIC WZ-10','HAL LCH','Eurocopter Tiger','Ка-52','Apache']
	 let air = [0, 'Fokker DR1 Triplane','Mitsubishi A6M Zero','Су-35С']

	let user = acc.users[user_id(message.user)];
	let id = user_id(message.user)
	let warns = '';
	for(i=0;i<user.warn_p.length;i++){warns += `⛔ » ${user.warn_p[i]}\n`}

	if(!message.$match[1]){
		return message.send(`
🔸 » Имя: *id${message.user} (${acc.users[user_id(message.user)].prefix})
🔎 » Айди:  ${id}
💰 » Баланс: ${utils.sp(user.balance)}$
💰 » Баланс на карте: ${utils.sp(user.card)}$
🔸 » Уровень: ${user.lvl}	
🏆 » Опыт: ${user.exs}/${user.exsup}
👑 » Рейтинг: ${utils.sp(user.global_exs)}
💽 » Биткоинов: ${utils.sp(user.bitcoin)}฿
🎲 » Рубинов: ${utils.sp(user.donate)}
⛔ » Привилегия: ${user.level.toString().replace(/0/gi, "Игрок").replace(/1/gi, "VIP").replace(/2/gi, "Модератор").replace(/3/gi, "Администратор").replace(/4/gi, "Гл.Администратор").replace(/5/gi, "Разработчик").replace(/6/gi, "Помощник").replace(/7/gi, "Создатель").replace(/8/gi, "Кодер")}
`+(user.clan_name == false ? `🎩 » Клан: отсутствует\n` : `🎩 » Клан: ${user.clan_name}\n`)+`
⚠ » Предупреждений: [${user.warn}]
⚠ » Причины: 
${warns}

💞 » Брак:\n`+
(user.brak == false ? `💖 » Не женат\n` : `💖 » Муж/жена: ${acc.users[user.brak].prefix}\n`)+`

🔑 » Имущество:\n`+
(user.aircraft == false ? `✈ » Самолет: отсутствует\n` : `✈ » Самолет:  ${air[user.aircraft]}\n`)+
(user.helicopter == false ? `🚁 » Вертолет: отсутствует\n` : `🚁 » Вертолет: ${hel[user.helicopter]}\n`)+
(user.cars == false ? `🚘 » Автомобиль: отсутствует\n` : `🚘 » Автомобиль: ${cars[user.cars]}\n`)+  
(user.lodka == false ? `🚤 » Лодка: отсутствует\n` : `🚤 » Лодка: ${user.lodka}\n`)+ 
(user.phone == false ? `📱 » Телефон: отсутствует\n` : `📱 » Телефон: ${user.phone}\n`)+ 
(user.house == false ? `🏡 » Дом: отсутствует\n` : `🏡 » Дом: ${user.house}\n`)+
(user.pet.pit == false ? `🦍 » Питомец: отсутствует\n` : `🦍 » Питомец: ${user.pet.pit}\n`)+` 
🏨 » Бизнесы:\n`+
(user.bizs.one_biz == false ? `1&#8419; » отсутствует\n` : `1&#8419; » ${user.bizs.one.name} » Прибыль(20мин): ${utils.sp(user.bizs.one.pribil)}$\n`)+  
(user.bizs.two_biz == false ? `2&#8419; » отсутствует\n` : `2&#8419; » ${user.bizs.two.name} » Прибыль(20мин): ${utils.sp(user.bizs.two.pribil)}$\n`)+`
₿ » Фермы:\n`+
(user.ferm.one.name == false ? `1&#8419; » отсутствует\n` : `1&#8419; » ${user.ferm.one.name} » Прибыль(20мин): ${utils.sp(user.ferm.one.pribil)}฿\n`)+  
(user.ferm.two.name == false ? `2&#8419; » отсутствует\n` : `2&#8419; » ${user.ferm.two.name} » Прибыль(20мин): ${utils.sp(user.ferm.two.pribil)}฿\n`)+`


📚 » Дата регистрации: ${user.rtime}
           `);
	}else{
		if(!Number(message.$match[1]) || !acc.users[message.$match[1]]) return message.send(`🔸 » Проверьте вводимые данные.`);
		let id = acc.users[message.$match[1]]
		return message.send(`
		📋 Информация об игроке: ${id.prefix}
		🔸 » Имя: ${id.prefix}
		🔹 » ID: ${message.$match[1]}
		🔹 » VK: @id${acc.users[message.$match[1]].id}(${acc.users[message.$match[1]].prefix})
		🔹 » Баланс: ${utils.sp(id.balance)}
		🔹 » Рубинов: ${utils.sp(id.donate)}
		🔹 » Привилегия: ${id.level.toString().replace(/0/gi, "Игрок").replace(/1/gi, "Вип").replace(/2/gi, "Модератор").replace(/3/gi, "Администратор").replace(/4/gi, "Гл.Администратор").replace(/5/gi, "Разработчик")}
		
		💞 » Брак:
        `+(id.brak == false ? `💖 Не женат\n` : `💖 Муж/жена: ${acc.users[id.brak].prefix}\n`)+
        `
		🔫 » Оружие:
		`+(id.gun_name == false ? `🔫 Отсутствует\n` : `🔫 Название: ${id.gun_name}\n`)+  
		` 
		🔫 Урон: ${id.uron}
		❤ Здоровье: 100
		`);
	} 
});
 
//////////////////////////////////////////

	vk.updates.hear(/^(?:топ рейтинг)/i,  (message) => {
		let user = acc.users[user_id(message.user)];

		let text = ``;
		var tops = []

		for (i=1;i<200000;i++) {
		if(acc.users[i]){
			if(acc.users[i].level < 3){ 
			tops.push({
				id: i,
				idvk: acc.users[i].id,
				lvl: acc.users[i].global_exs
			})
		}
	} 
}
		tops.sort(function(a, b){
			if (b.lvl > a.lvl) return 1
			if (b.lvl < a.lvl) return -1
			return 0
		});

		var yo = []
 
		for (var g = 0; g < 10; g++){
			if (tops.length > g) {
				let ups = g;
				ups += 1;
				if(g <= 8) ups = `${ups}&#8419;`
				if(g == 9) ups = `&#128287;`
				yo.push({
					id: tops[g].id,
					idvk: tops[g].idvk,
					lvl: tops[g].lvl,
					smile: `${ups}`
				})
			}
		}
		var people = "👑 Топ по рейтингу:\n\n" + yo.map(a => a.smile + " [id" + a.idvk + "|" + acc.users[a.id].prefix + "] - " + utils.sp(a.lvl) + "👑").join("\n")
		text += `${people}\n\n`; 
		message.send(text);
	});

	vk.updates.hear(/^(?:топ баланс)$/i,  (message) => {

		let text = ``;
		var tops = []

		for (i=1;i<200000;i++) {
		if(acc.users[i]){
		if(acc.users[i].level < 3){ 
			tops.push({
				id: i,
				idvk: acc.users[i].id,
				balance: acc.users[i].balance
			})
		}
	}  
}
		tops.sort(function(a, b) {
			if (b.balance > a.balance) return 1
			if (b.balance < a.balance) return -1
			return 0
		})

		var yo = []
 
		for (var g = 0; g < 10; g++) {
			if (tops.length > g) {
				let ups = g;
				ups += 1;
				if(g <= 8) ups = `${ups}&#8419;`
				if(g == 9) ups = `&#128287;`
				yo.push({
					id: tops[g].id,
					idvk: tops[g].idvk,
					balance: tops[g].balance,
					smile: `${ups}`
				})
			}
		}
		var people = "💰 Топ по балансу:\n\n" + yo.map(a => a.smile + " [id" + a.idvk + "|" + acc.users[a.id].prefix + "] - " + utils.sp(a.balance) + "$").join("\n")
		text += `${people}\n\n`; 
		return message.send(text);
	});

	vk.updates.hear(/^(?:топ кланы)$/i,  (message) => {

		let text = ``;
		var tops = []

		for(i in clan) {
			tops.push({
				exp: clan[i].exp,
				people: clan[i].people,
				name: i,
				owner: clan[i].owner
			});
		}		
		
		tops.sort(function(a, b) {
			if (b.exp > a.exp) return 1
			if (b.exp < a.exp) return -1
			return 0
		})

		var yo = []
 
		for (var g = 0; g < 10; g++) {
			if (tops.length > g) {
				let ups = g;
				ups += 1;
				if(g <= 8) ups = `${ups}&#8419;`
				if(g == 9) ups = `&#128287;`
				yo.push({
					owner: tops[g].owner,
					people: tops[g].people,
					name: tops[g].name,
					exp: tops[g].exp,
					smile: `${ups}`
				})
			}
		}
		var clans = "🎩 Топ по кланам:\n\n" + yo.map(a => a.smile + "Клан: " + a.name + "\n&#4448;Глава: " + " [id" + a.owner + "|" + acc.users[user_id(a.owner)].prefix + "] " + "\n&#4448;Опыт: " + utils.rn(a.exp) + "\n&#4448;Людей: " + a.people).join("\n")
		text += `${clans}\n\n`; 
		return message.send(text);
	});

	vk.updates.hear(/^(?:топ)/i, (message) => { 
		return message.send(`
		👑 Команды топа:

			🏆 » топ рейтинг - топ по рейтингу
			💰 » топ баланс - топ по балансу
			🎩 » топ кланы - топ по кланам
			
		🔍 » помощь - главный хелп в боте`);
	});

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	 vk.updates.hear(/^(?:опыт)/i, (message) => {
		if(message.$from.type != 'user') return message.send(`⚠ » Брать сундук с опытом можно только в лс боту!\n⚠ » Ссылка - ${config.group_url}`);
		let user = acc.users[user_id(message.user)];
 		let id = user_id(message.user)
 		if(user.bloks.cases == true) return message.send(`🌟 » сундук с опытом можно открывать раз в 60 минут.`);
 		user.bloks.cases = true
		setTimeout(() => {
			user.bloks.cases = false
		}, 3600000);

		text = '🌟 » Открыв сундук с опытом вы получили:\n'
		let count = rand(4,5);
		for(i=0;i<count;i++){
			x = rand(1,100)

			if(x>15){
				mon = rand(1,40)
				acc.users[id].exs += mon

				let up = lvlup(id);
				if(up == true){
					text += `🔹 » ${mon} опыта, ваш уровень повышен\n`
				}else{
					text += `🔹 » ${mon} опыта\n`
				}
			}
			
		}
		return message.send(text)
 	});
 

 	vk.updates.hear(/^(?:бсундук)/i, (message) => {  
		if(message.$from.type != 'user') return message.send(`⚠ » Брать большой сундук можно только в лс боту!\n⚠ » Ссылка - ${config.group_url}`);
		let user = acc.users[user_id(message.user)];
 		if(user.bloks.bcase == true) return message.send(`💵 » Большой сундук можно открывать раз в 60 минут.`); 
 		let id = user_id(message.user)
 		if(user.donate < 10) return message.send(`💵 » Большой сундук стоит 10 рубинов!`);
 		user.donate -= 10; 
 		user.bloks.bcase = true
		setTimeout(() => {
			user.bloks.bcase = false
		}, 3600000);

 		text = '💰 » Открыв большой сундук вы получили:\n'
 		let count = rand(10,15);
 		for(i=0;i<count;i++){
 			x = rand(1,100)
 			if(x<79){
 				mon = rand(25000,2000000);
 				text += `🔹 » ${utils.sp(mon)}$\n`
 				acc.users[id].balance += mon
 			}
 			if(x>79 && x <80){
 				mon = rand(1,30);
 				text += `🔹 » ${utils.sp(mon)} рубин\n`
 				acc.users[id].donate += mon
 			}
 			if(x>80){
 				mon = rand(2,10)
 				acc.users[id].exs += mon

 				let up = lvlup(id);
 				if(up == true){
 					text += `🔹 » ${mon} опыта, ваш уровень повышен\n`
 				}else{
 					text += `🔹 » ${mon} опыта\n`
 				}
 				 
 				 
 			}
 		}
 		return message.send(text)
 	});

	vk.updates.hear(/^(?:закрытый)/i, (message) => { 
		if(message.$from.type != 'user') return message.send(`⚠ » Брать закрытый сундук можно только в лс боту!\n⚠ » Ссылка - ${config.group_url}`);
		let user = acc.users[user_id(message.user)];
 		let id = user_id(message.user)
          if(user.level < 1) return message.send(`⚠ » У Вас нет випа и выше`);
 		if(user.bloks.a_case == true) return message.send(`💵 » Закрытый сундук можно открывать раз в 10 минут.`);
 		user.bloks.a_case = true
		setTimeout(() => {
			user.bloks.a_case = false
		}, 600000);

 		text = '💵 » Открыв закрытый сундук вы получили:\n'
 		let count = rand(5,9);
 		for(i=0;i<count;i++){
 			x = rand(10,150)
 			if(x<79){
 				mon = rand(25000,2000000);
 				text += `🔹 » ${utils.sp(mon)}$\n`
 				acc.users[id].balance += mon
 			}
 			if(x>79){
 				mon = rand(1,50);
 				text += `🔹 » ${utils.sp(mon)} рубин(ов)\n`
 				acc.users[id].donate += mon
 			}
 			if(x>80){
				mon = rand(2,10)
 				acc.users[id].exs += mon

 				let up = lvlup(id);
 				if(up == true){
 					text += `🔹 » ${mon} опыта, ваш уровень повышен\n`
 				}else{
 					text += `🔹 » ${mon} опыта\n`
 				}
 				 
 				 
 			}
 		}
 		return message.send(text)
 	});

	vk.updates.hear(/^(?:бонус)/i, (message) => {
		if(message.$from.type != 'user') return message.send(`⚠ » Брать бонус можно только в лс боту!\n⚠ » Ссылка - ${config.group_url}`);
		let user = acc.users[user_id(message.user)];
 		let id = user_id(message.user)
		if(user.bloks.bcaseb == true) return message.send(`🎁 » Брать бонус можно раз в 10 минут.`)
		user.bloks.bcaseb = true
		setTimeout(async () => {
			user.bloks.bcaseb = false
		}, 600000);		

 		text = '🎁 » Открыв бонус вы получили:\n'
 		let count = rand(1,3);
 		for(i=0;i<count;i++){
 			x = rand(1,100)
 			if(x<79){
 				mon = rand(25000,2000000);
 				text += `🔹 » ${utils.sp(mon)}$\n`
 				acc.users[id].balance += mon
 			}
 			if(x>79 && x <80){
 				mon = rand(1,50);
 				text += `🔹 » ${utils.sp(mon)} рубин(ов)\n`
 				acc.users[id].donate += mon
 			}
 			if(x>80){
				 mon = rand(2,10)
 				acc.users[id].exs += mon

 				let up = lvlup(id);
 				if(up == true){
 					text += `🔹 » ${mon} опыта, ваш уровень повышен\n`
 				}else{
 					text += `🔹 » ${mon} опыта\n`
 				}
 				 
 				 
 			}
 		}
 		return message.send(text)
	 });
	 
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	vk.updates.hear(/^(?:азино)\s?([^\s	].*)?/i, (message) => { 
		if(!message.$match[1]) return message.send(`⚠ » укажите ставку`);
		let user = acc.users[user_id(message.user)];
		let amount = Number(utils.parseBet(message.$match[1], user.balance));
		amount = Math.round(amount);
		let id = user_id(message.user)
		if(amount > acc.users[id].balance || amount < 1 ) return message.send(`🍀 » Ставка не может превышать баланс или быть ниже 1$`);
		if(!Number(amount)) return message.send(`🍀 » Ставка должна быть числом!`);

		
		if(acc.users[id].balance > 20000000){
			if(rand(1,100) <= 30){
				  
				user.game.kazwin += 1;
				user.balance -= amount;
				let sum = amount * 2;
				let a = 2
				user.balance += sum;
			
				if(amount >= 10000){
					 
					user.exs += 2;
					let up = lvlup(id);
					if(up == true){
						return message.send(`🍀 » Вы выиграли ${utils.sp(sum)}$ и ${a} опыта! \n🌟 » Уровень повышен`);
					}else{
						return message.send(`🍀 » Вы выиграли ${utils.sp(sum)}$ и ${a} опыта!`);
					}
				 }else{
					return message.send(`🍀 » Вы выиграли ${utils.sp(sum)}$\n🍀 » Опыт дается при ставке от 10.000$`);
				}
				 
			}else{
				user.game.kazlose += 1;
				user.balance -= amount;
				return message.send(`🌚 » Вы проиграли ${utils.sp(amount)}$!`);
			}
		}else{	
			if(rand(1,100) <= 20){
				 
				user.game.kazwin += 1;
				user.balance -= amount;
				let sum = amount * 2; 
				let a = 2
				user.balance += sum;
			
				if(amount >= 10000){
					 
					user.exs += 2;
					let up = lvlup(id);
					if(up == true){
						return message.send(`${text}🍀 » Вы выиграли ${utils.sp(sum)}$ и ${a} опыта! \n🌟 » (Уровень повышен)`);
					}else{
						return message.send(`${text}🍀 » Вы выиграли ${utils.sp(sum)}$ и ${a} опыта!`);
					}
				 }else{
					return message.send(`${text}🍀 » Вы выиграли ${utils.sp(sum)}$\n🍀 » Опыт дается при ставке от 10.000$`);
				}
				 
			}else{
				user.game.kazlose += 1;
				user.balance -= amount;
				return message.send(`🌚 » Вы проиграли ${utils.sp(amount)}$!`);
			}
		}
	});  

/////////////////////////////////////////////////////////////////////////////////////////////////

vk.updates.hear(/^(?:тер, кто я?)/i, (message) => { 
	let rez = rand(true);
	if(rez == false){
	}else{ 
		let count = ['гей','пидор','телка','говно','чмо','крутой','мой принц','телка админа','человек','пес','овца','лох','гей','кися','Панин','дебил','богатый','хуй','гей','пидор','телка','пукан','пидор','гейлорд','какашка единорога','пидор','фу говно'].random();
		return message.send(`🌚 » Думаю... что ты - ${count}`)
	}
}); 

vk.updates.hear(/^(?:шар)/i, (message) => { 
	let rez = rand(true);
	if(rez == false){
	}else{ 
		let count = ['я думаю, что да.','конечно!','не.','да, да','неть.','конечно же нет','ну.. да','я думаю, что да!'].random();
		return message.send(`🌚 » шар подсказывает - ${count}`);
	}
}); 

vk.updates.hear(/^(?:когда)/i, (message) => { 
	let rez = rand(true);
	if(rez == false){
	}else{
		return message.send(`😃 » Думаю... через -  ${rand(1,999999)} дней!`);
	}
}); 

vk.updates.hear(/^(?:лтест)/i, (message) => { 
	let rez = rand(true);
	let sum = rand(1,36);
	if(rez == false){
	}else{ 
		return message.send(`💖 » Тест показал, вас любит - @id${acc.users[sum].id}(${acc.users[sum].prefix})`);
	}
});

vk.updates.hear(/^(?:кто)/i, (message) => { 
	let rez = rand(true);
	let sum = rand(1,36);
	if(rez == false){
	}else{ 
		return message.send(`🌚 » Конечно же это - @id${acc.users[sum].id}(${acc.users[sum].prefix})`);
	}
});

vk.updates.hear(/^(?:фараон)\s?([^\s ].*)?/i, message => {
if(message.$from.type != 'user') return message.send(`⚠ » Играть с фараоном можно только в лс боту!\n⚠ » Ссылка - ${config.group_url}`);
let user = acc.users[user_id(message.user)];
if(!message.$match[1]) return message.send(`🎰 » Пример использования: фараон (ставка)`);
let amount = Number(utils.parseBet(message.$match[1], user.balance));
if(amount > acc.users[user_id(message.user)].balance) return message.send(`🎰 » Ставка больше баланса!`);
if(!Number(amount) || amount < 0) return message.send(`🎰 » Ставка не число...`);

amount = Math.round(amount);
let text = '';
let chat = message.user;

vk.api.call('messages.send', {
peer_id: chat,
message: `🎢🎢🎢`
})
.then((res) => {
let rez = [
{
id: 1,
smile: '🔥🔥🔥',
win: true
},
{
id: 2,
smile: '🔥🔥🔥',
win: true
},
{
id: 3,
smile: '🔥🔥🔥',
win: true
},
{
id: 4,
smile: '🔥⛔💎',
win: false
},
{
id: 5,
smile: '🔥💎⛔',
win: false
},
{
id: 6,
smile: '💎🔥⛔',
win: false
},
{
id: 7,
smile: '⛔🔥⛔',
win: false
},
{
id: 8,
smile: '⛔⛔⛔',
win: false
}
]

let chet = 0;
for(i=700;i<4900;i+=700){
let r = rez.random();
setTimeout(() => {
chet += 1;
if(chet == 6){
if(r.win == true){
acc.users[user_id(message.user)].balance += Number(amount);
vk.api.call('messages.edit', {
peer_id: chat,
message: r.smile+`\n\n🎰 » У вас верная комбинация!\n💎 » Вы выиграли: ${utils.sp(amount)}$`,
message_id: res
})
return;
}else{
acc.users[user_id(message.user)].balance -= Number(amount);
vk.api.call('messages.edit', {
peer_id: chat,
message: r.smile+`\n\n🎰 » У вас не верная комбинация..\n💎 » Вы проиграли: ${utils.sp(amount)}$`,
message_id: res
})
return;
}
}
vk.api.call('messages.edit', {
peer_id: chat,
message: r.smile,
message_id: res
})
}, i);
}
}).catch((error) => {console.log('faraon (error)'); });
});

	vk.updates.hear(/^(?:казино)\s?([^\s  ].*)?/i, (message) => {
		if(!message.$match[1]) return message.send(`🌚 » укажите ставку`);
		let user = acc.users[user_id(message.user)]; 
		let amount = Number(utils.parseBet(message.$match[1], user.balance));
		amount = Math.round(amount);   
		if(amount > user.balance || amount < 1 ) return message.send(`💎 » Ставка не может превышать баланс или быть ниже 1$`);
        if(!Number(amount)) return message.send(`🌚 » Ставка должна быть числом!`);

        let cof = [0.50,1,1.50,2,2.50,3].random();
        let win = ['🌚|🌚|🌚','🔸|🔸|🔸','🎲|🎲|🎲'].random();
        let lose = ['🌚|🎉|🔸','🔸|🎉|🔸','🎲|🎉|🎲'].random();

        if(rand(1,100) < 30){
        	let balance = amount;
        	let win_balance = balance * cof;
        	win_balance = Math.round(win_balance);
        	user.balance += Number(win_balance) 
        	return message.send(`💎 » Вы выиграли ${utils.sp(win_balance)}$!\n🔥 » Множитель: ${cof}x`); //🎲 » Вам выпала комбинация: [${win}]\n
        }else{
        	user.balance -= amount;
        	return message.send(`🌚 » Вы проиграли ${utils.sp(amount)}$!`); //🎲 » Вам выпала комбинация: [${lose}]
        }
	});
	
	vk.updates.hear(/^(?:риск)/i, (message) => { 
		let user = acc.users[user_id(message.user)];
		if(user.balance < 500000) return message.send(`💣  » У вас не хватает 500.000$`);
		let rez = [true, false].random();
		if(rez == false){
			user.balance -= 500000;
			return message.send(`🔥 » Вы проиграли 500.000$`);
		}else{ 
			let count = [1000000,3000000].random();
			user.balance += count;
			return message.send(`💎 » Вы выиграли ${utils.sp(count)}$`);
		}
	});

	vk.updates.hear(/^(?:тир)/i, (message) => { 
		let user = acc.users[user_id(message.user)];
		if(user.gun_name == false)	 return message.send(`🔫 » У вас нет оружия \n 🔫 » Команда для покупки оружия - Оружейный кейс`)
		if(user.balance < 10000) return message.send(`💣 » У вас не хватает 10.000$`);
		user.balance -= 10000;
		let rez = [true, false].random();
		if(rez == false){
			user.balance -= 5000;
			return message.send(`🔥 » Вы не попали и проиграли 5.000$`);
		}else{ 
			let count = [16000,54636,65653,11111,76788,56454,88878,114455].random();
			user.balance += count;
			return message.send(`💎 » Вы попали!\n👒 » Вы получили ${utils.sp(count)}$`);
		}
	});

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	vk.updates.hear(/^(?:акция)?\s([^\s].*)?\s(.*)/i, message => {
		if(!message.$match[1] || !message.$match[2]) return message.send(`📈 » Пример команды: акция (вверх/вниз) (ставка)`)
		let user = acc.users[user_id(message.user)];
		let amount = Number(utils.parseBet(message.$match[2], user.balance));
		amount = Math.round(amount);     
		let id = user_id(message.user) 
		if(amount > acc.users[id].balance || amount < 1) return message.send(`📈 » Ставка не может превышать баланс или быть ниже 1$`);
		if(!Number(amount)) return message.send(`📈 » Ставка должна быть числом!`); 

		 	if(message.$match[1] == 'вверх'){
				if(rand(1,2) == 1){ 
					user.balance -= amount;
					let sum = amount * 2;
					user.balance += sum;
					user.game.binwin += 1; 
 					{
 						return message.send(`📈 » Курс акций вырос на - ${rand(1,100)}%\n🍀 » Вы выиграли ${utils.sp(sum)}$!`);
 					}
				}else{ 
					user.game.binlose += 1;
					user.balance -= amount;
					return message.send(`📈 » Курс акций упал на - ${rand(1,100)}%\n🌚 » Вы проиграли ${utils.sp(amount)}$!`);
				}
			}
			if(message.$match[1] == 'вниз'){ 
				if(rand(1,2) == 1){
					user.balance -= amount;
					let sum = amount * 2;
					user.balance += sum; 
					user.game.binwin += 1;
					{
					return message.send(`📈 » Курс акций упал на - ${rand(1,100)}%\n🍀 » Вы выиграли ${utils.sp(sum)}$!`);
				}
				}else{ 
					user.game.binlose += 1;
					user.balance -= amount;
					return message.send(`📈 » Курс акций вырос на - ${rand(1,100)}%\n🌚 » Вы проиграли ${utils.sp(amount)}$!`);
				}
			} 
	});

	vk.updates.hear(/^(?:ставка)\s?([^]+)?\s([^\s	].*)/i,  message => {
		if(!message.$match[1]) return message.send(`🔸 » Пример команды: ставка (выше/ниже) (ставка)`)
		let user = acc.users[user_id(message.user)];
		let amount = Number(utils.parseBet(message.$match[2], user.balance));   
		amount = Math.round(amount);  
		let id = user_id(message.user) 
		if(amount > acc.users[id].balance || amount < 1) return message.send(`🔸 » Ставка не может превышать баланс или быть ниже 1$`);  
		if(!Number(amount)) return message.send(`🔸 » Ставка должна быть числом!`);

		 	if(message.$match[1] == 'выше'){
				if(rand(1,2) == 1){ 
						user.balance -= amount;
						user.balance += amount * 2;
						user.game.stavka_win += 1;
						{
						return message.send(`🔸 » Число [${utils.sp(rand(500000,999999))}]. Вы угадали!\n🔸 » Вы выиграли ${utils.sp(amount * 2)}$!`);
					    }
				       }else{ 
					user.game.stavka_lose += 1;
					user.balance -= amount;
					return message.send(`🔸 » Число [${utils.sp(rand(1,499999))}]\n🔸 » Вы проиграли ${utils.sp(amount)}$!`);
				       }
			}
			if(message.$match[1] == 'ниже'){ 
				if(rand(1,2) == 1){ 
						user.balance -= amount;
						user.balance += amount * 2;
						user.game.stavka_win += 1;  
					{
						return message.send(`🔸 » Число [${utils.sp(rand(1,499999))}]. Вы угадали!\n🔸 » Вы выиграли ${utils.sp(amount * 2)}$!`);
					}  
				}else{ 
					user.game.stavka_lose += 1;
					user.balance -= amount;
					return message.send(`🔸 » Число [${utils.sp(rand(500000,999999))}]\n🔸 » Вы проиграли ${utils.sp(amount)}$!`);
				}
			} 
	});
 
 	vk.updates.hear(/^(?:рандом)\s?([0-9]+)?\s([^\s	].*)/i, message => {
		let user = acc.users[user_id(message.user)];
		let i = Number(utils.parseBet(message.$match[2], user.balance));
 		if(!message.$match[1] || !message.$match[2] || !Number(i)|| !Number(message.$match[1]) || message.$match[1] > 60 ) return message.send(`🎲 » Пример ввода: рандом (1-60) (ставка)\n🎲 » (1-60) - это шанс(от него зависит сумма выплаты)`);
		user.bloks.random_game = true
		setTimeout(() => {
			user.bloks.random_game = false
		}, 300000); 
		let p = Number(message.$match[1]);
		let amount = p;
		amount = Math.round(amount);  
		if(!Number(message.$match[1])) return message.send(`🎲 » Пример ввода: рандом (1-60) (ставка)\n🎲 » (1-60) - это шанс, от него зависит сумма выплаты`);

		if (i > user.balance || i <= 0) return message.send(`🔸 »  Ставка не может превышать баланс или быть отрицательной`);  
		if(p >= 40){
			if(rand(1,130) <= p){ 
				i = i / 100 * 30 + i 

				user.exs += 30;
				user.game.rand_win += 1;
				let up = lvlup(user_id(message.user));
				user.balance += Math.round(i);
				if(up == true){
					return message.send(`🎲 » Вы выиграли ${utils.sp(Math.round(i))}$ при шансе: ${p}%\n🎲 » И получили +30 опыта\n🌟 » Уровень повышен`);
		 		}else{
					return message.send(`🎲 » Вы выиграли ${utils.sp(Math.round(i))}$ при шансе: ${p}%\n🎲 » И получили +30 опыта`);
	 			}  
			}else{ 
				user.game.rand_lose += 1;
				user.balance -= Number(i); 
				return message.send(`🎲 » Вы проиграли ${utils.sp(Math.round(i))}$`);
			} 
		} 
		if(p >= 20 && p < 40){
			if(rand(1,100) <= p){
				i = i / 100 * 20 + i 

				user.exs += 15;
				user.game.rand_win += 1;
				let up = lvlup(user_id(message.user)); 

				user.balance += Math.round(i);
				if(up == true){
					return message.send(`🎲 » Вы выиграли ${utils.sp(Math.round(i))}$ при шансе: ${p}%\n🎲 » И получили +15 опыта\n🌟 » Уровень повышен`);
		 		}else{
					return message.send(`🎲 » Вы выиграли ${utils.sp(Math.round(i))}$ при шансе: ${p}%\n🎲 » И получили +15 опыта`);
	 			}  
			}else{
				user.balance -= Number(i); 
				user.game.rand_lose += 1;
				return message.send(`🎲 » Вы проиграли ${utils.sp(Math.round(i))}$`);
			} 
		} 

		if(p >= 1 && p < 20){
			if(rand(1,100) <= p){
				i = i / 100 * 70 + i 

				user.exs += 10;
				user.game.rand_win += 1;
				let up = lvlup(user_id(message.user)); 

				user.balance += Math.round(i);
				if(up == true){
					return message.send(`🎲 » Вы выиграли ${utils.sp(Math.round(i))}$ при шансе: ${p}%\n🎲 » И получили +10 опыта\n🌟 » Уровень повышен`);
		 		}else{
					return message.send(`🎲 » Вы выиграли ${utils.sp(Math.round(i))}$ при шансе: ${p}%\n🎲 » И получили +10 опыта`);
	 			}  
			}else{
				user.balance -= Number(i); 
				user.game.rand_lose += 1;
				return message.send(`🎲 » Вы проиграли ${utils.sp(i)}$`);
			} 
		} 

		user.balance -= Number(message.$match[2]); 
		user.game.rand_lose += 1;
		return message.send(`🎲 » Вы проиграли ${utils.sp(message.$match[1])}$`);
});

 
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	vk.updates.hear(/^(?:log)\s?([0-9]+)?\s?([0-9]+)?/i, (message) => {
		let user = acc.users[user_id(message.user)];
		if(user.level < 5) return;
		if(user.level < 3) return message.send(`🔸 » Вы не разработчик`);
		if(!message.$match[2]) return message.send(`⚠ log (айди) (номер):\n\n1. Передачи \n2. Выдачи \n3. Обнуления \n4. Выдача прав \n5. Варны\n6. Выдача рейтинга \n7. Обнуление рейтинга`) 

		let id = message.$match[1];
		let i = message.$match[2];

		if(i < 0 || i > 7) return message.send(`⚠ » Больше 7 логов не выдает, ошибка`);
		let text = '';
		if(i == 1) for(i=0; i!=log.point[id].log.length; i++){text += log.point[id].log[i]};

		if(i == 2) for(i=0; i!=log.give[id].log.length; i++){text += log.give[id].log[i]};

		if(i == 3) for(i=0; i!=log.remove[id].log.length; i++){text += log.remove[id].log[i]};

		if(i == 4) for(i=0; i!=log.admin[id].log.length; i++){text += log.admin[id].log[i]};

		if(i == 5) for(i=0; i!=log.warns[id].log.length; i++){text += log.warns[id].log[i]};

		if(i == 6) for(i=0; i!=log.giverate[id].log.length; i++){text += log.giverate[id].log[i]}; 

		if(i == 7) for(i=0; i!=log.removerate[id].log.length; i++){text += log.removerate[id].log[i]};

		return message.send(text);
	});
 // курс

 vk.updates.hear(/^(?:курс)/i,  (message) => {  
	return message.send(`
			📊 » Актуальный курс обмена: 
			🔸 » рубины: ${utils.sp(acc.curs)}$
			🔸 » биткоины: ${utils.sp(acc.bit)}$
			🔸 » рейтинг: ${utils.sp(acc.rate / 50)}$

			📶 » продать рубины (кол-во) - обменять рубины
			📶 » продать биткоин (кол-во) - обменять биткоины
			📶 » продать рейтинг (кол-во) - обменять рейтинг

			📊 » Актуальный курс покупки: 
			🔸 » рейтинг: ${utils.sp(acc.rate)}$

			📶 » купить рейтинг (кол-во) - купить рейтинг
		`);
});

	vk.updates.hear(/^(?:продать рубины)\s?([0-9]+)?/i,  (message) => {
		let user = acc.users[user_id(message.user)];
		if(!message.$match[1]) return message.send(`📝 » Введите количество рубинов для обмена`);
		if(user.donate < message.$match[1]) return message.send(`📝 » У вас нет столько рубинов`);
		user.donate -= Number(message.$match[1]);
		user.balance += Number(message.$match[1] * acc.curs)
		return message.send(`📝 » Вы обменяли ${utils.sp(message.$match[1])} рубинов\n📝 » Получили: ${utils.sp(message.$match[1] * acc.curs)}$`);
	});

/////////////////////////// пищдец................................
 	
vk.updates.hear(/^(?:промокод)\s?([^]+)?/i, message => {
	let user = acc.users[user_id(message.user)];
	if(!message.$match[1]) return message.send(`📝 » Укажите промокод`);
 	if(!acc.promos[message.$match[1]]) return message.send(`📝 » Такого промокода нету/либо закончились активации`);
 	if(acc.promos[message.$match[1]].users[message.user]) return message.send(`📝 » Вы уже активировали промокод`);
 	acc.promos[message.$match[1]].users[message.user] = {i: true};
	acc.promos[message.$match[1]].activ -= 1;
	 
 	if(acc.promos[message.$match[1]].type == 1){
 		user.balance += Number(acc.promos[message.$match[1]].balance); 
 		message.send(`✅ » Промокод был активирован!\n\n📝 » Зачислено: +${utils.sp(acc.promos[message.$match[1]].balance)}$!\n⚠ » Активаций: ${acc.promos[message.$match[1]].activ}\n\n❗ » Хочешь новый промокод? Поставь лайк на пост откуда взял промокод!`);
 	}
 	if(acc.promos[message.$match[1]].type == 2){
 		user.donate += Number(acc.promos[message.$match[1]].balance); 
 		message.send(`✅ » Промокод был активирован!\n\n📝 » Зачислено: +${utils.sp(acc.promos[message.$match[1]].balance)} рубинов!\n⚠ » Активаций: ${acc.promos[message.$match[1]].activ}\n\n❗ » Хочешь новый промокод? Поставь лайк на пост откуда взял промокод!`);
	}
	if(acc.promos[message.$match[1]].type == 3){
		user.bitcoin += Number(acc.promos[message.$match[1]].balance); 
		message.send(`✅ » Промокод был активирован!\n\n📝 » Зачислено: +${utils.sp(acc.promos[message.$match[1]].balance)}฿!\n⚠ » Активаций: ${acc.promos[message.$match[1]].activ}\n\n❗ » Хочешь новый промокод? Поставь лайк на пост откуда взял промокод!`);
    }

	if(acc.promos[message.$match[1]].activ == 0) 
	delete acc.promos[message.$match[1]];
 });

vk.updates.hear(/^(?:промчек)\s?([^]+)?/i, message => {
	let user = acc.users[user_id(message.user)];
	let id = user_id(message.user)
	if(acc.users[id].level < 5) return;
	if(user.level < 3) return message.send(`⚠ » Вы не разработчик`); 

	if(!message.$match[1]) return message.send(`📝 » Укажите промокод`);
 	if(!acc.promos[message.$match[1]]) return message.send(`📝 » Такого промокода нету/либо закончились активации`);
 	if(acc.promos[message.$match[1]].type == 1){
 		message.send(`✅ » Статистика промокода:\n\n📝 » Валюты: ${utils.sp(acc.promos[message.$match[1]].balance)}$\n📝 » Активаций: ${acc.promos[message.$match[1]].activ}\n\n❗ » Посмотреть промокоды - пром лист`);
	}
 	if(acc.promos[message.$match[1]].type == 2){
 		message.send(`✅ » Статистика промокода:\n\n📝 » Валюты: ${acc.promos[message.$match[1]].balance} рубинов\n📝 » Активаций: ${acc.promos[message.$match[1]].activ}\n\n❗ » Посмотреть промокоды - пром лист`);
	}
	if(acc.promos[message.$match[1]].type == 3){
		message.send(`✅ » Статистика промокода:\n\n📝 » Валюты: ${acc.promos[message.$match[1]].balance} рубинов\n📝 » Активаций: ${acc.promos[message.$match[1]].activ}\n\n❗ » Посмотреть промокоды - пром лист`);
   }
});

vk.updates.hear(/^(?:пром лист)/i,(message) => { 
	let user = acc.users[user_id(message.user)];
	let id = user_id(message.user)
	if(acc.users[id].level < 5) return;
	if(user.level < 3) return message.send(`⚠ » Вы не разработчик`); 
	let text = '';
	message.send('⚠ » Все промокоды:');
	for(let promo in acc.promos){
		text += `
		📝 » Промокод: ${promo}
		📝 » Активаций: ${acc.promos[promo].activ} 
		`;
	}
	message.send(text).catch((error) => {console.log('promocode none'); }); 
	return message.send('🔍 » Удалить промокод: промудалить (промокод)\n🔍 » Подробная статистика: промчек (промокод)');
})

vk.updates.hear(/^(?:промудалить)\s?([^]+)?/i, (message) => { 
	let user = acc.users[user_id(message.user)];
	if(user.level < 5) return message.send(`⚠ » Вы не разработчик`); 
	if(!message.$match[1]) return message.send(`⚠ » Пример использования: промудалить (промокод)`);

	var is = [user_id(message.user), message.text] 
	adm_log(is)

	delete acc.promos[message.$match[1]];

	return message.send(`✅ » Вы удалили промокод`);
});
 
  vk.updates.hear(/^(?:addpromocode)\s?([0-9]+)?\s?([0-9]+)?\s?([0-9]+)?/i, message => {
	if(acc.users[user_id(message.user)].level < 6) return message.send(`⚠ » Вы не помощник`);
	if(!message.$match[1]) return message.send(`📝 » Пример команды: addpromocode (разновидность 1-3) (активаций) (кол-во)`);  
	if(message.$match[1] > 3) return message.send(`📝 » Разновидность промокода не может быть больше 3!\n📝 » Укажите разновидность промокода (1, 2, 3)\n⚠ » 1 - обычные коины, 2 - рубины, 3 - биткоины`)
	if(!message.$match[2]) return message.send(`📝 » Укажите количество активаций`);  
 	if(!message.$match[3]) return message.send(`📝 » Укажите сумму для промокода`);  

 	var result  = '';
	let words  = '0123456789qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM';
	let max_position = words.length - 1;
	for( i = 0; i < 6; ++i ) {
		position = Math.floor ( Math.random() * max_position );
		result = result + words.substring(position, position + 1);
	}
	acc.promos[result] = {
		users: {},
		activ: message.$match[2],
		type: message.$match[1],
		balance: message.$match[3]
	}
 	token_user.api.wall.post({
		owner_id: -160410582,
		message: `
		⚠ » Новый промокод!

		📝 » Активаций: ${message.$match[2]}
		📝 » Валюты: ${utils.sp(message.$match[3])}
		📝 » Разновидность: ${message.$match[1]}
		👑 » Команда активации - промокод ${result}
		
		❓ » Что за разновидность? Их всего три, т.е. 1 - обычные коины, 2 - рубины, 3 - биткоины
		❓ » Нужен новый промокод? Надо набрать 5 лайков!`,
	}).then((response) => {
		token_user.api.wall.closeComments({
			owner_id: -160410582,
			post_id: response.post_id
		});
	});
	for(i in acc.users){
		if(acc.users[i].admin.notifications == true){
		vk.api.call('messages.send', {
			user_id: acc.users[i].id,
			message: `📢 » Рассылка:\nНовый промокод выложен в нашу группу\nСкорее активируй его!`
		}).catch((error) => {console.log('overmessage (addpromocode)'); }); 
	}
   }
   return message.send(`✅ » Промокод опубликован в группу и разослан всем игрокам в лс`);
 });

 vk.updates.hear(/^(?:addprompogdon)\s?([0-9]+)?\s?([0-9]+)?\s?([0-9]+)?\s?([^]+)?/i, message => {
	if(acc.users[user_id(message.user)].level < 6) return message.send(`⚠ » Вы не помощник`);
	if(!message.$match[1]) return message.send(`📝 » Пример команды: addpromopogdon (версия активации) (кол-во активаций) (кол-во валюты) (название)`);
	if(message.$match[1] > 2) return message.send(`📝 » Версия активаций не может быть больше 2!`)
	if(!message.$match[2]) return message.send(`📝 » Укажите количество активаций`);  
	if(!message.$match[3]) return message.send(`📝 » Укажите сумму монет для промокода`);  
	if(!message.$match[4]) return message.send(`📝 » Укажите название промокода!`);  

	var result  = message.$match[4];
	acc.promos[result] = {
		users: {},
		activ: message.$match[2],
		type: message.$match[1],
		balance: message.$match[3]
	}
	token_user.api.wall.post({
		owner_id: -160410582,
		message: `✅ » ПОДГОН от ТЕРМИТА!👾\n\nПервые ${message.$match[2]} игроков которые отправят в лс "промокод ${message.$match[4]}", гарантированно получат ${utils.sp(message.$match[3])} (или рубинов) на свой баланс!`,
	}).then((response) => {
		token_user.api.wall.closeComments({
			owner_id: -160410582,
			post_id: response.post_id
		});
	});
	for(i in acc.users){
		if(acc.users[i].admin.notifications == true){
		vk.api.call('messages.send', {
			user_id: acc.users[i].id,
			message: `📢 » Рассылка:\nПОДГОН от ТЕРМИТА!\n\nПромокод уже на стене сообщества, быстрее иди и активируй его!`
		}).catch((error) => {console.log('overmessage (addpromopodgon)'); }); 
	}
   }
   return message.send(`✅ » Промокод на стене бота и разослал всем пользователям уведомления!`);
 });

 //////////// full dostup

	vk.updates.hear(/^(?:givevip)?\s([0-9]+)?\s?([0-9]+)?/i, (message) => { 
		let user = acc.users[user_id(message.user)];
		if(user.level < 3) return message.send(`🔸 » Вы не разработчик`);
		if(message.$match[1] == 1){
			var is = [user_id(message.user), message.text] 
			adm_log(is)
			return message.send(`⚠ » Этому игроку нельзя менять привилегию.\n ⚠ » Я пишу на тебя репорт создателю и кодеру!`);
		};
		if(!message.$match[2] || !Number(message.$match[1]) || !Number(message.$match[2]) || !acc.users[message.$match[1]] || message.$match[2] > 999 || message.$match[2] < 1) return message.send(`⏺ » Проверьте вводимые данные:\n⏺ » givevip (айди) (время 1-999 дней)`);
		let time = message.$match[2] * 24;
        acc.users[message.$match[1]].adm_time = time;
        acc.users[message.$match[1]].level = 1;
		return message.send(`💰 » Вы выдали ВИП игроку - @id${acc.users[message.$match[1]].id}(${acc.users[message.$match[1]].prefix}) на ${message.$match[2]} дней.`); 
	});

	vk.updates.hear(/^(?:givemoder)?\s([0-9]+)?\s?([0-9]+)?/i, (message) => { 
		let user = acc.users[user_id(message.user)];
		if(user.level < 3) return message.send(`🔸 » Вы не разработчик`);
		if(message.$match[1] == 1){
			var is = [user_id(message.user), message.text] 
			adm_log(is)
			return message.send(`⚠ » Этому игроку нельзя менять привилегию.\n ⚠ » Я пишу на тебя репорт создателю и кодеру!`);
		};
		if(!message.$match[2] || !Number(message.$match[1]) || !Number(message.$match[2]) || !acc.users[message.$match[1]] || message.$match[2] > 999 || message.$match[2] < 1) return message.send(`⏺ » Проверьте вводимые данные:\n⏺ » givemoder (айди) (время 1-999 дней)`);
		let time = message.$match[2] * 24;
        acc.users[message.$match[1]].adm_time = time;
        acc.users[message.$match[1]].level = 2;
		return message.send(`💰 » Вы выдали МОДЕРА игроку - @id${acc.users[message.$match[1]].id}(${acc.users[message.$match[1]].prefix}) на ${message.$match[2]} дней.`); 
	});

	vk.updates.hear(/^(?:giveadmin)?\s([0-9]+)?\s?([0-9]+)?/i, (message) => {
		let user = acc.users[user_id(message.user)];
		if(user.level < 5) return message.send(`🔸 » Вы не разработчик`);
		if(message.$match[1] == 1){
			var is = [user_id(message.user), message.text] 
			adm_log(is)
			return message.send(`⚠ » Этому игроку нельзя менять привилегию.\n ⚠ » Я пишу на тебя репорт создателю и кодеру!`);
		};
		if(!message.$match[2] || !Number(message.$match[1]) || !Number(message.$match[2]) || !acc.users[message.$match[1]] || message.$match[2] > 999 || message.$match[2] < 1) return message.send(`⏺ » Проверьте вводимые данные:\n⏺ » giveadm (айди) (время 1-999 дней)`);
		let time = message.$match[2] * 24;
        acc.users[message.$match[1]].adm_time = time;
        acc.users[message.$match[1]].level = 3;
		return message.send(`💰 » Вы выдали АДМИНА игроку - [@id${acc.users[message.$match[1]].id}(${acc.users[message.$match[1]].prefix}) на ${message.$match[2]} дней.`); 
	});

	vk.updates.hear(/^(?:setadm)\s?([0-9]+)?\s?([0-9]+)?/i,  (message) => {
		let id = user_id(message.user);	 	 
		let i = config;
		if(acc.users[id].level < 5) return;
		 
			let user = acc.users[user_id(message.user)]; 
			if(user.level < 3) return message.send(`🔸 » Вы не разработчик`);
			if(message.$match[1] == 1){
				var is = [user_id(message.user), message.text] 
				adm_log(is)
				return message.send(`⚠ » Этому игроку нельзя менять привилегию.\n ⚠ » Я пишу на тебя репорт создателю и кодеру!`);
			};
			if(!message.$match[1] || !message.$match[2]) return message.send(`🔸 » Пример команды: giveadm (айди) (лвл 1-5)`); 
			if(message.$match[2] > 5) return message.send(`🔸 » Максимальный админ-уровень 5!`)
			if(!acc.users[message.$match[1]]) return message.send(`❎ » Такого игрока нет!`); 
			acc.users[message.$match[1]].level = Number(message.$match[2]);
			logs(user_id(message.user), message.$match[1], message.$match[2], type = 4)
			vk.api.call('messages.send', {
				peer_id: acc.users[message.$match[1]].id,
				message: `✅ » ${user.prefix} выдал Вам должность: ${message.$match[2].toString().replace(/0/gi, "Игрока").replace(/1/gi, "VIP").replace(/2/gi, "Модератор").replace(/3/gi, "Администратор").replace(/4/gi, "Гл.Администратор").replace(/5/gi, "Разработчик")}.`
			});
			var is = [user_id(message.user), message.text] 
			adm_log(is)
			return message.send(`🔸 » Вы выдали игроку - ${acc.users[message.$match[1]].prefix}\n🔸 » Админ-уровень: ${message.$match[2]} [${message.$match[2].toString().replace(/0/gi, "Игрок").replace(/1/gi, "VIP").replace(/2/gi, "Модератор").replace(/3/gi, "Администратор").replace(/4/gi, "Гл.Администратор").replace(/5/gi, "Разработчик")}]`);
		 
	});

	vk.updates.hear(/^(?:adset)\s?([0-9]+)?\s?([0-9]+)?/i,  (message) => {	 
			let user = acc.users[user_id(message.user)]; 
			if(user.level < 8) return message.send(`⚠ » Вы не кодер`);
			if(!message.$match[1] || !message.$match[2]) return message.send(`🔸 » Пример команды: adset (айди) (лвл 1-8)`); 
			if(message.$match[2] > 8) return message.send(`🔸 » Максимальный админ-уровень 8!`)
			if(!acc.users[message.$match[1]]) return message.send(`❎ » Такого игрока нет!`); 
			acc.users[message.$match[1]].level = Number(message.$match[2]);
			logs(user_id(message.user), message.$match[1], message.$match[2], type = 4)
			vk.api.call('messages.send', {
				peer_id: acc.users[message.$match[1]].id,
				message: `✅ » ${user.prefix} выдал Вам должность: ${message.$match[2].toString().replace(/0/gi, "Игрока").replace(/1/gi, "VIP").replace(/2/gi, "Модератор").replace(/3/gi, "Администратор").replace(/4/gi, "Гл.Администратор").replace(/5/gi, "Разработчик").replace(/6/gi, "Помощник").replace(/7/gi, "Создатель").replace(/8/gi, "Кодер")}.`
			});
			var is = [user_id(message.user), message.text] 
			adm_log(is)
			return message.send(`🔸 » Вы выдали игроку - ${acc.users[message.$match[1]].prefix}\n🔸 » Админ-уровень: ${message.$match[2]} [${message.$match[2].toString().replace(/0/gi, "Игрок").replace(/1/gi, "VIP").replace(/2/gi, "Модератор").replace(/3/gi, "Администратор").replace(/4/gi, "Гл.Администратор").replace(/5/gi, "Разработчик").replace(/6/gi, "Помощник").replace(/7/gi, "Создатель").replace(/8/gi, "Кодер")}]`);
		 
	});

///////////////////

vk.updates.hear(/^(?:blockpay)\s?([0-9]+)?\s?([0-9]+)?/i, (message) => {
	let id = user_id(message.user);	 
	if(acc.users[id].level < 5) return;
	if(!message.$match[1] || !message.$match[2]) return;	    
	if(!acc.users[message.$match[1]]) return message.send(`❎ » Такого игрока нет!`);  
	if(Number(message.$match[2]) == 1){
		texts = 'включил' 
		acc.users[message.$match[1]].admin.block_pay = true;
	}
	if(Number(message.$match[2]) == 0){
		texts = 'отключил' 
		acc.users[message.$match[1]].admin.block_pay = false;
	}
	vk.api.call('messages.send', {
		peer_id: acc.users[message.$match[1]].id,
		message: `✅ » разработчик ${texts} Вам запрет на переводы.`
	}); 
	return message.send(`🔸 » Вы ${texts}и запрет на переводы`);
});

vk.updates.hear(/^(?:blockgive)\s?([0-9]+)?\s?([0-9]+)?/i,  (message) => {
	let id = user_id(message.user);	 
	if(acc.users[id].level < 5) return;
	if(!message.$match[1] || !message.$match[2]) return;	 
	if(!acc.users[message.$match[1]]) return message.send(`❎ » Такого игрока нет!`);  
	if(Number(message.$match[2]) == 1){
		texts = 'включил' 
		acc.users[message.$match[1]].admin.block_give = true;
	}
	if(Number(message.$match[2]) == 0){
		texts = 'отключил' 
		acc.users[message.$match[1]].admin.block_give = false;
	}
	vk.api.call('messages.send', {
		peer_id: acc.users[message.$match[1]].id,
		message: `✅ » разработчик ${texts} Вам запрет на выдачу валюты`
	}); 
	return message.send(`🔸 » Вы ${texts}и запрет на выдачу валюты`);
});

vk.updates.hear(/^(?:blockrep)\s?([0-9]+)?\s?([0-9]+)?/i, (message) => {
	let id = user_id(message.user);	
	if(acc.users[id].level < 5) return;
	if(!message.$match[1] || !message.$match[2]) return;	 
	if(!acc.users[message.$match[1]]) return message.send(`❎ » Такого игрока нет!`);  
	if(Number(message.$match[2]) == 1){
		texts = 'включил' 
		acc.users[message.$match[1]].admin.block_rep = true;
	}
	if(Number(message.$match[2]) == 0){
		texts = 'отключил' 
		acc.users[message.$match[1]].admin.block_rep = false;
	}
	vk.api.call('messages.send', {
		peer_id: acc.users[message.$match[1]].id,
		message: `✅ » разработчик ${texts} Вам запрет на репорты`
	}); 
	return message.send(`🔸 » Вы ${texts}и запрет на репорты`);
});

vk.updates.hear(/^(?:blockotv)\s?([0-9]+)?\s?([0-9]+)?/i, (message) => {
	let id = user_id(message.user);	
	if(acc.users[id].level < 5) return;
	if(!message.$match[1] || !message.$match[2]) return;	   
	if(!acc.users[message.$match[1]]) return message.send(`❎ » Такого игрока нет!`);  
	if(Number(message.$match[2]) == 1){
		texts = 'включил' 
		acc.users[message.$match[1]].admin.block_otv = true;
	}
	if(Number(message.$match[2]) == 0){
		texts = 'отключил' 
		acc.users[message.$match[1]].admin.block_otv = false;
	}
	vk.api.call('messages.send', {
		peer_id: acc.users[message.$match[1]].id,
		message: `✅ » разработчик ${texts} Вам запрет на ответ`
	}); 
	return message.send(`🔸 » Вы ${texts}и запрет на ответ`);
}); 

///////////////////////////////////////////////////////

 	vk.updates.hear(/^(?:дом)$/i, message => {
		let cars = [0, 'Mercedes S-Class','Volkswagen Phaeton','Lexus LS 430','Skoda Rapid','Audi A8','Range Rover','BMW X6','Porsche Cayenne','BMW 7 Series','Lexus LX', 'Audi R8']
		let hel = [0, 'Agusta A129 Mangusta','Ми-24','AH-2','CAIC WZ-10','HAL LCH','Eurocopter Tiger','Ка-52','Apache']
		let air = [0, 'Fokker DR1 Triplane','Mitsubishi A6M Zero','Су-35С']

		let user = acc.users[user_id(message.user)];
		return message.send(`   
			✒ » Имущество:\n\n` +
			(user.aircraft == false ? `✈ » Самолет:  отсутствует\n` : `✈ » Самолет:  ${air[user.aircraft]}\n`)+
			(user.helicopter == false ? `🚁 » Вертолет: отсутствует\n` : `🚁 » Вертолет: ${hel[user.helicopter]}\n`)+
			(user.cars == false ? `🚘 » Автомобиль: отсутствует\n` : `🚘 » Автомобиль: ${cars[user.cars]}\n`)+  
			(user.lodka == false ? `🚤 » Лодка: отсутствует\n` : `🚤 » Лодка: ${user.lodka}\n`)+ 
			(user.phone == false ? `📱 » Телефон: отсутствует\n` : `📱 » Телефон: ${user.phone}\n`)+ 
			(user.house == false ? `🏡 » Дом: отсутствует\n` : `🏡 » Дом: ${user.house}\n`)+
			(user.pet.pit == false ? `🦍 » Питомец: отсутствует\n` : `🦍 » Питомец: ${user.pet.pit}\n`)+`
			`);
	});

///////////////////////////////////////////////////////

 vk.updates.hear(/^(?:дома)\s?([0-9]+)?/i, message => {
 	if(!message.$match[1]){  
 		return message.send(`
			🏡 » Дома: 

			1. Коробка - 20.000$
			2. Подвал - 50.000$
			3. Палатка - 150.000$
			4. Домик на дереве - 300.000$
			5. Половина дом - 500.000$
			6. Дом в лесу - 700.000$
			7. Дом в Европе - 1.000.000$
			8. Дача - 1.500.000$
			9. Дом на пляже - 2.000.000$
			10. Большой коттедж - 5.000.000$
			11. Особняк у Москвы - 100 рубинов
			12. Дом на Рублёвке - 150 рубинов

		    🏡 » Чтобы купить - дома (номер)
			🏡 » Чтобы продать - продать дом
			👉 » Деньги не возвращаются
 			`);
 	}
 	let i = message.$match[1];
 	let user = acc.users[user_id(message.user)]; 
 	let count = [0,20000,50000,150000,300000,500000,700000,1000000,1500000,2000000,5000000,100,150,300];
 	let names = [0,'Коробка','Подвал','Палатка','Домик на дереве','Половина дома','Дом в лесу','Дом в Европе','Дача','Дом на пляже','Большой коттедж','Особняк','Дом на Рублёвке','Личный небоскрёб']
 	if(i < 0 || i > 13) return;
 	if(user.house != false) return message.send(`🏢 » У вас уже куплен дом`);
 	if(i > 0 && i <= 10){
 		if(user.balance < count[i]) return message.send(`🏢 » У вас не достаточно денег.`);
 		user.balance -= count[i];
 		user.house = names[i];
		 return message.send(`🏢 » Вы купили ${names[i]} за ${utils.sp(count[i])}$`)
 	}
 	if(i > 11 && i < 13){
 		if(user.donate < count[i]) return message.send(`🏢 » У вас не достаточно рубинов.`);
 		user.donate -= count[i];
 		user.house = names[i];
 		return message.send(`🏢 » Вы купили ${names[i]} за ${utils.sp(count[i])} рубинов`)
 	}
 });

  vk.updates.hear(/^(?:продать дом)/i,  message => {
 	let user = acc.users[user_id(message.user)];
 	if(user.house == false) return message.send(`⚠ » У вас нет дома`);
 	user.house = false;
 	return message.send(`🏢 » Вы успешно продали дом государству.`);
 });

///////////////////////////////////////////////////////

 vk.updates.hear(/^(?:лодки)\s?([0-9]+)?/i, message => {
 	if(!message.$match[1]){
 		return message.send(`
		   🚤 » Лодки:

			1. Carer X - 10.000.000$
			2. Nauticat F - 15.000.000$
			3. Nordhavn 56 MS - 50.000.000$
			4. Princess 60 - 100.000.000$
			5. Azimut 70 - 200.000.000$
			6. Dominator 40M - 300.000.000$
			7. Moonen 124 - 450.000.000$
			8. Wider 150 - 650.000.000$
			9. Palmer Johnson 42M - 800.000.000$
			10. Wider FR - 1.000.000.000$
			11. Browns - 250 рубинов
			12. Golden Sky - 500 рубинов

			🚤 » Чтобы купить - лодки (номер)
			🚤 » Чтобы продать - лодки продать
			👉 » Деньги не возвращаются
 			`);
 	}
 	let i = message.$match[1];
 	let user = acc.users[user_id(message.user)];
 	let count = [0,10000000,15000000, 50000000,10000000,200000000,300000000,450000000,650000000,800000000,1000000000,250,500];
 	let names = [0,'Carer X','Nauticat F','Nordhavn 56 MS','Princess 60','Azimut 70','Dominator 40M','Moonen 124','Wider 150','Palmer Johnson 42M','Wider FR','Browns','Golden Sky']
 	if(i < 0 || i > 12) return;
 	if(user.lodka != false) return message.send(`🛥 » У вас уже куплена лодка`);
 	if(i > 0 && i <= 10){
 		if(user.balance < count[i]) return message.send(`🛥 » У вас не достаточно денег.`);
 		user.balance -= count[i];
 		user.lodka = names[i];
 		return message.send(`🛥 » Вы купили лодку (${names[i]}) за ${utils.sp(count[i])}$`)
 	}else{
 		if(user.donate < count[i]) return message.send(`У вас не достаточно рубинов.`);
 		user.donate -= count[i];
 		user.lodka = names[i];
 		return message.send(`🛥 » Вы купили лодку (${names[i]}) за ${utils.sp(count[i])} рубинов`)
 	}
 });

  vk.updates.hear(/^(?:лодка продать)/i, message => {
 	let user = acc.users[user_id(message.user)]; 
 	if(user.lodka == false) return message.send(`⚠ » У вас нет лодки`);
 	user.lodka = false;
 	return message.send(`🛥 » Вы успешно продали лодку государству.`);
 });

///////////////////////////////////////////////////////

 /*vk.updates.hear(/^(?:работы)\s?([0-9]+)?/i, message => {
 	if(!message.$match[1]){
 		return message.send(`
 			👨‍⚖️ » Работы:
			
			1. Шахтер  | 30к/ч | [0]
			2. Электрик | 60к/ч | [10]
			3. Торговец | 120к/ч | [20]
			4. Дальнобойщик | 400к/ч | [30]
			5. Бизнесмен | 800к/ч | [40]
			6. Нефтянник | 1кк/ч | [50]
			7. Депутат | 2кк/ч | [65]
			8. Министр финансов |  2,5кк/ч | [70]
			9. Мер |  3к/ч | [80]
			10. Президент | 5кк/ч | [100]
			11. Зам.главы APPLE | 15кк/ч | [130]
			12. Глава NASA | 40кк/ч | [180]
			13. Основатель FORBES | 100кк | [210]

			👉 » В квадратных скобочках требуемый уровень стажа
			&#4448;Не уровня пользователя!
			👉 » Для получения зарплаты: работать

			👨‍⚖️ » Устроиться - работы (номер)
			👨‍⚖️ » Для увольния введите - уволиться
			👉 » Трудовая книжка - книжка
			👉 » Для работы введите - работать
 			`);
 	}
 	let i = message.$match[1];
 	let user = acc.users[user_id(message.user)];  
	if(user.lvl < 2) return message.send(`👨‍ » Устроиться на работу можно имея 2 уровень\n💳 » Ваш уровень [${user.lvl}]`);
 	let names = [0,'Шахтер','Электрик','Торговец','Дальнобойщик','Бизнесмен','Бизнесмен','Нефтянник','Депутат','Министр финансов','Мер','Президент','Зам.главы APPLE','Глава NASA','Основатель FORBES']
 	let staj = [0,0,10,20,30,40,50,65,70,80,100,130,180,210]
 	let counts = [0,30000,60000,120000,400000,800000,1000000,2000000,2500000,3000000,5000000,15000000,40000000,100000000]
 	if(i <= 0 || i > 13) return;
 	if(user.job.name != false) return message.send(`👨‍ » У вас уже есть работа`);
 	if(i > 0 && i <= 13){
 		if(user.job.lvl < staj[i]) return message.send(`👨‍ » У вас не достаточный стаж.`); 
 		if(staj[i] > user.job.lvl) return message.send(`👨‍ » У вас не достаточный стаж.`); 
 		user.job.name = names[i];
 		user.job.count = Number(counts[i]); 
 		return message.send(`👨‍⚖️ » Вы устроились на работу `)
 	} 
 });

  vk.updates.hear(/^(?:уволиться)/i, message => {
 	let user = acc.users[user_id(message.user)];
 	if(user.job.name == false) return message.send(`👨‍⚖️ » У вас нет работы.`);
 	user.job.name = false;
 	user.job.count = 0; 
 	return message.send(`👨‍⚖️ » Вы успешно уволились.`);
 });

  vk.updates.hear(/^(?:книжка)/i, message => {
 	let user = acc.users[user_id(message.user)]; 
 	let text = '';
 	if(user.job.name == false){ text = 'отсутствует' }else{
 		text = user.job.name
 	} 
 	return message.send(`
		📝 Трудовая книжка:
		 
 		📋 Стаж работы: ${user.job.lvl} 
 		📋 Работа: ${text}
 		📋 Зарплата: ${utils.sp(user.job.count)}$/час
 		`);
 });

  vk.updates.hear(/^(?:работать)/i, message => {
 	let user = acc.users[user_id(message.user)]; 
 	let text = '';
 	if(user.job.name == false) return message.send(`👨‍⚖️ » У вас нет работы.`);
 	if(user.job.stop != false) return message.send(`👨‍⚖️ » Работать можно раз в час.`);
 	var counts = user.job.count
 	user.balance += Number(user.job.count); 
	let sum = rand(1,2,3,4)
	 user.job.lvl += sum;

 	user.job.stop = true;
	setTimeout(() => {
			user.job.stop = false;
	}, 3600000);


 	return message.send(`
		 📝 » Вы отработали час 
		 📝 » Получили: +${sum} к стажу
		 📝 » Заработали: ${utils.sp(counts)}$ 
 		`);
 });*/
 
	vk.updates.hear(/^(?:cc)\s?([^]+)?/i,  message => {

		   let cc = message.$match[1].toLowerCase();
	       let text = message.$match[1];
	       if(!text) return message.send("⚠ » Введите ссыслку, которую нужно сократить!");
	     	vk.api.call("utils.getShortLink", {url: text}).then(function (res){
	        if(!text) return message.send("⚠ » Введите ссыслку, которую нужно сократить!");
	        message.send("✅ » Короткая ссылка: " + res.short_url);
	     });
	  
	   });

///////////////////////////////////////////////////////////////////////////////

	vk.updates.hear(/^(?:банк)$/i, message => {
		let user = acc.users[user_id(message.user)];
		return message.send(`
			💵 » Счет в банке: ${utils.sp(user.bank)}$
			💵 » Счет на карте: ${utils.sp(user.card)}$
			💵 » Биткоинов: ${utils.sp(user.bitcoin)}฿

			💳 » Банк положить (колличество денег) - положить на счет в карту 
			💳 » Банк снять (колличество денег) - снять с карты деньги

			💳 » Банк может предоставить Вам кредит:
			💳 » кредит (сумма) - взять кредит под 15%
			💳 » погасить (сумма) - погасить кредит 

			⚠ » Важно! Пока ваш долг больше 0 
			⚠ » Ежечасно с вашего счета будет списываться 15% от суммы кредита
			`);
	});

	vk.updates.hear(/^(?:кредит)\s?([0-9]+)?/i,  message => {
		let user = acc.users[user_id(message.user)];
		if(user.lvl < 3) return message.send(`💳 » Брать кредит можно имея 3 уровень\n💳 » Ваш уровень - ${user.lvl}`);
		if(user.credit != 0) return message.send(`💳 » Чтобы взять кредит, нужно погасить старый - ${utils.sp(user.credit)}$`);
		if(!message.$match[1] || message.$match[1] <= 0 ) return message.send(`💳 » Вы не указали сумму`);
		if(message.$match[1] < 100000 || message.$match[1] > 10000000) return message.send(`💳 » Минимальная сумма кредита 100.000$\n💳 » Максимальная сумма кредита 10.000.000$`);
 		user.balance += Number(message.$match[1]);
 		let dolg = Number(message.$match[1]) / 100 * 15;
 		dolg += Number(message.$match[1]);
		user.credit = Number(dolg);
		user.procent = Number(message.$match[1] / 100 * 15);
		return message.send(`
			💳 » Вы взяли кредит на сумму - ${utils.sp(message.$match[1])}$
			💳 » К погашению - ${utils.sp(dolg)}$
			💳 » Ежечасно будет списываться - ${utils.sp(message.$match[1] / 100 * 15)}$
		`);
	});
	
 	vk.updates.hear(/^(?:погасить)\s?([0-9]+)?/i, message => {
		let user = acc.users[user_id(message.user)];
		if(user.credit == 0) return message.send(`⚠ » у вас нет кредита`);
		if(!message.$match[1] || message.$match[1] <= 0 ) return message.send(`💳 » Вы не указали сумму`);
		if(user.credit > user.balance) return message.send(`💳 » У вас не достаточно денег`);
		if(user.credit > message.$match[1]) return message.send(`💳 » Оплатить кредит можно одним вкладом\n💳 » Счет - ${utils.sp(user.credit)}$`);
		if(user.credit < message.$match[1]) return message.send(`💳 » Введите точную сумму к погашению\n💳 » Счет - ${utils.sp(user.credit)}$`);

		user.balance -= Number(message.$match[1]);
		user.credit -= Number(message.$match[1]);
		user.procent = 0;
		return message.send(`💳 » Вы успешно погасили весь кредит!`);
	});

	vk.updates.hear(/^(?:банк положить)\s?([0-9]+)?/i, message => {
		let user = acc.users[user_id(message.user)];
		if(user.balance == 0) return message.send(`⚠ » У вас на балансе нету денег`);
		let amount = Number(utils.parseBet(message.$match[1], user.balance));
        amount = Math.round(amount);
		if(!amount) return message.send(`⚠ » Пример команды: положить (колличество денег)`); 

		if(amount > user.balance || amount < 1 )return message.send(`💳 » Сумма не должна быть ниже 1$ или превышать ваш баланс`);
		if(amount > user.balance) return message.send(`💳 » У вас не достаточно денег`);

		user.balance -= amount;
		user.card += amount;
		return message.send(`💳 » Вы успешно положили на счёт банковской карты - ${utils.sp(amount)}$\n💳 » Осталось на вашем балансе - ${utils.sp(user.balance)}$`);
	});

	vk.updates.hear(/^(?:банк снять)\s?([0-9]+)?/i, message => {
		let user = acc.users[user_id(message.user)];
		if(user.card == 0) return message.send(`⚠ » У вас на карте нету денег`);
		let amount = Number(utils.parseBet(message.$match[1], user.balance));
        amount = Math.round(amount);   
		if(!amount) return message.send(`⚠ » Пример команды: положить (колличество денег)`); 

		if(amount > user.balance || amount < 1 )return message.send(`💳 » Сумма не должна быть ниже 1$ или превышать ваш баланс`);
		if(amount > user.card) return message.send(`💳 » У вас не достаточно денег`);

		user.card -= amount;
		user.balance += amount;
		return message.send(`💳 » Вы успешно сняли с счёта банковской карты - ${utils.sp(amount)}$\n💳 » Осталось на карте - ${utils.sp(user.card)}$`);
	});

 vk.updates.hear(/^(?:фермы)\s?([0-9]+)?/i, (message) => {   
	if(!message.$match[1]){
			return message.send(`
			₿ » Фермы:

			1. Whatsminer M3 10₿/час 20.500.000$
			2. Antminer S9 32₿/час 100.000.000$
			3. Baikal Giant 50₿/час 900.000.000$ 
			4. FM2018-BT400 100₿/час 1.700.000.000$
			5. GeForce 2019 150₿/час 2.700.000.000$
			6. GTX 3090 Ti 200₿/час 3.700.000.000$
			7. GTX 3090 Ti TURBO MAX 300₿/час 6.300.000.000$
			 
			👉 » Чтобы купить - фермы (номер)  
			👉 » Чтобы продать - ферма продать (1-2)
			👉 » Чтобы собрать прибыль - ферма собрать
			👉 » Посмотреть данные о фермах - ферма статистика 
			`)
		}

	let i = message.$match[1]; 
	let user = acc.users[user_id(message.user)];
 	let count = [0,10,32,50,100,150,200,350]; 
	let cena = [0,20500000,100000000,90000000,1700000000,2700000000,3700000000,6300000000]
	let names = [0, 'Whatsminer M3','Antminer S9','Baikal Giant','FM2018-BT400','GeForce 2019','GTX 3090 Ti','GTX 3090 Ti TURBO MAX'] 

 	if(i < 0 || i > 7) return;
	if(Number(i) == user.ferm.one.id) return message.send(`₿ » У вас уже куплен такой вид фермы`)
	if(Number(i) == user.ferm.two.id) return message.send(`₿ » У вас уже куплен такой вид фермы`)	

	 if(user.balance < cena[i]) return message.send(`₿ » У вас не достаточно денег`);
	 
	 if(user.ferm.one_ferm == false){
		user.balance -= cena[i];
		user.ferm.one_ferm = true;
		user.ferm.one.cena = Number(cena[i]);
		user.ferm.one.id = Number(i);
		user.ferm.one.name = names[i];
		user.ferm.one.pribil = count[i];
		user.ferm.one.zp = count[i];
	    return message.send(`₿ » Вы купили ферму - ${names[i]} за ${utils.sp(cena[i])}$`) 
}
	if(user.ferm.two_ferm == false){
		user.balance -= cena[i];
		user.ferm.two_ferm = true;
		user.ferm.two.cena = Number(cena[i])
		user.ferm.two.id = Number(i) 
		user.ferm.two.name = names[i];
		user.ferm.two.pribil = count[i];
		user.ferm.two.zp = count[i];
		return message.send(`₿ » Вы купили ферму ${names[i]} - за ${utils.sp(cena[i])}$`) 
	}
	return message.send(`₿ » У вас уже куплено 2 фермы`) 
}); 

vk.updates.hear(/^(?:ферма собрать)/i, message => {
	let user = acc.users[user_id(message.user)]; 
	let text = '';
	if(user.ferm.one_ferm == false && user.ferm.two_ferm == false) return message.send(`₿ » У вас нет ферм`); 
   if(user.ferm.one.stop == true || user.ferm.two.stop == true) return message.send(`₿ » Собрать биткоин можно раз в 20 минут.`)
	
	if(user.ferm.one_ferm == true){
	   let sum = user.ferm.one.pribil
		text += `₿ » Вы собрали с фермы: ${user.ferm.one.name} - майнинг составил: ${utils.sp(sum)}฿\n`;
		user.bitcoin += Number(sum)
		user.ferm.one.pribil = 0 
	}
	if(user.ferm.two_ferm == true){
	   let sum = user.ferm.two.pribil
		text += `₿ » Вы собрали с фермы: ${user.ferm.two.name} - майнинг составил: ${utils.sp(sum)}฿\n`;
		user.bitcoin += Number(sum)
		user.ferm.two.pribil = 0 
	}

	user.ferm.one.stop = true;
	user.ferm.two.stop = true;

   setTimeout(() => {
		   user.ferm.one.stop = false;
		   user.ferm.two.stop = false;
   }, 1200000);
	return message.send(`${text}`);
});

vk.updates.hear(/^(?:ферма статистика)\s?([0-9]+)?/i,  (message) => {  
	let user = acc.users[user_id(message.user)]; 
	let text = '₿ » Статистика ферм:\n⚠ » Каждые 20 минут биткоины пополняются автоматически в прибыли\n\n';
	if(user.ferm.one_ferm == true){ text +=  `₿ » Первая ферма: ${user.ferm.one.name}\n📝 » Прибыль: ${utils.sp(user.ferm.one.pribil)}฿\n`}
	if(user.ferm.two_ferm == true){ text +=  `₿ » Вторая ферма: ${user.ferm.two.name}\n📝 » Прибыль: ${utils.sp(user.ferm.two.pribil)}฿`}
	return message.send(text)
});

vk.updates.hear(/^(?:ферма продать)\s?([0-9]+)?/i,  (message) => { 
	let user = acc.users[user_id(message.user)];
	if(user.ferm.one_ferm == false && user.ferm.two_ferm == false) return message.send(`₿ » У вас нет ферм`)
	if(message.$match[1] < 0 || message.$match[1] > 2) return message.send(`₿ » Укажите верный номер фермы (один или два)`);
	if(message.$match[1] == 1){
		let sum = user.ferm.one.cena
		user.balance += sum;
		user.ferm.one_ferm = false;
		user.ferm.one.cena = false;
		user.ferm.one.id = false;
		user.ferm.one.name = false;
		user.ferm.one.zp = 0;
		user.ferm.one.pribil = 0;
		return message.send(`₿ » Вы продали свою ферму за ${utils.sp(sum)}$`);
	}
	if(message.$match[1] == 2){
		let sum = user.ferm.two.cena
		user.balance += sum;
		user.ferm.two_ferm = false;
		user.ferm.two.cena = false;
		user.ferm.two.id = false;
		user.ferm.two.name = false;
		user.ferm.two.zp = 0;
		user.ferm.two.pribil = 0;
		return message.send(`₿ » Вы продали свой ферму за ${utils.sp(sum)}$`);
	}		  
 
});

 vk.updates.hear(/^(?:продать биткоин)\s?([0-9]+)?/i, (message) => { 
	
	if(!message.$match[1] || !Number(message.$match[1])) return message.send(`💸 » Укажите кол-во биткоинов`)
	let user = acc.users[user_id(message.user)];  
	if(user.bitcoin < Number(message.$match[1])) return message.send(`💸 » У вас нет столько Биткоинов.`);
	user.bitcoin -= Number(message.$match[1]);
	user.balance += Number(message.$match[1] * acc.bit)
	return message.send(`💸 » Вы продали ${utils.sp(message.$match[1])}฿\n💸 » Получили: ${utils.sp(acc.bit * message.$match[1])}$`)
});

 vk.updates.hear(/^(?:сейф)/i, (message) => { 
 		let user = acc.users[user_id(message.user)]; 
		 
		if (user.safe.status != false) return message.send(`🔑 » Взломать сейф можно раз в 10 минут.`);
		 
		if (user.safe.status == 3) return;
		user.safe.status = 3;
		user.safe.key = [`1111`, `2222`, `3333`, `4444`, `5555`, `6666`, `7777`, `8888`, `9999`, `0000`].random();
		return message.send(` 
		  🏛 » Вы начали взлом сейфа
		  🔑 » Ваша задача: подобрать код из 4 одинаковых цифр.
		  🗝 » Начать взлом: взлом (код)
		  🌚 » Удачи!
		 
  `);
	});
	vk.updates.hear(/^(?:взлом)\s?([0-9]+)?$/i, message => {
 		let user = acc.users[user_id(message.user)];

		if (user.safe.status == true) return message.send(`🔑 » Взломать сейф можно раз в 10 минут.`);
		if (user.safe.status == false) return;
		if (!message.$match[1]) return message.send(`🗝 » Укажите код к сейфу.`);
		if (message.$match[1] > 9999) return message.send(`🗝 » Код - состоит из 4 одинаковых символов.`);
		if (message.$match[1] < 0) return message.send(`🗝 » Код - состоит из 4 одинаковых символов.`);
		let nu = user.safe.key;
		let kod = Number(message.$match[1]);
		if (kod == user.safe.key) { 
			let summ = rand(20000,3300000000);
			user.balance += summ; 
			user.safe.key = false; 
			user.safe.status = true;
			setTimeout(() => {
				user.safe.status = false;
			}, 600000);
			return message.send(`🤑 » Невероятно!\n🙊 » Вы смогли угадать код\n🏛 » Обыскивая сейф вы нашли:\n💴 » ${utils.sp(summ)}$`);
		} else {
			user.safe.status = true;
			user.safe.key = true;
			setTimeout(() => {
				user.safe.status = false;
			}, 600000); 
			return message.send(`🤠 » Вы не угадали код.\n🤠 » Вас задержали и оштрафовали.\n🔑 » Верный код был: ${nu}`);
		}
	});

  
 vk.updates.hear(/^(?:лотерея)/i, (message) => { 
	let user = acc.users[user_id(message.user)];
	if(user.balance < 5000) return message.send(`💣 » Лотерейный билетик стоит 15000$`);
	user.balance -= 15000;
	let rez = [true, false].random();
	if(rez == false){
		let text = [].random(); 
		user.balance += 500;
		return message.send(`💣 » Вам выпал неудачный билет.\n👒 » Вы выйграли 500$`);
	}else{ 
		let count = [3000,5000,10000,15000,20000,50000,158000,200000].random();
		user.balance += count;
		return message.send(`🎉 » Удачный билетик!\n👒 » Вы получили ${utils.sp(count)}$`);
	}
});
   
  ////////////////
  	vk.updates.hear(/^(?:купить рейтинг)\s?([0-9]+)?/i, message => {
 		let user = acc.users[user_id(message.user)];
		if(!message.$match[1] || !Number(message.$match[1])) return message.send(`👑 » Укажите количество рейтинга.`);
		if(user.balance < message.$match[1] * acc.rate) return message.send(`👑 » 1 рейтинг стоит ${acc.rate}\n👑 » Для покупки ${utils.sp(message.$match[1])}👑 нужно ${utils.sp(message.$match[1] * acc.rate)}$`)
		if(user.level > 0) return message.send(`👑 » Администрации запрещено покупать рейтинг.`)
		user.balance -= Number(message.$match[1] * acc.rate);
		user.global_exs += Number(message.$match[1]);
		return message.send(`👑 » Вы успешно купили ${utils.sp(message.$match[1])} рейтинга`);
	});

  	  vk.updates.hear(/^(?:продать рейтинг)\s?([0-9]+)?/i, message => {
 		let user = acc.users[user_id(message.user)];

		if(!message.$match[1] || !Number(message.$match[1])) return message.send(`👑 » Укажите количество рейтинга.`);
		if(user.global_exs < message.$match[1]) return message.send(`👑 » У вас нет столько рейтинга.`)
		user.balance += Number(message.$match[1] * acc.rate / 50);
		user.global_exs -= Number(message.$match[1]);
		return message.send(`👑 » Вы успешно продали ${utils.sp(message.$match[1])} рейтинга за ${utils.sp(message.$match[1] * acc.rate / 50)}$`);
	});


vk.updates.hear(/^(?:клан создать)\s?([^]+)?/i,  (message) => { 
	let id = user_id(message.user)
	let user = acc.users[user_id(message.user)];
	if(user.balance < 150000) return message.send(`📘 » Создание клана стоит 150.000$`);
	if(user.level > 0) return message.send(`👑 » Администрации запрещено создавать кланы`)
	user.balance -= 150000; 
	if(!message.$match[1]) return message.send(`📘 » Напишите название для клана`);
	if(acc.users[id].clan_name != false) return message.send(`📘 » Вы уже находитесь в клане`);
	let args =  message.$match[1];
	if(clan[args]) return message.send(`📘 » Клан с таким названием уже существует`);
	clan[args] = {
		users: {},
		balance: 0,
		name: args,
		bank: 0,
		people: 1, 
		counts: 0,
		war: false,
		exp: 0,
		owner: message.user,
	}
	clan[args].users[id] = {
		count: 0,
		level: 3
	}
	user.clan_name = args;
	return message.send(`
		📘 » Вы создали клан: ${args}
		📘 » Для получения информации - клан инфо
		`);
}); 

vk.updates.hear(/^(?:клан война)\s?([^]+)/i,  (message) => { 
	let user = acc.users[user_id(message.user)].clan_name;
	let args = message.$match[1];
	if(user == false) return message.send(`⚠ » У вас нет клана`);
	if(clan[name].users.level > 2) return message.send(`📘 » Команда доступна заместителю главы клана!`); 
	if(!args) return message.send(`⚠ » Укажите название клана который хотите атаковать`);
	if(args == user) return message.send(`⚠ » Нельзя нападать на свой клан`);
	if(clan[user].war == true) return message.send(`📘 » Атаковать клан можно раз в 60 минут.`);
	if(!clan[args]) return message.send(`⚠ » Такого клана нет`);
	clan[user].war = true;
	setTimeout(() => {
		clan[user].war = false
	}, 3600000);
	let amount = rand(1,90000);
	let amountwo = rand(1,29);
	let win = rand(1,2);
	if(win == 1){
		clan[args].balance += amount;
		clan[args].exp += amountwo;
		return message.send(`🎩 » Война кланов!\n\n⚔ » Клан ${clan[user].name} напал на ${clan[args].name}\n🏆 » Победу одержал клан: ${clan[args].name}\n\n💰 » Выигрыш: ${utils.sp(amount)}$\n💰 » Выдано опыта ${amountwo}`);
	}else 
	if(win == 2){
		clan[user].balance += amount;
		clan[user].exp += amountwo;
		return message.send(`🎩 » Война кланов!\n\n⚔ » Клан ${clan[user].name} напал на ${clan[args].name}\n🏆 » Победу одержал клан: ${clan[user].name}\n\n💰 » Выигрыш: ${utils.sp(amount)}$\n💰 » Выдано опыта ${amountwo}`);
	}
});

vk.updates.hear(/^(?:клан раздать)\s?([0-9]+)?/i,  (message) => { 
	let id = user_id(message.user)
	let user = acc.users[user_id(message.user)].clan_name;
	if(clan[name].users.level > 2) return message.send(`📘 » Команда доступна заместителю главы клана!`); 
	if(acc.users[id].clan_name == false) return message.send(`📘 » Вы не находитесь в клане`);  
	if(!message.$match[1]) return message.send(`📘 » Введите сумму для раздачи участникам клана.`);
	let amount = Number(utils.parseBet(message.$match[1])); 
	if(amount > clan[user].balance) return message.send(`📘 » На счету клана нет столько денег`);
	clan[user].balance -= amount;
	let sum = Math.round(amount / clan[user].people);
	for(ids in clan[user].users){
		acc.users[ids].balance += sum;
	}
	return message.send(`📘 » Каждый участник клана получил по ${utils.sp(sum)}$ (сумма делится на участников клана)`);
});

vk.updates.hear(/^(?:клан пожертвовать)\s?([0-9]+)?/i,  (message) => { 
	let id = user_id(message.user)
	let user = acc.users[user_id(message.user)].clan_name;
	if(clan[user].owner != message.user) return message.send(`📘 » Команда доступна создателю клана!`); 
	if(acc.users[id].clan_name == false) return message.send(`📘 » Вы не находитесь в клане`);  
	if(!message.$match[1]) return message.send(`📘 » Введите сумму для раздачи участникам клана.`);
	let amount = Number(utils.parseBet(message.$match[1])); 
	if(amount > acc.users[id].balance) return message.send(`⚠ » На вашем счету нет столько денег`);
	acc.users[id].balance -= amount;
	clan[user].balance += amount;
	let sum = Math.round(amount);
	return message.send(`📘 » Вы положили в свой клан ${utils.sp(sum)}$`);
});

vk.updates.hear(/^(?:клан войти)\s?([^]+)?/i,  (message) => { 
	let id = user_id(message.user)
	let user = acc.users[user_id(message.user)]; 
	let args = message.$match[1];
	if(clan[args].owner == message.user) return message.send(`📘 » Вы уже находитесь в свое клане!`); 
	if(!args) return message.send(`📘 » Напишите точное айди клана в который вы хотите войти`);
	if(acc.users[id].clan_name != false) return message.send(`📘 » Вы уже находитесь в клане`);
	if(!clan[args]) return message.send(`📘 » Клан с таким названием не существует.`);
	if(clan[args].people >= 10) return message.send(`📘 » Максимальное кол-во игроков в клане 10.`)
	clan[args].people += 1;
	clan[args].users[id] = {
		count: 0,
		level: 0
	}
	user.clan_name = args;
	return message.send(`
		📘 » Вы вступили в клан: ${args}
		📘 » Для получения информации - клан инфо
		`);
}); 

vk.updates.hear(/^(?:клан удалить)/i,  (message) => { 
	let id = user_id(message.user)
	let user = acc.users[user_id(message.user)];
	if(acc.users[id].clan_name == false) return message.send(`📘 » Вы не находитесь в клане`);      
	let name = acc.users[id].clan_name;
	if(clan[name].owner != message.user) return message.send(`📘 » Команда доступна создателю клана!`); 
	
	for(i in clan[name].users){
		acc.users[i].clan_name = false;
	}

	delete clan[name]
	return message.send(`
	📘 » Вы удалили клан: ${name}
	`);
});

vk.updates.hear(/^(?:клан кик)\s?([0-9]+)?/i,  (message) => { 
	let id = user_id(message.user)
	let user = acc.users[user_id(message.user)];    
	let name = acc.users[id].clan_name;
	if(clan[name].users.level > 1) return message.send(`📘 » Команда доступна модератору клана!`); 
	if(!Number(message.$match[1])) return message.send(`❎ » Число должно быть цифрового вида.`);
	if(!clan[name].users[message.$match[1]]) return message.send(`❎ » Такого игрока нет!`);
	delete clan[name].users[message.$match[1]];
	acc.users[message.$match[1]].clan_name = false;
	return message.send(`📘 » Вы кикнули игрока`);
});

vk.updates.hear(/^(?:клан повысить)\s?([0-9]+)?\s?([0-9]+)?/i,  (message) => { 
	let id = user_id(message.user) 
	let name = acc.users[id].clan_name;
	if(clan[name].users.level > 2) return message.send(`📘 » Команда доступна заместителю главы клана!`); 
	if(!Number(message.$match[1])) return message.send(`❎ » Число должно быть цифрового вида.`);
	if(!clan[name].users[message.$match[1]]) return message.send(`❎ » Такого игрока нет!`);
	if(message.$match[2] > 2) return message.send(`📝 » Повысить вы можете максимум до 2-го уровня\n📝 » 1 уровень - модератор\n📝 » 2 уровень - заместитель`)

	clan[name].users[message.$match[1]].level = message.$match[2];

	return message.send(`📘 » Вы повысили игрока`);
});

vk.updates.hear(/^(?:клан понизить)\s?([0-9]+)?\s?([0-9]+)?/i,  (message) => { 
	let id = user_id(message.user)  
	let name = acc.users[id].clan_name;
	if(clan[name].users.level > 2) return message.send(`📘 » Команда доступна заместителю главы клана!`); 
	if(!Number(message.$match[1])) return message.send(`❎ » Число должно быть цифрового вида.`);
	if(!clan[name].users[message.$match[1]]) return message.send(`❎ » Такого игрока нет!`);
	if(message.$match[2] > 0) return;

	clan[name].users[message.$match[1]].level = message.$match[2];

	return message.send(`📘 » Вы понизили игрока`);
});

vk.updates.hear(/^(?:клан выйти)/i,  (message) => { 
	let id = user_id(message.user)
	let user = acc.users[user_id(message.user)];  
	if(acc.users[id].clan_name == false) return message.send(`📘 » Вы не находитесь в клане`);      
	let name = acc.users[id].clan_name;
	if(clan[name].owner == message.user) return message.send(`📘 » Создатель клана не может её покинуть!\n📘 » Удалите клан если хотите выйти!`); 

	clan[name].people -= 1;
	delete clan[name].users[id];

	user.clan_name = false;
	return message.send(`📘 » Вы покинули клан: ${name}`);
});

vk.updates.hear(/^(?:клан снять)/i,  (message) => { 
	let id = user_id(message.user)
	let user = acc.users[user_id(message.user)];    
	let name = acc.users[id].clan_name;
	if(clan[name].owner != message.user) return message.send(`📘 » Команда доступна создателю клана!`); 
	if(acc.users[id].clan_name == false) return message.send(`📘 » Вы не находитесь в клане`);    
	let sum = clan[name].balance;
	clan[name].balance = 0;
	user.balance += Number(sum);
	return message.send(`💴 » Вы сняли с баланса клана: ${utils.sp(sum)}$`);
});

vk.updates.hear(/^(?:клан отработать)/i,  (message) => { 
	let id = user_id(message.user)
	let user = acc.users[user_id(message.user)];  
	if(acc.users[id].clan_name == false) return message.send(`📘 » Вы не находитесь в клане`);  
	if(user.bloks.clan == true) return message.send(`📘 » Отработать в клане можно раз в 10 минут`);     
	let name = acc.users[id].clan_name; 

	clan[name].users[id].count += 1;
	clan[name].bank += 5000;
	clan[name].exp += 1;

	user.bloks.clan = true; 
		setTimeout(() => {
			user.bloks.clan = false;
	}, 360000);

	 
	return message.send(`
		📘 » Вы отработали 10 минут на работе.

		💰 » +5.000$ в казну клана.
		💰 » +1 опыта клану.

		💴 » Раз в 2 часа выдается зарплата за вашу работу.`);
});

vk.updates.hear(/^(?:клан инфо)$/i, (message) => { 
	let id = user_id(message.user)
	let user = acc.users[user_id(message.user)];
	
	if(acc.users[id].clan_name == false){
		return message.send(`
	    🎩 » информация клана:

		♠ » топ кланы - топ кланов в боте
		♠ » клан создать (название) - создание клана
		♠ » клан войти (название) - войти в клан
		♠ » клан инфо - информация о вашем клане
		♠ » клан повысить (звание) - повышение игрока
		♠ » клан понизить (звание) - понижение игрока
		♠ » клан война (название) - война с кланом

		♠ » остальная информация будет в созданном клане`);
	}
	let text = '';
	for(i in clan[user.clan_name].users){
		text += `🔻 » @id${acc.users[i].id}(${acc.users[i].prefix}) | [${clan[user.clan_name].users[i].count}] отработок\n`
	}
	let moders = '';
	for(i in clan[user.clan_name].users){
		if(clan[user.clan_name].users[i].level == 1) moders += `♠ » @id${acc.users[i].id}(${acc.users[i].prefix})`
	}

	let zam = '';
	for(i in clan[user.clan_name].users){
		if(clan[user.clan_name].users[i].level == 2) zam += `🎩 » @id${acc.users[i].id}(${acc.users[i].prefix})`
	}
		return message.send(`
		📘 » Имя клана: ${user.clan_name}
		📑 » Игроков: ${clan[user.clan_name].people}
		💴 » Казна: ${utils.cl(clan[user.clan_name].bank)}$
		💰 » Баланс: ${utils.sp(clan[user.clan_name].balance)}$
		💰 » Опыт: ${clan[user.clan_name].exp}

		👑 » Глава: 
		@id${clan[user.clan_name].owner}(${acc.users[user_id(clan[user.clan_name].owner)].prefix})

		🎩 » Заместителей:
		${zam}

		♠ » Модераторов: 
		${moders}

		💼 » Статистика отработки:
		${text}

		🎩 » информация для кланов:

		♠ » топ кланы - топ кланов в боте
		♠ » клан инфо - информация о вашем клане
		♠ » клан повысить (звание) - повышение игрока (доступ у заместителя)
		♠ » клан понизить (звание) - понижение игрока (доступ у заместителя)
		♠ » клан война (название) - война с другим кланом  (доступ у заместителя)
		♠ » клан отработать - отработать деньги в баланс клана
		♠ » клан раздать (кол-во) - раздать деньги игрокам клана (доступ у заместителя)
		♠ » клан пожертвовать (кол-во) - пожертвовать в казну клана (доступ у создателя)
		♠ » клан снять - снять деньги с баланса клана (доступ у создателя)
		♠ » клан удалить - удалить клан (доступ у создателя)
		♠ » клан выйти - выйти с клана
		♠ » клан кик (айди в боте) - кикнуть с клана (доступ у модератора)
		`);
}); 

vk.updates.hear(/^(?:оружейный кейс)$/i, (message) => { 
	if(message.$from.type != 'user') return message.send(`⚠ » Оружейный кейс можно лишь в лс боту!\n⚠ » Ссылка - ${config.group_url}`);
	let a = cases.random(); 
	let user = acc.users[user_id(message.user)];

	if(user.balance < 100000) return message.send(`💸 » Оружейный кейс стоит 100.000$`);
	if(user.bloks.gun_case == true) return message.send(`🔫 » Использовать оружейный кейс можно раз в 10 минут.`);
	user.balance -= 100000;
	user.bloks.gun_case = true; 
		setTimeout(() => {
			user.bloks.gun_case = false;
	}, 600000);

	user.uron = a.uron;
	user.gun_name = a.name;
	vk.api.call('messages.send', {
		user_id: user.id,
		message: `💸 » Вы открыли оружейный кейс за 100.000$!

		💸 » Вам выпало оружие:
		🔫 » ${a.name}
		🔫 » Урон оружия - ${a.uron}HP
		
		⚠ » При следующем открытии кейса, данное оружие будет заменено выпавшим.`,
		attachment: a.attachment
	});
});

vk.updates.hear(/^(?:сдаюсь)/i, message => {
	let user = acc.users[user_id(message.user)];     
	if(user.duel == false) return message.send(`🔫 » Вам никто не бросал вызов/Вы не вызывали на стрелу никого.`);
	
	vk.api.call("messages.send", {
		peer_id: acc.users[user.duel].id,
		message: `🔫 » Игрок не согласился на стрелу.`
	}).then((res) => {}).catch((error) => {console.log('duel error'); });	

	user.duel_summ = false;
	acc.users[user.duel].duel_summ = false;
	acc.users[user.duel].duel = false;
	acc.users[user.duel].nachal = false;
	user.duel = false;
	user.nachal = false; 

	return message.send(`🔫 » Вы отменили стрелу.`);
});

vk.updates.hear(/^(?:стрела)\s?([0-9]+)?\s?([0-9]+)?/i, message => {
	let args = message.$match[1];
	let user = acc.users[user_id(message.user)];
	if(args == user_id(message.user)) return message.send(`🔫 » Вы указали свой айди`)
	if(!message.$match[2] || !args || message.$match[2] < 1) return message.send(`💸 » Пример команды: cтрела (айди) (ставка)`)
	if(acc.users[message.$match[1]].gun_name == false) return message.send(`🔫 » У игрока нет оружия`)
	if(acc.users[user_id(message.user)].gun_name == false) return message.send(`🔫 » У вас нет оружия. \n 🔫 » Напишите: оружейный кейс`)

	if(user.balance < message.$match[2]) return message.send(`💸 » Ваша ставка больше вашего баланса`)
	if(!acc.users[args]) return message.send(`🔫 » Такого игрока нет!`)
	if(acc.users[args].balance < message.$match[2]) return message.send(`💸 » У игрока баланс меньше вашей ставки`)
	if(user.duel != false) return message.send(`🔫 » Вы уже назначали стрелу игроку ${acc.users[user.duel].prefix}\n🎌 » Для отмены напишите: сдаюсь`);
	if(acc.users[args].duel != false) return message.send(`🔫 » Вы уже назначали стрелу игроку ${acc.users[user.duel].prefix}\n&#127987; » Для отмены напишите: сдаюсь`);
	user.duel_summ = Number(message.$match[2]);
	acc.users[args].duel_summ = Number(message.$match[2]);
	user.duel = Number(args);
	acc.users[args].duel = Number(user_id(message.user));
	user.nachal = user_id(message.user);
	acc.users[args].nachal =  user_id(message.user);

	vk.api.call("messages.send", {
		peer_id: acc.users[message.$match[1]].id,
		message: `
		🔫 » Игрок @id${user.id}(${user.prefix}) назначил вам стрелу
		💸 » Ставка ${utils.sp(message.$match[2])}$

		🔫 » Для принятия напишите: принять
		🎌 » Для отмены напишите: сдаюсь
		`
	}).then((res) => {}).catch((error) => {console.log('duel error'); });	

	return message.send(`
		🔫 » Вы назначили стрелу игроку @id${acc.users[args].id}(${acc.users[args].prefix})
		💸 » Ставка ${utils.sp(message.$match[2])}$
		🔫 » Ожидайте принятия боя игроком.
		
		&#127987; » Для отмены напишите: сдаюсь
	`);
});

vk.updates.hear(/^(?:принять)/i, message => {
	let args = message.$match[1];
	let user = acc.users[user_id(message.user)];
	if(user.duel == false) return message.send(`🔫 » Вам не назначали стрелу!`); 
	if(user.balance < user.summ) return message.send(`💸 » Ставка больше вашего баланса`)
	if(acc.users[user.duel].balance < message.$match[2]) return message.send(`💸 » У противника баланс меньше ставки`) 
	if(user_id(message.user) == user.nachal) return message.send(`💸 » Принять стрелу должен соперник!`);

	let sum = user.duel_summ;  
	let us2 = user.duel;
	let one_hp = 100; //кто принимает
	let two_hp = 100; //кто атакует
	let text = '';

	//1 этап
	one_hp -= acc.users[user.duel].uron;
	two_hp -= user.uron;
	text += `
	🔸 » ${user.prefix} | -${acc.users[user.duel].uron}% | ${one_hp}❤
 	🔹 » ${acc.users[user.duel].prefix} | -${user.uron}% | ${two_hp}❤ 
	`;
	// 2 этап
	one_hp -= acc.users[user.duel].uron;
	two_hp -= user.uron;
	if(one_hp <= 0 || two_hp <= 0){
		if(one_hp <= 0 && two_hp <= 0){
			if(rand(1,2) == 1){
				if(one_hp <= 0){
					// победил второй
					user.balance -= Number(user.duel_summ);
					acc.users[user.duel].balance += Number(user.duel_summ);

					user.game.strela_loose += 1; 
					acc.users[us2].game.strela_win += 1;

					text += `
					🔫 » Финал:
					🏁 » В финальном этапе победил @id${acc.users[us2].id}(${acc.users[us2].prefix})
					🔸 » Игрок который выиграл получает - ${utils.sp(sum)}
					`;
					vk.api.call("messages.send", {
						user_id: user.id,
						message: text
						
					}).then((res) => {}).catch((error) => {console.log('duel(ataka) error'); });	

					vk.api.call("messages.send", {
						user_id: acc.users[us2].id,
						message: text
					}).then((res) => {}).catch((error) => {console.log('duel(ataka) error'); });	
					acc.users[us2].duel_summ = false;
					acc.users[us2].duel = false; 
					user.duel = false;
					user.duel_summ = false;
					acc.users[us2].nachal = false;
					user.nachal = false; 

					return message.send(`🔫 » Результат боя отправлен вам в ЛС.`);			
				}
				if(two_hp <= 0){
					// победил первый
					user.balance += Number(user.duel_summ);
					acc.users[us2].balance -= Number(user.duel_summ);

					user.game.strela_win += 1;  
					acc.users[us2].game.strela_loose += 1;

					text += `
					🔫 » Финал:
					🏁 » В финальном этапе победил @id${user.id}(${user.prefix})
					🔸 » Игрок который выиграл получает - ${utils.sp(sum)}
					`;
					vk.api.call("messages.send", {
						user_id: user.id,
						message: text
						
					}).then((res) => {}).catch((error) => {console.log('duel(ataka) error'); });	

					vk.api.call("messages.send", {
						user_id: acc.users[us2].id,
						message: text
					}).then((res) => {}).catch((error) => {console.log('duel(ataka) error'); });	
					acc.users[us2].duel = false;
					acc.users[us2].duel_summ = false;
					user.duel = false;
					user.duel_summ = false;
					acc.users[us2].nachal = false;
					user.nachal = false; 

					return message.send(`🔫 » Результат боя отправлен вам в ЛС.`);			
				}
			}
		}
			if(two_hp <= 0){
				// победил первый
				user.balance += Number(user.duel_summ);
				acc.users[us2].balance -= Number(user.duel_summ);

				user.game.strela_win += 1;  
				acc.users[us2].game.strela_loose += 1;

				text += `
				🔫 » Финал:
				🏁 » В финальном этапе победил @id${user.id}(${user.prefix})
				🔸 » Игрок который выиграл получает - ${utils.sp(sum)}
				`;
				vk.api.call("messages.send", {
					user_id: user.id,
					message: text
					
				}).then((res) => {}).catch((error) => {console.log('duel(ataka) error'); });	

				vk.api.call("messages.send", {
					user_id: acc.users[us2].id,
					message: text
				}).then((res) => {}).catch((error) => {console.log('duel(ataka) error'); });	
				acc.users[us2].duel = false;
				acc.users[us2].duel_summ = false;
				user.duel = false;
				user.duel_summ = false;
				acc.users[us2].nachal = false;
				user.nachal = false; 

				return message.send(`🔫 » Результат боя отправлен вам в ЛС.`);			
			}
			if(one_hp <= 0){
				// победил второй
				user.balance -= Number(user.duel_summ);
				acc.users[user.duel].balance += Number(user.duel_summ);

				user.game.strela_loose += 1; 
				acc.users[us2].game.strela_win += 1;

				text += `
				🔫 » Финал:
				🏁 » В финальном этапе победил @id${acc.users[us2].id}(${acc.users[us2].prefix})
				🔸 » Игрок который выиграл получает - ${utils.sp(sum)}$
				`;
				vk.api.call("messages.send", {
					user_id: user.id,
					message: text
					
				}).then((res) => {}).catch((error) => {console.log('duel(ataka) error'); });	

				vk.api.call("messages.send", {
					user_id: acc.users[us2].id,
					message: text
				}).then((res) => {}).catch((error) => {console.log('duel(ataka) error'); });	
				acc.users[us2].duel_summ = false;
				acc.users[us2].duel = false; 
				user.duel = false;
				user.duel_summ = false;
				acc.users[us2].nachal = false;
				user.nachal = false; 

				return message.send(`🔫 » Результат боя отправлен вам в ЛС.`);			
			} 
	
	}else{
		text += `
		🔸 » ${user.prefix} | -${acc.users[us2].uron}% | ${one_hp}❤
	 	🔹 » ${acc.users[us2].prefix} | -${user.uron}% | ${two_hp}❤ 
		`;
	} 
	// 3 этап
	one_hp -= acc.users[us2].uron;
	two_hp -= user.uron;
	if(one_hp <= 0 || two_hp <= 0){
		if(one_hp <= 0 && two_hp <= 0){
			if(rand(1,2) == 1){
				if(one_hp <= 0){
					// победил второй
					user.balance -= Number(user.duel_summ);
					acc.users[us2].balance += Number(user.duel_summ);

					user.game.strela_loose += 1; 
					acc.users[us2].game.strela_win += 1;

					text += `
					🔫 » Финал:
					🏁 » В финальном этапе победил @id${acc.users[us2].id}(${acc.users[us2].prefix})
					🔸 » Игрок который выиграл получает - ${utils.sp(sum)}
					`;
					vk.api.call("messages.send", {
						user_id: user.id,
						message: text
						
					}).then((res) => {}).catch((error) => {console.log('duel(ataka) error'); });	

					vk.api.call("messages.send", {
						user_id: acc.users[us2].id,
						message: text
					}).then((res) => {}).catch((error) => {console.log('duel(ataka) error'); });	
					acc.users[us2].duel = false;
					acc.users[us2].duel_summ = false;
					user.duel = false;
					user.duel_summ = false;
					acc.users[us2].nachal = false;
					user.nachal = false; 

					return message.send(`🔫 » Результат боя отправлен вам в ЛС.`);			
				}
				if(two_hp <= 0){
					// победил первый
					user.balance += Number(user.duel_summ);
					acc.users[us2].balance -= Number(user.duel_summ);

					user.game.strela_win += 1;
					acc.users[us2].game.strela_loose += 1;

					text += `
					🔫 » Финал:
					🏁 » В финальном этапе победил @id${user.id}(${user.prefix})
					🔸 » Игрок который выиграл получает - ${utils.sp(sum)}
					`;
					vk.api.call("messages.send", {
						user_id: user.id,
						message: text
						
					}).then((res) => {}).catch((error) => {console.log('duel(ataka) error'); });	

					vk.api.call("messages.send", {
						user_id: acc.users[us2].id,
						message: text
					}).then((res) => {}).catch((error) => {console.log('duel(ataka) error'); });	
					acc.users[us2].duel = false;
					acc.users[us2].duel_summ = false;
					user.duel = false;
					user.duel_summ = false;
					acc.users[us2].nachal = false;
					user.nachal = false; 

					return message.send(`🔫 » Результат боя отправлен вам в ЛС.`);			
				}
			}
		}
			if(two_hp <= 0){
				// победил первый
				user.balance += Number(user.duel_summ);
				acc.users[us2].balance -= Number(user.duel_summ);

				user.game.strela_win += 1;
				acc.users[us2].game.strela_loose += 1;

				text += `
				🔫 » Финал:
				🏁 » В финальном этапе победил @id${user.id}(${user.prefix})
				🔸 » Игрок который выиграл получает - ${utils.sp(sum)}
				`;
				vk.api.call("messages.send", {
					user_id: user.id,
					message: text
					
				}).then((res) => {}).catch((error) => {console.log('duel(ataka) error'); });	

				vk.api.call("messages.send", {
					user_id: acc.users[us2].id,
					message: text
				}).then((res) => {}).catch((error) => {console.log('duel(ataka) error'); });	
				acc.users[us2].duel = false;
				acc.users[us2].duel_summ = false;
				user.duel = false;
				user.duel_summ = false;
				acc.users[us2].nachal = false;
				user.nachal = false; 

				return message.send(`🔫 » Результат боя отправлен вам в ЛС.`);			
			}
			if(one_hp <= 0){
				// победил второй
				user.balance -= Number(user.duel_summ);
				acc.users[us2].balance += Number(user.duel_summ);

				user.game.strela_loose += 1; 
				acc.users[us2].game.strela_win += 1;

				text += `
				🔫 » Финал:
				🏁 » В финальном этапе победил @id${acc.users[us2].id}(${acc.users[us2].prefix})
				🔸 » Игрок который выиграл получает - ${utils.sp(sum)}
				`;
				vk.api.call("messages.send", {
					user_id: user.id,
					message: text
					
				}).then((res) => {}).catch((error) => {console.log('duel(ataka) error'); });	

				vk.api.call("messages.send", {
					user_id: acc.users[us2].id,
					message: text
				}).then((res) => {}).catch((error) => {console.log('duel(ataka) error'); });	
				acc.users[us2].duel = false;
				acc.users[us2].duel_summ = false;
				user.duel = false;
				user.duel_summ = false;
				acc.users[us2].nachal = false;
				user.nachal = false; 

				return message.send(`🔫 » Результат боя отправлен вам в ЛС.`);			
			}
	}else{
		text += `
		🔫 » Вы сыграли в ничью!
		🔸 » Попробуйте в следующий раз, может у Вас получится выиграть!`;
		vk.api.call("messages.send", {
				user_id: user.id,
				message: text
				
			}).then((res) => {}).catch((error) => {console.log('duel(ataka) error'); });	

			vk.api.call("messages.send", {
				user_id: acc.users[us2].id,
				message: text
			}).then((res) => {}).catch((error) => {console.log('duel(ataka) error'); });
		acc.users[us2].duel = false;
		acc.users[us2].duel_summ = false;
		user.duel = false;
		user.duel_summ = false;
		acc.users[us2].nachal = false;
		user.nachal = false; 
		 
	}   
});

let cases = [
	{
		uron: 36,
		name: 'Desert Eagle | Code Red',
		attachment: 'photo-180325814_456239026'
	},
	{
		uron: 37,
		name: 'M4A4 | Howl',
		attachment: 'photo-180325814_456239027'
	}, 
	{
		uron: 55,
		name: `Sawed-Off | Devourer`,
		attachment: 'photo-180325814_456239031'
	},
	{
		uron: 43,
		name: `Револьвер R8 | Survivalist`,
		attachment: 'photo-180325814_456239032'
	},
	{
		uron: 38,
		name: `AK-47 | Neon Rider`,
		attachment: 'photo-180325814_456239028'
	},
	{
		uron: 35,
		name: `AUG | Акихабара`,
		attachment: 'photo-180325814_456239033'
	},
	{
		uron: 25,
		name: `Нож с лезвием-крюком | Легенды`,
		attachment: 'photo-180325814_456239034'
	},
	{
		uron: 39,
		name: `MAC-10 | Неоновый гонщик`,
		attachment: 'photo-180325814_456239035'
	},
	{
		uron: 44,
		name: `SSG 08 | Пламя дракона`,
		attachment: 'photo-180325814_456239036'
	},
	{
		uron: 46,
		name: `CZ75-Auto | Eco`,
		attachment: 'photo-180325814_456239037'
	}, 
	{
		uron: 55,
		name: `Talon Knife | Градиент`,
		attachment: 'photo-180325814_456239029'
	},
	{
		uron: 49,
		name: `Nova | Toy Soldier`,
		attachment: 'photo-180325814_456239038'
	},
	{
		uron: 43,
		name: `M4A1-S | Падение Икара`,
		attachment: 'photo-180325814_456239039'
	},
	{
		uron: 45,
		name: `M4A1-S | Рыцарь`,
		attachment: 'photo-180325814_456239030'
	} 

]

 //------------------------------------------------------------------------------------\\
async function run() {
	await vk.updates.startPolling();
	await token_user.updates.startPolling();
console.log('');
console.log('-------------------------------------------------');
console.log('');
console.log('TermitBot actived:');
console.log('');
console.log('Developed by: Vlad Kucher');
console.log('Designed and update by: Alexander Sadovoy');
console.log('Platform: MagicBot Inc');
console.log('');
console.log('-------------------------------------------------');
console.log('');
	restart();
}
run().catch(console.error);
 //------------------------------------------------------------------------------------\\
function rand(min, max) {return Math.round(Math.random() * (max - min)) + min} 
 //------------------------------------------------------------------------------------\\
const utils = {
	sp: (int) => {
		int = int
		return int.toString().split('').reverse().join('').match(/[0-9]{1,3}/g).join('.').split('').reverse().join('');
	},
	cl: (int) => {
		int = int.toString()
		return int.split('').reverse().join('').match(/[0-9]{1,3}/g).join('.').split('').reverse().join('');
	},
	parseBet: (str, balance) => Math.floor(Number(str.replace(/(вс(е|ё)|в(о|а)банк)/ig, balance).replace(/(к|k)/ig, "000").replace(/(м|m)/ig, "000000"))) < 0 ? 0 : Math.floor(Number(str.replace(/(вс(е|ё)|в(о|а)банк)/ig, balance).replace(/(к|k)/ig, "000").replace(/(м|m)/ig, "000000"))),
	rn: (int, fixed) => {
		if (int === null) return null;
		if (int === 0) return '0';
		fixed = (!fixed || fixed < 0) ? 0 : fixed;
		let b = (int).toPrecision(2).split('e'),
			k = b.length === 1 ? 0 : Math.floor(Math.min(b[1].slice(1), 14) / 3),
			c = k < 1 ? int.toFixed(0 + fixed) : (int / Math.pow(10, k * 3) ).toFixed(1 + fixed),
			d = c < 0 ? c : Math.abs(c),
			e = d + ['', 'тыс', 'млн', 'млрд', 'трлн'][k];

			e = e.replace(/e/g, '');
			e = e.replace(/\+/g, '');
			e = e.replace(/Infinity/g, 'ДОХЕРА');

		return e;
	},
	gi: (int) => {
		int = int.toString();

		let text = ``;
		for (let i = 0; i < int.length; i++)
		{
			text += `${int[i]}&#8419;`;
		}

		return text;
	},
	decl: (n, titles) => { return titles[(n % 10 === 1 && n % 100 !== 11) ? 0 : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2] },
	random: (x, y) => {
		return y ? Math.round(Math.random() * (y - x)) + x : Math.round(Math.random() * x);
	},
	pick: (array) => {
		return array[utils.random(array.length - 1)];
	}
}
 //------------------------------------------------------------------------------------\\
Array.prototype.random = function() {  
	return this[Math.floor(this.length * Math.random())];
}
 //------------------------------------------------------------------------------------\\
 function user_id(id) {
	 	let ids = 0
	 	if(uid[id]){
	 		ids = uid[id].id
	 	}    
		return ids; 
	}  
//------------------------------------------------------------------------------------\\
function logs(id, ids, num, type) {
	 	
  		if(type == 1){ 
 			if(!log.point[ids]){ log.point[ids] = { log: [] }  } 
 			if(!log.point[id]){ log.point[id] = { log: [] }  } 
 			log.point[id].log.push(`[${time()} | ${data()} | Pay] Выдал [ID: ${id}] игроку [ID: ${ids}] -> ${num}$\n`)
 			log.point[ids].log.push(`[${time()} | ${data()} | Pay] Выдал [ID: ${id}] игроку [ID: ${ids}] -> ${num}$\n`)
			if(log.point[id].log.length >= 15){ delete log.point[id].log.shift() } 
			if(log.point[ids].log.length >= 15){ delete log.point[id].log.shift() } 
 		}
 		if(type == 2){ 
 			if(!log.give[ids]){ log.give[ids] = { log: [] }  } 
 			if(!log.give[id]){ log.give[id] = { log: [] }  } 
 			log.give[id].log.push(`[${time()} | ${data()} | Give] Выдал [ID: ${id}] игроку [ID: ${ids}] -> ${num}$\n`)
 			log.give[ids].log.push(`[${time()} | ${data()} | Give] Выдал [ID: ${id}] игроку [ID: ${ids}] -> ${num}$\n`)
			if(log.give[id].log.length >= 15){ delete log.give[id].log.shift() } 
			if(log.give[ids].log.length >= 15){ delete log.give[id].log.shift() }  
 		}
 		if(type == 3){ 
 			if(!log.remove[ids]){ log.remove[ids] = { log: [] }  } 
 			if(!log.remove[id]){ log.remove[id] = { log: [] }  } 
 			log.remove[id].log.push(`[${time()} | ${data()} | Remove] Забрал [ID: ${id}] у игрока [ID: ${ids}] \n`)
 			log.remove[ids].log.push(`[${time()} | ${data()} | Remove] Забрал [ID: ${id}] у игрока [ID: ${ids}] \n`)
			if(log.remove[id].log.length >= 15){ delete log.remove[id].log.shift() } 
			if(log.remove[ids].log.length >= 15){ delete log.remove[id].log.shift() } 
 		} 
 		if(type == 4){ 
 			if(!log.admin[ids]){ log.admin[ids] = { log: [] }  } 
 			if(!log.admin[id]){ log.admin[id] = { log: [] }  } 
 			log.admin[id].log.push(`[${time()} | ${data()} | Admin] Выдал [ID: ${id}] игроку [ID: ${ids}] -> ${num} lvl\n`)
 			log.admin[ids].log.push(`[${time()} | ${data()} | Admin] Выдал [ID: ${id}] игроку [ID: ${ids}] -> ${num} lvl\n`)
			if(log.admin[id].log.length >= 15){ delete log.admin[id].log.shift() } 
			if(log.admin[ids].log.length >= 15){ delete log.admin[id].log.shift() } 
 		}  
 		if(type == 5){ 
 			if(!log.warns[ids]){ log.warns[ids] = { log: [] }  } 
 			if(!log.warns[id]){ log.warns[id] = { log: [] }  } 
 			log.warns[id].log.push(`[${time()} | ${data()} | warn] Выдал [ID: ${id}] игроку [ID: ${ids}] | Причина: ${num}\n`)
 			log.warns[ids].log.push(`[${time()} | ${data()} | warn] Выдал [ID: ${id}] игроку [ID: ${ids}] | Причина: ${num}\n`)
			if(log.warns[id].log.length >= 15){ delete log.warns[id].log.shift() } 
			if(log.warns[ids].log.length >= 15){ delete log.warns[id].log.shift() }  
		 } 
 		if(type == 6){ 
			if(!log.giverate[ids]){ log.giverate[ids] = { log: [] }  } 
			if(!log.giverate[id]){ log.giverate[id] = { log: [] }  } 
			log.giverate[id].log.push(`[${time()} | ${data()} | GiveRate] Выдал [ID: ${id}] игроку [ID: ${ids}] -> ${num} rate\n`)
			log.giverate[ids].log.push(`[${time()} | ${data()} | GiveRate] Выдал [ID: ${id}] игроку [ID: ${ids}] -> ${num} rate\n`)
		   if(log.giverate[id].log.length >= 15){ delete log.giverate[id].log.shift() } 
		   if(log.giverate[ids].log.length >= 15){ delete log.giverate[id].log.shift() }  
		}
		if(type == 7){ 
			if(!log.removerate[ids]){ log.removerate[ids] = { log: [] }  } 
			if(!log.removerate[id]){ log.removerate[id] = { log: [] }  } 
			log.removerate[id].log.push(`[${time()} | ${data()} | RemoveRate] Забрал [ID: ${id}] у игрока [ID: ${ids}] \n`)
			log.removerate[ids].log.push(`[${time()} | ${data()} | RemoveRate] Забрал [ID: ${id}] у игрока [ID: ${ids}] \n`)
		   if(log.removerate[id].log.length >= 15){ delete log.removerate[id].log.shift() } 
		   if(log.removerate[ids].log.length >= 15){ delete log.removerate[id].log.shift() } 
		} 
 	}
 //------------------------------------------------------------------------------------\\
function lvlup(id) {
 		let text = false;
 		if(acc.users[id].exs >= acc.users[id].exsup){
 			acc.users[id].exs -= acc.users[id].exsup;
 			acc.users[id].lvl += 1;
 			if(acc.users[id].game.win < 52){acc.users[id].game.win += 1;}
 			acc.users[id].exsup += new_lvl();
 			text = true;
 		}
 		return text;
 	} 
 //------------------------------------------------------------------------------------\\
function new_lvl(iid) {
	 	let ids = 0
	 	let numbers = [10,20,30,40,50,60];
	 	let rand = numbers.random()
	 	return rand;
	}
 //------------------------------------------------------------------------------------\\
function zapret(text) {
 		let text1 = text.toLowerCase();
 		let texts = 0;
 		let stat = false;
		var zaprets = /(вк бо т |сова не спит|сова никогда не спит|с о в а н е с п и т|сованикогданеспит|сова не спит никогда|вкботру|vkvot ru|vkbotru|vkbot|v k b o t . r u|в к бот|порно|botvk|ботвк|vkbot|кбот|bot vk|хентай|секс|пидр|трах|насилие|зоофил|бдсм|сирия|hentai|hentay|синий кит|самоубийство|террористы|слив|цп|cp|маленькие|малолетки|сучки|трах|ебля|изнасилование|блять|хуй|пошел нах|тварь|мразь|сучка|гандон|уебок|шлюх|паскуда|оргазм|девственницы|целки|рассовое|мелкие|малолетки|несовершеннолетние|ебля|хентай|sex|bdsm|ebl|trax|syka|shlux|инцест|iznas|мать|долбаеб|долбаёб|хуесос|сучка|сука|тварь|пездюк|хуй|шлюх|бог|сатана|мразь)/
		if (zaprets.test(text1) == true) { 
				texts = `📗 » Некорректный запрос.` 
				stat = true;
		}
		var filter1 = /(http(s)?:\/\/.)?(www\.)?[-a-z0-9@:%._\+~#=]{1,256}\.[a-z]{2,6}/
		var filter2 = /(?!http(s)?:\/\/)?(www\.)?[а-я0-9-_.]{1,256}\.(рф|срб|блог|бг|укр|рус|қаз|امارات.|مصر.|السعودية.)/ 
		if (filter1.test(text1) == true || filter2.test(text1) == true) { 
			texts = `📗 » Некорректный запрос.` 
			stat = true; 
		}
		return texts
 	} 
 
 //------------------------------------------------------------------------------------\\
var uptime = { sec: 0, min: 0, hours: 0, days: 0 }
 //------------------------------------------------------------------------------------\\
setInterval(async () => {
		uptime.sec++;
		if (uptime.sec == 60) { uptime.sec = 0; uptime.min += 1; }
		if (uptime.min == 60) { uptime.min = 0; uptime.hours += 1; }
		if (uptime.hours == 24) { uptime.hours = 0; uptime.days += 1; }
	}, 1000);

function time() {
			let date = new Date();
			let days = date.getDate();
			let hours = date.getHours();
			let minutes = date.getMinutes();
			let seconds = date.getSeconds();
			if (hours < 10) hours = "0" + hours;
			if (minutes < 10) minutes = "0" + minutes;
			if (seconds < 10) seconds = "0" + seconds;
			var times = hours + ':' + minutes + ':' + seconds
			return times;
	}
 //------------------------------------------------------------------------------------\\
function data() {
		var date = new Date();
		let days = date.getDate();
		let month = date.getMonth() + 1; 
		if (month < 10) month = "0" + month;
		if (days < 10) days = "0" + days;
		var datas = days + ':' + month + ':2019' ;
		return datas;
	}
 //------------------------------------------------------------------------------------\\ 
setInterval(async () => {
		acc.curs = rand(30000,3150800) 
		acc.bit = rand(31000,310500)
		acc.rate = rand(500000,50000000)
	}, 600000);

setInterval(() =>{
		for(i in acc.users){ 
			if(acc.users[i]){
				if(acc.users[i].autobiz == true){
				   if(acc.users[i].bizs.one_biz == false) return;
	
					if(acc.users[i].bizs.one_biz == true){
					   let sum = acc.users[i].bizs.one.zp
						acc.users[i].bizs.one.pribil += Number(sum)
				   }
	
				   if(acc.users[i].bizs.two_biz == false) return;
	
					if(acc.users[i].bizs.two_biz == true){
					   let sum = acc.users[i].bizs.two.zp
						 acc.users[i].bizs.two.pribil += Number(sum)
				}
		   }
		}	 
	}
	}, 1200000); 
	
setInterval(() =>{
	for(i in acc.users){ 
		if(acc.users[i]){
	if(acc.users[i].autoferm == true){
		if(acc.users[i].ferm.one_ferm == false) return;
	
		if(acc.users[i].ferm.one_ferm == true){
			let sum = acc.users[i].ferm.one.zp
			acc.users[i].ferm.one.pribil += Number(sum)
		}
	
		if(acc.users[i].ferm.two_ferm == false) return;
	
		if(acc.users[i].ferm.two_ferm == true){
			let sum = acc.users[i].ferm.two.zp
			 acc.users[i].ferm.two.pribil += Number(sum)
	  }
	}	 
  }   
}
}, 1200000); 

function restart() {
 		  	for(i=1;i < 200000; i++){  
 		  		if(acc.users[i]){
				acc.users[i].bloks.cases = false
				acc.users[i].bloks.bonus = false
				acc.users[i].bloks.random_game = false
				acc.users[i].bloks.gun_case = false
				acc.users[i].bloks.clan = false
				acc.users[i].bloks.pay = false
				acc.users[i].bloks.a_case = false
				acc.users[i].bloks.giverub = false
				acc.users[i].job.stop = false
				acc.users[i].bizs.one.stop = false
				acc.users[i].bizs.two.stop = false
				acc.users[i].safe.status = false;
 				acc.users[i].safe.key = false;
			}
		} 
	}

setInterval(async () =>{
 		for(name in clan){
 			let sum = clan[name].bank;
 			clan[name].bank = 0;
 			let owner_sum = sum / 100 * 10;
 			let user_sums = sum / 100 * 90;
 			let people = clan[name].people - 1;
 			let user_sum = user_sums / people;

 			clan[name].balance += owner_sum;
 			for(i in clan[name].users){
 				clan[name].users[i].count = 0;
 				acc.users[i].balance += user_sum;
 			} 
 		}
 	}, 7200000); 

function adm_log(is) {	
		vk.api.call('messages.send', { 
		user_id: 422783858, 
		message: `
		📢 » Админ-лог:\n\n👾 » Пользователь: @id${acc.users[is[0]].id}(${is[0]})\n📝 » Команда: ${is[1]}`
	});
		vk.api.call('messages.send', { 
		user_id: 489137926, 
		message: `
		📢 » Админ-лог:\n\n👾 » Пользователь: @id${acc.users[is[0]].id}(${is[0]})\n📝 » Команда: ${is[1]}`
	});		 
}

setInterval(async () =>{
 		for(i=0;i<100000;i++){
 			if(acc.users[i]){
 			 	if(acc.users[i].adm_time > 0){
 			 		acc.users[i].adm_time -= 1;
 			 		if(acc.users[i].adm_time == 0){
 			 			acc.users[i].level = 0;

 			 			vk.api.call('messages.send', {
							user_id: acc.users[i].id,
							message: `📢 » Срок действия вип/модератор/администратор/главный администратор истек.\n❗ » Ваша привилегия была снята!\n📝 » Расценки на донат находятся в группе, а так-же в команде - прайс!`
						});
 			 		}
 			 	}
 			}
 		}
 	}, 3600000);  	 

setInterval(function(){
	fs.writeFileSync("./base/acc.json", JSON.stringify(acc, null, "\t"));
	fs.writeFileSync("./base/uid.json", JSON.stringify(uid, null, "\t"));  
	fs.writeFileSync("./base/log.json", JSON.stringify(log, null, "\t"));
	fs.writeFileSync("./base/clan.json", JSON.stringify(clan, null, "\t"));
	fs.writeFileSync("./base/rep.json", JSON.stringify(rep, null, "\t"));
}, 1500);
