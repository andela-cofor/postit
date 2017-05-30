import config from './config';

module.exports = {
  'Forget Password': (browser) => {
    browser
      .url(config.url)
      .waitForElementVisible('body')
      .assert.elementPresent('#fPassword')
      .click('#fPassword')
      .end()
  },
  'Login with Email': (browser) => {
    browser
      .url(config.url)
      .waitForElementVisible('body')
      .assert.elementPresent('#email')
      .assert.elementPresent('#password')
      .assert.elementPresent('#submit')
      .setValue('#email', 'c@ofor.com')
      .setValue('#password', 'john@1d')
      .click('#submit')
      .pause(10000)
      .assert.urlEquals('http://localhost:8080/chat')
  },
  'Login with Google Account': (browser) => {
    browser
      .url(config.url)
      .waitForElementVisible('body')
      .assert.elementPresent('#loginWithGoogle')
      .click('#loginWithGoogle')
      .pause(10000)
  }
};