import { DBUser } from "../types/auth";

export function isUserLike(value: unknown): value is DBUser {
    if (typeof value === 'object' && value) {
        return (
            isHavePropAndExist(value, 'email') &&
            isHavePropAndExist(value, 'password') &&
            isHavePropAndExist(value, 'department')
        );
    }
    return false;
}

function isHaveProp(obj: object, prop: string): boolean {
    return prop in obj;
}
function isHavePropAndExist(obj: object, prop: string): boolean {
    const propExists = isHaveProp(obj, prop);
    const value = (obj as Record<string, unknown>)[prop]
    if (propExists && value) {
        return true;
    }
    return false;
};