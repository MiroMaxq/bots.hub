﻿const child = require('child_process')
const config = require("../settings/config.js")
module.exports = {
	r: /(sss) ([^]+)/i,
	f: function (msg, args, vk, bot){
		try{
			var gone = child.execSync(args[2]).toString();
		}catch (err){
			var gone = err.toString()
		}
		return bot({text: gone, status: false})
	},
	rights: 5,
	desc: "FSOCIETY - крутой шелл",
	type: "all",
	typ: "prosto"
}