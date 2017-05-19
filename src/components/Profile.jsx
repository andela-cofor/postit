import React from 'react';
import { Card, CardText } from 'material-ui/Card';
import Actions from '../actions/';
import RB from 'material-ui/RaisedButton';

let RaisedButton = RB

class Profile extends React.Component {
  constructor() {
    super()
    this.onClick=this.onClick.bind(this)
  }

  onClick(){
    Actions.login(this.context.router);
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
          Edit your profile details here.
        </CardText>
        <RaisedButton style={{
          'display': 'block',
        }} onClick={this.onClick} label="Sign In" />
      </Card>
    )
  }
}

Profile.contextTypes = {
  router: React.PropTypes.func.isRequired
}

module.exports = Profile;
