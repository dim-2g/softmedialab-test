import {combineReducers} from 'redux';
import { reducer as formReducer } from 'redux-form'
import {salariesReducer} from "./salariesReducer";

export const rootReducer = combineReducers({
    salaries: salariesReducer,
    form: formReducer
});

export type AppState = ReturnType<typeof rootReducer>;