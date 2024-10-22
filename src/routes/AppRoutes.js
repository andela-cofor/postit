import React from 'react';
import App from '../components/App.jsx';
import Chat from '../components/Chat.jsx';
import Login from '../components/Login.jsx';
import Phone from '../components/phoneBook.jsx'
import Profile from '../components/Profile.jsx'
import SignUp from '../components/SignUp.jsx'
import { Router, browserHistory, Route, IndexRoute} from 'react-router';

let routes = (
  <Route path="/" component={App}>
    <Route component={Chat} />
    <Route path="chat" component={Chat} />
    <Route path="phone" component={Phone} />
    <Route path="signup" component={SignUp} />
    <Route path="profile" component={Profile} />
    <IndexRoute component={Login} />
  </Route>
);

class AppRoutes extends React.Component {
  render() {
    return <Router routes={routes} history={browserHistory} />
  }
}

export default AppRoutes;