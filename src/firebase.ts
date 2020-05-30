import * as firebase from "firebase/app";
import 'firebase/auth';
import 'firebase/analytics';
import "firebase/firestore";
import 'firebase/storage';


import { DBUser, FireBaseDBUser } from "./types/auth";
import { setItem, getItem, removeItem } from "./utils/localstorage";
import { assertEqual } from "./utils/assert";
import { getHalfYear } from "./utils/date";
import { DocContentTypes } from "./utils/docs";
import { isUserLike } from "./utils/auth";
import I18nError from "./utils/error";

const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_DATABASE_URL,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID,
    measurementId: process.env.REACT_APP_MEASUREMENT_ID,
};

firebase.initializeApp(firebaseConfig);
const firestore = firebase.firestore();

const usersCollection = firestore.collection('/users');


const storage = firebase.storage();

function getAnalytics() {
    if (process.env.NODE_ENV === 'production') {
        return firebase.analytics();
    }
    return null;
}

export async function signInWithEmailAndPassword(email: string, password: string) {
    const entrypted = btoa(password);
    getAnalytics()?.logEvent('login', { email, password });

    const { user } = await getUserByEmail(email);

    if (!user) {
        throw new I18nError('SignIn.NonExistedUser');
    }

    if (user.password !== entrypted) {
        throw new I18nError('SignIn.IncorrectPassword');
    }

    // TODO: lastLoginAt
    // const doc = (await usersCollection.where('email', '==', user.email).limit(1).get()).docs[0];

    // await doc.({ lastLoginAt: Date.now() });

    setItem('user', user, JSON.stringify);
}

export async function createUserWithEmailAndPassword(user: Omit<DBUser, 'uid'>) {
    const encrypted = btoa(user.password);
    getAnalytics()?.logEvent('sign_up', user);
    const doc = usersCollection.doc();
    const { user: snapshot } = await getUserByEmail(user.email);
    if (snapshot) {
        throw new I18nError('SignUp.UserExists', 'cannot create an existed user');
    } else {
        await doc.set({ ...user, password: encrypted });
    }
}
type CurrentUserSettings = {
    useCache?: boolean;
}

async function getUserByEmail(email: string): Promise<{ userId: string, user: DBUser | null }> {
    const userDoc = (await usersCollection.where('email', '==', email).limit(1).get()).docs[0]
    const userId = userDoc.id;
    const dbUser: FireBaseDBUser | null = userDoc.data() as FireBaseDBUser | null;

    // map subjects if exists
    let subjects: string[] = [];
    if (dbUser && dbUser.subjects && dbUser.subjects.length > 0) {
        subjects = await Promise.all((dbUser.subjects).map(async (snapshot) => {
            const subjectData = await snapshot.get();
            return subjectData.id;
        }));
    }
    const user: DBUser = Object.assign(dbUser, { subjects, uid: userId });
    return { userId, user };
}
export async function getCurrentUser({ useCache }: CurrentUserSettings) {
    const item = getItem('user', JSON.parse);

    if (!item) {
        throw new Error('cannot get non-authorized user');
    }
    if (!isUserLike(item)) {
        console.warn(`localstorage by 'user' key is not a user like. Fetch from Firestore.`);
        removeItem('user');
    } else if (isUserLike(item) && useCache) {
        return item;
    }

    // first time
    const { user, userId } = await getUserByEmail(item.email);

    try {
        assertEqual(item, user!, ['lastLoginAt']);
    } catch (e) {
        console.warn(e.message);
    } finally {
        setItem('user', { ...user, userId }!, JSON.stringify);
    }
    return user!;
}

export async function updateUserProfile(user: DBUser) {
    setItem('user', user, JSON.stringify);
    const { userId } = await getUserByEmail(user.email);
    usersCollection.doc(userId).set(user, { merge: true })
}

export function signOut() {
    removeItem('user');
}

export async function saveXlsx(data: Blob | Uint8Array | ArrayBuffer) {
    const currentUser = await getCurrentUser({ useCache: false });
    const now = new Date();

    const halfYear = getHalfYear(now);
    const loadRef = storage.ref(`${now.getFullYear()}/${halfYear}/load.xlsx`);
    const snapshot = await loadRef.put(data, {
        contentType: DocContentTypes.xlsx, customMetadata: {
            lastUpdatedFrom: currentUser?.email!
        }
    });
    console.dir('save to cloud', snapshot);
}

export async function getCurrentXlsx() {
    const now = new Date();

    const halfYear = getHalfYear(now);

    const ref = storage.ref(`${now.getFullYear()}/${halfYear}/load.xlsx`);
    const url: string = await ref.getDownloadURL();

    const data = await fetch(url, {
        method: "GET",
        mode: "no-cors"
    });

    const blob = await data.blob();
    return { url, blob };
}

type DepartmentSettings = {
    includeMySelf?: boolean;
}

export async function getUsersByDepartment({ includeMySelf }: DepartmentSettings) {
    const user = await getCurrentUser({ useCache: true });
    const usersDepartment = usersCollection.where('department', '==', user.department)

    const docs = (await usersDepartment.get()).docs;

    const users: DBUser[] = await Promise.all(docs.map(async doc => {
        const data = doc.data() as Omit<DBUser, 'uid'>;
        const uid = doc.id;
        return { ...data, uid };
    }));
    if (!includeMySelf) {
        return users.filter(dbUser => dbUser.email !== user.email);
    }
    return users;
}

export async function getUserById(id: string): Promise<DBUser> {
    const userDoc = await usersCollection.doc(id).get()
    const user = userDoc.data() as FireBaseDBUser;

    let subjects: string[] = [];
    if (user && user.subjects && user.subjects.length > 0) {
        subjects = await Promise.all(user.subjects.map(async snapshot => {
            const subjectData = await snapshot.get();
            return subjectData.id;
        }))
    }

    if (!user) {
        throw new I18nError('SignIn.NonExistedUser');
    }

    return { ...user, subjects, uid: id };
}