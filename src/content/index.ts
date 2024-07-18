import { applyCss } from "./libs/apply-css";
import { Overlay } from "./libs/Overlay";
import { BodyWatcher } from "./libs/BodyWatcher";
import { getPageHeight } from "./libs/utils";

const paperImageUrl = browser.runtime.getURL('images/paper2.jpg');

function initialize() {
    applyCss(`
        html {
            filter: grayscale(100%);
        }

        * {
            border-radius: 0 !important;
        }
    `);

    const overlay = new Overlay(paperImageUrl, getPageHeight());

    const bodyWatcher = new BodyWatcher(() => {
        overlay.setHeight(getPageHeight());
    });
    bodyWatcher.start();

    document.body.appendChild(overlay.getElement());
}

initialize();
