import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import LoginPage from "./Auth/LoginPage/LoginPage";
import RegisterPage from "./Auth/RegisterPage/RegisterPage";
import IssuedInvoicePage from "./Pages/IssuedInvoicePage";
import MyCompanyPage from "./Pages/MyCompanyPage";
import NewInvoicePage from "./Pages/NewInvoicePage";
import KontrahentPage from "./Pages/KontrahentPage";
import SettingsPage from "./Pages/SettingsPage";
import { useUser } from "./Shared/Hook/useUser";
import AlertNotification from "./Shared/Components/AlertNotification";

import "./App.css";

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
              <Route path="/InvoicesIssued" element={<IssuedInvoicePage />} />
              <Route path="/NewInvoice" element={<NewInvoicePage />} />
              <Route path="/Kontrahent" element={<KontrahentPage />} />
              <Route path="/SettingsPage" element={<SettingsPage />} />
              <Route path="/Mycompany" element={<MyCompanyPage />} />
              <Route path="/" element={<Navigate to="/InvoicesIssued" />} />
            </>
          ) : (
            <Route path="/" element={<LoginPage />} />
          )}
          <Route
            path="/"
            element={
              currentUser ? <Navigate to="/InvoicesIssued" /> : <LoginPage />
            }
          />
        </Routes>
      </Router>
      <AlertNotification />
    </>
  );
}

export default App;
