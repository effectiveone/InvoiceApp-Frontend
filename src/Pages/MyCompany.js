import React from "react";
import Layout from "../shared/components/layout/layout";
import { CompanyProvider } from "../shared/context/useCompanyContext";
import { CompanyContent } from "../shared/components/Company/CompanyContent";

const MyCompany = () => {
  return (
    <CompanyProvider>
      <CompanyContent />
    </CompanyProvider>
  );
};

export default Layout(MyCompany);
