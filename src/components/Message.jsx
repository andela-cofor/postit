import React from 'react';
import ReactDom from 'react-dom';
import {list, ListItem} from 'material-ui';
import Avatar from 'material-ui/Avatar';

class Message extends React.Component {
    constructor(props) {
        super(props);
    }

    render(){
        return (
        <ListItem disabled={true}
      leftAvatar={
        <Avatar src="" />
      } >
            {this.props.message}
        </ListItem>
        );
    }
}

export default Message;