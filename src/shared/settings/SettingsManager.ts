import { DEFAULT_SETTINGS, Settings } from "./Settings";
import { LocalStorage } from "./LocalStorage";
import { FilterLevel } from "../FilterLevel";

const GLOBAL_SETTINGS_KEY = 'global-settings';

export class SettingsManager {
    public async setGrayscaleLevel(level: FilterLevel) {
        await this.updateGlobalSettings({
            grayscaleLevel: level
        });
    }

    public async setContrastLevel(level: FilterLevel) {
        await this.updateGlobalSettings({
            contrastLevel: level
        });
    }

    public async setIsBorderRadiusDisabled(value: boolean) {
        await this.updateGlobalSettings({
            isBorderRadiusDisabled: value
        });
    }

    public async setBackgroundPaperIndex(index: number) {
        await this.updateGlobalSettings({
            backgroundPaperIndex: index
        });
    }

    public async getSettings() {
        const settings = await LocalStorage.get<Settings>(GLOBAL_SETTINGS_KEY);

        return {
            ...DEFAULT_SETTINGS,
            ...(settings ?? {})
        };
    }

    private async updateGlobalSettings(params: Partial<Settings>) {
        const settings = await this.getSettings();

        await LocalStorage.set(GLOBAL_SETTINGS_KEY, {
            ...settings,
            ...params
        });
    }
}
