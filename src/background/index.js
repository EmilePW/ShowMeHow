import { START_RECORDING, SAVE_ACTION } from "../helpers/messageTypes";
import { sendToCurrentTab } from "./messaging";

chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse) {
  switch (msg.type) {
    case START_RECORDING:
      // Forward to content script
      return sendToCurrentTab({ type: START_RECORDING });
    case SAVE_ACTION:
      return;
    default:
      return;
  }
})
