var React = require('react');
var ReactDOM = require('react-dom');
var R = require('react-router');
var Reflux = require('reflux');

var User = require('./stores/user');

var Grid = require('react-bootstrap/lib/grid');
var Row = require('react-bootstrap/lib/row');
var Col = require('react-bootstrap/lib/col');

var M = require('material-ui/lib');

var Nav = require('./nav');
var LoginForm = require('./login-form');
var Chat = require('./chat');


var App = React.createClass({
  displayName: 'App',
  mixins: [Reflux.connect(User.store, 'user')],
  render: function(){
    if(!this.state.user) {
      return  <Grid>
                <Row>
                  <Col lg={4} lgPush={4}>
                    <LoginForm />
                  </Col>
                </Row>
              </Grid>
    } else {
      return  <Grid fluid={true}>
                <Row>
                  <Nav />
                </Row>
                  {this.props.children}
              </Grid>
    }
  }
});

var Home = React.createClass({
  render: function(){
    return  <Row>
              <Col lg={4} lgPush={4}>
                <M.RaisedButton
                  style={{marginTop:20}}
                  fullWidth={true} 
                  primary={true}
                  containerElement={<R.Link to="/chat" />}
                  linkButton={true}
                  label="Match Me!"/>
              </Col>
            </Row>
  }
})
var injectTapEventPlugin = require("react-tap-event-plugin");
injectTapEventPlugin();

ReactDOM.render((
  <R.Router history={R.hashHistory}>
    <R.Route path="/" component={App}>
      <R.IndexRoute component={Home} />
      <R.Route path="chat" component={Chat} />
    </R.Route>
  </R.Router>
  ), document.getElementById('app'));