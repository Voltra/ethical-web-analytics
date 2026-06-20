import { SessionStorageEngine } from "./SessionStorageEngine";
import { LocalStorageEngine } from "./LocalStorageEngine";
import { UnsupportedError } from "../../errors";
import type { StorageEngine } from "./StorageEngine";

export const storageEngineFactory = (): StorageEngine => {
    if (typeof sessionStorage !== "undefined" && !!sessionStorage) {
        return new SessionStorageEngine(sessionStorage);
    }

    if (typeof localStorage !== "undefined" && !!localStorage) {
        return new LocalStorageEngine(localStorage);
    }

    throw new UnsupportedError(
        "`sessionStorage` and `localStorage` are not available",
    );
};
