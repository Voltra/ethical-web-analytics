import { safeDestr } from "destr";

export const serialize = <T>(data: T) => JSON.stringify(data);

export const deserialize = <T extends NonNullable<unknown>>(
    serialized: string,
): T | null => {
    try {
        const value = safeDestr<T | null>(serialized, {
            strict: true,
        });

        return value ?? null;
    } catch (e) {
        console.error(e);
        return null;
    }
};
