import {SET_INITIAL_WAGE} from './types';

export function setInitialWage(wage, type) {
    return {
        type: SET_INITIAL_WAGE,
        payload: {
            wage,
            type
        }
    };
}