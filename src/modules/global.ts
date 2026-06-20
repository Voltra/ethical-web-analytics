/**
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/globalThis#search_for_the_global_across_environments
 * @see https://github.com/zloirock/core-js/blob/c97f42dd89a71dcfc6cac002f3efeb8575471e1f/packages/core-js/internals/global-this.js
 */

const check = (it: unknown): boolean => {
    // Math is known to exist as a global in every environment.

    // @ts-expect-error TS2339 property Math does not exist
    return typeof it?.Math !== "undefined" && it.Math === Math;
};

export const getGlobal = (): Window | typeof globalThis => {
    if (typeof globalThis === "object" && check(globalThis)) {
        return globalThis;
    }

    if (typeof window === "object" && check(window)) {
        return window;
    }

    if (typeof self === "object" && check(self)) {
        return self;
    }

    // @ts-ignore TS2304 Cannot find name global
    if (typeof global === "object" && check(global)) {
        // @ts-ignore TS2304 Cannot find name global
        return global;
    }

    if (typeof this === "object" && check(this)) {
        // @ts-expect-error undefined is not assignable
        return this;
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return (
        (function () {
            // This returns undefined when running in strict mode

            // @ts-expect-error this has type any
            return this; // eslint-disable-line @typescript-eslint/no-unsafe-return

            // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-implied-eval
        })() ?? Function("return this")()
    );
};
