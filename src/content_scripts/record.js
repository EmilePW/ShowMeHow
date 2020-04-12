import { CLICK, TYPE, SCROLL, GOTO, INPUT } from "../helpers/actionTypes";
import { SAVE_ACTION } from "../helpers/messageTypes";
import { select } from "optimal-select";

// Send the action to the background page to be saved in state
const saveAction = (type, params) =>
  chrome.runtime.sendMessage({
    type: SAVE_ACTION,
    action: { type, ...params },
  });

let lastScroll = null;
let scrollInterval = null;

const extractScrollAction = (e, callback) => {
  // Save the scrolling event when scrolling has finished
  // (no scrolling in the previous one second)
  const handleScrollEnd = () => {
    if (Date.now() - lastScroll.timestamp > 1000) {
      const { offsetX, offsetY } = lastScroll;
      lastScroll = null;
      clearInterval(scrollInterval);
      return saveAction(SCROLL, { offsetX, offsetY });
    }
  };

  if (!lastScroll) scrollInterval = setInterval(handleScrollEnd, 1000);

  // Record each scroll event to be squashed into a single action later
  lastScroll = {
    offsetX: window.pageXOffset,
    offsetY: window.pageYOffset,
    timestamp: Date.now(),
  };
};

export const recordActions = () => {
  // Save initial conditions for the recording to start from
  const initialConditions = {
    url: window.location.href,
    viewportHeight: document.documentElement.clientHeight,
    viewportWidth: document.documentElement.clientWidth,
  };

  saveAction(GOTO, { url: initialConditions.url });

  window.addEventListener("scroll", extractScrollAction);
  window.addEventListener("click", (e) =>
    saveAction(CLICK, { selector: select(e.target) })
  );
  window.addEventListener("input", (e) =>
    saveAction(INPUT, { input: e.target.value, selector: select(e.target) })
  );
  window.addEventListener("keypress", (e) =>
    saveAction(TYPE, { key: e.code, selector: select(e.target) })
  );
};
