import {SET_INITIAL_WAGE} from './types';

interface ISetInitalWage {
    type: string;
    payload: {
        wage: number;
        id: string;
    },
};

export function setInitialWage(wage: number, id: string): ISetInitalWage {
    return {
        type: SET_INITIAL_WAGE,
        payload: {
            wage,
            id
        }
    };
}