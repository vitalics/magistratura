import React from 'react';

import Header from '../components/menu';
import CapacityTable from '../components/capacitytable';
import Table from '../components/xlsx/table';
export default React.memo(() => {
    return (
        <>
            <Header />
            <CapacityTable />
            <Table />
        </>
    );
});