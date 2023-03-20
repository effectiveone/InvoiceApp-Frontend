import { useCompanyContext } from "../../Context/useCompanyContext";
import CompanyForm from "./companyForm";
import { Button } from "@material-ui/core";
import React from "react";

interface CompanyContentProps {}

const CompanyContent: React.FC<CompanyContentProps> = () => {
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
