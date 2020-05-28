enum HalfYear {
    fall = 'fall', // осенний
    spring = 'spring', // весенний
}

export function getHalfYear(date: Date): HalfYear {
    let halfYear: HalfYear;
    switch (date.getMonth()) {
        case 0: // January
            halfYear = HalfYear.fall;
            break;
        case 1: // February
        case 2: // March
        case 3: // April
        case 4: // May
        case 5: // June
            halfYear = HalfYear.spring;
            break;
        case 6: // July
        case 7: // August
        case 8: // September
        case 9: // October
        case 10: // November
        case 11: // December
            halfYear = HalfYear.fall;
            break;
    }
    return halfYear!;
}
export function getHalfYearAsNumber(date:Date){
    const value = getHalfYear(date);
    if(value === HalfYear.fall){
        return 1;
    }
    if(value === HalfYear.spring){
        return 2;
    }
}