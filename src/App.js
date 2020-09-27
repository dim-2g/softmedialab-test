import React, {useState} from 'react';
import classNames from 'classnames';
import { CSSTransition } from 'react-transition-group';
import {Field, reduxForm} from "redux-form";
import SalaryReduxForm from "./components/SalaryForm";
import {SALARY_TYPES} from './constants/enums';

import './App.scss';

function App() {
  return (
    <div className="App">
      <div className="container">
        <h3>Контрол, на основании макета</h3>
        <SalaryReduxForm />
      </div>
    </div>
  );
}

export default App;
