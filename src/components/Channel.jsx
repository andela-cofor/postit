import React from 'react';
import ReactDom from 'react-dom';
import { browserHistory } from 'react-router';
import {list, ListItem} from 'material-ui';
import Avatar from 'material-ui/Avatar';
import Actions from '../actions/';
// import ChatStore from '../store/ChatStore'

class Channel extends React.Component {
    constructor(props) {
        super(props);
        this.onClick=this.onClick.bind(this)
    }

    onClick(){
      Actions.channelOpened(this.props.channel);
    //   let state = ChatStore.getState();
    //   console.log(state, 'Hey you were clicked');
    }

    render(){
        let style = {};
            if(this.props.channel.selected){
                style.backgroundColor = '#f0f0f0'
            }
        return (
        <ListItem
          onClick={this.onClick}
          style={style}>
            {this.props.channel.name}
        </ListItem>
        );
    }
}

export default Channel;