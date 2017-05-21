import React from 'react';
import { Card, CardText } from 'material-ui/Card';
import Actions from '../actions/';
import RB from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import IconButton from 'material-ui/IconButton';
import { browserHistory } from 'react-router';

let RaisedButton = RB

class Signup extends React.Component {
  constructor() {
    super()
    this.state = {
      userDetails: {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        phoneNumber: ''
      }
    }
    // this.onClick=this.onClick.bind(this)
    // this.createUserWithEmailAndPassword=this.createUserWithEmailAndPassword.bind(this)
    this.handleChange=this.handleChange.bind(this)
    this.signUp=this.signUp.bind(this)
  }

  handleChange(event) {
    const userDetails = this.state.userDetails;
    userDetails[event.target.name] = event.target.value;
    this.setState({ userDetails });
  }

  signUp(event){
    event.preventDefault();
    Actions.createUserWithEmailAndPassword(this.state.userDetails)
  }

  render(){
    return (
      <Card style={{
        'maxWidth': '500px',
        'margin': '30px auto',
        'padding': '50px'
      }}>
        <CardText style={{
          'textAlign': 'center'
        }}>
          <RaisedButton label="Signup" style={{margin: 12,}} />
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
    )
  }
}

Signup.contextTypes = {
  router: React.PropTypes.func.isRequired
}

module.exports = Signup;
