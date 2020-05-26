import React from 'react';

import XLSX from 'xlsx';
import { Button } from '@material-ui/core';
import { saveXlsx } from '../../firebase';

type Props = {
    table: React.RefObject<HTMLTableElement>;
    sheet?: string;
};
export default function SaveCloud({ table, sheet }: Props) {
    const handleSave = React.useCallback(async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(table.current);
        const wb: XLSX.WorkBook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, sheet ?? 'Sheet1');
        const base64 = XLSX.write(wb, { type: 'base64', bookType: 'xlsx', bookSST: false });
        const buffer = Uint8Array.from(atob(base64), c => c.charCodeAt(0))
        await saveXlsx(buffer);
    }, [sheet, table]);

    return (
        <Button onClick={handleSave}>Save to cloud</Button>
    );
}