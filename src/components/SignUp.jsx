import React from 'react';
import { Card, CardText } from 'material-ui/Card';
import RB from 'material-ui/RaisedButton';
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
        phoneNumber: ''
      }
    };
    // this.onClick=this.onClick.bind(this)
    // this.createUserWithEmailAndPassword=this.createUserWithEmailAndPassword.bind(this)
    this.handleChange = this.handleChange.bind(this);
    this.signUp = this.signUp.bind(this);
  }

  /**
   * @param {any} event
   * @memberof Signup
   */
  handleChange(event) {
    const userDetails = this.state.userDetails;
    userDetails[event.target.name] = event.target.value;
    this.setState({ userDetails });
  }


  /**
   * @param {any} event
   * @memberof Signup
   */
  signUp(event) {
    event.preventDefault();
    Actions.createUserWithEmailAndPassword(this.state.userDetails);
  }

  /**
   * @returns User
   * @memberof Signup
   */
  render() {
    return (
      <Card style={{
        'maxWidth': '500px',
        'margin': '30px auto',
        'padding': '50px'
      }}>
        <CardText style={{
          'textAlign': 'center'
        }}>
          <RaisedButton label="Signup" style={{ margin: 12, }} />
        </CardText>
        <form className="mui-form" onSubmit={this.signUp}>
          <br /><br /><br /><br />
          <div className="mui-textfield">
            <TextField
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
          <div className="mui-textfield">
            <TextField
              required
              name="phoneNumber"
              value={this.state.phoneNumber}
              onChange={this.handleChange}
              placeholder="Enter phone number"
              type="number"
            /><br />
          </div>
          <br/><br/>
          <div>
            <RaisedButton
              label="Sign Up"
              type="submit"
              style={{
                margin: 12,
              }}
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
