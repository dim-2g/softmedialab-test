import React, {useState} from 'react';
import SalaryReduxForm from "./components/SalaryForm";

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
