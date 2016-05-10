var express = require('express');
var sockets = require('./rtc-sockets');
var uuid = require('node-uuid');
var app = express();

var MatchingQueue = require('./modules/matching-queue');

app.use('/', express.static('public'));

/** Signaling server **/
var sigServer = app.listen(9001);

sockets(sigServer, {
	rooms: {
		maxClients: 2
	},
	turnservers: [],
	stunservers: []
});

/** App server **/

var appServer = app.listen(9000);
var io = require('socket.io')(appServer);

console.log('server started...');

io.on('connection', function(socket){

	var user = JSON.parse(socket.handshake.query.user);
	console.log(user.name + ' from ' + user.city + ' connected');

	user.id = uuid();
	user.socket = socket;

	MatchingQueue.match(user);
});
