import { useState, useEffect } from 'react';
import { getCurrentUser } from '../firebase';
import { DBUser } from '../types/auth';
export const useAuth = () => {
    const [user, setUser] = useState<DBUser | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const asyncFn = async () => {
            try {
                const user = await getCurrentUser({ useCache: true });
                setUser(user);
                setLoading(false);
            } catch (e) {
                setLoading(false);
                setUser(null);
                setError(e.message);
            }
        }
        asyncFn();
    }, [setUser, setError, setLoading]);
    return { user, loading, error };
};