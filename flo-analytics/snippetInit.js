window.intFloGrow = function () {
  console.log("init.js executed");

  let insertScript = document.createElement("script");

  insertScript.setAttribute(
    "src",
    "chrome-extension://" + chrome.runtime.id + "/analytics.js"
    // "https://plausible.io/js/script.js"
  );
  insertScript.setAttribute(
    "data-domain",
    "exceed.story-demo.ogn-review.net"
    // "https://plausible.io/js/script.js"
  );

  insertScript.setAttribute(
    "data-api",
    "https://analytics.flolio.com/api/event"
    // "https://plausible.io/js/script.js"
  );

  insertScript.setAttribute(
    "defer",
    true
    // "https://plausible.io/js/script.js"
  );
  insertScript.onload = () => {
    console.log("script loaded");
    loadEventScript();
  };
  // insertScript.setAttribute("type", "module");
  window.myAnalyticsScript = insertScript;
  document.head.appendChild(insertScript);

  //   let domainScript = document.createElement("script");

  //   insertScript.setAttribute(
  //     "src",
  //     "chrome-extension://" + chrome.runtime.id + "/analytics.js"
  //     // "https://plausible.io/js/script.js"
  //   );
  //   insertScript.onload = () => {
  //     console.log("script loaded");
  //   };
  //   insertScript.setAttribute("type", "module");
  //   document.head.appendChild(insertScript);
};

intFloGrow();

function loadEventScript() {
  let domainScript = document.createElement("script");

  domainScript.setAttribute(
    "src",
    "chrome-extension://" + chrome.runtime.id + "/events.js"
    // "https://plausible.io/js/script.js"
  );
  domainScript.onload = () => {
    console.log("script loaded");
  };
  domainScript.setAttribute("type", "module");
  document.head.appendChild(domainScript);
}
