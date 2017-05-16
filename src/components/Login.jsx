import React from 'react';
import { Card, CardText } from 'material-ui/Card';
import Actions from '../actions/';
import RB from 'material-ui/RaisedButton';

// let {
//   Card,
//   CardText,
// } = mui

let RaisedButton = RB

class Login extends React.Component {
  constructor() {
    super()
    this.onClick=this.onClick.bind(this)
  }
  onClick(){
    // console.log('Logging in')
    Actions.login();
  }

  render(){
    return (
      <Card style={{
        'maxWidth': '800px',
        'margin': '30px auto',
        'padding': '50px'
      }}>
        <CardText style={{
          'textAlign': 'center'
        }}>
          To use app, please log in with your Google account.
        </CardText>
        <RaisedButton style={{
          'display': 'block',
        }} onClick={this.onClick} label="log in with Google" />
      </Card>
    )
  }
}

module.exports = Login;
