import config from './config';

module.exports = {
  'Channel Card': (browser) => {
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
      .assert.elementPresent('#channelCard')
      .end();
  },
};
