var React = require('react');

var M = require('material-ui/lib');

var DeepLinkedStateMixin = require('react-deep-link-state');

var User = require('./stores/user');

module.exports = React.createClass({
	displayName: 'LoginForm',
	mixins: [DeepLinkedStateMixin],
	getInitialState: function(){
		return {
			name: null,
			city: null,
		}
	},
  	handleCityChange: function(event, index, value){
		this.setState({city: value});
  	},
    render: function(){
	    return  <div>
					<M.TextField 
						floatingLabelText='Your Name'
						hintText='Your Name'
			          	valueLink={this.deepLinkState(['name'])} 
						fullWidth={true}
						disabled={this.props.disabled} />
			        <br />
			        <M.SelectField 
			        	value={this.state.city} 
			        	onChange={this.handleCityChange} 
			          	style={{textAlign: 'left'}} 
			          	floatingLabelText='Which city are you in?'
			          	hintText='Which city are you in?'
						fullWidth={true}
						disabled={this.props.disabled} >
			          <M.MenuItem value='tokyo' primaryText="Tokyo" />
			          <M.MenuItem value='los_angeles' primaryText="Los Angeles" />
			          <M.MenuItem value='taipei' primaryText="Taipei" />
			          <M.MenuItem value='paris' primaryText="Paris" />
			          <M.MenuItem value='san_francisco' primaryText="San Fran" />
			        </M.SelectField>
			        <br />
					<M.RaisedButton 
						label="Log In" 
						fullWidth={true} 
						primary={true}
						onClick={User.actions.setUser.bind(null, {
							name: this.state.name,
							city: this.state.city
						})} />
    			</div>
    }
});