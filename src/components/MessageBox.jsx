import React from 'react';
import ReactDom from 'react-dom';
import {list, ListItem} from 'material-ui';
import Avatar from 'material-ui/Avatar';
import mui from 'material-ui/Card';
import trim from 'trim';
var firebase = require("firebase/app");
require("firebase/auth");
require("firebase/database");

var Card = mui;

class MessageBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            message: ''
        }
        this.onChange=this.onChange.bind(this)
        this.onKeyUp=this.onKeyUp.bind(this)
    }

    onChange(evt){
        this.setState({
            message: evt.target.value
        })
    }

    onKeyUp(evt) {
        if(evt.keyCode === 13 && trim(evt.target.value) != '') {
          evt.preventDefault();

          firebase.database().ref('/messages/').push({
            message: this.state.message
          })

          this.setState({
            message: ''
          })

          console.log('Sent a new message', evt.target.value);
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
            </Card>
        );
    }
}

export default MessageBox;