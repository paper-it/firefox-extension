import { Overlay } from "./libs/Overlay";
import { BodyWatcher } from "./libs/BodyWatcher";
import { StylesManager } from "./libs/StylesManager";
import { SettingsManager } from "../shared/settings";
import { getPaperImageUrls } from "../shared/get-paper-image-urls";
import { Event, EventType } from "../shared/Event";
import { getPageHeight, isHtmlDocument, waitForTag } from "./libs/utils";

async function initialize() {
    if (!isHtmlDocument()) {
        return;
    }

    await waitForTag('head');

    const settingsManager = new SettingsManager();
    const stylesManager = new StylesManager();
    const paperImageUrls = getPaperImageUrls();

    const body = await waitForTag('body');
    const overlay = new Overlay(getPageHeight());

    async function applySettings() {
        const settings = await settingsManager.getSettings();

        stylesManager.grayscaleLevel = settings.grayscaleLevel;
        stylesManager.contrastLevel = settings.contrastLevel;
        stylesManager.isBorderRadiusDisabled = settings.isBorderRadiusDisabled;
        stylesManager.apply();

        overlay.setImageUrl(paperImageUrls[settings.backgroundPaperIndex]);
    }

    body.appendChild(overlay.getElement());

    applySettings();

    const bodyWatcher = new BodyWatcher(() => {
        overlay.setHeight(getPageHeight());
    });
    bodyWatcher.start();

    browser.runtime.onMessage.addListener((event: Event) => {
        if (event.type === EventType.SettingsUpdated) {
            applySettings();
        }
    });
}

initialize()
    .catch(error => console.error(error));
