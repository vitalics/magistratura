export type DBUser = {
    email: string;
    password: string;
    firstname: string | null;
    lastname: string | null;
    role: Role;
    dateOfBirth: Date | null;
    photoUrl: string | null;
    skype: string | null;
    phone: string | null;
    lastLoginAt: number | null;
};

type Role = 'teacher' | 'chief' | 'admin';