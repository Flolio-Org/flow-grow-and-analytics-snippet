import {
  getUTMParamsFromURL,
  handleBuyNowClick,
  captureSignupEvent,
} from "./affLink.js";
import config from "./config.js";
import { setBuyNowListener, addListenerForSuccessPopup } from "./nbaUtils.js";

addEventListener("load", (event) => {
  // (function () {
  // console.log("hello");

  // addEventListener("DOMContentLoaded", (event) => {
  setTimeout(() => {
    getUTMParamsFromURL();
  }, 1000);
  if (window?.location?.href?.includes(config.signUpPath)) {
    captureSignupEvent();
  }
  selectorListener();
  // });
})();

(function (history) {
  var pushState = history.pushState;
  history.pushState = function (state) {
    if (typeof history.onpushstate == "function") {
      history.onpushstate({ state: state });
    }
    if (state?.url?.includes(config.signUpPath)) {
      captureSignupEvent();
    }
    selectorListener();
    return pushState.apply(history, arguments);
  };
})(window.history);

addEventListener("popstate", (event) => {
  selectorListener();
  if (state?.url?.includes(config.signUpPath)) {
    captureSignupEvent();
  }
});

function selectorListener() {
  setTimeout(() => {
    addListenerForSuccessPopup();
  }, 3000);
  setTimeout(() => {
    setBuyNowListener(
      config.pageSelectors[config.snippetId].buyNowButton,
      handleBuyNowClick
    );
  }, 4000);
}
