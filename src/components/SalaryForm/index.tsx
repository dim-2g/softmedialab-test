import React, {useState} from "react";
import {Field, getFormValues, reduxForm, change as changeForm, formValueSelector} from "redux-form";
import {useDispatch, useSelector} from "react-redux";
import {SALARY_TYPES} from "../../constants/enums";
import Tooltip from "../Tooltip";
import ToggleControl from "../ToggleControl";
import SalaryResult from "../SalaryResult";
import {initialStateArray as initialStateSalary} from "../../redux/salariesReducer";
import {setInitialWage} from "../../redux/actions";
import {moneyFormat, parseWageToNumber} from "../../utils/functions";
import {SalaryType, SalariesType} from '../../redux/salariesReducer';

export type OneSalary = {
    form: {
        salary: {
            type: {
                values: {
                    type: string
                }
            }
        }
    }
}

const SalaryForm = () => {
    const dispatch = useDispatch();
    const selector = formValueSelector('salary')
    const type = useSelector((state) => selector(state, 'type'));
    const salaries = useSelector<SalariesType, Array<SalaryType>>(state => state.salaries)
    const currentSalary : SalaryType = salaries.find(item => item.type === type);

    console.log(salaries);


    const checkSalaryType = (type: string) => {
        //let wage = salaries.find(item => item.type === type).wage;
        let wage = 33;
        dispatch(changeForm('salary', 'wage', wage));
    };

    const changeInitialWage = (wage: string) => {
        dispatch(setInitialWage(parseWageToNumber(wage), type));
    };

    return (
        <div className="d-control">
            <div className="d-control__header">Сумма</div>
                <div className="d-control__list">
                    {salaries.map(item => {
                            const salary = item;
                            return (
                                <div className="d-control__item" key={item.type}>
                                    <label className="radio-custom" htmlFor={`salary-${item.type}`} >
                                    <Field
                                        component="input"
                                        id={`salary-${item.type}`}
                                        name="type"
                                        type="radio"
                                        className="radio-custom__input"
                                        checked={type == item.type}
                                        value={item.type}
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => checkSalaryType(e.target.value)}
                                        />
                                        <span className="radio-custom__pseudo"></span>
                                            <span className="radio-custom__label">
                                            {salary.label}
                                            </span>
                                            </label>
                                            <Tooltip input={salary.tooltip}/>
                                        </div>
                                    );
                                })}
                            </div>

                {currentSalary.wage !== null && (
                    <div className="ndfl-choice">
                        <Field
                            component={ToggleControl}
                            name="withNdfl"
                            labelOff={`Указать с НДФЛ`}
                            labelOn={`Без НДФЛ`}
                        />
                        <div className="ndfl-choice__input-box">
                            <Field
                                component="input"
                                type="text"
                                className="ndfl-choice__input"
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => changeInitialWage(e.target.value)}
                                name="wage"
                                format={moneyFormat}
                                parse={parseWageToNumber}
                            />
                            &#x20bd; {currentSalary.measure}
                        </div>
                    </div>
                )}
                <SalaryResult typeSalary={type} />
        </div>
    );

};

const activeSalaryType = SALARY_TYPES.MONTH;
//const initialWage = initialStateSalary.find(item => item.type === activeSalaryType).wage;
const initialWage = 40000;
const SalaryReduxForm = reduxForm({
    form: 'salary',
    initialValues: {
        type: activeSalaryType,
        wage: parseWageToNumber(initialWage),
        withNdfl: true
    }
})(SalaryForm);

export default SalaryReduxForm;