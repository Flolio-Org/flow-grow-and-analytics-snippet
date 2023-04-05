const EVENTS = {
  CONNECT_WALLET: "Connect Wallet",
  PURCHASED: "Purchased",
  MINTED: "Minted",
  BUY_NOW_CLICK: "Buy Now Click",
  MINT_CLICK: "Mint Click",
};

export default {
  API_URL: "",
  EVENTS,
  SELECTORS: {
    MINT_BTN: {
      event: EVENTS.MINT_CLICK,
      element: function () {
        return new Array(...document.querySelectorAll("button")).filter(
          (i) => i.innerHTML === "Mint"
        )[0];
      },
    },
    MINT_WITH_CREDIT_BTN: {
      event: EVENTS.MINT_CLICK,
      element: function () {
        return new Array(...document.querySelectorAll("button")).filter(
          (i) => i.innerHTML === "Mint with Credit Card"
        )[0];
      },
    },
    BUY_BTN: {
      event: EVENTS.BUY_NOW_CLICK,
      element: function () {
        return new Array(...document.querySelectorAll("button")).filter(
          (i) => i.innerHTML === "Buy"
        )[0];
      },
    },
    BUY_WITH_CREDIT_BTN: {
      event: EVENTS.BUY_NOW_CLICK,
      element: function () {
        return new Array(...document.querySelectorAll("button")).filter(
          (i) => i.innerHTML === "Buy with Credit Card"
        )[0];
      },
    },
    SUCCESS_POPUP_MSG: {
      element: function () {
        return new Array(...document.querySelectorAll("div")).filter((i) =>
          i.innerHTML.includes("You now own")
        )[0];
      },
    },
    VIEW_COLLECTION_BTN: {
      element: function () {
        return new Array(...document.querySelectorAll("button")).filter((i) =>
          i.innerHTML.includes("View Collection")
        )[0];
      },
    },
    NFT_TOKEN_ID: {
      element: function () {
        const el = new Array(...document.querySelectorAll("div")).filter(
          (i) => i.innerHTML === "Token ID"
        )[0];
        return el?.nextSibling?.innerHTML || null;
      },
    },
    AMOUNT: {
      element: function () {
        return document.querySelector(".text-4xl.font-bold")?.innerHTML;
      },
    },
  },
};
