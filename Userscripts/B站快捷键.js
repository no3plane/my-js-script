// ==UserScript==
// @name         B站直播快捷键
// @version      0.1
// @description  给B站直播的全屏、网页全屏、弹幕添加快捷键L、W、D
// @author       LG
// @include      /https?:\/\/live\.bilibili\.com\/\d+\??.*/
// @include      /https?:\/\/live\.bilibili\.com\/(blanc\/)?\d+\??.*/
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    liveKeyMapping();
})();

function liveKeyMapping() {
    /* L -> Fullscreen */
    bindKey('l', () => {
        showPlayerController();
        document.querySelector(".control-area > .right-area > div:nth-child(1) > div > span").click();
    });
    /* W -> webFullscreen */
    bindKey('w', () => {
        showPlayerController();
        document.querySelector(".control-area > .right-area > div:nth-child(2) > div > span").click();
    }, true);
    /* D -> toggleDanmaku */
    bindKey('d', () => {
        showPlayerController();
        document.querySelector(".control-area > .right-area > div:nth-child(4) > div > span").click();
    });
}

function normalKeyMapping() {
    /* L -> Fullscreen */
    bindKey('l', () => {
        document.querySelector(".bpx-player-ctrl-full").click();
    });
    /* W -> webFullscreen */
    bindKey('w', () => {
        document.querySelector(".bpx-player-ctrl-web").click();
    }, true);
}

function showPlayerController() {
    let player = document.querySelector("#live-player");
    if(!player) {
        throw new Error("cannot find player");
    }
    let event = new MouseEvent("mousemove", {
        screenX: 579,
        screenY: 460,
        clientX: 579,
        clientY: 357,
    });
    player.dispatchEvent(event);
}

function bindKey(key, handler, stopPropagation = false) {
    document.addEventListener("keydown", (e) => {
        if (e.key === key && !e.ctrlKey && !e.altKey && !e.shiftKey && !e.metaKey) {
            handler(e);
            if (stopPropagation) {
                e.stopImmediatePropagation();
            }
        }
    });
}
