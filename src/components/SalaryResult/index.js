import React from "react";
import {CSSTransition} from "react-transition-group";
import {SALARY_TYPES} from "../../constants/enums";
import {useSelector} from "react-redux";
import {getFormValues} from "redux-form";
import {moneyFormat} from "../../utils/functions";
import './index.scss';

const SalaryResult = (props) => {
    const {typeSalary} = props;
    const showPanelResult = typeSalary === SALARY_TYPES.MONTH;
    const {wage, withNdfl} = useSelector(state => getFormValues('salary')(state));

    const NDFL_RATIO = 0.13;

    const fullSalary = withNdfl ? (wage / (1 - NDFL_RATIO)) : wage;
    const ndfl = fullSalary * NDFL_RATIO;
    const clearSalary = fullSalary - ndfl;

    return (
        <CSSTransition
            in={showPanelResult}
            timeout={300}
            classNames="d-tooltip"
            unmountOnExit
        >
            <div className="d-control-panel">
                <p><b>{moneyFormat(clearSalary)} &#x20bd;</b> сотрудник будет получать на руки</p>
                <p><b>{moneyFormat(ndfl)} &#x20bd;</b> НДФЛ, 13% от оклада</p>
                <p><b>{moneyFormat(fullSalary)} &#x20bd;</b> за сотрудника в месяц</p>
            </div>
        </CSSTransition>
    );
};

export default SalaryResult;