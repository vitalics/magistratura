import * as firebase from "firebase/app";
import 'firebase/auth';
import 'firebase/analytics';
import "firebase/firestore";
import 'firebase/storage';


import { DBUser, FireBaseDBUser, Subject } from "./types/auth";
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

    const doc = usersCollection.doc(email);
    const snapshot = await doc.get();
    const data = snapshot.data() as FireBaseDBUser;

    const subjects = await Promise.all((data.subjects!).map(async (snapshot) => {
        const subjectData = await snapshot.get();
        const subject = subjectData.data() as Omit<Subject, 'name'>;
        return { ...subject, name: subjectData.id };
    })
    );
    const user = { ...data, subjects } as DBUser;

    if (!data) {
        throw new I18nError('SignIn.NonExistedUser');
    }
    if (data.password !== entrypted) {
        throw new I18nError('SignIn.IncorrectPassword');
    }

    await doc.update({ lastLoginAt: Date.now() });

    setItem('user', user, JSON.stringify);
}

export async function createUserWithEmailAndPassword(user: DBUser) {
    const encrypted = btoa(user.password);
    getAnalytics()?.logEvent('sign_up', user);
    const doc = usersCollection.doc(user.email);
    const snapshot = await doc.get();
    if (snapshot.exists) {
        throw new I18nError('SignUp.UserExists', 'cannot create an existed user');
    } else {
        await doc.set({ ...user, password: encrypted });
    }
}
type CurrentUserSettings = {
    useCache?: boolean;
}
export async function getCurrentUser({ useCache }: CurrentUserSettings) {
    const item = getItem<DBUser>('user', JSON.parse);

    if (!item) {
        throw new Error('cannot get non-authorized user');
    }
    if (!isUserLike(item)) {
        console.warn(`localstorage by 'user' key is not a user like. Fetch from Firestore.`);
        removeItem('user');
    } else if (isUserLike(item) && useCache) {
        return item;
    }
    let shanpshot: DBUser;

    const doc = usersCollection.doc(item.email);
    const snapshot = await doc.get();
    shanpshot = snapshot.data() as DBUser;

    try {
        assertEqual(item, shanpshot, ['lastLoginAt']);
    } catch (e) {
        console.warn(e.message);
    } finally {
        setItem('user', shanpshot!, JSON.stringify);
    }
    return shanpshot;
}

export async function updateUserProfile(user: DBUser) {
    setItem('user', user, JSON.stringify);
    const doc = firestore.collection('/users').doc(user.email);
    await doc.set(user, { merge: true });
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

    console.log('getCurrentXlsx', url)

    const data = await fetch(url, {
        method: "GET",
        mode: 'no-cors'
    });
    const blob = await data.blob();
    return blob;
}

