import React from "react";
import XLSX from 'xlsx';
import { Button } from "@material-ui/core";

type Props = {
    table: React.RefObject<HTMLTableElement>;
    name?: string;
    sheet?: string;
};

export default function Export({ table, name, sheet, children }: React.PropsWithChildren<Props>) {
    const handleDownload = React.useCallback((e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(table.current); //converts a DOM TABLE element to a worksheet
        const wb: XLSX.WorkBook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, sheet ?? 'Sheet1');

        /* save to file */
        XLSX.writeFile(wb, name ?? 'sheet.xlsx');
    }, [name, sheet, table]);

    return (
        <Button onClick={handleDownload}>{children}</Button>
    );
};
