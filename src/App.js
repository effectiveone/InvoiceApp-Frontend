import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import LoginPage from "./authPages/LoginPage/LoginPage";
import RegisterPage from "./authPages/RegisterPage/RegisterPage";
import Dashboard from "./Dashboard/Dashboard";
import MyCompany from "./Dashboard/MyCompany";
import AllInvoices from "./Dashboard/AllInvoices";
import Kontrahent from "./Dashboard/Kontrahent";
import Settings from "./Dashboard/Settings";

import AlertNotification from "./shared/components/AlertNotification";

import "./App.css";

function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route exact path="/login">
            <LoginPage />
          </Route>
          <Route exact path="/register">
            <RegisterPage />
          </Route>
          <Route exact path="/dashboard">
            <Dashboard />
          </Route>
          <Route exact path="/allinvoices">
            <AllInvoices />
          </Route>
          <Route exact path="/kontrahent">
            <Kontrahent />
          </Route>
          <Route exact path="/settings">
            <Settings />
          </Route>
          <Route exact path="/mycompany">
            <MyCompany />
          </Route>
          <Route path="/">
            <Redirect to="/dashboard" />
          </Route>
        </Switch>
      </Router>
      <AlertNotification />
    </>
  );
}

export default App;
