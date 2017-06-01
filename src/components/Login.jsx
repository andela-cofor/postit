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
   * Login with google firebase
   * @memberof Login
   * @returns {void}
   */
  loginWithGoogle() {
    event.preventDefault();
    Actions.login(this.context.router);
  }

  /**
   * Signin with Email using firebase
   * @param {object} event
   * @memberof Login
   * @returns {void}
   */
  signInWithEmailAndPassword(event) {
    event.preventDefault();
    Actions.signInWithEmailAndPassword(this.state.userDetails);
  }

  /**
   * Listen for change event
   * @param {object} event
   * @memberof Login
   * @returns {void}
   */
  handleChange(event) {
    const userDetails = this.state.userDetails;
    userDetails[event.target.name] = event.target.value;
    this.setState({ userDetails });
  }

  /**
   * Routes to Signup page
   * @memberof Login
   * @returns {void}
   */
  signUp() {
    browserHistory.push('/signup');
  }

  /**
   * Login with Email and Password
   * @param {object} event
   * @memberof Login
   * @returns {void}
   */
  loginWithEmail(event) {
    event.preventDefault();
    Actions.loginWithEmail(this.state.userDetails);
  }

  /**
   * Allows user change password
   * @param {object} event
   * @memberof Login
   * @return {void}
   */
  forgetPassword(event){
    event.preventDefault();
    if(this.state.userDetails.email === ''){
      Materialize.toast('Enter your email address', 4000, 'rounded');
    } else {
      Actions.sendPasswordResetEmail(this.state.userDetails.email);
      Materialize.toast('Password reset link has been sent to your email', 4000, 'rounded');
    }
  }

  /**
   * Renders Login View
   * @returns Cards
   * @memberof Login
   */
  render() {
    return (
      <Card className="loginCard">;
        <CardText className="center">
            <h6>Login</h6>
        </CardText>
        <form className="mui-form center" onSubmit={this.signInWithEmailAndPassword}>
          <br /><br />
          <div className="mui-textfield">
            <TextField
              id="email"
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
              id="password"
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
            id="submit"
            label="Submit"
            type="submit"
            className="raisedBtn"
          />
          <RaisedButton
            id="loginWithGoogle"
            onClick={this.loginWithGoogle}
            label="Google"
          />
          <RaisedButton
            id="signUp"
            label="Sign Up"
            onClick={this.signUp}
            className="raisedBtn"
          />
          </div>
          <a href="#"
            onClick={this.forgetPassword}
            id="fPassword"
            ><h6>Forgot Password</h6></a>
        </form>
        
      </Card>
    );
  }
}

Login.contextTypes = {
  router: React.PropTypes.func.isRequired
};

module.exports = Login;
