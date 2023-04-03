import { getWalletAddress } from "./nbaUtils.js";
import config from "./config.js";

export function getUTMParamsFromURL() {
  const currentPageURL = new URL(window.location.href);
  const allQueryData = Object.fromEntries(currentPageURL.searchParams);

  for (const key in allQueryData) {
    if (!key.includes("utm") || allQueryData[key] === undefined) {
      delete allQueryData[key];
    }
  }

  let utm_params = localStorage.getItem("flow_utm_params");
  utm_params = utm_params ? JSON.parse(utm_params) : {};

  if (utm_params.utm_id !== allQueryData.utm_id) {
    captureVisit(allQueryData);
  }

  if (allQueryData.utm_source) {
    // alert(JSON.stringify({ ...allQueryData }));
    localStorage.setItem(
      "flow_utm_params",
      JSON.stringify({ ...allQueryData })
    );
  }
}

export function getPayloadInformationForPurchase() {
  const url = new URL(window.location.href);
  let orderId = null;

  if (
    url.pathname.includes("order/moment-purchase") ||
    url.pathname.includes("order/packs")
  ) {
    const path = url.pathname.split("");
    orderId = path[path.length - 1];
  }
  let purchase_type = url.pathname.includes("order/packs")
    ? "packdrop_sales"
    : "secondary_sales";

  let utm_params = localStorage.getItem("flow_utm_params");
  let transactionURL = new Array(...document.querySelectorAll("a"))
    .find((i) => {
      if (i.innerText === config.flowScanText) {
        return i;
      }
    })
    ?.getAttribute("href")
    ?.split("/");

  let transaction_hash = transactionURL[transactionURL.length - 1];
  let utmParams = utm_params ? JSON.parse(utm_params) : {};
  let body = {
    wallet_address: getWalletAddress(),
    ...utmParams,
    orderId,
    page_url: window.location.href,
    transaction_hash,
    offer_type: purchase_type,
    dapperId: getDapperId(),
  };
  return utmParams?.utm_source ? body : null;
}

export async function handleBuyNowClick() {
  let utm_params = localStorage.getItem("flow_utm_params");

  utm_params = utm_params ? JSON.parse(utm_params) : {};

  let purchase_type = window.location.href.includes("/pack/")
    ? "packdrop_sales"
    : "secondary_sales";

  let action_type = "buy-now-click";

  let body = {
    wallet_address: getWalletAddress(),
    ...utm_params,
    page_url: window.location.href,
    action: action_type,
    dapperId: getDapperId(),
    offer_type: purchase_type, // for nba top-shot only
  };

  const searchParams = new URLSearchParams(body);
  // console.log(`${config.apiURL}/t/e?${searchParams.toString()}`);
  // alert(`${config.apiURL}/t/e?${searchParams.toString()}`);
  // api call for pre_purchase
  if (body.utm_source) {
    const res = await fetch(`${config.apiURL}/t/e?${searchParams.toString()}`);
    // alert(res.toString());
  }
}

export async function handlePurchaseTrack() {
  const body = getPayloadInformationForPurchase();

  // api call for after_purchase
  if (body) {
    const searchParams = new URLSearchParams(body);
    // alert(`${config.apiURL}/t/sale?${searchParams.toString()}`);
    // console.log(`${config.apiURL}/t/sale?${searchParams.toString()}`);
    const res = await fetch(
      `${config.apiURL}/t/sale?${searchParams.toString()}`
    );
    // alert(res.toString());
    console.log(await res.json());
    if (res) {
      localStorage.removeItem("flow_utm_params");
    }
  }
}

export async function captureVisit(utmParams) {
  let body = {
    wallet_address: getWalletAddress(),
    ...utmParams,
    page_url: window.location.href,
    action: "visit",
    dapperId: getDapperId(),
  };

  const searchParams = new URLSearchParams(body);
  // console.log(`${config.apiURL}/t/e?${searchParams.toString()}`);
  // alert(`${config.apiURL}/t/e?${searchParams.toString()}`);

  if (body.utm_source) {
    const res = await fetch(`${config.apiURL}/t/e?${searchParams.toString()}`);
    // alert(res.toString());
  }
}

export function getDapperId() {
  const localStorageItems = { ...localStorage };
  const dapperKey =
    Object.keys(localStorageItems).find((key) =>
      key.includes(config.dapperIdKey)
    ) || "";
  return dapperKey.replace("TOS_SIGNED_", "");
}

export async function captureSignupEvent() {
  setTimeout(async () => {
    try {
      let utmParams = localStorage.getItem("flow_utm_params");
      utmParams = utmParams ? JSON.parse(utmParams) : {};

      let body = {
        wallet_address: getWalletAddress(),
        ...utmParams,
        page_url: window.location.href,
        action: "signUp",
        offer_type: "dapper_wallet_signups",
        dapperId: getDapperId(),
      };

      const searchParams = new URLSearchParams(body);
      // console.log(`${config.apiURL}/t/e?${searchParams.toString()}`);
      // alert(`${config.apiURL}/t/e?${searchParams.toString()}`);

      const res = await fetch(
        `${config.apiURL}/t/sale?${searchParams.toString()}`
      );
    } catch (error) {
      // alert(error.toString());
    }
    // alert(res.toString());
  }, 5000);
}
