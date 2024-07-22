type WatcherCallback = () => void;

export class BodyWatcher {
    private readonly _observer: MutationObserver;

    public constructor(callback: WatcherCallback) {
        this._observer = new MutationObserver(() => callback());
    }

    public start() {
        this._observer.observe(document.body, {
            attributes: true,
            childList: true,
            subtree: true
        });
    }
}
