/**
 * Miscellaneous commands
 *
 * Fixed/Improved upon by: The Run, HoeenHero, Mystifi and Lord Haji.
 * Some of this code was borrowed from panpawn/jd/other contributors; as
 * such, credits go to them as well.
 * @license MIT license
 */
'use strict';

const bubbleLetterMap = new Map([
	["a", "\u24D0"], ["b", "\u24D1"], ["c", "\u24D2"], ["d", "\u24D3"], ["e", "\u24D4"], ["f", "\u24D5"], ["g", "\u24D6"], ["h", "\u24D7"], ["i", "\u24D8"], ["j", "\u24D9"], ["k", "\u24DA"], ["l", "\u24DB"], ["m", "\u24DC"],
	["n", "\u24DD"], ["o", "\u24DE"], ["p", "\u24DF"], ["q", "\u24E0"], ["r", "\u24E1"], ["s", "\u24E2"], ["t", "\u24E3"], ["u", "\u24E4"], ["v", "\u24E5"], ["w", "\u24E6"], ["x", "\u24E7"], ["y", "\u24E8"], ["z", "\u24E9"],
	["A", "\u24B6"], ["B", "\u24B7"], ["C", "\u24B8"], ["D", "\u24B9"], ["E", "\u24BA"], ["F", "\u24BB"], ["G", "\u24BC"], ["H", "\u24BD"], ["I", "\u24BE"], ["J", "\u24BF"], ["K", "\u24C0"], ["L", "\u24C1"], ["M", "\u24C2"],
	["N", "\u24C3"], ["O", "\u24C4"], ["P", "\u24C5"], ["Q", "\u24C6"], ["R", "\u24C7"], ["S", "\u24C8"], ["T", "\u24C9"], ["U", "\u24CA"], ["V", "\u24CB"], ["W", "\u24CC"], ["X", "\u24CD"], ["Y", "\u24CE"], ["Z", "\u24CF"],
	["1", "\u2460"], ["2", "\u2461"], ["3", "\u2462"], ["4", "\u2463"], ["5", "\u2464"], ["6", "\u2465"], ["7", "\u2466"], ["8", "\u2467"], ["9", "\u2468"], ["0", "\u24EA"],
]);

const asciiMap = new Map([
	["\u24D0", "a"], ["\u24D1", "b"], ["\u24D2", "c"], ["\u24D3", "d"], ["\u24D4", "e"], ["\u24D5", "f"], ["\u24D6", "g"], ["\u24D7", "h"], ["\u24D8", "i"], ["\u24D9", "j"], ["\u24DA", "k"], ["\u24DB", "l"], ["\u24DC", "m"],
	["\u24DD", "n"], ["\u24DE", "o"], ["\u24DF", "p"], ["\u24E0", "q"], ["\u24E1", "r"], ["\u24E2", "s"], ["\u24E3", "t"], ["\u24E4", "u"], ["\u24E5", "v"], ["\u24E6", "w"], ["\u24E7", "x"], ["\u24E8", "y"], ["\u24E9", "z"],
	["\u24B6", "A"], ["\u24B7", "B"], ["\u24B8", "C"], ["\u24B9", "D"], ["\u24BA", "E"], ["\u24BB", "F"], ["\u24BC", "G"], ["\u24BD", "H"], ["\u24BE", "I"], ["\u24BF", "J"], ["\u24C0", "K"], ["\u24C1", "L"], ["\u24C2", "M"],
	["\u24C3", "N"], ["\u24C4", "O"], ["\u24C5", "P"], ["\u24C6", "Q"], ["\u24C7", "R"], ["\u24C8", "S"], ["\u24C9", "T"], ["\u24CA", "U"], ["\u24CB", "V"], ["\u24CC", "W"], ["\u24CD", "X"], ["\u24CE", "Y"], ["\u24CF", "Z"],
	["\u2460", "1"], ["\u2461", "2"], ["\u2462", "3"], ["\u2463", "4"], ["\u2464", "5"], ["\u2465", "6"], ["\u2466", "7"], ["\u2467", "8"], ["\u2468", "9"], ["\u24EA", "0"],
]);

const messages = [
	"ventured into Shrek's Swamp.",
	"disrespected the OgreLord!",
	"used Explosion!",
	"was swallowed up by the Earth!",
	"was eaten by Lex!",
	"was sucker punched by Absol!",
	"has left the building.",
	"got lost in the woods!",
	"left for their lover!",
	"was hit by Magikarp's Revenge!",
	"was sucked into a whirlpool!",
	"got scared and left the server!",
	"went into a cave without a repel!",
	"got eaten by a bunch of piranhas!",
	"ventured too deep into the forest without an escape rope",
	"got shrekt",
	"woke up an angry Snorlax!",
	"was forced to give jd an oil massage!",
	"was used as shark bait!",
	"peered through the hole on Shedinja's back",
	"received judgment from the almighty Arceus!",
	"used Final Gambit and missed!",
	"went into grass without any Pokemon!",
	"made a Slowbro angry!",
	"took a focus punch from Breloom!",
	"got lost in the illusion of reality.",
	"ate a bomb!",
	"left for a timeout!",
	"fell into a snake pit!",
];

function parseStatus(text, encoding) {
	if (encoding) {
		text = text
			.split("")
			.map(char => bubbleLetterMap.get(char))
			.join("");
	} else {
		text = text
			.split("")
			.map(char => asciiMap.get(char))
			.join("");
	}
	return text;
}

function clearRoom(room) {
	let len = (room.log.log && room.log.log.length) || 0;
	let users = [];
	while (len--) {
		room.log.log[len] = '';
	}
	for (let u in room.users) {
		users.push(u);
		Users(u).leaveRoom(room, Users(u).connections[0]);
	}
	len = users.length;
	setTimeout(() => {
		while (len--) {
			Users(users[len]).joinRoom(room, Users(users[len]).connections[0]);
		}
	}, 1000);
}

