import type { AnalyticsData } from "./modules/analytics";
import { AnalyticsRegister } from "./modules/analytics/AnalyticsRegister.ts";
import { getGlobal } from "./modules/global.ts";

interface GlobalEthicalWebAnalytics {
    dataLayer?: AnalyticsData[];
    bootEthicalWebAnalytics?: typeof bootEthicalWebAnalytics;
}

declare global {
    interface GlobalThis extends GlobalEthicalWebAnalytics {}

    interface Window extends GlobalEthicalWebAnalytics {}

    interface GlobalThisValue extends GlobalEthicalWebAnalytics {}
}

declare global {

    /**
     * Global variable to push data to
     * @example
     * ```typescript
     * // As the very first script tag
     * window.dataLayer = window.dataLayer || [];
     * var bootScript = document.createElement("script");
     * bootScript.onload = function() { window.bootEthicalWebAnalytics("https://my.domain.com/analytics") };
     * Object.assign(bootScript, {
     *  "defer": "true",
     *  "fetchpriority": "low",,
     *  "crossorigin": "anonymous",
     *  "src": "https://cdn.jsdelivr.net/npm/ethical-web-analytics@latest"
     * });
     *
     * // [...]
     *
     * // Later in the code
     * window.dataLayer.push({
     *  event: "navigation",
     *  from: location.pathname,
     *  to: "/login",
     * });
     * ```
     */
    var dataLayer: undefined | AnalyticsData[];

    /**
     * Setup function for ethical analytics package
     * @example
     * ```typescript
     * bootEthicalWebAnalytics("https://my.domain.com/analytics");
     * ```
     */
    var bootEthicalWebAnalytics: (
        analyticsEndpoint: string,
        preRegisteredData?: AnalyticsData[],
    ) => void;
}

const GLOBAL_VAR_NAME = "dataLayer";

export const bootEthicalWebAnalytics = (
    analyticsEndpoint: string,
    preRegisteredData: AnalyticsData[] = [],
) => {
    const global = getGlobal();
    const globallyPreregisteredData: AnalyticsData[] =
        global[GLOBAL_VAR_NAME] ?? [];

    if (Array.isArray(globallyPreregisteredData)) {
        preRegisteredData.push(...globallyPreregisteredData);
    }

    const analyticsRegister = new AnalyticsRegister(
        preRegisteredData,
        analyticsEndpoint,
    );

    Object.defineProperty(global, GLOBAL_VAR_NAME, {
        value: analyticsRegister,
        configurable: false,
        enumerable: false,
        writable: false,
    });
};

export const getDataLayer = () => getGlobal()[GLOBAL_VAR_NAME]!;

export type { AnalyticsData } from "./modules/analytics/AnalyticsData.ts";
