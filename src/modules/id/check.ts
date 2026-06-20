import { validate, version } from "uuid";

export const isValidId = (id: string) => validate(id) && version(id) === 7;
