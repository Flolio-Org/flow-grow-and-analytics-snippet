export default {
  apiURL: "https://evtt.flolio.dev",
  // apiURL: "http://localhost:3011",
  snippetId: "nbatopshot",
  dapperIdKey: "TOS_SIGNED", // nba top shot
  signUpPath: "creating-account",
  flowButtonText: "Open your pack",
  // flowScanText: "View Transaction on Flowscan", // nfl all day
  flowScanText: "Flow Transaction", // nba topshot
  // flowScanText: "Flow transaction", // ufc strike
  pageSelectors: {
    nbatopshot: {
      buyNowButton: [
        '[data-testid="buyMoment"]',
        '[data-testid="PackListing-purchasePack-button"]',
        ".chakra-button.css-vp0tna",
      ],
    },
    // nflallday: { buyNowButton: ['[data-testid="CAN_BUY"] > button'] }, NOT WORKING
    nflallday: { buyNowButton: ["Select and Buy"] },
    ufcstrike: { buyNowButton: ["Select and Buy"] },
    entertainmint: {
      buyNowButton: ["Buy with crypto", "Buy with credit card"],
    },
  },
};

/*** 
 * https://evtt.flolio.dev/t/e?
wallet_address=undefined&page_url=https%3А%2F%2Fnbat opshot.com%2%3Fajs_aid%3D64fff314-6918-448c-b169-b52cac7990d2&action=signUp&off er_type=dapper_wallet_signups&dapperld=TOS_SIGNED_auth0%7
C634e1a626fee4a931e1f8 de
 */
