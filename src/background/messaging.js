export const sendToCurrentTab = (msg) => {
  return chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, msg, (response) => {});
  });
};
