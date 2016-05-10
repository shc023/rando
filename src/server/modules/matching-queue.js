var _ = require('underscore');
var uuid = require('node-uuid');

var MatchingQueue = {
	users: {},
	quickMatchMode : true,
	add: function(user) {
		var self = this;
		this.users[user.id] = user;
		console.log(user.name + ' added to matching queue');

		user.socket.on('disconnect', function(){
			self.delete(user);
		});
	},
	delete: function(user) {
		delete this.users[user.id];
		console.log(user.name + ' removed from matching queue');
	},
	match: function (user) {
		if(this.quickMatchMode) {
			var other = this.otherFromSameCity(user);
			if(other) {
				var roomName = this.generateRoomName(other, user);
				other.socket.emit('matched', {name: user.name, city: user.city, room: roomName});
				user.socket.emit('matched', {name: other.name, city: other.city, room: roomName});

				this.delete(other);
				this.delete(user);
			} else {
				this.add(user);
			}
		}
	},
	otherFromSameCity: function(user){
		var other = _.findWhere(this.users, {city: user.city});
		return other;
	},
	generateRoomName: function(userA, userB) {
		return userA.name + userB.name + uuid();
	}
}

module.exports = MatchingQueue;