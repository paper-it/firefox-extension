import { FilterLevel } from "../../shared/FilterLevel";

export class StylesManager {
    public grayscaleLevel = FilterLevel.Ten;
    public contrastLevel = FilterLevel.Zero;
    public isBorderRadiusDisabled = false;
    private readonly _styleElement: HTMLStyleElement;

    public constructor() {
        this._styleElement = document.createElement('style');
    }

    public initialize() {
        this.apply();

        document.head.append(this._styleElement);
    }

    public apply() {
        this._styleElement.textContent = `
            html {
                filter: grayscale(${this.grayscaleLevel * 10}%) contrast(${100 + (this.contrastLevel * 10)}%);
            }

            ${this.isBorderRadiusDisabled ? `
                    * {
                        border-radius: 0 !important;
                    }
                ` : ''
            }
        `;
    }

    public remove() {
        this._styleElement.remove();
    }
}
