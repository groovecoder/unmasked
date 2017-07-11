/* globals browser */
'use strict';

// When the user opens an Incognito window, capture 3rd-party requests
browser.windows.onCreated.addListener((win) => {
  if (win.incognito) {
    capture.init(win.id)
  }
})

// When the user closes an Incognito window, show trackers
browser.windows.onRemoved.addListener((win) => {
  console.log('Removing win: ', win)
  console.log(`capture.windows[${win.id}]: `, windows[win.id])
  delete windows[win.id]
})
