import { getAllTabs } from "../tabs/get-all-tabs";
import { Event } from "../../shared/Event";

export async function sendEventToContentScript(event: Event) {
    const tabs = await getAllTabs();

    for (const tab of tabs) {
        if (tab.id == null) {
            continue;
        }

        try {
            await browser.tabs.sendMessage(tab.id, event);
        } catch (error: unknown) {
            console.error(error);
        }
    }
}
