import { v7 as uuidV7, type Version7Options } from "uuid";

export type Id = string;

export const generateId = (options: Version7Options = {}): Id =>
    uuidV7(options);
