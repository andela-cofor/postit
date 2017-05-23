import React from 'react';
import AppBar from 'material-ui/AppBar';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import * as Colors from 'material-ui/styles/colors';
import { browserHistory } from 'react-router';
import Avatar from 'material-ui/Avatar';
import Login from './Login.jsx';

const firebase = require('firebase/app');
require('firebase/auth');
require('firebase/database');

const ThemeManager = getMuiTheme;

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
    ThemeManager({ palette: {
      primary1Color: Colors.blue500,
      accent1Color: Colors.pink400
    } });

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
            iconElementRight={
              <Avatar
                onClick={this.onClick}
                src=""
                size={50}
                style={{
                  margin: 5
                }}
              />
            }
          />
          {this.props.children}
          </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