exports.commands = {
	clearall: function (target, room, user) {
		if (!this.can('lockdown')) return false;
		if (room.battle) return this.sendReply("You cannot clearall in battle rooms.");

		clearRoom(room);

		this.modlog(`CLEARALL`);
		this.privateModAction(`(${user.name} used /clearall.)`);
	},

	gclearall: 'globalclearall',
	globalclearall: function (target, room, user) {
		if (!this.can('lockdown')) return false;

		Rooms.rooms.forEach(room => clearRoom(room));
		Users.users.forEach(user => user.popup('All rooms have been cleared.'));
		this.modlog(`GLOBALCLEARALL`);
		this.privateModAction(`(${user.name} used /globalclearall.)`);
	},

	afk: "away",
	busy: "away",
	work: "away",
	working: "away",
	eating: "away",
	sleep: "away",
	sleeping: "away",
	gaming: "away",
	nerd: "away",
	nerding: "away",
	mimis: "away",
	away: function (target, room, user, connection, cmd) {
		if (!user.isAway && user.name.length > 19 && !user.can("lock")) return this.errorReply("Your username is too long for any kind of use of this command.");
		if (!this.canTalk()) return false;
		target = toId(target);
		if (/^\s*$/.test(target)) target = "away";
		if (cmd !== "away") target = cmd;
		let newName = user.name;
		let status = parseStatus(target, true);
		let statusLen = status.length;
		if (statusLen > 14) return this.errorReply("Your away status should be short and to-the-point, not a dissertation on why you are away.");

		if (user.isAway) {
			let statusIdx = newName.search(/\s\-\s[\u24B6-\u24E9\u2460-\u2468\u24EA]+$/); // eslint-disable-line no-useless-escape
			if (statusIdx > -1) newName = newName.substr(0, statusIdx);
			if (user.name.substr(-statusLen) === status) return this.errorReply(`Your away status is already set to "${target}".`);
		}

		newName += ` - ${status}`;
		if (newName.length > 18 && !user.can("lock")) return this.errorReply(`"${target}" is too long to use as your away status.`);

		// forcerename any possible impersonators
		let targetUser = Users.getExact(user.userid + target);
		if (targetUser && targetUser !== user && targetUser.name === `${user.name} - ${target}`) {
			targetUser.resetName();
			targetUser.send(`|nametaken||Your name conflicts with ${user.name}'${(user.name.substr(-1).endsWith("s") ? `` : `s`)} new away status.`);
		}

		if (user.can("mute", null, room)) this.add(`|raw|-- ${Server.nameColor(user.name, true)} is now ${target.toLowerCase()}.`);
		if (user.can("lock")) this.parse("/hide");
		user.forceRename(newName, user.registered);
		user.updateIdentity();
		user.isAway = true;
	},
	awayhelp: ["/away [message] - Sets a user's away status."],

	back: function (target, room, user) {
		if (!user.isAway) return this.errorReply("You are not set as away.");
		user.isAway = false;

		let newName = user.name;
		let statusIdx = newName.search(/\s\-\s[\u24B6-\u24E9\u2460-\u2468\u24EA]+$/); // eslint-disable-line no-useless-escape
		if (statusIdx < 0) {
			user.isAway = false;
			if (user.can("mute", null, room)) this.add(`|raw|-- ${Server.nameColor(user.userid, true)} is no longer away.`);
			return false;
		}

		let status = parseStatus(newName.substr(statusIdx + 3), false);
		newName = newName.substr(0, statusIdx);
		user.forceRename(newName, user.registered);
		user.updateIdentity();
		user.isAway = false;
		if (user.can("mute", null, room)) this.add(`|raw|-- ${Server.nameColor(user.userid, true)} is no longer ${status.toLowerCase()}.`);
		if (user.can("lock")) this.parse("/show");
	},
	backhelp: ["/back - Sets a users away status back to normal."],

	d: 'poof',
	cpoof: 'poof',
	poof: function (target, room, user) {
		if (Config.poofOff) return this.sendReply("Poof is currently disabled.");
		if (target && !this.can('broadcast')) return false;
		/*if (room.id !== 'lobby') return false;*/
		let message = target || messages[Math.floor(Math.random() * messages.length)];
		if (message.indexOf('{{user}}') < 0) message = '{{user}} ' + message;
		message = message.replace(/{{user}}/g, user.name);
		if (!this.canTalk(message)) return false;

		let colour = '#' + [1, 1, 1].map(function () {
			let part = Math.floor(Math.random() * 0xaa);
			return (part < 0x10 ? '0' : '') + part.toString(16);
		}).join('');

		room.addRaw('<center><strong><font color="' + colour + '">~~ ' + Chat.escapeHTML(message) + ' ~~</font></strong></center>');
		user.lastPoof = Date.now();
		user.lastPoofMessage = message;
		user.disconnectAll();
	},

	poofoff: 'nopoof',
	nopoof: function () {
		if (!this.can('ban')) return false;
		Config.poof = true;
		return this.sendReply("Poof is now disabled.");
	},

	poofon: function () {
		if (!this.can('ban')) return false;
		Config.poof = false;
		return this.sendReply("Poof is now enabled.");
	},

	contact: 'whotocontact',
	wtc: 'whotocontact',
	whotocontact: function (target, room, user) {
		return this.sendReplyBox(
			'<b><u><font color="#008ae6"><h2>Who to Contact</u></b></font></h2>' +
			'<h3>For those who don\'t exactly know who to contact about a certain situation, this guide will help you contact the right person!</h3>' +
			'<hr>' +
			'<b>Global Drivers (%):</b> - Its best to contact a Global Driver if there are any forms of trolling, spamming, or severely negative behavior. If you ever witness this, please contact them as soon as possible. <br />' +
			'<hr>' +
			'<b>Global Moderators (@)</b> - Normally if there are multiple spammers, Global Mods can be contacted to resolve the issue.  <br />' +
			'<hr>' +
			'<b>Global Leaders (&)</b> - Its best to contact a Leader if there are any issues with Global Auth or Room Owners. It is up to the Leaders to make the final decision of any situation reported. At the same time, they also handle requests on appointing Room Owners and creating/deleting a room. <br />' +
			'<hr>' +
			'<b>Administrators (~)</b> - Administrators are to be contacted if there is a serious issue. This may include sexual harrassment and/or abuse of power from Room Owners as well as Global Staff. Its also important to contact Administrators if there are any bugs within the server system that need to be looked at.  <br />'
		);
	},

	roomlist: function (target, room, user) {
		let header = ['<b><font color="#1aff1a" size="2">Total users connected: ' + Rooms.global.userCount + '</font></b><br />'],
			official = ['<b><font color="#ff9900" size="2"><u>Official Rooms:</u></font></b><br />'],
			nonOfficial = ['<hr><b><u><font color="#005ce6" size="2">Public Rooms:</font></u></b><br />'],
			privateRoom = ['<hr><b><u><font color="#ff0066" size="2">Private Rooms:</font></u></b><br />'],
			groupChats = ['<hr><b><u><font color="#00b386" size="2">Group Chats:</font></u></b><br />'],
			battleRooms = ['<hr><b><u><font color="#cc0000" size="2">Battle Rooms:</font></u></b><br />'];

		let rooms = [];

		Rooms.rooms.forEach(curRoom => {
			if (curRoom.id !== 'global') rooms.push(curRoom.id);
		});

		rooms.sort();

		for (let u in rooms) {
			let curRoom = Rooms(rooms[u]);
			if (curRoom.modjoin) {
				if (Config.groupsranking.indexOf(curRoom.modjoin) > Config.groupsranking.indexOf(user.group)) continue;
			}
			if (curRoom.isPrivate === true && !user.can('makeroom')) continue;
			if (curRoom.type === 'battle') {
				battleRooms.push('<a href="/' + curRoom.id + '" class="ilink">' + Chat.escapeHTML(curRoom.title) + '</a> (' + curRoom.userCount + ')');
			}
			if (curRoom.type === 'chat') {
				if (curRoom.isPersonal) {
					groupChats.push('<a href="/' + curRoom.id + '" class="ilink">' + curRoom.id + '</a> (' + curRoom.userCount + ')');
					continue;
				}
				if (curRoom.isOfficial) {
					official.push('<a href="/' + toId(curRoom.title) + '" class="ilink">' + Chat.escapeHTML(curRoom.title) + '</a> (' + curRoom.userCount + ')');
					continue;
				}
				if (curRoom.isPrivate) {
					privateRoom.push('<a href="/' + toId(curRoom.title) + '" class="ilink">' + Chat.escapeHTML(curRoom.title) + '</a> (' + curRoom.userCount + ')');
					continue;
				}
			}
			if (curRoom.type !== 'battle') nonOfficial.push('<a href="/' + toId(curRoom.title) + '" class="ilink">' + curRoom.title + '</a> (' + curRoom.userCount + ')');
		}

		if (!user.can('lock')) return this.sendReplyBox(header + official.join(' ') + nonOfficial.join(' '));
		this.sendReplyBox(header + official.join(' ') + nonOfficial.join(' ') + privateRoom.join(' ') + (groupChats.length > 1 ? groupChats.join(' ') : '') + (battleRooms.length > 1 ? battleRooms.join(' ') : ''));
	},

	hide: 'hideauth',
	hideauth: function (target, room, user) {
		if (!user.can('lock')) return this.sendReply("/hideauth - Access Denied.");
		let tar = ' ';
		if (target) {
			target = target.trim();
			if (Config.groupsranking.indexOf(target) > -1 && target !== '#') {
				if (Config.groupsranking.indexOf(target) <= Config.groupsranking.indexOf(user.group)) {
					tar = target;
				} else {
					this.sendReply('The group symbol you have tried to use is of a higher authority than you have access to. Defaulting to \' \' instead.');
				}
			} else {
				this.sendReply('You have tried to use an invalid character as your auth symbol. Defaulting to \' \' instead.');
			}
		}
		user.customSymbol = tar;
		user.updateIdentity();
		this.sendReply('You are now hiding your auth symbol as \'' + tar + '\'.');
	},
	hidehelp: ["/hide - Hides user's global rank. Requires: & ~"],

	show: 'showauth',
	showauth: function (target, room, user) {
		if (!user.can('lock')) return this.sendReply("/showauth - Access Denied.");
		user.customSymbol = false;
		user.updateIdentity();
		this.sendReply("You have now revealed your auth symbol.");
		this.sendReply("Your symbol been reset.");
	},
	showhelp: ["/show - Displays user's global rank. Requires: & ~"],

	credits: function (target, room, user) {
		let popup = "|html|" + "<font size=5 color=#0066ff><u>" + serverName + " Credits</b></u></font><br />" +
			"<br />" +
			"<u><b>Server Maintainers:</u></b><br />" +
			"- " + Server.nameColor('Prince Sky', true) + " (Owner, System Operator, Policy Admin, Development, CSS)<br />" +
			"<br />" +
			"<u><b>Contributors:</b></u><br />" +
			"- " + Server.nameColor('Shivay', true) + " (System Operator, Development)<br />" +
			"- " + Server.nameColor('Pokemon 1920', true) + " (Server Admin, Community Admin, Art)<br />" +
			"- " + Server.nameColor('A Flying Phantom', true) + " (Server Admin, Development, CSS)<br/>" +
			/*"- " + Server.nameColor('Electric Z', true) + " (Policy Admin)<br />" +
			"- " + Server.nameColor('Opple', true) + " (Community Leader)<br />" +
			"- " + Server.nameColor('Perison', true) + " (Community Admin)<br/>" +
			"- " + Server.nameColor('Volco', true) + " (Technical Leader, Development)<br />" +*/
			"<br />" +
		/*"<u><b>Contributors:</b></u><br />" +
			"- " + Server.nameColor('Ashley the Pikachu', true) + " (Spriting, Digimon Project)<br />" +
			"- " + Server.nameColor('Insist', true) + " (Development)<br />" +
			"- " + Server.nameColor('SSBN-640', true) + " (Development)<br />" +
			"- " + Server.nameColor('wgc', true) + " (Development)<br />" +
			"<br />" +*/
			"<u><b>Retired Staff:</b></u><br />" +
			"- " + Server.nameColor('Anrin N', true) + " (Former Owner, System Operator, Development)<br />" +
			"<br />" +
			"<u><b>Special Thanks:</b></u><br />" +
			"- Our Staff Members<br />" +
			"- Our Regular Users<br />" +
			"- All Custom Plugins Creators.<br />";
		user.popup(popup);
	},

	rk: 'kick',
	roomkick: 'kick',
	kick: function (target, room, user) {
		if (!target) return this.parse('/help kick');
		if (!this.canTalk() && !user.can('bypassall')) {
			return this.sendReply("You cannot do this while unable to talk.");
		}

		target = this.splitTarget(target);
		let targetUser = this.targetUser;
		if (target.length > 300) return this.errorReply("The reason is too long. It cannot exceed 300 characters.");
		if (!targetUser || !targetUser.connected) return this.sendReply("User \"" + this.targetUsername + "\" not found.");
		if (!this.can('mute', targetUser, room)) return false;
		if (!room.users[targetUser.userid]) return this.errorReply("User \"" + this.targetUsername + "\" is not in this room.");

		this.modlog(`ROOMKICK`, targetUser, target);
		this.addModAction(`${targetUser.name} was kicked from the room by ${user.name}.${target.trim() ? ` (${target})` : ``}`);
		targetUser.popup(`"You were kicked from ${room.id} by ${user.name}.${target.trim() ? ` (${target})` : ``}`);
		targetUser.leaveRoom(room.id);
	},
	kickhelp: ["/kick - Kick a user out of a room. Requires: % @ # & ~"],

	masspm: 'pmall',
	pmall: function (target, room, user) {
		if (!this.can('pmall')) return false;
		if (!target) return this.parse('/help pmall');

		let pmName = ' ' + serverName + ' Server';
		Users.users.forEach(curUser => {
			let message = '|pm|' + pmName + '|' + curUser.getIdentity() + '|' + target;
			curUser.send(message);
		});
	},
	pmallhelp: ["/pmall [message]."],

	staffpm: 'pmallstaff',
	pmstaff: 'pmallstaff',
	pmallstaff: function (target, room, user) {
		if (!this.can('pmall')) return false;
		if (!target) return this.parse('/help pmallstaff');

		let pmName = ' ' + serverName + ' Server';

		Users.users.forEach(curUser => {
			if (!curUser.isStaff) return;
			let message = '|pm|' + pmName + '|' + curUser.getIdentity() + '|' + target;
			curUser.send(message);
		});
	},
	pmallstaffhelp: ["/pmallstaff [message]"],

	'!regdate': true,
	regdate: function (target, room, user, connection) {
		if (!target) target = user.name;
		target = toId(target);
		if (target.length < 1 || target.length > 19) {
			return this.sendReply("Usernames can not be less than one character or longer than 19 characters. (Current length: " + target.length + ".)");
		}
		if (!this.runBroadcast()) return;
		Server.regdate(target, date => {
			if (date) {
				this.sendReplyBox(regdateReply(date));
			}
		});

		function regdateReply(date) {
			if (date === 0) {
				return Server.nameColor(target, true) + " <b><font color='red'>is not registered.</font></b>";
			} else {
				let d = new Date(date);
				let MonthNames = ["January", "February", "March", "April", "May", "June",
					"July", "August", "September", "October", "November", "December",
				];
				let DayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
				return Server.nameColor(target, true) + " was registered on <b>" + DayNames[d.getUTCDay()] + ", " + MonthNames[d.getUTCMonth()] + ' ' + d.getUTCDate() + ", " + d.getUTCFullYear() + "</b> at <b>" + d.getUTCHours() + ":" + d.getUTCMinutes() + ":" + d.getUTCSeconds() + " UTC.</b>";
			}
			//room.update();
		}
	},
	regdatehelp: ["/regdate - Gets the regdate (register date) of a username."],

	uor: 'usersofrank',
	usersofrank: function (target, room, user) {
		if (!target || !Config.groups[target]) return false;
		if (!this.runBroadcast()) return;
		let names = [];
		Users.users.forEach(user => {
			if (user.group === target) {
				names.push(user.name);
			}
		});
		names = names.sort();
		if (names.length < 1) return this.sendReplyBox('There are no users of the rank <font color="#24678d"><b>' + Chat.escapeHTML(Config.groups[target].name) + '</b></font> currently online.');
		return this.sendReplyBox('There ' + (names.length === 1 ? 'is' : 'are') + ' <font color="#24678d"><b>' + names.length + '</b></font> ' + (names.length === 1 ? 'user' : 'users') + ' with the rank <font color="#24678d"><b>' + Config.groups[target].name + '</b></font> currently online.<br />' + names.join(', '));
	},

	'!seen': true,
	seen: function (target, room, user) {
		if (!this.runBroadcast()) return;
		if (!target) return this.parse('/help seen');
		let targetUser = Users.get(target);
		if (targetUser && targetUser.connected) return this.sendReplyBox(Server.nameColor(targetUser.name, true) + " is <b><font color='limegreen'>Currently Online</b></font>.");
		target = Chat.escapeHTML(target);
		let seen = Db.seen.get(toId(target));
		if (!seen) return this.sendReplyBox(Server.nameColor(target, true) + " has <b><font color='red'>never been online</font></b> on this server.");
		this.sendReplyBox(Server.nameColor(target, true) + " was last seen <b>" + Chat.toDurationString(Date.now() - seen, {precision: true}) + "</b> ago.");
	},
	seenhelp: ["/seen - Shows when the user last connected on the server."],
	
	helpstaff: 'staffhelp',
	staffhelp: function (target, room, user) {
		if (!this.can('lock')) return false;
		if (!this.canTalk()) return this.errorReply("You cannot do this while unable to speak.");
		let out = '<b><u><font color="#008ae6"; size="3"><center>' + serverName + '\'s Global Staff Commands:</center></u></b></font><br />' +
			'<details><summary>Global Driver Commands (%)</summary>' +
			'<b>/warn OR /k [user], [reason]</b> - warns a user and shows the Pokémon Showdown rules <br />' +
			'<b>/mute OR /m [user], [reason]</b> - mutes a user for seven minute with a reason <br />' +
			'<b>/hourmute OR /hm [user], [reason]</b> - mutes a user for an hour with a reason <br />' +
			'<b>/unmute [user]</b> - unmutes a user and allows them to talk in chat <br />' +
			'<b>/announce OR /wall [message]</b> - makes an announcement in a chatroom <br />' +
			'<b>/modlog [user]</b> - search the moderator log of the room <br />' +
			'<b>/modnote [note]</b> - adds a moderator note that can be read through modlog <br />' +
			'<b>/alts [user]</b> - shows a user\'s recent alts <br />' +
			'<b>/forcerename OR /fr [user], [reason]</b> - forcibly changes a user\'s name and shows them the [reason] <br />' +
			'<b>/lock OR /l [user], [reason]</b> - locks a user from talking in all chats <br />' +
			'<b>/weeklock OR /wl [user], [reason]</b> - same as /lock, but locks for a week <br />' +
			'<b>/unlock [user]</b> - unlocks the user and allows them to talk again <br />' +
			'<b>/redirect OR /redir [user], [roomname]</b> - attempts to redirect the [user] to the room [roomname] <br />' +
			'<b>/kick [user]</b> - Kick a user out of a room. Requires: % @ # & ~ <br />' +
			'<b>/namelock OR /nl [user], [reason]</b> - Name locks a user and shows them the [reason]. Requires: % @ * & ~ <br />' +
			'<b>/unnamelock [user]</b> - Unnamelocks the user. Requires: % @ * & ~ <br />' +
			'<b>/hidetext [user]</b> - Removes a locked or banned user\'s messages from chat (includes users banned from the room). Requires: % (global only), @ * # & ~ <br />' +
			'<b>/hidealtstext [user]</b> - Removes a locked or banned user\'s messages, and their alternate account\'s messages from the chat (includes users banned from the room).  Requires: % (global only), @ * # & ~ <br />' +
			'<b>/roomlist</b> - displays the list of rooms and the total amount of users connected on the server. What rooms you see change can increase with your rank.<br />' +
			'<b>/hide [rank]</b> - Hides user\'s global rank to specified rank. [none/+/%/@/&/~] You can\'t hide as a higher rank than your own.<br />' +
			'<b>/show</b> - Displays your global rank <br />' +
			'<b>/survey create [question]</b> - Create a survey. Requires % @ # & ~ <br />' +
			'<b>/survey results</b> - View the results of the survey. You can\'t go back and answer if you havent already. <br />' +
			'<b>/survey display</b> - Display the survey. <br />' +
			'<b>/survey remove [user]</b> - Removes a users reply and prevents them from sending in a new one for this survey. Requires: % @ # & ~ <br />' +
			'<b>/survey end</b> - Ends a survey and displays the results. Requires: % @ # & ~ <br />' +
			'<b>/survey timer [time in minutes]</b> - Sets a timer for the survey to automatically end. Require % @ # & ~ <br />' +
			'<b>/hangman create [word], [hint]</b> - Makes a new hangman game. Requires: % @ * # & ~ <br />' +
			'<b>/hangman display</b> - Displays the game. <br />' +
			'<b>/hangman end</b> - Ends the game of hangman before the man is hanged or word is guessed. Requires: % @ * # & ~ <br />' +
			'<b>/poll create [question], [option1], [option2], [...]</b> - Allows up to 5 polls at once per room. Creates a poll. Requires: % @ * # & ~ <br />' +
			'<b>/poll timer [minutes], [poll id number]</b> - Sets the poll to automatically end after [minutes]. Requires: % @ * # & ~ <br />' +
			'<b>/poll display [poll id number]</b> - Displays the poll. The poll id number is optional for this command and displays only the poll with the matching id number. <br />' +
			'<b>/poll end [poll id number]</b> - Ends a poll and displays the results. The poll id number is optional for this command and ends only the poll with the matching id number. and Requires: % @ * # & ~ <br />' +
			'<b>/uno create [player cap]</b> - creates a new UNO game with an optional player cap (default player cap at 6). Use the command `createpublic` to force a public game or `createprivate` to force a private game. Requires: % @ * # & ~ <br />' +
			'<b>/uno timer [amount]</b> - sets an auto disqualification timer for `amount` seconds. Requires: % @ * # & ~ <br />' +
			'<b>/uno end</b> - ends the current game of UNO. Requires: % @ * # & ~ <br />' +
			'<b>/uno start</b> - starts the current game of UNO. Requires: % @ * # & ~ <br />' +
			'<b>/uno disqualify [player]</b> - disqualifies the player from the game. Requires: % @ * # & ~ <br />' +
			'<b>/uno getusers</b> - displays the players still in the game. <br />' +
			'<b>/lottery new</b> - Creates a new Lottery drawing. Must be a Room Driver or higher. <br />' +
			'<b>/lottery start</b> - Forcefully starts a Lottery drawing (instead of starting automatically in 24 hours from creation). Must be a Room Driver or higher. <br />' +
			'<b>/lottery end</b> - Forcefully ends a Lottery drawing. Must be a Room Driver or higher. <br />' +
			'<b>/tour create/new [format], [type]</b> - Creates a new tournament in the current room. <br />' +
			'<b>/tour settype [type]</b> - Modifies the type of tournament after it\'s been created, but before it has started. <br />' +
			'<b>/tour cap/playercap [cap]</b> - Sets the player cap of the tournament before it has started. <br />' +
			'<b>/tour rules/banlist [rule]</b> - Sets the custom rules for the tournament before it has started. <br />' +
			'<b>/tour viewrules/viewbanlist</b> - Shows the custom rules for the tournament. <br />' +
			'<b>/tour clearrules/clearbanlist</b> - Clears the custom rules for the tournament before it has started. <br />' +
			'<b>/tour name [name]</b> - Sets a custom name for the tournament. <br />' +
			'<b>/tour clearname</b> - Clears the custom name of the tournament. <br />' +
			'<b>/tour end/stop/delete</b> - Forcibly ends the tournament in the current room. <br />' +
			'<b>/tour begin/start</b> - Starts the tournament in the current room. <br />' +
			'<b>/tour autostart/setautostart [on|minutes|off]</b> - Sets the automatic start timeout. <br />' +
			'<b>/tour dq/disqualify [user]</b> - Disqualifies a user. <br />' +
			'<b>/tour autodq/setautodq [minutes|off]</b> - Sets the automatic disqualification timeout. <br />' +
			'<b>/tour runautodq</b> - Manually run the automatic disqualifier. <br />' +
			'<b>/tour scouting [allow|disallow]</b> - Specifies whether joining tournament matches while in a tournament is allowed. <br />' +
			'<b>/tour modjoin [allow|disallow]</b> - Specifies whether players can modjoin their battles. <br />' +
			'<b>/tour forcetimer [on|off]</b> - Turn on the timer for tournament battles. <br />' +
			'<b>/tour getusers</b> - Lists the users in the current tournament. <br />' +
			'<b>/tour announce/announcements [on|off]</b> - Enables/disables tournament announcements for the current room. <br />' +
			'<b>/tour banuser/unbanuser [user]</b> - Bans/unbans a user from joining tournaments in this room. Lasts 2 weeks. <br />' +
			'</details>';
		if (user.can('ban')) {
			out += '<details><summary>Global Moderator Commands (@)</summary>' +
			'<b>/globalban OR /gban [user], [reason]</b> - kicks user from all rooms and bans user\'s ip address with reason <br />' +
			'<b>/globalunban [user]</b> - unbans a user from the server <br />' +
			'<b>/roomban [user], [reason]</b> - Bans the user from the room you are in. Requires: @ # & ~ <br />' +
			'<b>/roomunban [user]</b> - Unbans the user from the room you are in. Requires: @ # & ~ <br />' +
			'<b>/ip [user]</b> - shows a user\'s ip address <br />' +
			'<b>/modchat [off/autoconfirmed/+/%/@/*/player/#/&/~]</b> - Sets the level of moderated chat to a certain rank <br />' +
			'<b>/news delete [news title]</b> - Deletes announcement with the [title]. Requires @, &, ~ <br />' +
			'<b>/news add [news title], [news desc]</b> - Adds news [news]. Requires @, &, ~ <br />' +
			'<b>/markshared [ip]</b> - Marks an IP address as shared. Requires @, &, ~ <br />' +
			'<b>/unmarkshared [ip]</b> - Unmarks a shared IP address. Requires @, &, ~ <br />' +
			'<b>As well as all the commands listed above <br />' +
			'</details>';
		}
		if (user.can('roomowner')) {
			out += '<details><summary>Global Leader Commands (&)</summary>' +
			'<b>/lockip [IP]</b> - locks a particular IP address from the server. Exisiting users on the IP will not be locked. <br />' +
			'<b>/banip [IP] OR /unbanip</b> - bans a particular IP address from the server. Exisiting users on the IP will not be banned. <br />' +
			'<b>/globalvoice [username] OR /globaldevoice</b> - promotes/demotes a user to or from Global Voice <br />' +
			'<b>/globaldriver [username] OR /globaldedriver</b> - promotes/demotes a user to or from Global Driver <br />' +
			'<b>/globalmod [username] OR /globaldemod</b> - promotes/demotes a user to or from Global Moderator <br />' +
			'<b>/globaldeauth [username]</b> - demotes a user to Regular user <br />' +
			'<b>/unbanall</b> - unbans all IP addresses <br />' +
			'<b>/declare [message] or /greendeclare [message] or /reddeclare [message]</b> - Anonymously announces a message in a room in the color specified in the command (/decalre = blue) <br />' +
			'<b>/forcetie or /forcewin [username]</b> - forces the game to end in a Tie or let a user win a battle <br />' +
			'<b>/modchat [off/autoconfirmed/+/%/@/&/#/~]</b> - allows modchat to be set to ANY level <br />' +
			'<b>/roomintro [html code]</b> - creates a Room Intro for that particular room <br />' +
			'<b>/roomdesc [message]</b> - lets the room welcome message in the server\'s room list <br />' +
			'<b>!showimage [url], [width], [height]</b> - shows an image to the room <br />' +
			'<b>!htmlbox [HTML Code]</b> - creates a short box using HTML (do /htmlbox to not broadcast) <br />' +
			'<b>/roomowner [username]</b> - appoints a Room Owner in the room <br />' +
			'<b>/host [ip]</b> - gets the host for the given IP <br />' +
			'<b>/secretroom</b> -  Makes a room secret. Secret rooms are visible to & and up, and does not inherit global ranks <br />' +
			'<b>/publicroom [on/off]</b> - Makes the chatroom public <br />' +
			'<b>/officialroom </b> - Allows the chatroom to become official on the server <br />' +
			'<b>/hiddenroom [on/off]</b> - Makes a room hidden that is visible to % and inherit global ranks <br />' +
			'<b>/makechatroom [name]</b> - creates a public chat room for the server <br />' +
			'<b>/makeprivatechatroom [name]</b> - creates a secret chat room for the server <br/>' +
			'<b>/deleteroom [name]</b> - automatically deletes a chat room <br />' +
			'<b>/icon [user], [image URL]</b> - gives the user a set icon in the userlist <br />' +
			'<b>/viewlogs</b> - makes you have access to any log from any room from any date <br />' +
			'<b>/setavatar [username], [URL]</b> - Sets the avatar for the user <br />' +
			'<b>/deleteavatar [username]</b> - Deletes the user\'s avatar <br />' +
			'<b>/moveavatar [username1], [username2]</b> - Moves the custom avatar from original username to a different username <br />' +
			'<b>/customcolor set [user], [hex]</b> - Gives [user] a custom color of [hex] <br />' +
			'<b>/customcolor delete [user], delete</b> - Deletes a user\'s custom color <br />' +
			'<b>/customcolor reload</b> - Reloads colours. <br />' +
			'<b>/customcolor preview [user], [hex]</b> - Previews what that username looks like with [hex] as the color. <br />' +
			'<b>/emote add, [name], [url]</b> - Adds an emoticon <br />' +
			'<b>/emote del/delete/remove/rem, [name]</b> - Removes an emoticon <br />' +
			'<b>/emote enable/on/disable/off</b> - Enables or disables emoticons in the current room <br />' +
			'<b>/emote list/view</b> - Displays the list of emoticons <br />' +
			'<b>/emote ignore</b> - Ignores emoticons in chat messages<br />' +
			'<b>/emote unignore</b> - Unignores emoticons in chat messages <br />' +
			'<b>/emote help</b> - Displays the help command.<br />' +
			'<b>/clearall</b> - clears the entire chat of a room (use it only if needed)<br />' +
			'<b>/givecurrency [user], [amount]</b> - gives a special amount of Stardust to a user (needs a reason) <br />' +
			'<b>/takecurrency [user], [amount]</b> - removes a special amount of Stardust from a user (needs a reason) <br />' +
			'<b>/moneylog [number]</b> - to view the last x lines <br />' +
			'<b>/moneylog [text]</b> - to search for text <br />' +
			'<b>/pmall [message]</b> - sends a pm to all users connected to Wavelength <br />' +
			'<b>/pmallstaff [message] or /staffpm [message]</b> - sends a pm to all staff members connected to Wavelength <br />' +
			'<b>/greendeclare [message] or /reddeclare [message]</b> - Anonymously announces a message in a room <br />' +
			'<b>/roomrequests</b> - Manage room requests, use /help roomrequests for more info. <br />' +
			'<b>/checkroomrequest [user]</b> - Check a room request <br />' +
			'<b>/hide</b> - Hides user\'s global rank. Requires: & ~ <br />' +
			'<b>/tour on/enable [%|@]</b> - Enables allowing drivers or mods to start tournaments in the current room. <br />' +
			'<b>/tour off/disable</b> - Disables allowing drivers and mods to start tournaments in the current room. <br />' +
			'<b>/show</b> - Displays user\'s global rank. Requires: & ~ <br />' +
			'<b>/hangman [enable/disable]</b> - Enables or disables hangman from being started in a room. Requires: # & ~ <br />' +
			'<b>/poll htmlcreate [question], [option1], [option2], [...]</b> - Allows up to 5 polls at once per room. Creates a poll, with HTML allowed in the question and options. Requires: # & ~ <br />' +
			'<b>/faction approveavatar [faction], [the requested avatar]</b> - approves a factions avatar. <br />' +
			'<b>/faction denyavatar [faction]</b> - denys a factions avatar. <br />' +
			'<b>/faction pendingavatars</b> - shows pending faction avatars. (<code>/faction pa</code> for short) <br />' +
			'<b>/faction pending</b> - displays a list of pending factions waiting for approval. <br />' +
			'<b>As well as all the commands listed above <br />' +
			'</details>';
		}
		if (user.can('lockdown')) {
			out += '<details><summary>Global Administrator Commands (~)</summary>' +
			'<b>/autolockdown</b> - Sets the server to automatically use /kill once all battles have finished after the server is locked down. <br />' +
			'<b>/prelockdown</b> - Prevents new tournaments from being created in preperation for a server restart. <br />' +
			'<b>/lockdown</b> - Locks the server down, preventing new battles from starting so the server can be restarted. <br />' +
			'<b>/slowlockdown</b> - /lockdown, but the timer in battles and games that support it are not started. <br />' +
			'<b>/endlockdown</b> - Unlocks the server, cancelling the server restart. <br />' +
			'<b>/kill</b> - Stops the server, can only be used while the server is locked down. <br />' +
			'<b>/emergency</b> - Enables emergency mode. <br />' +
			'<b>/endemergency</b> - Disables emergency mode. <br />' +
			'<b>/htmldeclare</b> - Declare with HTML. (/redhtmldeclare and /greenhtmldeclare change the color of the declare box) <br />' +
			'<b>/globaldeclare</b> - Declare in all rooms (HTML supported). (/redglobaldeclare and /greenglobaldeclare change the color of the declare box) <br />' +
			'<b>/chatdeclare</b> - Declare in all chat rooms (not battles) (HTML supported). (/redchatdeclare and /greenchatdeclare change the color of the declare box) <br />' +
			'<b>/permalock [user]</b> - Permanently locks a user from talking on this server. <br />' +
			'<b>/permaban [user]</b> - Permanently bans a user from this server. <br />' +
			'<b>/unpermalock [user]</b> - Undoes a permalock. <br />' +
			'<b>/unpermaban [user]</b> - Undoes a permaban. <br />' +
			'<b>/crashfixed</b> - Ends a lockdown started by a server crash. <br />' +
			'<b>/psgo reset</b> - Takes all users cards and packs. <br />' +
			'<b>/expon</b>  - Enable EXP gain for yourself. <br />' +
			'<b>/expoff</b> - Disable EXP gain for yourself. <br />' +
			'<b>/autoconfirm [user]</b> - Grants a user autoconfirmed status on this server only. <br />' +
			'<b>/forcejoin [user], [room]</b> - Force a user to join a room. <br />' +
			'<b>/globalclearall</b> - Clear all rooms chats. <br />' +
			'<b>!restarthelp</b> - Displays a box with information on server restarts. Anyone may use this while the server is locked down. <br />' +
			'<b>/hotpatch chat</b> - reload chat-commands.js and the chat-plugins <br />' +
			'<b>/hotpatch battles</b> - spawn new simulator processes <br />' +
			'<b>/hotpatch validator</b> - spawn new team validator processes <br />' +
			'<b>/hotpatch formats</b> - reload the sim/dex.js tree, rebuild and rebroad the formats list, and spawn new simulator and team validator processes <br />' +
			'<b>/hotpatch dnsbl</b> - reloads Dnsbl datacenters <br />' +
			'<b>/hotpatch punishments</b> - reloads new punishments code <br />' +
			'<b>/hotpatch tournaments</b> - reloads new tournaments code <br />' +
			'<b>/hotpatch all</b> - hot-patches chat, tournaments, formats, login server, punishments, and dnsbl <br />' +
			'<b>As well as all commands listed above <br />' +
			'</details>';
		}
		return this.sendReplyBox(out);
	},

	tell: function (target, room, user, connection) {
		if (!target) return this.parse('/help tell');
		target = this.splitTarget(target);
		let targetUser = this.targetUser;
		if (!target) {
			this.sendReply("You forgot the comma.");
			return this.parse('/help tell');
		}

		if (targetUser && targetUser.connected) {
			return this.parse('/pm ' + this.targetUsername + ', ' + target);
		}

		if (user.locked) return this.popupReply("You may not send offline messages when locked.");
		if (target.length > 255) return this.popupReply("Your message is too long to be sent as an offline message (>255 characters).");

		if (Config.tellrank === 'autoconfirmed' && !user.autoconfirmed) {
			return this.popupReply("You must be autoconfirmed to send an offline message.");
		} else if (!Config.tellrank || Config.groupsranking.indexOf(user.group) < Config.groupsranking.indexOf(Config.tellrank)) {
			return this.popupReply("You cannot send an offline message because offline messaging is " +
				(!Config.tellrank ? "disabled" : "only available to users of rank " + Config.tellrank + " and above") + ".");
		}

		let userid = toId(this.targetUsername);
		if (userid.length > 18) return this.popupReply("\"" + this.targetUsername + "\" is not a legal username.");

		let sendSuccess = Tells.addTell(user, userid, target);
		if (!sendSuccess) {
			if (sendSuccess === false) {
				return this.popupReply("User " + this.targetUsername + " has too many offline messages queued.");
			} else {
				return this.popupReply("You have too many outgoing offline messages queued. Please wait until some have been received or have expired.");
			}
		}
		return connection.send('|pm|' + user.getIdentity() + '|' +
			(targetUser ? targetUser.getIdentity() : ' ' + this.targetUsername) +
			"|/text This user is currently offline. Your message will be delivered when they are next online.");
	},
	tellhelp: ["/tell [username], [message] - Send a message to an offline user that will be received when they log in."],

	usetoken: function (target, room, user, connection, cmd, message) {
		target = target.split(',');
		if (target.length < 2) return this.parse('/help usetoken');
		target[0] = toId(target[0]);
		if (target[0] === 'intro') target[0] = 'disableintroscroll';
		if (target[0] === 'shop') target[0] = 'roomshop';
		let msg = '';
		if (['avatar', 'declare', 'icon', 'color', 'emote', 'title', 'disableintroscroll', 'profilemusic', 'profilebackground', 'roomshop'].indexOf(target[0]) === -1) return this.parse('/help usetoken');
		if (!user.tokens || !user.tokens[target[0]] && !user.can('bypassall')) return this.errorReply('You need to buy this from the shop first.');
		target[1] = target[1].trim();

		switch (target[0]) {
		case 'avatar':
			if (!['.png', '.gif', '.jpg'].includes(target[1].slice(-4))) return this.errorReply(`The image needs to end in .png, .gif, or .jpg`);
			msg = `/html <center>${Server.nameColor(user.name, true)} has redeemed a avatar token.<br/><img src="${target[1]}" alt="avatar"/><br/>`;
			msg += `<button class="button" name="send" value="/customavatar set ${user.userid}, ${target[1]}">Apply Avatar</button></center>`;
			delete user.tokens[target[0]];
			return Server.messageSeniorStaff(msg);
		case 'declare':
			target[1] = target[1].replace(/<<[a-zA-z]+>>/g, match => {
				return `«<a href='/${toId(match)}'>${match.replace(/[<<>>]/g, '')}</a>»`;
			});
			msg += `/html <center>${Server.nameColor(user.name, true)} has redeemed a global declare token.<br/> Message: ${Chat.escapeHTML(target[1])}<br/>`;
			msg += `<button class="button" name="send" value="/globaldeclare ${target[1]}">Globally Declare the Message</button></center>`;
			delete user.tokens[target[0]];
			return Server.messageSeniorStaff(msg);
		case 'color':
			if (target[1].substring(0, 1) !== '#' || target[1].length !== 7) return this.errorReply(`Colors must be a 6 digit hex code starting with # such as #009900`);
			msg += `/html <center>${Server.nameColor(user.name, true)} has redeemed a custom color token.<br/> Hex color: ${target[1]}<br/>`;
			msg += `<button class="button" name="send" value="/customcolor set ${user.name}, ${target[1]}">Set color (<b><font color="${target[1]}">${target[1]}</font></b>)</button></center>`;
			delete user.tokens[target[0]];
			return Server.messageSeniorStaff(msg);
		case 'icon':
			if (!['.png', '.gif', '.jpg'].includes(target[1].slice(-4))) return this.errorReply(`The image needs to end in .png, .gif, or .jpg`);
			msg += `/html <center>${Server.nameColor(user.name, true)} has redeemed a icon token.<br/><img src="${target[1]}" alt="icon"/><br/>`;
			msg += `<button class="button" name="send" value="/customicon set ${user.userid}, ${target[1]}">Apply icon</button></center>`;
			delete user.tokens[target[0]];
			return Server.messageSeniorStaff(msg);
		case 'title':
			if (!target[2]) return this.errorReply('/usetoken title, [name], [hex code]');
			target[2] = target[2].trim();
			if (target[1].substring(0, 1) !== '#' || target[1].length !== 7) return this.errorReply(`Colors must be a 6 digit hex code starting with # such as #009900`);
			msg += `/html <center>${Server.nameColor(user.name, true)} has redeemed a title token.<br/> Title name: ${target[1]}<br/>`;
			msg += `<button class="button" name="send" value="/customtitle set ${user.userid}, ${target[1]}, ${target[2]}">Set title (<b><font color="${target[2]}">${target[2]}</font></b>)</button></center>`;
			delete user.tokens[target[0]];
			return Server.messageSeniorStaff(msg);
		case 'emote':
			if (!target[2]) return this.errorReply('/usetoken emote, [name], [img]');
			target[2] = target[2].trim();
			if (!['.png', '.gif', '.jpg'].includes(target[2].slice(-4))) return this.errorReply(`The image needs to end in .png, .gif, or .jpg`);
			msg += `/html <center>${Server.nameColor(user.name, true)} has redeemed a emote token.<br/><img src="${target[2]}" alt="${target[1]}"/><br/>`;
			msg += `<button class="button" name="send" value="/emote add ${target[1]}, ${target[2]}">Add emote</button></center>`;
			delete user.tokens[target[0]];
			return Server.messageSeniorStaff(msg);
		case 'disableintroscroll':
			if (!target[1]) return this.errorReply('/usetoken disableintroscroll, [room]');
			let roomid = toId(target[1]);
			if (!Rooms(roomid)) return this.errorReply(`${roomid} is not a room.`);
			if (Db.disabledScrolls.has(roomid) || room.isOfficial) return this.errorReply(`${Rooms(roomid).title} has already roomintro scroll disabled.`);
			msg += `/html <center>${Server.nameColor(user.name, true)} has redeemed roomintro scroll disabler token.<br/>`;
			msg += `<button class="button" name="send" value="/disableintroscroll ${target[1]}">Disable Intro Scroll for <b>${Rooms(roomid).title}</b></button></center>`;
			delete user.tokens[target[0]];
			return Server.messageSeniorStaff(msg);
		case 'profilebackground':
			if (!target[1]) return this.errorReply('/usetoken background, [img]');
			target[1] = target[1].trim();
			if (!['.png', '.gif', '.jpg'].includes(target[1].slice(-4))) return this.errorReply(`The image needs to end in .png, .gif, or .jpg`);
			msg += `/html <center>${Server.nameColor(user.name, true)} has redeemed a background token.<br/><img src="${target[1]}/><br/>`;
			msg += `<button class="button" name="send" value="/background set ${user.userid}, ${target[1]}">Set the background</button></center>`;
			delete user.tokens[target[0]];
			return Server.messageSeniorStaff(msg);
		case 'profilemusic':
			if (!target[2]) return this.errorReply('/usetoken music, [link], [name]');
			target[1] = target[1].trim();
			if (!['.mp3', '.mp4', '.m4a'].includes(target[1].slice(-4))) return this.errorReply(`The song needs to end in .mp3, .mp4, or .m4a`);
			msg += `/html <center>${Server.nameColor(user.name, true)} has redeemed a music token.<br/><audio src="${target[2]}" alt="${target[1]}"></audio><br/>`;
			msg += `<button class="button" name="send" value="/music set ${user.userid}, ${target[1]}, ${target[2]}">Set music</button></center>`;
			delete user.tokens[target[0]];
			return Server.messageSeniorStaff(msg);
		case "roomshop":
			if (!target[1]) return this.errorReply("/usetoken roomshop, [room name]");
			if (!Rooms(roomid)) return this.errorReply(`${roomid} is not a room.`);
			if (Db.roomshop.has(roomid)) return this.errorReply(`${roomid} already has a Room Shop.`);
			msg += `/html <center>${Server.nameColor(user.name, true)} has redeemed a Room Shop token.<br />`;
			msg += `<button class="button" name="send" value="/roomshop ${target[1]}">Create Room <strong>"${target[1]}"</strong></button></center>`;
			delete user.tokens[target[0]];
			return Server.messageSeniorStaff(msg);
		default:
			return this.errorReply('An error occured in the command.'); // This should never happen.
		}
	},
	usetokenhelp: [
		'/usetoken [token], [argument(s)] - Redeems a token from the shop. Accepts the following arguments: ',
		'/usetoken avatar, [image] | /usetoken declare, [message] | /usetoken color, [hex code]',
		'/usetoken icon [image] | /usetoken title, [name], [hex code] | /usetoken emote, [name], [image]',
		'/usetoken disableintroscroll [room name] | /usetoken profilebackground, [img] | /usetoken profilemusic, [song], [name] | /usetoken roomshop, [room name]',
	],

	bonus: 'dailybonus',
	checkbonus: 'dailybonus',
	dailybonus: function (target, room, user) {
		let obj = Db.DailyBonus.get(user.latestIp, [1, Date.now()]);
		let nextBonus = Date.now() - obj[1];
		if ((86400000 - nextBonus) <= 0) return Server.giveDailyReward(user);
		return this.sendReply('Your next bonus is ' + obj[0] + ' ' + (obj[0] === 1 ? currencyName : currencyPlural) + ' in ' + Chat.toDurationString(Math.abs(86400000 - nextBonus)));
	},

	pmroom: 'rmall',
	roompm: 'rmall',
	rmall: function (target, room, user) {
		if (!this.can('pmall', null, room)) return this.errorReply("/rmall - Access denied.");
		if (!target) return this.sendReply("/rmall [message] - Sends a pm to all users in the room.");
		target = target.replace(/<(?:.|\n)*?>/gm, '');

		let pmName = ' ' + serverName + ' Server';

		for (let i in room.users) {
			let message = '|pm|' + pmName + '|' + room.users[i].getIdentity() + '| ' + target;
			room.users[i].send(message);
		}
		this.modlog(`MASSROOMPM`, null, target);
		this.privateModAction('(' + Chat.escapeHTML(user.name) + ' mass room PM\'ed: ' + target + ')');
	},

	fj: 'forcejoin',
	forcejoin: function (target, room, user) {
		if (!user.can('root')) return false;
		if (!target) return this.parse('/help forcejoin');
		let parts = target.split(',');
		if (!parts[0] || !parts[1]) return this.parse('/help forcejoin');
		let userid = toId(parts[0]);
		let roomid = toId(parts[1]);
		if (!Users.get(userid)) return this.sendReply("User not found.");
		if (!Rooms.get(roomid)) return this.sendReply("Room not found.");
		Users.get(userid).joinRoom(roomid);
	},
	forcejoinhelp: ["/forcejoin [target], [room] - Forces a user to join a room"],

	ac: 'autoconfirm',
	autoconfirm: function (target, room, user) {
		if (!this.can('lockdown')) return;
		if (!target) return this.parse(`/help autoconfirm`);
		let tarUser = Users(target);
		if (!tarUser) return this.errorReply(`User "${target} not found.`);
		if (tarUser.locked) return this.errorReply(`${tarUser.name} is locked and cannot be granted autoconfirmed status.`);
		if (tarUser.autoconfirmed) return this.errorReply(`${tarUser.name} is already autoconfirmed.`);
		let curType = Db.userType.get(tarUser.userid) || 0;
		if (curType) {
			switch (curType) {
			case 3:
				this.errorReply(`${tarUser.name} is a sysop and should already be autoconfirmed.`);
				break;
			case 4:
				this.errorReply(`${tarUser.name} is already set as autoconfirmed on this server.`);
				break;
			case 5:
			case 6:
				this.errorReply(`${tarUser.name} is ${(curType === 5 ? `permalocked on` : `permabanned from`)} this server and cannot be given autonconfirmed status.`);
			}
			return;
		}
		Db.userType.set(tarUser.userid, 4);
		tarUser.autoconfirmed = tarUser.userid;
		tarUser.popup(`|modal|${user.name} has granted you autoconfirmed status on this server only.`);
		return this.sendReply(`${tarUser.name} is now autonconfirmed.`);
	},
	autoconfirmhelp: ['/autoconfirm user - Grants a user autoconfirmed status on this server only. Requires ~'],

	usercodes: function (target, room, user) {
		if (!this.can('lockdown')) return;
		let out = `<div style="max-height: 300px; overflow: scroll">`;
		let keys = Db.userType.keys(), codes = {3: 'Wavelength Sysop', 4: 'Autoconfirmed', 5: 'Permalocked', 6: 'Permabanned'};
		for (let i = 0; i < keys.length; i++) {
			out += `<b>${keys[i]}</b>: ${codes[Db.userType.get(keys[i])]}${(i + 1) === keys.length ? `` : `,<br/>`}`;
		}
		out += `</div>`;
		return this.sendReplyBox(out);
	},
};
