import React from 'react';
import Login from './Login.jsx';
// import Chat from './Chat.jsx';
// import {RouteHandler} from 'react-router';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import * as Colors from 'material-ui/styles/colors';
// import connectToStores from 'alt-utils/lib/connectToStores' 
// import ChatStore from '../store/ChatStore';
var firebase = require("firebase/app");
require("firebase/auth");
require("firebase/database");
import Avatar from 'material-ui/Avatar';
import FlatButton from 'material-ui/FlatButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import RaisedButton from 'material-ui/RaisedButton';
import { browserHistory } from 'react-router';

var ThemeManager = getMuiTheme;

// @connectToStores
class App extends React.Component {
  constructor(){
    super();
    this.onClick=this.onClick.bind(this)
    ThemeManager({palette: {
        primary1Color: Colors.blue500,
        primary1Color: Colors.blue700,
        primary1Color: Colors.blue100,
        accent1Color: Colors.pink400
    }});

    let config = {
        apiKey: "AIzaSyA60fC3LsXyi-WPNlEYIlEu6kfNv3CKsqM",
        authDomain: "postit-3ad4f.firebaseapp.com",
        databaseURL: "https://postit-3ad4f.firebaseio.com",
        projectId: "postit-3ad4f",
        storageBucket: "postit-3ad4f.appspot.com",
        messagingSenderId: "996317807496"
    };
    firebase.initializeApp(config);   
  }

  // componentWillMount() {
  //   console.log('Apppppp', this.state)
  // }
    // static getStores(){
    //     return [ChatStore]
    // }

    // static getPropsFromStores(){
    //     return ChatStore.getState();
    // }

  static childContextTypes() {
      muiTheme: React.PropTypes.object
  }

  onClick(){
    console.log('Was called Buya')
    browserHistory.push('/profile')
  }

  render() {
    let view = <Login />
    if(this.props.user){
      console.log('Apppppp', this.props.user)
        // view = <Chat />
    }
    return (
      <MuiThemeProvider>
          <div>
            <AppBar 
            title="PostIt"
            iconClassNameRight="muidocs-icon-navigation-expand-more"
            iconElementRight={
              <RaisedButton 
                label="Profile" 
                style={{margin: 12,}}
                onClick={this.onClick}
                 />
            }
          >
          </AppBar>
          {/*<AppBar 
            title="PostIt"
            iconClassNameRight="muidocs-icon-navigation-expand-more"
            iconElementRight={
              <Avatar
                src=""
                size={50}
                style={{
                  margin: 5
                }}
              />
            }
          >
          </AppBar>*/}
          {/*<AppBar 
            title="PostIt"
            iconClassNameRight="muidocs-icon-navigation-expand-more"
            iconElementRight={
              <IconMenu
                iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
                anchorOrigin={{horizontal: 'right', vertical: 'top'}}
                targetOrigin={{horizontal: 'right', vertical: 'top'}}
              >
                <MenuItem primaryText="Settings" />
                <MenuItem primaryText="Help" />
                <MenuItem primaryText="Sign out" />
              </IconMenu>
            }
          >
          </AppBar>*/}
          
          {this.props.children}
          {/*<RouteHandler />*/}
          </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
