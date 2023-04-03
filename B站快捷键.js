
function liveKeyMapping() {
    /* L -> Fullscreen */
    bindKey(76, () => {
        showPlayerController();
        document.querySelector(".control-area > .right-area > div:nth-child(1) > div > span").click();
    });
    /* W -> webFullscreen */
    bindKey(87, () => {
        showPlayerController();
        document.querySelector(".control-area > .right-area > div:nth-child(2) > div > span").click();
    }, true);
    /* D -> toggleDanmaku */
    bindKey(68, () => {
        showPlayerController();
        document.querySelector(".control-area > .right-area > div:nth-child(4) > div > span").click();
    });
}

function normalKeyMapping() {
    /* L -> Fullscreen */
    bindKey(76, () => {
        document.querySelector(".bpx-player-ctrl-full").click();
    });
    /* W -> webFullscreen */
    bindKey(87, () => {
        document.querySelector(".bpx-player-ctrl-web").click();
    }, true);
}

function showPlayerController() {
    let player = document.querySelector("#live-player");
    if (!player) {
        throw new Error("cannot find player");
    }
    let event = new MouseEvent('mousemove', {
        screenX: 579,
        screenY: 460,
        clientX: 579,
        clientY: 357,
    });
    player.dispatchEvent(event);
}

function bindKey(keycode, handler, stopPropagation = false) {
    document.addEventListener("keydown", (e) => {
        if (e.keyCode === keycode) {
            handler(e);
            if (stopPropagation) {
                e.stopImmediatePropagation();
            }
        }
    })
}
