import { useState, useEffect } from 'react';
import { getCurrentUser } from '../firebase';
import { DBUser } from '../types/auth';
export const useAuth = () => {
    const [user, setUser] = useState<DBUser | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        getCurrentUser().then(user => {
            setUser(user);
            setLoading(false);
        }).catch((e) => {
            setLoading(false);
            setUser(null);
            setError(e.message);
        });
    }, [setUser, setError, setLoading]);
    return { user, loading, error };
};