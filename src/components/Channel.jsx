import React from 'react';
import ReactDom from 'react-dom';
import {list, ListItem} from 'material-ui';
import Avatar from 'material-ui/Avatar';

class Channel extends React.Component {
    constructor(props) {
        super(props);
    }

    render(){
        console.log(this.props.channel, 'Got here')
        return (
        <ListItem>
            {this.props.channel}
        </ListItem>
        );
    }
}

export default Channel;