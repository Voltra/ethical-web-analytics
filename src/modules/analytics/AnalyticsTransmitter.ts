import type { AnalyticsData } from "./AnalyticsData.ts";
import type { Id } from "../id/index.ts";

export class AnalyticsTransmitter {
    constructor(
        private endpoint: string,
        private sessionId: Id,
        private navigator: Navigator = navigator,
    ) {}

    public transmit(data: AnalyticsData) {
        this.navigator.sendBeacon(
            this.endpoint,
            JSON.stringify({
                data,
                sessionId: this.sessionId,
            }),
        );
    }
}
