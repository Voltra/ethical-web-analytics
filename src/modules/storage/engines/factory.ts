import { SessionStorageEngine } from "./SessionStorageEngine.ts";
import { LocalStorageEngine } from "./LocalStorageEngine.ts";
import { UnsupportedError } from "../../errors/index.ts";
import type { StorageEngine } from "./StorageEngine.ts";

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
