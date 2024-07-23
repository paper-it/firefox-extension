import { FilterLevel } from "../StylesManager";

export type Settings = {
    grayscaleLevel: FilterLevel;
    contrastLevel: FilterLevel;
    isBorderRadiusDisabled: boolean;
}

export const DEFAULT_SETTINGS: Settings = {
    grayscaleLevel: FilterLevel.Ten,
    contrastLevel: FilterLevel.Zero,
    isBorderRadiusDisabled: true
};
