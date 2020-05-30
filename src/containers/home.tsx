import React from 'react';

import Header from '../components/menu';
import CapacityTable from '../components/capacitytable';
import Table from '../components/xlsx/table';

type Props = {
    onThemeChanged?: (themeType: 'dark' | 'light') => void;
};
export default function Home({ onThemeChanged }: Props) {
    return (
        <>
            <Header onThemeChanged={onThemeChanged} />
            <CapacityTable />
            <Table />
        </>
    );
};