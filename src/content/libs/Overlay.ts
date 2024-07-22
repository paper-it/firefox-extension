export class Overlay {
    private readonly _element: HTMLDivElement;

    public constructor(imageUrl: string, height: number) {
        this._element = document.createElement('div');

        this._element.style.position = 'absolute';
        this._element.style.top = '0';
        this._element.style.left = '0';
        this._element.style.width = '100%';
        this._element.style.backgroundImage = `url(${imageUrl})`;
        this._element.style.backgroundRepeat = 'repeat';
        this._element.style.opacity = '0.4'
        this._element.style.pointerEvents = 'none';
        this._element.style.zIndex = '2147483647';

        this.setHeight(height);
    }

    public setHeight(height: number) {
        this._element.style.height = `${height}px`;
    }

    public getElement() {
        return this._element;
    }
}
