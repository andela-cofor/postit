// import merge from 'merge';
// jest.dontMock('../store/ChatStore');
// jest.dontMock(merge);  

describe('ChatStore', function() {

  var ChatStore = require('../../store/ChatStore.js');

  // mock actions inside dispatch payloads
  var actionTodoCreate = {
    source: 'channelsReceived',
    action: {
      actionType: ChatStore,
      text: 'foo'
    }
  };
  // var actionTodoDestroy = {
  //   source: 'VIEW_ACTION',
  //   action: {
  //     actionType: ChatStore.TODO_DESTROY,
  //     id: 'replace me in test'
  //   }
  // };

  var AppDispatcher;
  var ChatStore;
  var callback;

  beforeEach(function() {
    // AppDispatcher = require('../../dispatcher/AppDispatcher');
    ChatStore = require('../../store/ChatStore');
    callback = AppDispatcher.register.mock.calls[0][0];
  });

  it('registers a callback with the dispatcher', function() {
    expect(AppDispatcher.register.mock.calls.length).toBe(1);
  });

  it('initializes with no to-do items', function() {
    var all = TodoStore.getAll();
    expect(all).toEqual({});
  });

  it('creates a to-do item', function() {
    callback(actionTodoCreate);
    var all = TodoStore.getAll();
    var keys = Object.keys(all);
    expect(keys.length).toBe(1);
    expect(all[keys[0]].text).toEqual('foo');
  });

  it('destroys a to-do item', function() {
    callback(actionTodoCreate);
    var all = TodoStore.getAll();
    var keys = Object.keys(all);
    expect(keys.length).toBe(1);
    actionTodoDestroy.action.id = keys[0];
    callback(actionTodoDestroy);
    expect(all[keys[0]]).toBeUndefined();
  });
});