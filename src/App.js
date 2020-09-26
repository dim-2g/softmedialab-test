import React, {useState} from 'react';
import classNames from 'classnames';
import { CSSTransition } from 'react-transition-group';

import './App.scss';

const SALARY_TYPES = {'MONTH': 'month', 'MROT': 'mrot', 'DAY': 'day', 'HOUR': 'hour'};
const salariesInitial = {
  [SALARY_TYPES.MONTH]: {
    'label': 'Оклад за месяц',
    'tooltip': {
      'text': '',
      'open': false
    },
    'price': 40000,
    'measure': '',
  },
  [SALARY_TYPES.MROT]: {
    'label': 'МРОТ',
    'tooltip': {
      'text': 'МРОТ - минимальный размер оплаты труда. Разный для разных регионов.',
      'open': false
    },
    'price': null,
    'measure': '',
  },
  [SALARY_TYPES.DAY]: {
    'label': 'Оплата за день',
    'tooltip': {
      'text': '',
      'open': false
    },
    'price': 1500,
    'measure': 'в день',
  },
  [SALARY_TYPES.HOUR]: {
    'label': 'Оплата за час',
    'tooltip': {
      'text': 'Проверка второго',
      'open': false
    },
    'price': 400,
    'measure': 'в час',
  },
};

function App() {
  const [toggle, setToggle] = useState(true);
  const toggleClass = classNames({'d-toggle-control--on': toggle, 'd-toggle-control--off': !toggle});
  const [type, setType] = useState(SALARY_TYPES.MONTH)
  const showPanelResult = type == SALARY_TYPES.MONTH;
  const [salaries, setSalaries] = useState(salariesInitial);
  const currentSalary = salaries[type];

  const toggleTooltip = (key) => {
      let newSalariesState = Object.assign({}, salaries);
      newSalariesState[key].tooltip.open = !newSalariesState[key].tooltip.open;
      //отключаем все остальные, если открываем новый
      if (newSalariesState[key].tooltip.open) {
        for (let type in newSalariesState) {
           if (type !== key) {
             newSalariesState[type].tooltip.open = false;
           }
        }
      }
      setSalaries(newSalariesState);
  };

  return (
    <div className="App">
      <div className="container">
        <h3>Контрол, на основании макета</h3>
        <div className="d-control">
          <div className="d-control__header">Сумма</div>
          <div className="d-control__list">
            {Object.keys(salaries).map(salaryType => {
                const salary = salaries[salaryType];
                const tooltipClass = classNames({'d-tooltip--open': salary.tooltip.open});
                return (
                    <div className="d-control__item" key={salaryType}>
                      <label className="radio-custom" htmlFor={`salary-${salaryType}`} >
                        <input
                            id={`salary-${salaryType}`}
                            name="salary"
                            type="radio"
                            className="radio-custom__input"
                            checked={type == salaryType}
                            value={salaryType}
                            onChange={(e) => setType(e.target.value)}
                        />
                        <span className="radio-custom__pseudo"></span>
                        <span className="radio-custom__label">
                          {salary.label}
                        </span>
                      </label>
                      {salary.tooltip.text && (
                          <span className={`d-tooltip ${tooltipClass}`} onClick={() => toggleTooltip(salaryType)}>
                            <span className="d-tooltip__body">
                              <span className="d-tooltip__content">
                                {salary.tooltip.text}
                              </span>
                            </span>
                          </span>
                      )}
                    </div>
                );
            })}
          </div>

          {currentSalary.price && (
          <div className="ndfl-choice">
              <div className={`d-toggle-control ${toggleClass}`}>
                <div className="d-toggle-control__label d-toggle-control__off">
                  Указать с НДФЛ
                </div>
                <div className="d-toggle-control__indicator" onClick={() => setToggle(prev => !prev)}></div>
                <div className="d-toggle-control__label d-toggle-control__on">
                  Без НДФЛ
                </div>
              </div>
              <div className="ndfl-choice__input-box">
                <input type="text" className="ndfl-choice__input" value={currentSalary.price}/>&#x20bd; {currentSalary.measure}
              </div>
          </div>
          )}
          <CSSTransition
              in={showPanelResult}
              timeout={300}
              classNames="alert"
              unmountOnExit
          >
            <div className="d-control-panel">
              <p>
                <span className="d-control-panel__value">40 000 &#x20bd;</span> сотрудник будет получать на руки
              </p>
              <p>
                <span className="d-control-panel__value">5 977 &#x20bd;</span> НДФЛ, 13% от оклада
              </p>
              <p>
                <span className="d-control-panel__value">45 977 &#x20bd;</span> за сотрудника в месяц
              </p>
            </div>
          </CSSTransition>

        </div>
      </div>
    </div>
  );
}

export default App;
