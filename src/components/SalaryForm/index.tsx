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
import {AppState} from "../../redux/rootReducer";

const SalaryForm = () => {
    const dispatch = useDispatch();
    const selector = formValueSelector('salary')
    const id = useSelector<AppState, string>((state) => selector(state, 'id'));
    const salaries = useSelector<AppState, Array<SalaryType>>(state => state.salaries) || [];
    const currentSalary = salaries.find(item => item.id === id) || salaries[0];

    const checkSalaryType = (id: string) => {
        let curSalary = salaries.find(item => item.id === id);
        if (curSalary) {
            let wage = String(curSalary.wage);
            dispatch(changeForm('salary', 'wage', wage));
        }
    };

    const changeInitialWage = (wage: string) => {
        dispatch(setInitialWage(parseWageToNumber(wage), id));
    };

    return (
        <div className="d-control">
            <div className="d-control__header">Сумма</div>
                <div className="row">
                    <div className="col-md-5 d-control__list">
                        {salaries.map(item => {
                            const salary = item;
                            return (
                                <div className="d-control__item" key={item.id}>
                                    <label className="radio-custom" htmlFor={`salary-${item.id}`} >
                                        <Field
                                            component="input"
                                            id={`salary-${item.id}`}
                                            name="id"
                                            type="radio"
                                            className="radio-custom__input"
                                            checked={id == item.id}
                                            value={item.id}
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
                </div>

                {currentSalary.wage !== null && (
                    <div className="row">
                        <div className="col-md-5 ndfl-choice">
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
                    </div>
                )}
                <SalaryResult salaryId={id} />
        </div>
    );

};

const activeSalaryId = SALARY_TYPES.MONTH;
let curSalary = initialStateSalary.find(item => item.id === activeSalaryId);
const initialWage = curSalary ? curSalary.wage : '';

const SalaryReduxForm = reduxForm({
    form: 'salary',
    initialValues: {
        id: activeSalaryId,
        wage: parseWageToNumber(String(initialWage)),
        withNdfl: true
    }
})(SalaryForm);

export default SalaryReduxForm;