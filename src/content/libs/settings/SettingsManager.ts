import { DEFAULT_SETTINGS, Settings } from "./Settings";
import { LocalStorage } from "./LocalStorage";

const GLOBAL_SETTINGS_KEY = 'global-settings';

export class SettingsManager {
    public async forHostname(_: string): Promise<Settings> {
        const settings = await LocalStorage.get<Settings>(GLOBAL_SETTINGS_KEY);

        return {
            ...DEFAULT_SETTINGS,
            ...(settings ?? {})
        };
    }
}
