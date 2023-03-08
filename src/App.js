import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import LoginPage from "./Auth/LoginPage/LoginPage";
import RegisterPage from "./Auth/RegisterPage/RegisterPage";
import Dashboard from "./Pages/Dashboard";
import MyCompany from "./Pages/MyCompany";
import AllInvoices from "./Pages/AllInvoices";
import Kontrahent from "./Pages/Kontrahent";
import Settings from "./Pages/Settings";

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
