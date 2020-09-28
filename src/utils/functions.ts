
export const moneyFormat = (wage: string | number | null): string => {
    if (!wage) return '';

    let newWage = String(wage).replace(/\s+/g, '');
    newWage = parseFloat(newWage).toFixed(2);
    newWage = parseFloat(newWage).toLocaleString('ru-RU')
    return newWage;
};

export const parseWageToNumber = (wage: string): number => {
    if (!wage) return Number(wage);

    let newWage = parseFloat(String(wage).replace(/\s/g,''));
    return newWage;
};