import React from 'react';
import { Card, CardText } from 'material-ui/Card';
import { browserHistory } from 'react-router';
import RB from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Actions from '../actions/';

const RaisedButton = RB;

/**
 * @class Login
 * @extends {React.Component}
 */
class Login extends React.Component {

  /**
   * Creates an instance of Login.
   * @memberof Login
   */
  constructor() {
    super();
    this.state = {
      userDetails: {
        email: '',
        password: ''
      }
    };
    this.signInWithEmailAndPassword = this.signInWithEmailAndPassword.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.signUp = this.signUp.bind(this);
    this.loginWithEmail = this.loginWithEmail.bind(this);
    this.loginWithGoogle = this.loginWithGoogle.bind(this);
    this.forgetPassword = this.forgetPassword.bind(this);
  }

  /**
   * @memberof Login
   */
  loginWithGoogle() {
    event.preventDefault();
    Actions.login(this.context.router);
  }

  /**
   * @param {any} event
   * @memberof Login
   */
  signInWithEmailAndPassword(event) {
    event.preventDefault();
    Actions.signInWithEmailAndPassword(this.state.userDetails);
  }

  /**
   * @param {any} event
   * @memberof Login
   */
  handleChange(event) {
    const userDetails = this.state.userDetails;
    userDetails[event.target.name] = event.target.value;
    this.setState({ userDetails });
    console.log(this.state.userDetails)
  }

  /**
   * @memberof Login
   */
  signUp() {
    browserHistory.push('/signup');
  }

  /**
   * @param {any} event
   * @memberof Login
   */
  loginWithEmail(event) {
    event.preventDefault();
    Actions.loginWithEmail(this.state.userDetails);
  }

  forgetPassword(event){
    event.preventDefault();
    // console.log(this.state.userDetails)
    if(this.state.userDetails.email === ''){
      console.log('Enter Email');
    } else {
      Actions.sendPasswordResetEmail(this.state.userDetails.email);
    }
    // console.log(this.state.userDetails)
  }

  /**
   * @returns
   * @memberof Login
   */
  render() {
    return (
      <Card style={{
        'maxWidth': '500px',
        'margin': '30px auto',
        'padding': '50px'
        }}>;
        <CardText
          style = { {
          'textAlign': 'center'
        }}>
          <RaisedButton
            label="Login"
            style={{margin: 12,}} />
        </CardText>
        <form className="mui-form" onSubmit={this.signInWithEmailAndPassword}>
          <br /><br />
          <a href="#"
            onClick={this.forgetPassword}
            >Forget Password</a>
          <br /><br /><br /><br />
          <div className="mui-textfield">
            <TextField
              required
              name="email"
              value={this.state.email}
              onChange={this.handleChange}
              placeholder="Enter email address"
              type="text"
            /><br />
          </div>
          <div className="mui-textfield">
            <TextField
              required
              name="password"
              value={this.state.password}
              onChange={this.handleChange}
              placeholder="Enter password"
              type="password"
            /><br />
          </div>
          <br/><br/>
          <div>
          <RaisedButton
            onClick={this.loginWithEmail}
            label="Login with Email"
            type="submit"
            primary={true}
            style={{ margin: 12, }}
          />
          <RaisedButton
            onClick={this.loginWithGoogle}
            label="Google"
          />
          <RaisedButton
            label="Sign Up"
            secondary={true}
            onClick={this.signUp}
            style={{ margin: 12, }} />
          </div>
        </form>
      </Card>
    );
  }
}

Login.contextTypes = {
  router: React.PropTypes.func.isRequired
};

module.exports = Login;
