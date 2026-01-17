// ==UserScript==
// @name        Discord Tenor Favorites Exporter
// @description Collects a list of all favorite GIFs from Tenor to export them
// @namespace   https://github.com/Sv443
// @match       https://discord.com/channels/*
// @grant       GM.registerMenuCommand
// @version     1.0
// @author      Sv443
// @run-at      document-start
// @require     https://unpkg.com/@sv443-network/userutils@9.4.4/dist/index.global.js
// @require     https://unpkg.com/@sv443-network/coreutils@2.0.0/dist/CoreUtils.min.umd.js
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

  CoreUtils.setImmediateInterval(() => {
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
