import React from 'react';
import { useParams } from 'react-router-dom';

import { getUserById } from '../firebase';
import { DBUser } from '../types/auth';
import ProfileInfo from './profile';

type Props = {
    onThemeChanged?: (theme: 'light' | 'dark') => void;
};
export default function User({ onThemeChanged }: Props) {
    const { id } = useParams();

    const [user, setUser] = React.useState<DBUser | null>(null);
    const [error, setError] = React.useState('');

    React.useEffect(() => {
        const asyncFn = async () => {
            try {
                const user = await getUserById(id);
                setUser(user);
            } catch (e) {
                setError(e.message);
                setUser(null);
            }
        };

        asyncFn();
    }, [id]);

    return (
        <ProfileInfo
            onThemeChanged={onThemeChanged}
            user={user ?? undefined}
            title={`${user?.firstname} ${user?.lastname}`}
        />
    );
}