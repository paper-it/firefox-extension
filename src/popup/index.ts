import { getCurrentTabUrl } from "./libs/get-current-tab-url";
import { SettingsManager } from "../shared/settings";
import { getPaperImageUrls } from "../shared/get-paper-image-urls";

async function initialize() {
    const currentTabUrl = await getCurrentTabUrl();

    if (!currentTabUrl) {
        return;
    }

    const settingsManager = new SettingsManager();
    const settings = await settingsManager.forHostname(currentTabUrl.hostname);

    const paperSelectEl = document.getElementById('paper_select') as HTMLSelectElement;
    const contrastLevelEl = document.getElementById('contrast_level') as HTMLInputElement;
    const disableBorderRadiusEl = document.getElementById('disable_border_radius') as HTMLInputElement;

    for (let i = 0; i < getPaperImageUrls().length; i++) {
        const option = document.createElement("option");

        option.text = `Paper #${i}`;
        option.value = i.toString();

        paperSelectEl.add(option);
    }

    contrastLevelEl.value = settings.contrastLevel.toString();
    disableBorderRadiusEl.checked = settings.isBorderRadiusDisabled;
    paperSelectEl.selectedIndex = settings.backgroundPaperIndex;
}

initialize()
    .catch(error => console.error(error));
