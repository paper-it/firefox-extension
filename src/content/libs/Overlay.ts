export class Overlay {
    public static readonly OVERLAY_ELEMENT_ID = 'paper-it-extension-overlay';
    private readonly _element: HTMLDivElement;

    public constructor(height: number) {
        this._element = this._getElementOrCreate();
        this._element.style.position = 'absolute';
        this._element.style.top = '0';
        this._element.style.left = '0';
        this._element.style.width = '100%';
        this._element.style.backgroundRepeat = 'repeat';
        this._element.style.opacity = '0.4'
        this._element.style.pointerEvents = 'none';
        this._element.style.zIndex = '2147483647';

        this.setHeight(height);
    }

    public setHeight(height: number) {
        this._element.style.height = `${height}px`;
    }

    public setImageUrl(url: string) {
        this._element.style.backgroundImage = `url(${url})`;
    }

    public getElement() {
        return this._element;
    }

    private _getElementOrCreate() {
        const existingElement = document.getElementById(Overlay.OVERLAY_ELEMENT_ID);
        const element = existingElement ? existingElement as HTMLDivElement : document.createElement('div');

        element.id = Overlay.OVERLAY_ELEMENT_ID;

        return element;
    }
}
