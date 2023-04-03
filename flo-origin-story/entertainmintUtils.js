/**
 * entertainmint
 */

import { handlePurchaseTrack } from "./affLink.js";
import config from "./config.js";

export function getWalletAddress() {
  let storageData = localStorage.getItem("walletAddress");
  return storageData?.toLocaleLowerCase();
}

export function setBuyNowListener(selector, callback) {
  // alert("setting event");
  // alert(document.querySelector(selector));

  selector.map((item) => {
    new Array(...document.querySelectorAll("button"))
      .filter((i) => i.innerText === item)
      .map((i) =>
        i.addEventListener("click", () => {
          callback();
        })
      );
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
  }, 5000);
}
