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
import useTheme from "./shared/hook/useTheme";
import { ThemeProvider } from "@material-ui/core/styles";

import "./App.css";

function PrivateRoute({ children, ...rest }) {
  const { currentUser } = useUser();
  return (
    <Route {...rest}>{currentUser ? children : <Redirect to="/login" />}</Route>
  );
}

function App() {
  const { currentUser } = useUser();
  const theme = useTheme();

  return (
    <>
      <ThemeProvider theme={theme}>
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
            <Route exact path="/">
              {currentUser ? <Redirect to="/dashboard" /> : <LoginPage />}
            </Route>
          </Switch>
        </Router>
      </ThemeProvider>
      <AlertNotification />
    </>
  );
}

export default App;
