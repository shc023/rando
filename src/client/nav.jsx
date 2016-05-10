var React = require('react');

var M = require('material-ui/lib');
M.Subheader = require('material-ui/lib/Subheader');

var Row = require('react-bootstrap/lib/row');
var Col = require('react-bootstrap/lib/col');

var Reflux = require('reflux');
var User = require('./stores/user');

module.exports = React.createClass({
  mixins: [Reflux.connect(User.store, 'user')],
	getInitialState: function(){
		return {
			open: false
		};
	},
	toggle: function() {
		this.setState({open: !this.state.open});
	},
	render: function () {
		return 	<div>
							<M.AppBar 
	              title="App Name"
	              onLeftIconButtonTouchTap={this.toggle} />

	            <M.LeftNav
			          docked={false}
			          width={300}
			          open={this.state.open}
			          onRequestChange={open => this.setState({open})}
			        >

								<M.AppBar 
		              title="App Name"
		              showMenuIconButton={false} />
			        	<M.List>
					        <M.ListItem>
					        	<Row>
					        		<Col sm={4} style={{textAlign:'center'}}>
					        			<M.Avatar size={80} src="https://scontent-lax3-1.xx.fbcdn.net/hphotos-xpt1/v/t1.0-9/12039180_10153513052786154_5738508439980347034_n.jpg?oh=2f34c3a4d3f10c3f55ef293278e4e6b2&oe=5776122A" />
					        		</Col>
					        		<Col sm={8} style={{lineHeight:'39px'}}>
					        			<div>
					        				<h4>{this.state.user.name}</h4>
					        			</div>
					        			<div>
					              	<span style={{color: '#CCC'}}>From</span>&nbsp;
					              	<span style={{color: '#333'}}>{this.state.user.city}</span>
					              </div>
					        		</Col>
					        	</Row>
					        </M.ListItem>
			        	</M.List>

						    <M.Divider />
						    <h4 style={{padding: 15, paddingBottom: 0}}>Matching Preferences</h4>

					    	<M.Subheader>Gender</M.Subheader>
  							<M.RadioButtonGroup
  								name="shipSpeed" 
  								defaultSelected="0"
  								style={{paddingLeft: 15}} >
  								<M.RadioButton value="0" label="No Preference" />
  								<M.RadioButton value="1" disabled={true} label="Male" />
  								<M.RadioButton value="2" disabled={true} label="Female" />
					      </M.RadioButtonGroup>

					    	<M.Subheader>Location</M.Subheader>
								<Row style={{paddingLeft:15}}>
									<Col sm={7}>
										<M.Slider disabled={true} style={{margin:0}} min={5} max={100} defaultValue={100}/>
									</Col>
									<Col sm={4}>
										<span style={{fontWeight: 'bold'}}>Anywhere</span>
									</Col>
								</Row>

					    	<M.Subheader>Age</M.Subheader>
								<Row style={{paddingLeft:15}}>
									<Col sm={7}>
										<M.Slider disabled={true} style={{margin:0}} min={18} max={100} defaultValue={100}/>
									</Col>
									<Col sm={4}>
										<span style={{fontWeight: 'bold'}}>18 - 100</span>
									</Col>
								</Row>

			        </M.LeftNav>
	          </div>
	}
});
                