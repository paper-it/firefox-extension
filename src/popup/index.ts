import { SettingsManager } from "../shared/settings";
import { getPaperImageUrls } from "../shared/get-paper-image-urls";

async function initialize() {
    const settingsManager = new SettingsManager();
    const settings = await settingsManager.forHostname('');

    const paperSelectEl = document.getElementById('paper_select') as HTMLSelectElement;
    const contrastLevelEl = document.getElementById('contrast_level') as HTMLInputElement;
    const disableBorderRadiusEl = document.getElementById('disable_border_radius') as HTMLInputElement;

    for (const [index, url] of getPaperImageUrls().entries()) {
        const option = document.createElement("option");

        option.text = `Paper #${index}`;
        option.value = url;

        paperSelectEl.add(option);

        if (settings.backgroundPaperIndex === index) {
            paperSelectEl.selectedIndex = index;
        }
    }

    contrastLevelEl.value = settings.contrastLevel.toString();
    disableBorderRadiusEl.checked = settings.isBorderRadiusDisabled;
}

initialize()
    .catch(error => console.error(error));
