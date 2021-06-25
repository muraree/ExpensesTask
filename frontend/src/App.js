import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  Link,
} from "react-router-dom";
import styles from "./App.module.css";
import Navbar from './components/Navbar';
import ExpenseEdit from './components/ExpenseEdit';
import Login from './components/Login';
import Signup from './components/Signup';
import Accounts from './components/Accounts';
import AccountList from "./components/AccountList";
import EditAccount from './components/EditAccount';
import ErrorMessage from './components/ErrorMessage';
import Expenses from './components/Expenses';
import ExpenseList from './components/ExpenseList';
import { transitions, positions, Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'

function App() {
  const options = {
    // you can also just use 'bottom center'
    position: positions.BOTTOM_CENTER,
    timeout: 5000,
    offset: '30px',
    // you can also just use 'scale'
    transition: transitions.SCALE
  }
  return (
    <div>
      <AlertProvider template={AlertTemplate} {...options}>
      <Navbar/>
      <Switch>
        <Route exact path="/" component={AccountList}/>
        <Route exact path="/login" component={Login}/>
        <Route exact path="/signup" component={Signup}/>
        <Route exact path="/accounts/new" component={Accounts}/>
        <Route exact path="/accounts/:id" component={EditAccount}/>
        <Route exact path="/expenses/:id" component={ExpenseList}/>
        <Route exact path="/account/expenses/:id" component={Expenses}/>
        <Route exact path="/404" componet={ErrorMessage}/>
      </Switch>
      </AlertProvider>
    </div>

  );
}

export default App;
