import EventEmitter from 'events';

// Events that can be emitted by the API
export type ApiEvents = {
    newOrder: string;
};

export type ApiEventEmitter = Omit<EventEmitter, 'on' | 'emit'> & {
    on<K extends keyof ApiEvents>(
        event: K,
        callback: (data: ApiEvents[K]) => void | Promise<void>,
    ): void;
    emit<K extends keyof ApiEvents>(event: K, data: ApiEvents[K]): void;
};

/**
 * Returns a new event emitter
 */
export const apiEvents = (global.apiEvents = (global.apiEvents ??
    new EventEmitter()) as ApiEventEmitter);
