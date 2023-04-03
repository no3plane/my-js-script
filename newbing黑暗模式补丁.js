// ==UserScript==
// @name         newbing黑暗模式补丁
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  try to take over the world!
// @author       You
// @match        https://www.bing.com/search?q=Bing+AI&showconv=1
// @grant        none
// ==/UserScript==

(async function () {
  'use strict';
  await waitLoaded(5000);
  if (isDarkTheme()) {
    patch();
  }
})();

function sleep(ms) {
  return new Promise((resovle) => {
    setTimeout(resovle, ms);
  });
}

async function waitLoaded(maxWaitTime) {
  const interval = maxWaitTime < 200 ? maxWaitTime / 2 : 200;
  const startTime = Date.now();
  while (Date.now() - startTime < maxWaitTime) {
    if (document.querySelector('#b_sydConvCont > cib-serp')) {
      return;
    }
    await sleep(interval);
  }
}

function isDarkTheme() {
  if (!window.matchMedia) {
    return false;
  }
  return window.matchMedia('(prefers-color-scheme: dark)').matches;
}

function patch() {
  removeBackgroundImage();
  addCSSRules(`
    * {
      --cib-color-neutral-layer-card: rgb(0 0 0) !IMPORTANT;
      --cib-color-neutral-input-inverted: rgb(0 0 0) !IMPORTANT;
      --cib-color-brand-secondary-background: rgb(0 0 0) !IMPORTANT;
      --cib-color-neutral-foreground: var(--darkreader-text--cib-color-neutral-foreground) !IMPORTANT;
    }`);
}

function removeBackgroundImage() {
  const centerImgNodes = document
    .querySelector('#b_sydConvCont > cib-serp')
    .shadowRoot.querySelector('cib-background')
    .shadowRoot.querySelectorAll('.image');

  const topImgNodes = document
    .querySelector('#b_sydConvCont > cib-serp')
    .shadowRoot.querySelector('#cib-conversation-main')
    .shadowRoot.querySelector('div.scroller > div.fade.top > cib-background')
    .shadowRoot.querySelectorAll('.image');

  const bottomImgNodes = document
    .querySelector('#b_sydConvCont > cib-serp')
    .shadowRoot.querySelector('#cib-conversation-main')
    .shadowRoot.querySelector('div.scroller > div.fade.bottom > cib-background')
    .shadowRoot.querySelectorAll('.image');

  for (const node of [...centerImgNodes, ...topImgNodes, ...bottomImgNodes]) {
    node.remove();
  }
}

function addCSSRules(rules) {
  const style = document.createElement('style');
  document.head.appendChild(style);
  style.sheet.insertRule(rules);
}
