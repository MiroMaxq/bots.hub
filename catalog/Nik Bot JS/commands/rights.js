const accs = require("../plugins/autosave.js").accs
module.exports = {
	    r: /(rights|Права) ([0-9]+)/i,
	    f: function (msg, args, vk, bot){
            vk.api.call("messages.getById", {message_ids: msg.id}).then((response) => {
           var gone = ""
           if(args[2] == 0){
               var r = "USER"
	}else if(args[2] == 1){
               var r = "VIP"
	}else if(args[2] == 2){
               var r = "MODERATOR"
	}else if(args[2] == 3){
               var r = "ADMIN"
	}else if(args[2] == 4){
               var r = "SUPPORT"
	}else if(args[2] == 5){
               var r = "LOOKING"
	}else if(args[2] == 6){
               var r = "ZAM"
	}else if(args[2] == 7){
               var r = "🔧CREATOR🔧"
           } 
           var users = response.items[0].fwd_messages
           for(var p = 0; p < users.length; p++){
               var user = users[p].user_id;
               var i = accs.filter(a=> a.id == Number(user)).map(a=> a.uid)
               if(accs.some(a=> a.id == user)){
               args[2] == 7 ? null : accs[i].rights = Number(args[2])
               args[2] == 7 ? r : gone += "Пользователю [id" + accs[i].id + "|" + accs[i].nickname + "] выданы права " + r + "\n"
               }else{
                   gone += "У пользователя [id" + accs[i].id + "|" + accs[i].nickname + " нет аккаунта.\n"
               }
           }
           bot({text: gone})
           })
		},
		desc: "права <ПРАВА> -- выдать права пользователю",
		rights: 7,
		type: "all",
		typ: "prosto"
}
function like(text, ym){
	var lik = num(text*ym)
	return lik
}