import { useCompanyContext } from "../../context/useCompanyContext";
import CompanyForm from "./companyForm";
import { Button } from "@material-ui/core";

export const CompanyContent = () => {
  const { updatedCompanyData, handleChange, handleSubmit } =
    useCompanyContext();

  return (
    <>
      <CompanyForm
        whichInputs="company"
        updatedCompanyDate={updatedCompanyData}
        handleChange={handleChange}
      />
      <Button onClick={handleSubmit}>Submit</Button>
    </>
  );
};
