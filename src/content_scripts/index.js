import { START_RECORDING } from "../helpers/messageTypes";
import { recordActions } from "./record";

chrome.runtime.onConnect.addListener((port) => {
  port.onMessage.addListener((msg) => {
    switch (msg.type) {
      case START_RECORDING:
        return recordActions();
      default:
        return;
    }
  });
});
