import type { StorageEngine } from "./StorageEngine.ts";
import {
    getDate,
    getMonth,
    getYear,
    isExists,
    isFuture,
    isSameDay,
    isValid,
    parseISO,
    toDate,
} from "date-fns";
import { deserialize, serialize } from "./serde.ts";

const now = () => toDate(Date.now());

interface Wrapped<T> {
    data: T;
    createdAt: string;
}

const wrap = <T>(data: T): Wrapped<T> => ({
    data,
    createdAt: now().toISOString(),
});

const unwrap = <T>(wrapped: Wrapped<T>) => wrapped.data;

const isWrapped = <T>(input: unknown): input is Wrapped<T> => {
    if (typeof input !== "object" || !input) {
        return false;
    }

    // @ts-expect-error "data" does not exist on type object, "createdAt" does not exist on type object
    if (
        typeof input.data === "undefined" ||
        typeof input.createdAt !== "string"
    ) {
        return false;
    }

    // @ts-expect-error "createdAt" does not exist on type object
    const date = parseISO(input.createdAt); // eslint-disable-line @typescript-eslint/no-unsafe-argument

    return (
        isValid(date) && isExists(getYear(date), getMonth(date), getDate(date))
    );
};

export class LocalStorageEngine implements StorageEngine {
    constructor(private storage: Window["localStorage"] = localStorage) {}

    public get<T extends NonNullable<unknown>>(key: string): T | null {
        this.handlePrivacyCleanup(key);

        const serialized = this.storage.getItem(key);

        if (!serialized) {
            return null;
        }

        const wrapped = deserialize<Wrapped<T>>(serialized);
        return wrapped ? unwrap(wrapped) : null;
    }

    public has(key: string): boolean {
        return this.get(key) !== null;
    }

    public set<T extends NonNullable<unknown>>(key: string, value: T): this {
        this.storage.setItem(key, serialize(wrap(value)));
        return this;
    }

    public remove(key: string): this {
        this.storage.removeItem(key);
        return this;
    }

    private handlePrivacyCleanup(key: string): void {
        const serialized = this.storage.getItem(key);

        if (!serialized) {
            this.storage.removeItem(key);
            return;
        }

        const wrapped = deserialize<Wrapped<unknown>>(serialized);

        if (!wrapped || !isWrapped(wrapped)) {
            this.storage.removeItem(key);
            return;
        }

        const currentDate = now();
        const storedDate = parseISO(wrapped.createdAt);

        if (!isSameDay(storedDate, currentDate) || isFuture(storedDate)) {
            this.storage.removeItem(key);
            return;
        }
    }
}
