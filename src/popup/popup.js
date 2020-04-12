import { START_RECORDING } from "../helpers/messageTypes";

const record = (e) => {
  // Trigger listening for events in content script
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const port = chrome.tabs.connect(tabs[0].id);
    port.postMessage({ type: START_RECORDING });
    port.onMessage.addListener((response) => {
      // Display recorded events in popup UI
    });
  });
}

document.querySelector("#record").addEventListener("click", record);
