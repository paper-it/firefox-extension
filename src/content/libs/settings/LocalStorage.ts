export class LocalStorage {
    public static async get<T>(key: string) {
        const result = await browser.storage.local.get(key)

        return result[key] as T | undefined;
    }
}
