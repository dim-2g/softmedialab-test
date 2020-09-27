import {SALARY_TYPES} from "../constants/enums";
import {SET_INITIAL_WAGE} from './types';

export const initialState = {
    [SALARY_TYPES.MONTH]: {
        'label': 'Оклад за месяц',
        'tooltip': {
            'text': '',
            'open': false
        },
        'wage': 40000,
        'measure': '',
    },
    [SALARY_TYPES.MROT]: {
        'label': 'МРОТ',
        'tooltip': {
            'text': 'МРОТ - минимальный размер оплаты труда. Разный для разных регионов.',
            'open': false
        },
        'wage': null,
        'measure': '',
    },
    [SALARY_TYPES.DAY]: {
        'label': 'Оплата за день',
        'tooltip': {
            'text': '',
            'open': false
        },
        'wage': 1500,
        'measure': 'в день',
    },
    [SALARY_TYPES.HOUR]: {
        'label': 'Оплата за час',
        'tooltip': {
            'text': '',
            'open': false
        },
        'wage': 400,
        'measure': 'в час',
    },
};

export const salariesReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_INITIAL_WAGE:
            const salary = {...state[action.payload.type]};
            salary.wage = action.payload.wage;
            state = {...state, [action.payload.type]: salary};
            break;
    }
    return state;
};