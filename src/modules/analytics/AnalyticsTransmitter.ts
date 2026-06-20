import type { AnalyticsData } from "./AnalyticsData";
import type { Id } from "../id";
import { serialize } from "../storage/engines/serde";

export class AnalyticsTransmitter {
    constructor(
        private endpoint: string,
        private sessionId: Id,
        private navigator: Navigator = window.navigator,
    ) {}

    public transmit(data: AnalyticsData) {
        this.navigator.sendBeacon(
            this.endpoint,
            serialize({
                data,
                sessionId: this.sessionId,
            }),
        );
    }
}
