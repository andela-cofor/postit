import alt from '../alt/';
import Actions from '../actions/';
import {decorate, bind, dataSource} from 'alt-utils/lib/decorators'

@decorate(alt)
class ChatStore {
  constructor() {
      this.state = {user: null}
  }

  @bind(Actions.login)
  login(user){
    this.setState({user: user})
  }

}

export default alt.createStore(ChatStore);
