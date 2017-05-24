import config from './config';

module.exports = {
  'Add Channel': (browser) => {
    browser
      .url(config.url)
      .waitForElementVisible('body')
      .assert.elementPresent('#email')
      .assert.elementPresent('#password')
      .assert.elementPresent('#submit')
      .setValue('#email', 'v@e.com')
      .setValue('#password', 'netbeans')
      .click('#submit')
      .pause(10000)
      .assert.urlEquals('http://localhost:8080/chat')
      .assert.elementPresent('#addChannel')
      .setValue('#addChannel', 'Test-Group1')
      .end();
  },
  'Add Friend Email': (browser) => {
    browser
      .url(config.url)
      .waitForElementVisible('body')
      .assert.elementPresent('#email')
      .assert.elementPresent('#password')
      .assert.elementPresent('#submit')
      .setValue('#email', 'v@e.com')
      .setValue('#password', 'netbeans')
      .click('#submit')
      .pause(10000)
      .assert.urlEquals('http://localhost:8080/chat')
      .assert.elementPresent('#inviteFriendEmail')
      .setValue('#inviteFriendEmail', 'chinedu.ofor@gmail.com')
      .end();
  },
  'Add Friend': (browser) => {
    browser
      .url(config.url)
      .waitForElementVisible('body')
      .assert.elementPresent('#email')
      .assert.elementPresent('#password')
      .assert.elementPresent('#submit')
      .setValue('#email', 'v@e.com')
      .setValue('#password', 'netbeans')
      .click('#submit')
      .pause(10000)
      .assert.urlEquals('http://localhost:8080/chat')
      .assert.elementPresent('#inviteFriend')
      .setValue('#inviteFriend', '07030296746')
      .end();
  },
  'Chat with friend': (browser) => {
    browser
      .url(config.url)
      .waitForElementVisible('body')
      .assert.elementPresent('#email')
      .assert.elementPresent('#password')
      .assert.elementPresent('#submit')
      .setValue('#email', 'v@e.com')
      .setValue('#password', 'netbeans')
      .click('#submit')
      .pause(10000)
      .assert.urlEquals('http://localhost:8080/chat')
      .assert.elementPresent('#messageArea')
      .assert.elementPresent('#normal')
      .assert.elementPresent('#urgent')
      .assert.elementPresent('#critical')
      .end();
  },
};