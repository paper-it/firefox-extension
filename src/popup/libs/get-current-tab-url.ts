export async function getCurrentTabUrl(): Promise<URL | null> {
    const tabs = await browser.tabs.query({ active: true, currentWindow: true });
    const currentTab = tabs[0];

    if (!currentTab) {
        return null;
    }

    if (!currentTab.url) {
        return null;
    }

    return new URL(currentTab.url);
}
