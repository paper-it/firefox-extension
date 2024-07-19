import { applyCss } from "./libs/apply-css";
import { Overlay } from "./libs/Overlay";
import { BodyWatcher } from "./libs/BodyWatcher";
import { getPageHeight } from "./libs/utils";
import { waitForTag } from "./libs/wait-for-tag";
import { isHtmlDocument } from "./libs/is-html-document";

async function initialize() {
    if (!isHtmlDocument()) {
        return;
    }

    const paperImageUrls = [
        browser.runtime.getURL('images/paper1.jpg'),
        browser.runtime.getURL('images/paper2.jpg')
    ];

    await waitForTag('head');

    applyCss(`
        html {
            filter: grayscale(100%);
        }

        * {
            border-radius: 0 !important;
        }
    `);

    const body = await waitForTag('body');
    const overlay = new Overlay(paperImageUrls[1], getPageHeight());
    const bodyWatcher = new BodyWatcher(() => {
        overlay.setHeight(getPageHeight());
    });

    body.appendChild(overlay.getElement());
    bodyWatcher.start();
}

initialize()
    .catch(error => console.error(error));
