import { Overlay } from "./libs/Overlay";
import { BodyWatcher } from "./libs/BodyWatcher";
import { FilterLevel, StylesManager } from "./libs/StylesManager";
import { getPageHeight, isHtmlDocument, waitForTag } from "./libs/utils";

async function initialize() {
    if (!isHtmlDocument()) {
        return;
    }

    const paperImageUrls = [
        browser.runtime.getURL('images/paper1.jpg'),
        browser.runtime.getURL('images/paper2.jpg')
    ];

    await waitForTag('head');

    const stylesManager = new StylesManager();
    stylesManager.grayscaleLevel = FilterLevel.Ten;
    stylesManager.contrastLevel = FilterLevel.Zero;
    stylesManager.isBorderRadiusDisabled = true;
    stylesManager.apply();

    const body = await waitForTag('body');
    const overlay = new Overlay(paperImageUrls[1], getPageHeight());
    body.appendChild(overlay.getElement());

    const bodyWatcher = new BodyWatcher(() => {
        overlay.setHeight(getPageHeight());
    });
    bodyWatcher.start();
}

initialize()
    .catch(error => console.error(error));
