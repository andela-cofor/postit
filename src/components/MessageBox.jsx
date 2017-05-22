import React from 'react';
import ReactDom from 'react-dom';
import {list, ListItem} from 'material-ui';
import Avatar from 'material-ui/Avatar';
import mui from 'material-ui/Card';
import trim from 'trim';
import Actions from '../actions/'
import MenuItem from 'material-ui/MenuItem';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import ActionFavorite from 'material-ui/svg-icons/action/favorite';
import ActionFavoriteBorder from 'material-ui/svg-icons/action/favorite-border';
import ChatStore from '../store/ChatStore'

// var firebase = require("firebase/app");
// require("firebase/auth");
// require("firebase/database");

var Card = mui;

class MessageBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        message: '',
        value: 'Normal',
        channel: ''
    }
    // this.state = {value: 1};
    this.onChange=this.onChange.bind(this)
    this.onKeyUp=this.onKeyUp.bind(this)
    this.handleChange=this.handleChange.bind(this)
  }

  handleChange(event, index, value){
    // this.setState({ value });
    // this.setState({
    //   value: event.target.value
    // });
    this.state = (Object.assign({}, this.state, {
      value: event.target.value
    }));
    
  }

  onChange(evt){
    this.setState({
        message: evt.target.value
    })
  }

  onKeyUp(evt) {
    if(evt.keyCode === 13 && trim(evt.target.value) != '') {
      evt.preventDefault();

      Actions.sendMessage(this.state.message);

      console.log('Here it starts')
      let state = ChatStore.getState();
      console.log(state.selectedChannel.name, 'Channel Name');

      this.state = (Object.assign({}, this.state, {
        channel: state.selectedChannel.name
      }));

      console.log(this.state.value, 'Current Value')
      console.log(typeof this.state.value, 'Current Type')
      if(this.state.value === 'Urgent'){
        console.log('Urgent State')
        Actions.sendEmailUsers(this.state);
      } else if(this.state.value === 'Critical'){
        console.log('Critical state')
        Actions.sendEmailUsers(this.state);
        Actions.sendTextToUsers(this.state)
      }

      this.setState({
        message: '',
        channel: ''
      })
    }
  }

  render(){
    return (
      <Card style={{
        maxWidth: 1200,
        margin: '30px auto',
        padding: 30
      }}>
        <textarea
          value={this.state.message}
          onChange={this.onChange}
          onKeyUp={this.onKeyUp}
          style={{
          width: '100%',
          borderColor: '#D0D0D0',
          resize: 'none',
          borderRadius: 3,
          minHeight: 50,
          color: '#555',
          fontSize: 14,
          outline: 'auto 0px'
        }} />
        <RadioButtonGroup valueSelected={this.state.value} name="shipSpeed" defaultSelected="not_light" onChange={this.handleChange}>
          <RadioButton
            value="Normal"
            label="Normal"
            style={{marginBottom: 16,}}
          />
          <RadioButton
            value="Urgent"
            label="Urgent"
            style={{marginBottom: 16,}}
          />
          <RadioButton
            value="Critical"
            label="Critical"
            style={{marginBottom: 16,}}
          />
        </RadioButtonGroup>
      </Card>
    );
  }
}

export default MessageBox;