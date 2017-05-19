import React from 'react';
import ReactDom from 'react-dom';
import {list, ListItem} from 'material-ui';
import Avatar from 'material-ui/Avatar';
import mui from 'material-ui/Card';
import trim from 'trim';
import Actions from '../actions/'
import MenuItem from 'material-ui/MenuItem';
import DropDownMenu from 'material-ui/DropDownMenu';

// var firebase = require("firebase/app");
// require("firebase/auth");
// require("firebase/database");

var Card = mui;

class MessageBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        message: '',
        value: 2
    }
    // this.state = {value: 1};
    this.onChange=this.onChange.bind(this)
    this.onKeyUp=this.onKeyUp.bind(this)
    this.handleChange=this.handleChange.bind(this)
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
    
      this.setState({
        message: ''
      })
    }
  }

  handleChange(event, index, value) { 
    this.setState({value})
    console.log(value, 'the val')
  };

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
        <DropDownMenu value={this.state.value} onChange={this.handleChange} openImmediately={true}>
          <MenuItem value={1} primaryText="Never" />
          <MenuItem value={2} primaryText="Every Night" />
          <MenuItem value={3} primaryText="Weeknights" />
          <MenuItem value={4} primaryText="Weekends" />
          <MenuItem value={5} primaryText="Weekly" />
      </DropDownMenu>
      </Card>
    );
  }
}

export default MessageBox;