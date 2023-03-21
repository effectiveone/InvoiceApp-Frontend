import { useCompanyContext } from "../../Context/useCompanyContext";
import CompanyForm from "./companyForm";
import { Button } from "@material-ui/core";
import React from "react";

const CompanyContent: React.FC = () => {
  const { updatedCompanyData, handleChange, handleSubmit } =
    useCompanyContext();

  return (
    <>
      <CompanyForm
        whichInputs="company"
        updatedCompanyData={updatedCompanyData}
        handleChange={handleChange}
      />
      <Button onClick={handleSubmit}>Submit</Button>
    </>
  );
};

export default CompanyContent;
