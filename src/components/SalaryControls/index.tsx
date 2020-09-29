import React from "react";
import {SalaryType} from "../../redux/salariesReducer";
import {setInitialWage} from "../../redux/actions";
import {moneyFormat, parseWageToNumber} from "../../utils/functions";
import {useDispatch} from "react-redux";
import {Field} from "redux-form";
import ToggleControl from "../ToggleControl";
import './index.scss';

interface ISalaryControls {
    currentSalary: SalaryType;
    currentId: string;
}
const SalaryControls: React.FC<ISalaryControls> = ({currentSalary, currentId}) => {
    const dispatch = useDispatch();

    const changeInitialWage = (wage: string) => {
        dispatch(setInitialWage(parseWageToNumber(wage), currentId));
    };

    return (
        <div className="row">
            <div className="col-md-5 ndfl-choice">
                <Field
                    component={ToggleControl}
                    name="withNdfl"
                    labelOff={`Указать с НДФЛ`}
                    labelOn={`Без НДФЛ`}
                />
                {currentSalary.wage !== null && (
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
                )}
            </div>
        </div>
    );
};

export default SalaryControls;