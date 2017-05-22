import React from 'react';
import { Card, CardText } from 'material-ui/Card';
import Actions from '../actions/';
import RB from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import IconButton from 'material-ui/IconButton';
import { browserHistory } from 'react-router';

let RaisedButton = RB

class Login extends React.Component {
  constructor() {
    super()
    this.state = {
      userDetails: {
        email: '',
        password: ''
      }
    }
    // this.onClick=this.onClick.bind(this)
    this.signInWithEmailAndPassword=this.signInWithEmailAndPassword.bind(this)
    this.handleChange=this.handleChange.bind(this)
    this.signUp=this.signUp.bind(this)
    this.loginWithEmail=this.loginWithEmail.bind(this)
    this.loginWithGoogle=this.loginWithGoogle.bind(this)
  }

  // onClick(event){
  //   event.preventDefault();
  //   Actions.login(this.context.router);
  // }
  loginWithGoogle(){
    event.preventDefault();
    Actions.login(this.context.router);
  }

  signInWithEmailAndPassword(event){
    event.preventDefault();
    Actions.signInWithEmailAndPassword(this.state.userDetails)
  }

  handleChange(event) {
    const userDetails = this.state.userDetails;
    userDetails[event.target.name] = event.target.value;
    this.setState({ userDetails });
  }

  // createUserWithEmailAndPassword(event){
  //   event.preventDefault(this.state.userDetails);
  // }

  signUp(){
    browserHistory.push('/signup')
  }

  loginWithEmail(event){
    event.preventDefault();
    Actions.loginWithEmail(this.state.userDetails);
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
          <RaisedButton
            label="Login"
            style={{margin: 12,}} />
        </CardText>
        <form className="mui-form" onSubmit={this.signInWithEmailAndPassword}>
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
            style={{margin: 12,}} 
          />
          <RaisedButton 
            onClick={this.loginWithGoogle}
            label="Google"
          />
          <RaisedButton
            label="Sign Up"
            secondary={true}
            onClick={this.signUp}
            style={{margin: 12,}} />
          </div>
        </form>
      </Card>
    )
  }
}

Login.contextTypes = {
  router: React.PropTypes.func.isRequired
}

module.exports = Login;
