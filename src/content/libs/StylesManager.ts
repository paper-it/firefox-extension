export enum FilterLevel {
    Zero = 0,
    One = 1,
    Two = 2,
    Three = 3,
    Four = 4,
    Five = 5,
    Six = 6,
    Seven = 7,
    Eight = 8,
    Nine = 9,
    Ten = 10
}

export class StylesManager {
    public grayscaleLevel = FilterLevel.Ten;
    public contrastLevel = FilterLevel.Zero;
    public isBorderRadiusDisabled = false;
    private readonly _styleElement: HTMLStyleElement;

    public constructor() {
        this._styleElement = document.createElement('style');

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
