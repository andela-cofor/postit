import React from 'react';
import { Card, CardText } from 'material-ui/Card';
import trim from 'trim';
import TextField from 'material-ui/TextField';
import connectToStores from 'alt-utils/lib/connectToStores';
import ChatStore from '../store/ChatStore';
import Actions from '../actions/';

/**
 * @class PhoneBook
 * @extends {React.Component}
 */
@connectToStores
class PhoneBook extends React.Component {

  /**
   * Returns available store
   * @static
   * @returns ChatStore
   * @memberof PhoneBook
   */
  static getStores() {
    return [ChatStore];
  }


  /**
   * Returns props in the store
   * @static
   * @returns {object} ChatStore
   * @memberof PhoneBook
   */
  static getPropsFromStores() {
    return ChatStore.getState();
  }

  /**
   * Creates an instance of PhoneBook.
   * @memberof PhoneBook
   */
  constructor() {
    super();
    // this.onClick=this.onClick.bind(this)
    this.onChange = this.onChange.bind(this);
    this.onKeyUp = this.onKeyUp.bind(this);
    this.state = {
      phoneNumber: ''
    };
  }

  /**
   * Wait for component to mount before executing
   * @memberof PhoneBook
   * @returns {void}
   */
  componentDidMount() {
    const state = ChatStore.getState();
  }

  /**
   * Set states of phoneNumber
   * @param {object} evt
   * @memberof PhoneBook
   */
  onChange(evt) {
    this.setState({
      phoneNumber: evt.target.value
    });
  }


  /**
   * Monitors on key changes
   * @param {object} evt
   * @memberof PhoneBook
   */
  onKeyUp(evt) {
    if (evt.keyCode === 13 && trim(evt.target.value) !== '') {
      evt.preventDefault();
      if (this.state.phoneNumber) {
        Actions.phoneNumber(this.state.phoneNumber);
        this.setState({
          phoneNumber: this.state.phoneNumber
        });
      } 
    }
  }

  /**
   * @returns Card
   * @memberof PhoneBook
   */
  render() {
    return (
      <Card style={{
        'maxWidth': '800px',
        'margin': '30px auto',
        'padding': '50px'
      }}>
      <CardText style={{
        'textAlign': 'center'
      }}>
          Number format: 080-0000-000
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
    );
  }
}

PhoneBook.contextTypes = {
  router: React.PropTypes.func.isRequired
};

module.exports = PhoneBook;
