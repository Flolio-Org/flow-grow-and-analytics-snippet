window.intFloGrow = function () {
  console.log("init.js executed");

  let insertScript = document.createElement("script");

  insertScript.setAttribute(
    "src",
    "chrome-extension://" + chrome.runtime.id + "/init.js"
    // "https://plausible.io/js/script.js"
  );

  insertScript.onload = () => {
    console.log("script loaded");
    loadEventScript();
  };
  insertScript.setAttribute("type", "module");
  document.head.appendChild(insertScript);
};

intFloGrow();
