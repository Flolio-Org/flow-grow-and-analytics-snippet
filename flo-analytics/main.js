import config from "./config.js";
let ANALYTICS_USER_ADDRESS = null;
const mintBtn = config.SELECTORS.MINT_BTN;
const buyBtn = config.SELECTORS.BUY_BTN;
const mintWithCredit = config.SELECTORS.MINT_WITH_CREDIT_BTN;
const buyWithCredit = config.SELECTORS.BUY_WITH_CREDIT_BTN;

// initialize script
eventInit();

function eventInit() {
  setUserAddress(window.ethereum?.selectedAddress); //set address if already available
  addMetamaskConnectObservers(); //set metamask observer
  setBodyMutationObserver(); // set page change observer
}

// run init again if page changed
(function (history) {
  var pushState = history.pushState;
  eventInit();

  history.pushState = function (state) {
    eventInit();
    return pushState.apply(history, arguments);
  };
})(window.history);

window.addEventListener("popstate", function (event) {
  eventInit();
});

// mutation observer
/**
 * check if click listeners are already added, if not
 * add listeners and attach data-attributes to avoid multiple api calls
 */
function setBodyMutationObserver() {
  const floObserver = setInterval(() => {
    setPageClickEventListeners();
    if (
      mintBtn?.element()?.getAttribute("floClickAdded") ||
      buyBtn?.element()?.getAttribute("floClickAdded") ||
      buyWithCredit?.element()?.getAttribute("floClickAdded") ||
      mintWithCredit?.element()?.getAttribute("floClickAdded")
    )
      clearInterval(floObserver);
  }, 2000);
}

function setPageClickEventListeners() {
  // console.log("event listener called");
  if (!mintBtn?.element()?.getAttribute("floClickAdded")) {
    mintBtn?.element()?.setAttribute("floClickAdded", "true");
    mintBtn?.element()?.addEventListener("click", function () {
      triggerEvent(mintBtn.event, {
        walletAddress: getUserAddress(),
      });
      addPageChangeListener("mint");
    });
  }

  if (!buyBtn?.element()?.getAttribute("floClickAdded")) {
    buyBtn?.element()?.setAttribute("floClickAdded", "true");
    buyBtn?.element()?.addEventListener("click", function () {
      triggerEvent(buyBtn.event, {
        walletAddress: getUserAddress(),
        tokenId: config.SELECTORS.NFT_TOKEN_ID.element(),
        amount: config.SELECTORS.AMOUNT.element(),
      });
      addPageChangeListener("purchase");
    });
  }

  if (!mintWithCredit?.element()?.getAttribute("floClickAdded")) {
    mintWithCredit?.element()?.setAttribute("floClickAdded", "true");
    mintWithCredit?.element()?.addEventListener("click", function () {
      triggerEvent(mintWithCredit.event, {
        tokenId: config.SELECTORS.NFT_TOKEN_ID.element(),
      });
      addPageChangeListener("mint");
    });
  }

  if (!buyWithCredit?.element()?.getAttribute("floClickAdded")) {
    buyWithCredit?.element()?.setAttribute("floClickAdded", "true");
    buyWithCredit?.element()?.addEventListener("click", function () {
      triggerEvent(buyWithCredit.event, {
        walletAddress: getUserAddress(),
        tokenId: config.SELECTORS.NFT_TOKEN_ID.element(),
        amount: config.SELECTORS.AMOUNT.element(),
      });
      addPageChangeListener("purchase");
    });
  }
}

function triggerEvent(eventName, params) {
  floliop(eventName, { props: params });
}

function addPageChangeListener(type) {
  const successActionInterval = setInterval(() => {
    const successText = config.SELECTORS.SUCCESS_POPUP_MSG.element();
    const successViewCollectionBtn =
      config.SELECTORS.VIEW_COLLECTION_BTN.element();
    const body = {
      walletAddress: getUserAddress(),
      tokenId: config.SELECTORS.NFT_TOKEN_ID.element(),
      amount: config.SELECTORS.AMOUNT.element(),
    };
    if (successText && successViewCollectionBtn && type === "mint") {
      triggerEvent(config.EVENTS.MINTED, { ...body });
      clearInterval(successActionInterval);
    } else if (successText && type === "purchase") {
      triggerEvent(config.EVENTS.PURCHASED, { ...body });
      clearInterval(successActionInterval);
    }
  }, 5000);
}

// metamask connect observer
function addMetamaskConnectObservers() {
  window.ethereum?.on("accountsChanged", handleAccountsChanged);
}

function handleAccountsChanged(accounts) {
  setUserAddress(accounts[0]);
  if (accounts[0]) {
    triggerEvent(config.EVENTS.CONNECT_WALLET, {
      walletAddress: getUserAddress(),
    });
  }
}

//getter and setters for wallet address
function setUserAddress(add) {
  ANALYTICS_USER_ADDRESS = add;
}

function getUserAddress() {
  return ANALYTICS_USER_ADDRESS;
}
