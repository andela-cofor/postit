import React from 'react';
import { Card, CardText } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Actions from '../actions/';

/**
 * @class Signup
 * @extends {React.Component}
 */
class Signup extends React.Component {

  /**
   * Creates an instance of Signup.
   * @memberof Signup
   */
  constructor() {
    super();
    this.state = {
      userDetails: {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        phoneNumber: '',
        photoUrl: ''
      }
    };
    this.handleChange = this.handleChange.bind(this);
    this.signUp = this.signUp.bind(this);
  }

  /**
   * Handle change events
   * @param {object} event
   * @memberof Signup
   * @returns {void}
   */
  handleChange(event) {
    const userDetails = this.state.userDetails;
    userDetails[event.target.name] = event.target.value;
    this.setState({ userDetails });
  }

  /**
   * Handle User signup
   * @param {object} event
   * @memberof Signup
   * @returns {void}
   */
  signUp(event) {
    event.preventDefault();
    if(this.state.userDetails.phoneNumber.length !== 11){
      Materialize.toast('Number must be 11 digits', 4000, 'rounded')
    } else{
      Actions.createUserWithEmailAndPassword(this.state.userDetails);
    }
  }

  /**
   * @returns User
   * @memberof Signup
   */
  render() {
    return (
      <Card className="signUpForm">
        <CardText className="center">
        <h6>Signup</h6>
        </CardText>
        <form className="mui-form center" onSubmit={this.signUp}>
          <div className="mui-textfield">
            <TextField
              id="firstName"
              required
              name="firstName"
              value={this.state.firstName}
              onChange={this.handleChange}
              placeholder="Enter your firstname"
              type="text"
            /><br />
          </div>
          <div className="mui-textfield">
            <TextField
              id="lastName"
              required
              name="lastName"
              value={this.state.lastName}
              onChange={this.handleChange}
              placeholder="Enter your last name"
              type="text"
            /><br />
          </div>
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
              id="password"
              required
              name="password"
              value={this.state.password}
              onChange={this.handleChange}
              placeholder="Enter password"
              type="password"
            /><br />
          </div>
          <div className="mui-textfield">
            <TextField
              id="phoneNumber"
              required
              name="phoneNumber"
              value={this.state.phoneNumber}
              onChange={this.handleChange}
              placeholder="Enter phone number"
              type="number"
            /><br />
          </div>
          <div className="mui-textfield">
            <TextField
              required
              name="photoUrl"
              value={this.state.photoUrl}
              onChange={this.handleChange}
              placeholder="Enter photo url"
              type="text"
            /><br />
          </div>
          <br/><br/>
          <div>
            <RaisedButton
              id="signup"
              label="Sign Up"
              type="submit"
            />
          </div>
        </form>
      </Card>
    );
  }
}

Signup.contextTypes = {
  router: React.PropTypes.func.isRequired
};

module.exports = Signup;
