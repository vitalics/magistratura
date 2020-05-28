export function getItem<T = string>(
    key: string,
    transformer?: TransformerToType<T>
): null | T {
    const item = localStorage.getItem(key);
    if (transformer) {
        const transformed = item ? transformer(item) : null;
        return transformed;
    }
    if(item === null){
        return item;
    }
    if(typeof item !== 'string'){
        throw new Error('cannot precess non string type without transformer function')
    }
    const nonTransformed = item || null;
    return nonTransformed as any;
}

type IsString<T> = T extends string ? true : false;
type IsUndefined<T> = T extends undefined ? true : false;

type TransformerToString<T> = (item: T) => string;
type TransformerToType<T> = (item: string) => T;

export function setItem<T>(key: string, value: T, transformer: IsString<T> extends true ? undefined : IsString<T> extends false ? TransformerToString<T> : never) {
    const transformValue: string = transformer ? transformer(value as T) : value as unknown as string;
    localStorage.setItem(key, transformValue);
}
export function hasItem(key: string): boolean {
    const value = localStorage.getItem(key);
    return value ? true : false;
}

export function removeItem(key: string) {
    localStorage.removeItem(key);
}