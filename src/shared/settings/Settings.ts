import { FilterLevel } from "../FilterLevel";

export type Settings = {
    grayscaleLevel: FilterLevel;
    contrastLevel: FilterLevel;
    isBorderRadiusDisabled: boolean;
    backgroundPaperIndex: number;
}

export const DEFAULT_SETTINGS: Settings = {
    grayscaleLevel: FilterLevel.Ten,
    contrastLevel: FilterLevel.Zero,
    isBorderRadiusDisabled: true,
    backgroundPaperIndex: 1
};
