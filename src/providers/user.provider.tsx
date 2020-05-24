import React from "react";
import { auth } from '../firebase';
import { User } from 'firebase';

export const UserContext = React.createContext<{ user: User | null }>({ user: null });

type Props = {};
export default function UserProvider({ children }: React.PropsWithChildren<Props>) {
    const [user, setUser] = React.useState<User | null>(null);

    React.useEffect(() => {
        auth.onAuthStateChanged(userAuth => setUser(userAuth))
    });

    return (
        <UserContext.Provider value={{ user }} >
            {children}
        </ UserContext.Provider>
    );
}