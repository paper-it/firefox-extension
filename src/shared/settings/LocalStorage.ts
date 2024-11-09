export class LocalStorage {
    public static async get<T>(key: string) {
        const result = await browser.storage.local.get(key)

        return result[key] as T | undefined;
    }

    public static async set(key: string, value: unknown) {
        return browser.storage.local.set({
            [key]: value
        });
    }
}
