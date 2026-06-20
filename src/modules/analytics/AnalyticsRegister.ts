import type { AnalyticsData } from "./AnalyticsData.ts";
import { retrieveId } from "../id/index.ts";
import { storageEngineFactory } from "../storage/index.ts";
import { AnalyticsTransmitter } from "./AnalyticsTransmitter.js";
import { isDate, isValid, parseISO } from "date-fns";
import { onEach } from "../arrays/index.ts";

export class AnalyticsRegister extends Array<AnalyticsData> {
    private readonly transmitter: AnalyticsTransmitter;

    constructor(preRegisteredItems: AnalyticsData[], endpoint: string) {
        super();

        const id = retrieveId(storageEngineFactory());
        this.transmitter = new AnalyticsTransmitter(endpoint, id);

        this.push(...preRegisteredItems);
    }

    public override push(...items: AnalyticsData[]): number {
        const pushDate = new Date();

        onEach(
            items,
            (item) => {
                const itemDate = parseISO(item.createdAt ?? "");
                const createdAt =
                    isDate(itemDate) && isValid(itemDate) ? itemDate : pushDate;

                return {
                    ...item,
                    createdAt: createdAt.toISOString(),
                } satisfies AnalyticsData;
            },
            (data) => {
                this.transmitter.transmit(data);
            },
        );

        return super.push(...items);
    }
}
