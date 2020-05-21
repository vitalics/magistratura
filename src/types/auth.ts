export type SignIn = {
    email: string;
    password: string;
};

export type SignUp = SignIn & {
    firstname: string;
    lastname: string;
}

export enum AuthRole {
    admin = "ADMIN",
    teacher = 'TEACHER',
    student = 'STUDENT',
};

export type User = SignIn & {
    role: AuthRole;
}