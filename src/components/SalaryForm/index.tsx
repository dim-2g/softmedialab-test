import React from "react";
import {reduxForm, formValueSelector} from "redux-form";
import {useSelector} from "react-redux";
import {initialState as initialStateSalary} from "../../redux/salariesReducer";
import {SALARY_TYPES} from "../../constants/enums";
import SalaryResult from "../SalaryResult";
import SalaryList from "../SalaryList";
import SalaryControls from "../SalaryControls";
import {parseWageToNumber} from "../../utils/functions";
import {SalaryType} from '../../redux/salariesReducer';
import {AppState} from "../../redux/rootReducer";


const SalaryForm = () => {
    const selector = formValueSelector('salary')
    const id = useSelector<AppState, string>((state) => selector(state, 'id'));
    const salaries = useSelector<AppState, Array<SalaryType>>(state => state.salaries) || [];
    const currentSalary = salaries.find(item => item.id === id) || salaries[0];

    return (
        <div className="d-control">
            <div className="d-control__header">Сумма</div>
            <SalaryList currentId={id} salaries={salaries}/>
            <SalaryControls currentId={id} currentSalary={currentSalary}/>
            <SalaryResult salaryId={id} />
        </div>
    );

};

const activeSalaryId = SALARY_TYPES.MONTH;
const currentSalaryInitial = initialStateSalary.find(item => item.id === activeSalaryId);
const initialWage = currentSalaryInitial ? currentSalaryInitial.wage : '';

const SalaryReduxForm = reduxForm({
    form: 'salary',
    initialValues: {
        id: activeSalaryId,
        wage: parseWageToNumber(String(initialWage)),
        withNdfl: true
    }
})(SalaryForm);

export default SalaryReduxForm;