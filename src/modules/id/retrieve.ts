import type { StorageEngine } from "../storage";
import { generateId, type Id } from "./generate.ts";
import { isValidId } from "./check.ts";

export const SESSION_ID_KEY = "ethical-web-analytics@sessionId";

const createAndStore = (storage: StorageEngine): Id => {
    const id = generateId();
    storage.set(SESSION_ID_KEY, id);
    return id;
};

export const retrieveId = (storage: StorageEngine) => {
    if (!storage.has(SESSION_ID_KEY)) {
        return createAndStore(storage);
    }

    const storedId = storage.get<Id>(SESSION_ID_KEY)!;

    if (!isValidId(storedId)) {
        return createAndStore(storage);
    }

    return storedId;
};
