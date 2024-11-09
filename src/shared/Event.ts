export enum EventType {
    SettingsUpdated = 'settings_updated'
}

export type Event = {
    type: EventType;
};
