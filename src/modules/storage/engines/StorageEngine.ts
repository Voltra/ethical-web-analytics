export interface StorageEngine {
    has(key: string): boolean;

    get<T extends NonNullable<unknown>>(key: string): T | null;

    set<T extends NonNullable<unknown>>(key: string, value: T): this;

    remove(key: string): this;
}
