export type DBUser = {
    uid: string;
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
    subjects: string[] | null;
};

export type FireBaseDBUser = Omit<DBUser, 'subjects'> & {
    subjects: firebase.firestore.DocumentReference[]
};

export type Subject = string;

type Role =
    | 'Professor'
    | 'Sr. Professor'
    | 'Assistant'
    | 'Head'
    | 'Admin';

type Department =
    | 'automatedcontrolsystems' // Automatic control system (ASU)

type Degree =
    | 'Bachelor'
    | 'Master'
    | 'Docent'
    | 'Doctor of Technical Sciences';
