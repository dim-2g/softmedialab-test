import React from "react";
import {SalaryType} from "../../redux/salariesReducer";
import {Field, change as changeForm} from "redux-form";
import Tooltip from "../Tooltip";
import {useDispatch} from "react-redux";
import './index.scss';

interface ISalaryList {
    salaries: SalaryType[];
    currentId: string;
}

const SalaryList: React.FC<ISalaryList> = (props) => {
    const {currentId, salaries} = props;
    const dispatch = useDispatch();

    const checkSalaryType = (id: string) => {
        let curSalary = salaries.find(item => item.id === id);
        if (curSalary) {
            let wage = String(curSalary.wage);
            dispatch(changeForm('salary', 'wage', wage));
        }
    };

    return (
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
                                    checked={currentId == item.id}
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
    );
};

export default SalaryList;