import React, {useState} from "react";
import logo from './logo.svg';
import './App.css';
import {Login} from "./frontend/Login";
import {Register} from "./frontend/Register";
import { Dashboard } from "./frontend/Dashboard";

function App() {
  const [currentForm, setCurrentForm] = useState('login');

  const toggleForm = (formName) => {
    setCurrentForm(formName);
  };

  return (
    <div className="App">
      {
        currentForm === 'login' ? <Login onFormSwitch={toggleForm} /> :
        currentForm === 'register' ? <Register onFormSwitch={toggleForm} /> :
        <Dashboard onFormSwitch={toggleForm} />
      }
    </div>
  );
}

export default App;
