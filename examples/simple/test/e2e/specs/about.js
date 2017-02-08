// http://nightwatchjs.org/guide#usage
export default {
  'page /about': (browser) => {
    const url = browser.globals.devServerUrl
    browser.
      url(`${url}/about`).
      waitForElementVisible('#app', 5000).
      assert.elementPresent('.about-view').
      assert.containsText('h1', 'about vue').
      end()
  },
}
