import type { StorageEngine } from "./StorageEngine";
import { deserialize, serialize } from "./serde";

export class SessionStorageEngine implements StorageEngine {
    constructor(private storage: Window["sessionStorage"] = sessionStorage) {}

    public get<T extends NonNullable<unknown>>(key: string): T | null {
        const serialized = this.storage.getItem(key);

        if (!serialized) {
            return null;
        }

        return deserialize<T>(serialized);
    }

    public has(key: string): boolean {
        return this.get(key) !== null;
    }

    public remove(key: string): this {
        this.storage.removeItem(key);
        return this;
    }

    public set<T extends NonNullable<unknown>>(key: string, value: T): this {
        this.storage.setItem(key, serialize(value));
        return this;
    }
}
