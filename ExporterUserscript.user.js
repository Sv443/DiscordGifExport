// ==UserScript==
// @name        Discord GIF Exporter
// @version     1.0.1
// @description Collects a list of all Discord GIF URLs and exports them
// @author      Sv443
// @copyright   Sv443 (https://github.com/Sv443)
// @homepageURL https://github.com/Sv443/DiscordGifExport
// @supportURL  https://github.com/Sv443/DiscordGifExport/issues
// @namespace   https://github.com/Sv443
// @license     MIT
// @match       https://discord.com/*
// @run-at      document-start
// @grant       GM.registerMenuCommand
// @require     https://unpkg.com/@sv443-network/userutils@10.0.6/dist/UserUtils.umd.js
// @noframes
// @updateURL   https://github.com/Sv443/DiscordGifExport/raw/refs/heads/main/ExporterUserscript.user.js
// @downloadURL https://github.com/Sv443/DiscordGifExport/raw/refs/heads/main/ExporterUserscript.user.js
// ==/UserScript==

const gifContainerSelector = "#gif-picker-tab-panel > div:nth-of-type(2)";

const gifUrls = new Set();

const gifObserver = new UserUtils.SelectorObserver(gifContainerSelector, {
  defaultDebounce: 250,
  enableOnAddListener: false,
});

function run() {
  gifObserver.addListener("div[data-selected] video[src]", {
    all: true,
    continuous: true,
    listener: findGifLinks,
  });

  const ac = new AbortController();

  UserUtils.setImmediateInterval(() => {
    if(document.querySelector(gifContainerSelector)) {
      ac.abort();
      gifObserver.enable();
    }
  }, 250, ac.signal);
}

function findGifLinks(videoElements) {
  for(const elem of videoElements) {
    if(elem.src)
      gifUrls.add(elem.src);
  }
}

function downloadFile(fileName, data, mimeType = "text/plain") {
    const blob = data instanceof Blob ? data : new Blob([data], { type: mimeType });
    const a = document.createElement("a");
    a.classList.add("bytm-hidden");
    a.href = URL.createObjectURL(blob);
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    setTimeout(() => a.remove(), 1);
}

GM.registerMenuCommand("Export to file", () => {
  downloadFile("gifs.json", JSON.stringify([...gifUrls], undefined, 4), "application/json");
});

GM.registerMenuCommand("Export to console", () => {
  console.log("[GIF EXPORT] >>>>>>>>>>>>>>>>>>>>>>>\n", [...gifUrls]);
});

document.addEventListener("DOMContentLoaded", run);
