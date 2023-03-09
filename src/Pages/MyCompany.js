import React from "react";
import {
  TextField,
  Grid,
  Typography,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@material-ui/core";
import Layout from "../shared/components/layout/layout";
import { legalForms } from "../shared/utils/forms";
import {
  useCompanyContext,
  CompanyProvider,
} from "../shared/context/useCompanyContext";
import CompanyForm from "../shared/components/companyForm";

const MyCompany = () => {
  return (
    <CompanyProvider>
      <MyComponent />
    </CompanyProvider>
  );
};

const MyComponent = () => {
  const { updatedCompanyDate, handleChange, handleSubmit } =
    useCompanyContext();

  return (
    <>
      <CompanyForm
        whichInputs="company"
        updatedCompanyDate={updatedCompanyDate}
        handleChange={handleChange}
      />
      <button onClick={handleSubmit}>Submit</button>
    </>
  );
};

export default Layout(MyCompany);
