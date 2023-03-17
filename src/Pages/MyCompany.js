import React from "react";
import Layout from "../Shared/Components/Layout/layout";
import { CompanyProvider } from "../Shared/Context/useCompanyContext";
import { CompanyContent } from "../Shared/Components/Company/CompanyContent";

const MyCompany = () => {
  return (
    <CompanyProvider>
      <CompanyContent />
    </CompanyProvider>
  );
};

export default Layout(MyCompany);
