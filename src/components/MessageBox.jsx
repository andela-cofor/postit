import React from 'react';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';
import mui from 'material-ui/Card';
import trim from 'trim';
import Actions from '../actions/';
import ChatStore from '../store/ChatStore';

// var firebase = require("firebase/app");
// require("firebase/auth");
// require("firebase/database");

const Card = mui;

/**
 * @class MessageBox
 * @extends {React.Component}
 */
class MessageBox extends React.Component {

  /**
   * Creates an instance of MessageBox.
   * @param {any} props
   * @memberof MessageBox
   */
  constructor(props) {
    super(props);
    this.state = {
      message: '',
      value: 'Normal',
      channel: ''
    };
    this.onChange = this.onChange.bind(this);
    this.onKeyUp = this.onKeyUp.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  /**
   * @param {any} event
   * @memberof MessageBox
   */
  handleChange(event) {
    this.state = (Object.assign({}, this.state, {
      value: event.target.value
    }));
  }

  /**
   * @param {any} evt
   * @memberof MessageBox
   */
  onChange(evt){
    this.setState({
        message: evt.target.value
    })
  }

  /**
   * @param {any} evt
   * @memberof MessageBox
   */
  onKeyUp(evt) {
    if (evt.keyCode === 13 && trim(evt.target.value) !== '') {
      evt.preventDefault();

      Actions.sendMessage(this.state.message);
      const state = ChatStore.getState();
      this.state = (Object.assign({}, this.state, {
        channel: state.selectedChannel.name
      }));

      if (this.state.value === 'Urgent') {
        Actions.sendEmailUsers(this.state);
      } else if (this.state.value === 'Critical') {
        Actions.sendEmailUsers(this.state);
        Actions.sendTextToUsers(this.state);
      }

      this.setState({
        message: '',
        channel: ''
      });
    }
  }

  /**
   * @returns messages
   * @memberof MessageBox
   */
  render() {
    return (
      <Card style={{
        maxWidth: 1200,
        margin: '30px auto',
        padding: 30
      }}>
        <textarea
          id="messageArea"
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
        <RadioButtonGroup
          valueSelected={this.state.value}
          name="shipSpeed"
          defaultSelected="not_light"
          onChange={this.handleChange}>
          <RadioButton
            id="normal"
            value="Normal"
            label="Normal"
            style={{ marginBottom: 16, }}
          />
          <RadioButton
            id="urgent"
            value="Urgent"
            label="Urgent"
            style={{ marginBottom: 16, }}
          />
          <RadioButton
            id="critical"
            value="Critical"
            label="Critical"
            style={{ marginBottom: 16, }}
          />
        </RadioButtonGroup>
      </Card>
    );
  }
}

export default MessageBox;
