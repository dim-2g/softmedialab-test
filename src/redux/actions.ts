import {SET_INITIAL_WAGE} from './types';

interface ISetInitalWage {
    type: string;
    payload: {
        wage: string;
        id: string;
    },
};

export function setInitialWage(wage: string, id: string): ISetInitalWage {
    return {
        type: SET_INITIAL_WAGE,
        payload: {
            wage,
            id
        }
    };
}