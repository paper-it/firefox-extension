import { SettingsManager } from "../shared/settings";
import { getPaperImageUrls } from "../shared/get-paper-image-urls";
import { FilterLevel } from "../shared/FilterLevel";
import { EventType } from "../shared/Event";
import { sendEventToContentScript } from "./events/send-event-to-content-script";

async function initialize() {
    const settingsManager = new SettingsManager();
    const settings = await settingsManager.getSettings();

    const paperSelectEl = document.getElementById('paper_select') as HTMLSelectElement;
    const contrastLevelEl = document.getElementById('contrast_level') as HTMLInputElement;
    const disableBorderRadiusEl = document.getElementById('disable_border_radius') as HTMLInputElement;

    for (let i = 0; i < getPaperImageUrls().length; i++) {
        const option = document.createElement("option");

        option.text = `Paper #${i}`;
        option.value = i.toString();

        paperSelectEl.add(option);
    }

    paperSelectEl.selectedIndex = settings.backgroundPaperIndex;
    contrastLevelEl.value = settings.contrastLevel.toString();
    disableBorderRadiusEl.checked = settings.isBorderRadiusDisabled;

    paperSelectEl.addEventListener('change', async () => {
        await settingsManager.setBackgroundPaperIndex(paperSelectEl.selectedIndex);

        await sendEventToContentScript({
            type: EventType.SettingsUpdated
        });
    });

    contrastLevelEl.addEventListener('input', async () => {
        await settingsManager.setContrastLevel(Number(contrastLevelEl.value) as FilterLevel);

        await sendEventToContentScript({
            type: EventType.SettingsUpdated
        });
    });

    disableBorderRadiusEl.addEventListener('change', async () => {
        await settingsManager.setIsBorderRadiusDisabled(disableBorderRadiusEl.checked);

        await sendEventToContentScript({
            type: EventType.SettingsUpdated
        });
    });
}

initialize()
    .catch(error => console.error(error));
