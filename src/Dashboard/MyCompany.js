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
import { useCompany } from "../shared/hook/useCompany";

const MyCompany = () => {
  const { updatedCompanyDate, handleChange, handleSubmit } = useCompany();

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h5" component="h2">
            Dane firmy
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControl fullWidth variant="outlined">
            <InputLabel id="legalFormLabel">Forma prawna</InputLabel>
            <Select
              labelId="legalFormLabel"
              id="legalForm"
              name="legalForm"
              value={updatedCompanyDate?.legalForm}
              onChange={handleChange}
              label="Forma prawna"
            >
              {legalForms.map((form) => (
                <MenuItem key={form.value} value={form.value}>
                  {form.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            id="companyName"
            name="companyName"
            label="Nazwa firmy"
            variant="outlined"
            value={updatedCompanyDate?.companyName}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            id="nip"
            name="nip"
            label="NIP"
            variant="outlined"
            value={updatedCompanyDate?.nip}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            id="regon"
            name="regon"
            label="REGON"
            variant="outlined"
            value={updatedCompanyDate?.regon}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            id="street"
            name="street"
            label="Ulica"
            variant="outlined"
            value={updatedCompanyDate?.street}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField
            fullWidth
            id="city"
            name="city"
            label="Miasto"
            variant="outlined"
            value={updatedCompanyDate?.city}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField
            fullWidth
            id="zipCode"
            name="zipCode"
            label="Kod pocztowy"
            variant="outlined"
            value={updatedCompanyDate?.zipCode}
            onChange={handleChange}
          />
        </Grid>
        <button onClick={handleSubmit}>Submit</button>
      </Grid>
    </>
  );
};

export default Layout(MyCompany);
