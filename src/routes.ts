export const MAIN = '/';
export const SIGN_IN = '/sign-in';
export const SIGN_UP='/sign-up';
export const HOME = '/home';
export const PROFILE = '/profile';
export const USERS = '/users';
export const USER = '/users/:id';
export const LOAD = '/load';
export const GETUSER = (id: string) => `/users/${id}`;

export default {
    MAIN,
    SIGN_IN,
    SIGN_UP,
    HOME,
    PROFILE,
    USERS,
    USER,
    GETUSER,
    LOAD,
} as const;