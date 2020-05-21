import React, { MutableRefObject, PropsWithChildren } from "react";
import Button from "@material-ui/core/Button";
import PrintJS from 'print-js';
type Props = {
    tableRef: MutableRefObject<unknown>,
    filename: string;
    sheet: string;
    id?: string;
    className?: string;
}

function base64(string: string) {
    return btoa(unescape(encodeURIComponent(string)));
}

export default function ExportTable(props: PropsWithChildren<Props>) {
    const filename = `${props.filename}.xls`;

    const uri = 'data:application/vnd.ms-excel;base64,';
    const worksheet = props.sheet || 'Worksheet';

    const download = () => {
        const table = (props.tableRef.current as HTMLElement).outerHTML;
        const template =
            `<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><meta charset="UTF-8"><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>${worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body>${table}</body></html>`;

        const element = window.document.createElement('a');
        element.href =
            uri +
            base64(template);
        element.download = filename;
        (props.tableRef.current as HTMLElement).appendChild(element);
        element.click();
        (props.tableRef.current as HTMLElement).removeChild(element);
    };

    const printPdf = () => {
        const table = (props.tableRef.current as HTMLElement).outerHTML;
        const template =
            `<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><meta charset="UTF-8"><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>${worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body>${table}</body></html>`;

        const base64Print = uri + base64(template);
        console.log(base64Print);
        PrintJS({ base64: true, printable: template, showModal: true, type: 'raw-html' })
    };
    return (
        <>
            <Button onClick={download} className={props.className} id={props.id}>{props.children}</Button>
            <Button onClick={printPdf} >Print</Button>
        </>
    );
}
