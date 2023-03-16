import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
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

function PrivateRoute({ element, ...rest }) {
  const { currentUser } = useUser();
  return (
    <Route
      {...rest}
      element={currentUser ? element : <Navigate to="/login" />}
    />
  );
}

function App() {
  const { currentUser } = useUser();

  return (
    <>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          {currentUser ? (
            <>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/allinvoices" element={<AllInvoices />} />
              <Route path="/kontrahent" element={<Kontrahent />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/mycompany" element={<MyCompany />} />
              <Route path="/" element={<Navigate to="/dashboard" />} />
            </>
          ) : (
            <Route path="/" element={<LoginPage />} />
          )}
          <Route
            path="/"
            element={currentUser ? <Navigate to="/dashboard" /> : <LoginPage />}
          />
        </Routes>
      </Router>
      <AlertNotification />
    </>
  );
}

export default App;
