import { SettingsManager } from "../shared/settings";
import { getPaperImageUrls } from "../shared/get-paper-image-urls";
import { FilterLevel } from "../shared/FilterLevel";
import { notifyTabsToUpdateSettings } from "./events/notify-tabs-to-update-settings";

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

        await notifyTabsToUpdateSettings();
    });

    contrastLevelEl.addEventListener('input', async () => {
        await settingsManager.setContrastLevel(Number(contrastLevelEl.value) as FilterLevel);

        await notifyTabsToUpdateSettings();
    });

    disableBorderRadiusEl.addEventListener('change', async () => {
        await settingsManager.setIsBorderRadiusDisabled(disableBorderRadiusEl.checked);

        await notifyTabsToUpdateSettings();
    });
}

initialize()
    .catch(error => console.error(error));
