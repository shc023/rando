var Reflux = require('reflux');
var Actions = require('./actions');

var store = Reflux.createStore({
    listenables: [Actions],
    init: function() {
    	try {
    		this.user = JSON.parse(localStorage.getItem('user'));    		
    	} catch(e) {
    		this.user = null;
    	}
    },
    setUser: function(user) {
        this.user = user;
        console.log(this.user);
        localStorage.setItem('user', JSON.stringify(user));
        this.trigger(this.user);
    },
    getInitialState: function() {
    	return this.user;
    }
});

module.exports = store;