import React from 'react';
import { getCurrentUser } from '../firebase';
import { DBUser } from '../types/auth';

type AuthContextType = {
    user: DBUser | null;
    error: string;
    loading: boolean;
    isAuthentificated: boolean;
};


export const AuthContext = React.createContext<AuthContextType>({ user: null, error: '', loading: true, isAuthentificated: false });
export const useAuth = () => React.useContext(AuthContext);

export const AuthProvider = ({ children }: React.PropsWithChildren<{}>) => {
    const [user, setUser] = React.useState<DBUser | null>(null);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState('');
    const [isAuthentificated, setAuthentificated] = React.useState(false);

    React.useEffect(() => {
        getCurrentUser({ useCache: false }).then(user => {
            setUser(user);
            setLoading(false);
            setAuthentificated(true);
        }).catch(e => {
            setLoading(false);
            setUser(null);
            setError(e.message);
        });
    }, [setUser, setError, setLoading]);
    return (
        <AuthContext.Provider value={{ user, loading, error, isAuthentificated }}>
            {children}
        </AuthContext.Provider>
    );
};
