import { SupportQuery, Supported, TimeCardOptions, TimeCardOptionsMessage } from './time-card'

function setSupported(isSupported: boolean) {
  const icon = isSupported ? 'icons/icon16.png' : 'icons/gray16.png';
  chrome.action.setIcon({ path: icon });
}

// Whenever the tab changes, check if this tab is supported
chrome.tabs.onActivated.addListener((tabInfo) => {
  setSupported(false);
  const supportQuery: SupportQuery = { messageType: 'support' };
  chrome.tabs.sendMessage(tabInfo.tabId, supportQuery)
    .then(isSupported  => { console.log(`response ${isSupported}`); setSupported(isSupported) })
    // Ignore errors: they are just because we try to send messages to tabs without our content
    // script
    .catch(receivingEndDoesNotExist => null);
});

chrome.runtime.onMessage.addListener((message: Supported) => {
  setSupported(message.supported);
});

chrome.action.onClicked.addListener((tab) => {
  chrome.storage.sync.get().then((settings: TimeCardOptions) => {
    console.dir(settings);
    const options: TimeCardOptionsMessage = { messageType: 'click', ...settings };
    chrome.tabs.sendMessage(tab.id, options);
  });
});