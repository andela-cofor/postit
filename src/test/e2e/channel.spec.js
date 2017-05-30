import config from './config';

module.exports = {
  'Channel Card': (browser) => {
    browser
      .url(config.url)
      .waitForElementVisible('body')
      .assert.elementPresent('#email')
      .assert.elementPresent('#password')
      .setValue('#email', 'for@test.com')
      .setValue('#password', 'netbeans')
      .assert.elementPresent('#submit')
      .click('#submit')
      .pause(20000)
      .assert.urlEquals('http://localhost:8080/chat')
      .assert.elementPresent('#channelCard')
      .end();
  },
};
