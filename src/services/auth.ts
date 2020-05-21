import { SignIn, AuthRole, User, SignUp } from "../types/auth";
import { assert, assertNull } from "../utils/assert";

const request = indexedDB.open('application');

request.onerror = function (event) {
    console.error(event);
};

export function signIn({ password, email }: SignIn) {
    passwordValidity(password);
    assertEmail(email);

    const isHaveUserFromStorage = localStorage.getItem(email);
    const role = getRole(email);
    if (isHaveUserFromStorage) {
        const parsed = JSON.parse(isHaveUserFromStorage);
        if (isUser(parsed)) {
            localStorage.setItem('user', JSON.stringify({ email: parsed.email, password: parsed.password, role: parsed.role }));
            return;
        }
    }

    localStorage.setItem('user', JSON.stringify({ email, password, role }))
}

export function passwordValidity(password: string): asserts password {
    let isValid = false;

    if (password.length > 2) {
        isValid = true;
    }

    return assert(isValid, 'password is not match by input pattern');
}

export function getRole(email: SignIn['email']): AuthRole {
    switch (email) {
        case 'admin@bru.by':
            return AuthRole.admin;
        case 'teacher@bru.by':
            return AuthRole.teacher
        default:
            return AuthRole.student;
    }
}

export function isSignedIn(): boolean {
    const currentUser = getCurrentUser();
    try {
        assertNull(currentUser);
    } catch (e) {
        return false;
    }
    return true;
}

function isUser(value: any): value is User {
    return 'email' in value && 'password' in value;
}

export function isEmail(emailLike: string): boolean {
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (emailRegex.test(emailLike)) {
        return true;
    }
    return false;
}

export function assertEmail(emailLike: string): asserts emailLike {
    assert(isEmail(emailLike), 'input parameter is not a email');
}


export async function signUp({ email, firstname, lastname, password }: SignUp) {
    passwordValidity(password);
    assertEmail(email);

    localStorage.setItem(email, JSON.stringify({ email, password, firstname, lastname }));

    request.onupgradeneeded = function (event) {
        var db = (event.target! as any).result;

        // Create an objectStore to hold information about our customers. We're
        // going to use "ssn" as our key path because it's guaranteed to be
        // unique - or at least that's what I was told during the kickoff meeting.
        var objectStore = db.createObjectStore("users", { keyPath: "ssn" });

        // Create an index to search customers by name. We may have duplicates
        // so we can't use a unique index.
        objectStore.createIndex("name", "name", { unique: false });

        // Create an index to search customers by email. We want to ensure that
        // no two customers have the same email, so use a unique index.
        objectStore.createIndex("email", "email", { unique: true });

        // Use transaction oncomplete to make sure the objectStore creation is 
        // finished before adding data into it.
        objectStore.transaction.oncomplete = function () {
            // Store values in the newly created objectStore.
            var customerObjectStore = db.transaction("users", "readwrite").objectStore("users");
            customerObjectStore.add({ email, password, lastname, firstname });
        };
    }
}

export function signOut() {
    localStorage.removeItem('user');
}

export function getCurrentUser(): User | null {
    const stringifyed = localStorage.getItem('user');
    if (stringifyed === null) {
        return null;
    }
    const user: User = JSON.parse(stringifyed);
    return isUser(user) ? user : null;
}