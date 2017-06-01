import React from 'react';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';
import mui from 'material-ui/Card';
import trim from 'trim';
import Actions from '../actions/';
import ChatStore from '../store/ChatStore';

const Card = mui;

/**
 * @class MessageBox
 * @extends {React.Component}
 */
class MessageBox extends React.Component {

  /**
   * Creates an instance of MessageBox.
   * @param {object} props
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
   * Handles change
   * @param {object} event
   * @memberof MessageBox
   * @return {void}
   */
  handleChange(event) {
    this.state = (Object.assign({}, this.state, {
      value: event.target.value
    }));
  }

  /**
   * Displays messages from the database
   * @param {object} evt
   * @memberof MessageBox
   * @return {void}
   */
  onChange(evt){
    this.setState({
        message: evt.target.value
    })
  }

  /**
   * Monitors onKeyUp
   * @param {object} evt
   * @memberof MessageBox
   * @return {void}
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
      <Card className="messageBox">
        <textarea
          id="messageArea"
          value={this.state.message}
          onChange={this.onChange}
          onKeyUp={this.onKeyUp}
          />
        <RadioButtonGroup
          valueSelected={this.state.value}
          name="shipSpeed"
          defaultSelected="not_light"
          onChange={this.handleChange}>
          <RadioButton
            id="normal"
            value="Normal"
            label="Normal"
          />
          <RadioButton
            id="urgent"
            value="Urgent"
            label="Urgent"
          />
          <RadioButton
            id="critical"
            value="Critical"
            label="Critical"
          />
        </RadioButtonGroup>
      </Card>
    );
  }
}

export default MessageBox;
