import React from 'react';

import Header from '../components/menu';
import Button from '@material-ui/core/Button';
import { useHistory } from 'react-router-dom';

type Props = {
    onThemeChanged?: (themeType: 'dark' | 'light') => void;
};
export default function Home({ onThemeChanged }: Props) {
    const history = useHistory();
    const handleLoadClick = React.useCallback((e: React.MouseEvent) => {
        history.push('/load')
    }, [history]);
    return (
        <>
            <Header onThemeChanged={onThemeChanged} />
            <Button onClick={handleLoadClick}>Calculate load</Button>
            {/* <CapacityTable /> */}
            {/* <Table /> */}
        </>
    );
};