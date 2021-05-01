export const emptyStringToUndefined = (str: string) => (str === '' ? undefined : str);

export const round = (num: number, precision: number) =>
    Math.round(num * 10 ** precision) / 10 ** precision;
