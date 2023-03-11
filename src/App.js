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
import { useUser } from "./shared/hook/useUser";
import AlertNotification from "./shared/components/AlertNotification";

import "./App.css";

function PrivateRoute({ children, ...rest }) {
  const { currentUser } = useUser();
  return (
    <Route {...rest}>{currentUser ? children : <Redirect to="/login" />}</Route>
  );
}

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
          <PrivateRoute exact path="/dashboard">
            <Dashboard />
          </PrivateRoute>
          <PrivateRoute exact path="/allinvoices">
            <AllInvoices />
          </PrivateRoute>
          <PrivateRoute exact path="/kontrahent">
            <Kontrahent />
          </PrivateRoute>
          <PrivateRoute exact path="/settings">
            <Settings />
          </PrivateRoute>
          <PrivateRoute exact path="/mycompany">
            <MyCompany />
          </PrivateRoute>
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
