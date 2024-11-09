export async function getAllTabs() {
    return browser.tabs.query({});
}
