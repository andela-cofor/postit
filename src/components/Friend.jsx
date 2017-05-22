import React from 'react';
import ReactDom from 'react-dom';
import { browserHistory } from 'react-router';
import {list, ListItem} from 'material-ui';
import Avatar from 'material-ui/Avatar';
import Actions from '../actions/';

class Friend extends React.Component {
  constructor(props){
    super(props);
  }

  render(){
    return (
      <ListItem>{this.props.friend.email}</ListItem>
    )
  }
}

export default Friend;