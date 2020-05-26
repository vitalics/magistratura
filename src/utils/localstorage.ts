export function getItem<T>(key: string, transformer: (value: string) => T): T | null {
    const item = localStorage.getItem(key);
    return item ? transformer(item) : null;
}

type IsString<T> = T extends string ? true : false;

type Transformer<T> = (item: T) => string;

export function setItem<T>(key: string, value: T, transformer: IsString<T> extends true ? undefined : IsString<T> extends false ? Transformer<T> : never) {
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