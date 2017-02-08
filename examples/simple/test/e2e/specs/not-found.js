export default {
  'page /404': (browser) => {
    const url = browser.globals.devServerUrl
    browser.
      url(`${url}/404`).
      waitForElementVisible('#app', 5000).
      assert.elementPresent('.not-found-view').
      assert.containsText('h1', '404').
      assert.containsText('p', 'Not Found').
      end()
  },
}
