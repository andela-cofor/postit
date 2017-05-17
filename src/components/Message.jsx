import React from 'react';
import ReactDom from 'react-dom';
import {list, ListItem} from 'material-ui';
import Avatar from 'material-ui/Avatar';

class Message extends React.Component {
    constructor(props) {
        super(props);
    }

    render(){
        console.log(this.props.message.profilePic)
        return (
        <ListItem disabled={true}
      leftAvatar={
        <Avatar src={this.props.message.profilePic} />
      } >
            {this.props.message.message}
        </ListItem>
        );
    }
}

export default Message;