// ==UserScript==
// @name         B站直播关闭侧边栏
// @version      0.1
// @description  关闭B站直播的侧边栏，增加网页全屏模式下的视频区域空间
// @author       Pssst
// @include      /https?:\/\/live\.bilibili\.com\/\d+\??.*/
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    const buttonHTML = `<div style="cursor: pointer;" class="icon-ctnr live-skin-normal-a-text not-hover">
  <i data-v-d8410226 class="v-middle live-skin-normal-a-text watched-icon">
    <svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
      <path data-v-d8410226="" fill-rule="evenodd" clip-rule="evenodd" d="M2.11423 7.82106C2.99473 6.4744 4.99644 4.08696 7.92954 4.08696C10.8471 4.08696 12.9329 6.4441 13.8782 7.80667C13.9622 7.9277 13.9622 8.0723 13.8782 8.19333C12.9329 9.55589 10.8471 11.913 7.92954 11.913C4.99644 11.913 2.99473 9.52559 2.11423 8.17894C2.04036 8.06596 2.04036 7.93404 2.11423 7.82106ZM7.92954 2C3.87151 2 1.33201 5.23978 0.398106 6.66812C-0.132701 7.47995 -0.132703 8.52005 0.398105 9.33188C1.33201 10.7602 3.87151 14 7.92954 14C11.9396 14 14.5648 10.8317 15.5623 9.39381C16.1459 8.55258 16.1459 7.44741 15.5623 6.60619C14.5648 5.16831 11.9396 2 7.92954 2ZM6.77901 8C6.77901 7.30844 7.33208 6.74783 8.01431 6.74783C8.69655 6.74783 9.24961 7.30844 9.24961 8C9.24961 8.69156 8.69655 9.25217 8.01431 9.25217C7.33208 9.25217 6.77901 8.69156 6.77901 8ZM8.01431 5.07826C6.42243 5.07826 5.13195 6.38637 5.13195 8C5.13195 9.61363 6.42243 10.9217 8.01431 10.9217C9.6062 10.9217 10.8967 9.61363 10.8967 8C10.8967 6.38637 9.6062 5.07826 8.01431 5.07826Z"></path>
    </svg>
  </i>
  <span class="action-text v-middle watched-text">关闭侧边栏</span>
</div>`;

    function createNode(template) {
        let tempNode = document.createElement('div');
        tempNode.innerHTML = template;
        return tempNode.firstChild;
    }

    function start() {
        const container = document.querySelector('#head-info-vm > div > div > div.upper-row > div.right-ctnr');
        if (!container) {
            return;
        }
        const button = createNode(buttonHTML);
        button.addEventListener('click', function (evt) {
            const sideBar = document.querySelector('#aside-area-vm');
            if (!sideBar) {
                return;
            }
            sideBar.remove();
            const videoScreen = document.querySelector("body > div.live-room-app.p-relative > main > div.app-body.p-relative.m-auto.z-app-body > section.player-and-aside-area.p-relative.z-player-and-aside-area > div.player-ctnr.left-container.p-relative.z-player-ctnr > div.player-section.p-relative.border-box.none-select.z-player-section");
            videoScreen.style.setProperty('width', '100%', 'important');
        });
        container.prepend(button);
    }

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    sleep(1000).then(() => {
        start();
    });

})();