import {SALARY_TYPES} from "../constants/enums";
import {SET_INITIAL_WAGE} from './types';

export const initialStateArray = [
    {
        'type': SALARY_TYPES.MONTH,
        'label': 'Оклад за месяц',
        'tooltip': {
            'text': '',
            'open': false
        },
        'wage': 40000,
        'measure': '',
    },
    {
        'type': SALARY_TYPES.MROT,
        'label': 'МРОТ',
        'tooltip': {
            'text': 'МРОТ - минимальный размер оплаты труда. Разный для разных регионов.',
            'open': false
        },
        'wage': null,
        'measure': '',
    },
    {
        'type': SALARY_TYPES.DAY,
        'label': 'Оплата за день',
        'tooltip': {
            'text': '',
            'open': false
        },
        'wage': 1500,
        'measure': 'в день',
    },
    {
        'type': SALARY_TYPES.HOUR,
        'label': 'Оплата за час',
        'tooltip': {
            'text': '',
            'open': false
        },
        'wage': 400,
        'measure': 'в час',
    },
];

export const salariesReducer = (state = initialStateArray, action) => {
    switch (action.type) {
        case SET_INITIAL_WAGE:
            const salary = state.find(item => item.type === action.payload.type);
            salary.wage = action.payload.wage;
            const newState = state.map(item => {
                if (item.type == action.payload.type) {
                    return salary;
                }
                return item;
            });
            state = newState;
            break;
    }
    return state;
};