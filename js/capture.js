/* globals browser, URL */
/*
* Listens for HTTP request responses in windows,
* logging 3rd-party requests
*/
let windows = {}

const capture = {

  init (windowId) {
    this.addListeners(windowId)
    windows[windowId] = []
  },

  addListeners (windowId) {
    // listen for each HTTP response
    browser.webRequest.onResponseStarted.addListener(
      (response) => this.logThirdParty(response, windowId),
      {urls: ['<all_urls>'], windowId: windowId}
    )
  },

  // capture third party requests
  async logThirdParty (response, windowId) {
    const tab = await browser.tabs.get(response.tabId)
    const documentUrl = new URL(tab.url)
    const targetUrl = new URL(response.url)
    const originUrl = new URL(response.originUrl)

    if (targetUrl.hostname !== documentUrl.hostname) {
      const data = {
        document: documentUrl.hostname,
        target: targetUrl.hostname,
        origin: originUrl.hostname,
        requestTime: response.timeStamp
      }
      windows[windowId].push(data)
    }
  }
}
