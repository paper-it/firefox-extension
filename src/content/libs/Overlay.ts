export class Overlay {
    private static readonly OVERLAY_ELEMENT_ID = 'paper-it-extension-overlay';
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

    public insertIfNeeded() {
        if (this._isInserted()) {
            return;
        }

        document.body.append(this._element);
    }

    public setHeight(height: number) {
        this._element.style.height = `${height}px`;
    }

    public setImageUrl(url: string) {
        this._element.style.backgroundImage = `url(${url})`;
    }

    private _isInserted() {
        const existingElement = document.getElementById(Overlay.OVERLAY_ELEMENT_ID);

        return existingElement != null;
    }

    private _getElementOrCreate() {
        const existingElement = document.getElementById(Overlay.OVERLAY_ELEMENT_ID);
        const element = existingElement ? existingElement as HTMLDivElement : document.createElement('div');

        element.id = Overlay.OVERLAY_ELEMENT_ID;

        return element;
    }
}
