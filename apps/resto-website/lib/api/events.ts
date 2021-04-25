import EventEmitter from 'events';

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

export const apiEvents = (global.apiEvents = (global.apiEvents ??
    new EventEmitter()) as ApiEventEmitter);
