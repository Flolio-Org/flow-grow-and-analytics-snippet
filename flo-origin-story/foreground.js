(function () {
  let insertScript = document.createElement("script");

  insertScript.setAttribute(
    "src",
    "chrome-extension://" + chrome.runtime.id + "/main.js"
  );
  insertScript.onload = () => {
    console.log("script loaded");
  };
  insertScript.setAttribute("type", "module");
  document.head.appendChild(insertScript);
})();
