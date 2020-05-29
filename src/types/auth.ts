export type DBUser = {
    email: string;
    password: string;
    firstname: string | null;
    lastname: string | null;
    roles: Role[];
    department: Department;
    dateOfBirth: Date | null;
    photoUrl: string | null;
    skype: string | null;
    phone: string | null;
    lastLoginAt: number | null;
    degrees: Degree[];
    subjects: Subject[] | null;
};

export type FireBaseDBUser = Omit<DBUser, 'subjects'> & {
    subjects: firebase.firestore.DocumentReference[]
};

export type Subject = {
    name: string;
    theoretical: number;
    practice: number;
}

type Role =
    | 'Professor'
    | 'Sr. Professor'
    | 'Assistant'
    | 'Head'
    | 'Admin';

type Department =
    | 'ASU' // Automatic control system (ASU)

type Degree =
    | 'Bachelor'
    | 'Master'
    | 'Docent'
    | 'Doctor of Technical Sciences';
