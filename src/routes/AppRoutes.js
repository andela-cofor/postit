import React from 'react';
import App from '../components/App.jsx';
import Chat from '../components/Chat.jsx';
import Login from '../components/Login.jsx';
import { Router, browserHistory, Route, IndexRoute} from 'react-router';

// let Route = Router.Route;
// let DefaultRoute = Router.DefaultRoute;

let routes = (
    <Route path="/" component={App}>
      <Route component={Chat} />
      <Route path="chat" component={Chat} />
      <IndexRoute path="/login" component={Login} />
    </Route>
);

class AppRoutes extends React.Component {
  render() {
    return <Router routes={routes} history={browserHistory} />
  }
}

export default AppRoutes;

// Router.run(routes, Router.HashLocation, (Root)=> {
//   React.render(<Root />, document.getElementById('container'))
// });