import React from 'react';
import AppBar from 'material-ui/AppBar';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import * as Colors from 'material-ui/styles/colors';
import { browserHistory } from 'react-router';
import Avatar from 'material-ui/Avatar';
import Login from './Login.jsx';
import FlatButton from 'material-ui/FlatButton';

const firebase = require('firebase/app');
require('firebase/auth');
require('firebase/database');

const ThemeManager = getMuiTheme;

// @connectToStores
/**
 * @class App
 * @extends {React.Component}
 */
class App extends React.Component {

  /**
   * Creates an instance of App.
   * @memberof App
   */
  constructor() {
    super();
    this.state = {
      profilePicture: ''
    }
    ThemeManager({ palette: {
      primary1Color: Colors.blue500,
      accent1Color: Colors.pink400
    } });

    this.logout = this.logout.bind(this);

    const config = {
      apiKey: 'AIzaSyA60fC3LsXyi-WPNlEYIlEu6kfNv3CKsqM',
      authDomain: 'postit-3ad4f.firebaseapp.com',
      databaseURL: 'https://postit-3ad4f.firebaseio.com',
      projectId: 'postit-3ad4f',
      storageBucket: 'postit-3ad4f.appspot.com',
      messagingSenderId: '996317807496'
    };
    firebase.initializeApp(config);
  }

  /**
   * @memberof App
   */
  onClick() {
    browserHistory.push('/profile');
  }

  /**
   * @memberof Chat
   */
  loginPage() {
    console.log('state');
    browserHistory.push('/profile');
  }

  /**
   * @memberof Chat
   */
  logout() {
    localStorage.clear();
    localStorage.removeItem('state');
    browserHistory.push('/');
  }

  /**
   * @returns view
   * @memberof App
   */
  render() {
    let view = <Login />;
    if (this.props.user) {
      view = <Chat />;
    }
    return (
      <MuiThemeProvider>
          <div>
            <AppBar
              title="PostIt"
              iconElementLeft={
                (localStorage.getItem('state'))
                ? <Avatar
                onClick={this.onClick}
                src={this.state.profilePicture}
                size={50}
                style={{
                  margin: 5
                }}
              />
              
              : ''
            }
            iconElementRight={
              (localStorage.getItem('state'))
              ? <FlatButton
                  onClick={this.logout}
                  label="Logout"
                  />
                  
              : ''
            }
          />
          {this.props.children}
          </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
