import React from "react";
import classNames from "classnames";
import './index.scss';

const ToggleControl = (props) => {
    const {labelOff, labelOn, input: {value, onChange}} = props;
    const toggleClass = classNames({'d-toggle-control--on': value, 'd-toggle-control--off': !value});

    return (
        <div className={`d-toggle-control ${toggleClass}`}>
            <div className="d-toggle-control__label d-toggle-control__off">
                {labelOff}
            </div>
            <div className="d-toggle-control__indicator" onClick={() => onChange(!value)}></div>
            <div className="d-toggle-control__label d-toggle-control__on">
                {labelOn}
            </div>
        </div>
    );
};

export default ToggleControl;