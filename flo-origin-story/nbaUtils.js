/**
 * nbatopshot;
 * add check for purchase page nba top-shot
 * https://nbatopshot.com/order/moment-purchase/c77293f2-b7e4-4491-ac5a-d99e05006cb1?isFromPurchase=true&isFromOnboarding=false&requestID=p2p%3A6a39a3b9-84c3-484e-b0b8-34af924da5cb&status=tx_submitted
 * https://nbatopshot.com/order/packs/8b85b387-3190-4e3f-9ab9-6b82bb5966d7?opening=true
 */

import { handlePurchaseTrack } from "./affLink.js";
import config from "./config.js";

export function getWalletAddress() {
  const cookies =
    Object.fromEntries(
      document.cookie.split(/; */).map(function (c) {
        let index = c.indexOf("="); // Find the index of the first equal sign
        let key = c.slice(0, index); // Everything upto the index is the key
        let value = c.slice(index + 1); // Everything after the index is the value

        // Return the key and value
        return [decodeURIComponent(key), decodeURIComponent(value)];
      })
    ) || {};
  return cookies["ajs_user_id"]?.toLocaleLowerCase() ?? null;
}

export function setBuyNowListener(selector, callback) {
  // alert("setting event");
  // alert(document.querySelector(selector));

  // nba top shot and
  selector.map((item) => {
    document.querySelector(item)?.addEventListener("click", (e) => {
      // alert("buy now called");
      callback();
    });
  });
}

export function addListenerForSuccessPopup() {
  setInterval(() => {
    // for second sale
    let transactionURL = new Array(...document.querySelectorAll("a"))
      .find((i) => {
        if (i.innerText === config.flowScanText) {
          return i;
        }
      })
      ?.getAttribute("href")
      ?.split("/");
    if (transactionURL) {
      handlePurchaseTrack();
    }
    // for pack sale
    let packButton = new Array(
      ...document.querySelectorAll("button > span")
    ).find((i) => {
      if (i.innerHTML === config.flowButtonText) {
        return i;
      }
    });
    if (packButton) {
      handlePurchaseTrack();
    }
  }, 5000);
}
