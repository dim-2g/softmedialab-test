export const moneyFormat = (wage) => {
    if (!wage) return wage;

    let newWage = String(wage).replace(/\s+/g, '');
    newWage = parseFloat(newWage).toFixed(2);
    newWage = parseFloat(newWage).toLocaleString('ru-RU')
    return newWage;
};

export const parseWageToNumber = (wage) => {
    if (!wage) return wage;

    let newWage = parseFloat(String(wage).replace(/\s/g,''));
    return newWage;
};