/**
 * If string is empty, return undefined
 * @param str
 * @returns {string || undefined}
 */
export const emptyStringToUndefined = (str: string) => (str === '' ? undefined : str);

/**
 * Round a number to a given number of decimals
 * @param num
 * @param precision
 * @returns {number}
 */
export const round = (num: number, precision: number) =>
    Math.round(num * 10 ** precision) / 10 ** precision;
