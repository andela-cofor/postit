import React from 'react';
import Message from './Message.jsx';
import mui from 'material-ui/Card';
import li from 'material-ui/List';
import _ from 'loadash';
var firebase = require("firebase/app");
require("firebase/auth");
require("firebase/database");

var Card = mui;
var List = li

class MessageList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            messages: []
        }
        let config = {
            apiKey: "AIzaSyA60fC3LsXyi-WPNlEYIlEu6kfNv3CKsqM",
            authDomain: "postit-3ad4f.firebaseapp.com",
            databaseURL: "https://postit-3ad4f.firebaseio.com",
            projectId: "postit-3ad4f",
            storageBucket: "postit-3ad4f.appspot.com",
            messagingSenderId: "996317807496"
        };
        firebase.initializeApp(config);
        firebase.database().ref('/messages/').once('value', (dataSnapshot) => {
            console.log(dataSnapshot.val())
            let messagesVal = dataSnapshot.val();
            let messages = _(messagesVal)
                .keys()
                .map((messageKey) => {
                    console.log('got here')
                    let cloned = _.clone(messagesVal[messageKey]);
                    cloned.key = messageKey;
                    return cloned;
                })
                .value();

            this.setState({
                messages: messages
            })
        })
        
    }

    render() {
        var messageNodes = this.state.messages.map((message) => {
            return (
                <Message message={message.message} />
            );
        });

        return (
                // <div>{messageNodes}</div>
                <div style={{
                        flex: 4,
                        marginLeft: 30,
                    }}>
                    <Card >
                        <List>
                            {messageNodes}
                        </List>
                    </Card>
                </div>
            );
    }
}

export default MessageList;