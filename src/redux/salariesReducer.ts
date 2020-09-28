import {SALARY_TYPES} from "../constants/enums";
import {SET_INITIAL_WAGE} from './types';

export type SalaryType = {
    id: string;
    label: string;
    tooltip: {
        text: string;
        open: boolean;
    };
    wage: number | null;
    measure: string;
}

export type SalariesType = {
    salaries: SalaryType[]
}

export const initialState: SalaryType[] = [
    {
        id: SALARY_TYPES.MONTH,
        label: 'Оклад за месяц',
        tooltip: {
            text: '',
            open: false
        },
        wage: 40000,
        measure: '',
    },
    {
        id: SALARY_TYPES.MROT,
        label: 'МРОТ',
        tooltip: {
            text: 'МРОТ - минимальный размер оплаты труда. Разный для разных регионов.',
            open: false
        },
        wage: null,
        measure: '',
    },
    {
        id: SALARY_TYPES.DAY,
        label: 'Оплата за день',
        tooltip: {
            text: '',
            open: false
        },
        wage: 1500,
        measure: 'в день',
    },
    {
        id: SALARY_TYPES.HOUR,
        label: 'Оплата за час',
        tooltip: {
            text: '',
            open: false
        },
        wage: 400,
        measure: 'в час',
    },
];

type SalaryActionType = {
    type: typeof SET_INITIAL_WAGE;
    payload: {
        wage: number;
        id: string
    }
};

export const salariesReducer = (state = initialState, action: SalaryActionType) => {
    switch (action.type) {
        case SET_INITIAL_WAGE:
            const salary = state.find(item => item.id === action.payload.id);
            if (salary) {
                salary.wage = action.payload.wage;
                const newState = state.map(item => {
                    if (item.id == action.payload.id) {
                        return salary;
                    }
                    return item;
                });
                state = newState;
            }
            break;
    }
    return state;
};