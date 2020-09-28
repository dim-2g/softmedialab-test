import React, {useState} from "react";
import classNames from "classnames";
import './index.scss';

interface ITooltip {
    input: {
        text: string;
        open: boolean;
    }
}

const Tooltip: React.FC<ITooltip> = (props) => {
    const {input: {text, open}} = props;
    const [openState, setOpenState] = useState<boolean>(open);
    const tooltipClass = classNames({'d-tooltip--open': openState});

    if (!text) return null;

    return (
        <span className={`d-tooltip ${tooltipClass}`} onClick={() => setOpenState(prev => !prev)}>
            <span className="d-tooltip__body">
                <span className="d-tooltip__content">
                    {text}
                </span>
            </span>
        </span>
    );
};

export default Tooltip;