import React from 'react';
import { Card, CardText } from 'material-ui/Card';
import Actions from '../actions/';
import RB from 'material-ui/RaisedButton';
import connectToStores from 'alt-utils/lib/connectToStores'
import ChatStore from '../store/ChatStore'
import { browserHistory } from 'react-router';
import TextField from 'material-ui/TextField';
import trim from 'trim'


let RaisedButton = RB

@connectToStores
class PhoneBook extends React.Component {
  constructor() {
      super()
    // this.onClick=this.onClick.bind(this)
    this.onChange=this.onChange.bind(this)
    this.onKeyUp=this.onKeyUp.bind(this)
    this.state = {
        phoneNumber: ''
    }
  }

  static getStores(){
        return [ChatStore]
    }

    static getPropsFromStores(){
        return ChatStore.getState();
    }

  componentDidMount(){
    let state = ChatStore.getState();
  }

  // onClick(){
  //   ChatStore.addUser()
  // }

  onChange(evt){
    this.setState({
        phoneNumber: evt.target.value
    })
  }

  onKeyUp(evt) {
    if(evt.keyCode === 13 && trim(evt.target.value) != '') {
      evt.preventDefault();
      if(this.state.phoneNumber){
        Actions.phoneNumber(this.state.phoneNumber);
        this.setState({
          phoneNumber: this.state.phoneNumber
        })
      } else{
        // console.log('Enter Number')
      }
    }
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
          Number format: 000-0000-000
        </CardText>
        <TextField
          value={this.state.phoneNumber}
          onChange={this.onChange}
          onKeyUp={this.onKeyUp}
          hintText="Enter your phone"
          className="browser-default"
          placeholder="Enter your phone number"
          style={{
            paddingTop: 15,
          }}
          type="number"
        /><br />
      </Card>
    )
  }
}

PhoneBook.contextTypes = {
  router: React.PropTypes.func.isRequired
}

module.exports = PhoneBook;
