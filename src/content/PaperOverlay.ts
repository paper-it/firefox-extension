import { Overlay } from "./libs/Overlay";
import { StylesManager } from "./libs/StylesManager";
import { BodyWatcher } from "./libs/BodyWatcher";
import { Event, EventType } from "../shared/Event";
import { SettingsManager } from "../shared/settings";
import { getPaperImageUrls } from "../shared/get-paper-image-urls";
import { getPageHeight, waitForTag } from "./libs/utils";


export class PaperOverlay {
    private readonly _settingsManager = new SettingsManager();
    private readonly _stylesManager = new StylesManager();
    private readonly _paperImageUrls = getPaperImageUrls();
    private _overlay = new Overlay(0);

    public async initialize() {
        await waitForTag('head');

        this._stylesManager.initialize();
        await this._applyStyleSettings();

        await waitForTag('body');

        this._initializeBodyWatcher();
        this._initializePopupEventListener();
        this._initializeDomContentLoadedEventListener();
        this._initializeLoadEventListener();
    }

    private _initializeBodyWatcher() {
        const bodyWatcher = new BodyWatcher(async () => {
            this._overlay.setHeight(getPageHeight());
            this._overlay.insertIfNeeded();
        });

        bodyWatcher.start();
    }

    private _initializePopupEventListener() {
        browser.runtime.onMessage.addListener((event: Event) => {
            if (event.type === EventType.SettingsUpdated) {
                this._applyStyleSettings();
            }
        });
    }

    private _initializeDomContentLoadedEventListener() {
        document.addEventListener('DOMContentLoaded', () => {
            this._overlay.insertIfNeeded();
        });
    }

    private _initializeLoadEventListener() {
        window.addEventListener('load', () => {
            this._overlay.insertIfNeeded();
        });
    }

    private async _applyStyleSettings() {
        const settings = await this._settingsManager.getSettings();

        this._stylesManager.grayscaleLevel = settings.grayscaleLevel;
        this._stylesManager.contrastLevel = settings.contrastLevel;
        this._stylesManager.isBorderRadiusDisabled = settings.isBorderRadiusDisabled;
        this._stylesManager.apply();

        this._overlay.setImageUrl(this._paperImageUrls[settings.backgroundPaperIndex]);
    }
}
