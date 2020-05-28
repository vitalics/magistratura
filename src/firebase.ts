import * as firebase from "firebase/app";
import 'firebase/auth';
import 'firebase/analytics';
import "firebase/firestore";
import 'firebase/storage';


import { DBUser } from "./types/auth";
import { setItem, getItem, removeItem } from "./utils/localstorage";
import { assertEqual } from "./utils/assert";
import { getHalfYear } from "./utils/date";
import { DocContentTypes } from "./utils/docs";

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

    let data: DBUser;
    const doc = firestore.collection('/users').doc(email);
    const snapshot = await doc.get();
    data = snapshot.data() as DBUser;

    if (!data) {
        throw new Error('cannot sign-in non existed user');
    }
    if (data.password !== entrypted) {
        throw new Error('password is incorrect');
    }

    await doc.update({ lastLoginAt: Date.now() });

    setItem('user', data, JSON.stringify);

    return data as DBUser || null;
}

export async function createUserWithEmailAndPassword(user: DBUser) {
    const encrypted = btoa(user.password);
    getAnalytics()?.logEvent('sign_up', user);
    const doc = firestore.collection('/users').doc(user.email);
    const snapshot = await doc.get();
    if (snapshot.exists) {
        throw new Error('cannot create an existed user');
    } else {
        await doc.set({ ...user, password: encrypted });
    }
}

export async function getCurrentUser(): Promise<DBUser | null> {
    const item = getItem<DBUser>('user', JSON.parse as (text: string) => any);
    if (!item) {
        throw new Error('cannot get non-authorized user');
    }
    let shanpshot: DBUser;

    try {
        const doc = firestore.collection('/users').doc(item.email);
        const snapshot = await doc.get();
        shanpshot = snapshot.data() as DBUser;
    } catch (e) {

    }

    try {
        assertEqual(item, shanpshot!);
    } finally {
        setItem('user', shanpshot!, JSON.stringify);
    }
    return item;
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
    const currentUser = await getCurrentUser();
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

