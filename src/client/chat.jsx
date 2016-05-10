var React = require('react');
var Reflux = require('reflux');
var User = require('./stores/user');

var Row = require('react-bootstrap/lib/row');
var Col = require('react-bootstrap/lib/col');

var SimpleWebRTC = require('simplewebrtc');
var io = require('socket.io-client');

var styles = {
	largeVideo: {
		width: '100%'
	},
	smallVideo: {
		width: '100%',
		border: '2px solid lightgray',
    	borderRadius: '4px'
	},
	container: {
		position: 'relative'
	}
};

module.exports = React.createClass({
	displayName: 'App',
  	mixins: [Reflux.connect(User.store, 'user')],
	webrtcSession: null,
	eventSocket: null,
	getInitialState: function(){
		return {
			chatting: false,
			other: null
		};
	},
	componentDidMount: function(){
		var self = this;
		this.webrtcSession = new SimpleWebRTC({
			media: {"audio": true, "video": {"optional": [{"minWidth": "1280"}, {"minHeight": "720"}], "mandatory": {}}},
		    // the id/element dom element that will hold "our" video
		    localVideoEl: 'local-video',
		    // the id/element dom element that will hold remote videos
		    remoteVideosEl: 'remote-video',
		    // immediately ask for camera access
		    autoRequestMedia: true,
		    // url: window.location.hostname+':9001'
		    url: window.location.hostname+':9001'
		});

		// we have to wait until it's ready
		// TODO: move this to another function?
		this.webrtcSession.on('readyToCall', function () {
			self.eventSocket = io('', {query: 'user=' + JSON.stringify(self.state.user)});

			self.eventSocket.on('matched', function(other){
			  self.webrtcSession.joinRoom(other.room);  
			  self.setState({
			  	other: other,
			  	chatting:true
			  });
			});
		});
	},
    render: function(){
    	return 	<Row>
    				<Col lg={8} style={{padding:15}}>
    					<Col lg={12}>
	    					<div id="remote-video">
					    	</div>
					    </Col>
					    <Col lg={4}>
					    	<video id="local-video" style={styles.smallVideo}></video>
					    </Col>
    				</Col>
			    </Row>

        // return 	<Row>
        // 			<Col lg={8}>
				    // 	<video id="local-video" style={
				    // 		this.state.chatting ? styles.smallVideo : styles.largeVideo
				    // 	}></video>
		      //   		<div id="video-module-container" styles={styles.container}>
					   //  	<div id="remote-video" style={styles.largeVideo}></div>
		      //   		</div>
	       //  		</Col>
	       //  		<Col lg={4}>
	       //  			Test
	       //  		</Col>
	       //  	</Row>
    }
});