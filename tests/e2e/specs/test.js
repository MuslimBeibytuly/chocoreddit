// For authoring Nightwatch tests, see
// http://nightwatchjs.org/guide#usage

// TODO: Add nighwatch config for env variables
module.exports = {
  'default e2e tests': (browser) => {
    browser
      .url(process.env.VUE_DEV_SERVER_URL)
      .waitForElementVisible('.Container', 5 * 1000)
      .setValue('#loginUsername', 'YOUR_USERNAME')
      .setValue('#loginPassword', 'YOUR_PASSWORD')
      .click('.AnimatedForm__submitButton')
      .waitForElementVisible('input[name=authorize]', 10 * 1000)
      .click('input[name=authorize]')
      .waitForElementVisible('#app', 5 * 1000)
      .assert.elementCount('img', 1)
      .end();
  },
};
