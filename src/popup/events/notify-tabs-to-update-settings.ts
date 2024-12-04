import { sendEventToAllTabs } from "./send-event-to-all-tabs";
import { EventType } from "../../shared/Event";

export async function notifyTabsToUpdateSettings() {
    return sendEventToAllTabs({
        type: EventType.SettingsUpdated
    });
}
