import React from 'react';

import XLSX from 'xlsx';
import { getCurrentXlsx } from '../../firebase';

type Props = {};
export default function Table({ }: Props) {
    React.useEffect(() => {
        getCurrentXlsx().then(blob => {
            const wb = XLSX.read(blob, { type: 'buffer' });
            const ws = wb.Sheets[wb.SheetNames[0]];
            const jsonData = XLSX.utils.sheet_to_json(ws, { blankrows: false });

            console.log('table views', jsonData)
        })
    }, [])

    return (
        <>Hello</>
    );
}