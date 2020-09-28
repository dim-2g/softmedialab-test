import React, {useState} from "react";
import {Field, getFormValues, reduxForm, change as changeForm} from "redux-form";
import {useDispatch, useSelector} from "react-redux";
import {SALARY_TYPES} from "../../constants/enums";
import Tooltip from "../Tooltip";
import ToggleControl from "../ToggleControl";
import SalaryResult from "../SalaryResult";
import {initialStateArray as initialStateSalary} from "../../redux/salariesReducer";
import {setInitialWage} from "../../redux/actions";
import {moneyFormat, parseWageToNumber} from "../../utils/functions";

const SalaryForm = (props) => {
    const dispatch = useDispatch();
    const type = useSelector(state => getFormValues('salary')(state)).type;
    const salaries = useSelector(state => state.salaries)
    const currentSalary = salaries.find(item => item.type === type);

    const checkSalaryType = (type) => {
        let wage = salaries.find(item => item.type === type).wage;
        dispatch(changeForm('salary', 'wage', wage));
    };

    const changeInitialWage = (wage) => {
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
                            onChange={(e) => checkSalaryType(e.target.value)}
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
                                onChange={(e) => changeInitialWage(e.target.value)}
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
const initialWage = initialStateSalary.find(item => item.type === activeSalaryType).wage;
const SalaryReduxForm = reduxForm({
    form: 'salary',
    initialValues: {
        type: activeSalaryType,
        wage: parseWageToNumber(initialWage),
        withNdfl: true
    }
})(SalaryForm);

export default SalaryReduxForm;