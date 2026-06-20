/**
 * Map each element of the input array, and execute a callback on each output
 * @note Single iteration
 */
export const onEach = <T, U>(
    arr: T[],
    mapper: (input: T) => U,
    callback: (output: U) => void,
) => {
    arr.forEach((input) => {
        const output = mapper(input);
        callback(output);
    });
};
