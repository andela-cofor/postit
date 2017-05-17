import React from 'react';
import ReactDom from 'react-dom';
import {list, ListItem} from 'material-ui';
import Avatar from 'material-ui/Avatar';

class Channel extends React.Component {
    constructor(props) {
        super(props);
    }

    render(){
        let style = {};
            if(this.props.channel.selected){
                style.backgroundColor = '#f0f0f0'
            }
        return (
        <ListItem
          style={style}>
            {this.props.channel.name}
        </ListItem>
        );
    }
}

export default Channel;