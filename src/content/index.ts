import { Overlay } from "./libs/Overlay";
import { BodyWatcher } from "./libs/BodyWatcher";
import { StylesManager } from "./libs/StylesManager";
import { SettingsManager } from "../shared/settings";
import { getPaperImageUrls } from "../shared/get-paper-image-urls";
import { getPageHeight, isHtmlDocument, waitForTag } from "./libs/utils";

async function initialize() {
    if (!isHtmlDocument()) {
        return;
    }

    const settingsManager = new SettingsManager();
    const settings = await settingsManager.forHostname(document.location.hostname);
    const paperImageUrls = getPaperImageUrls();

    await waitForTag('head');

    const stylesManager = new StylesManager();
    stylesManager.grayscaleLevel = settings.grayscaleLevel;
    stylesManager.contrastLevel = settings.contrastLevel;
    stylesManager.isBorderRadiusDisabled = settings.isBorderRadiusDisabled;
    stylesManager.apply();

    const body = await waitForTag('body');
    const overlay = new Overlay(paperImageUrls[settings.backgroundPaperIndex], getPageHeight());
    body.appendChild(overlay.getElement());

    const bodyWatcher = new BodyWatcher(() => {
        overlay.setHeight(getPageHeight());
    });
    bodyWatcher.start();
}

initialize()
    .catch(error => console.error(error));
