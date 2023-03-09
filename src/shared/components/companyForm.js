import React, { useState, useEffect } from "react";
import {
  TextField,
  Grid,
  Typography,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { legalForms } from "../utils/forms";
import { useKontrahentContext } from "../context/useKontrahentContext";
import { useCompanyContext } from "../context/useCompanyContext";

function CompanyForm({ whichInputs, updatedCompanyDate, handleChange }) {
  const [updatedProps, setUpdatedProps] = useState(updatedCompanyDate);
  useEffect(() => {
    setUpdatedProps(updatedCompanyDate);
  }, [updatedCompanyDate]);

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
              value={updatedProps?.legalForm}
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
            value={updatedProps?.companyName}
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
            value={updatedProps?.nip}
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
            value={updatedProps?.regon}
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
            value={updatedProps?.street}
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
            value={updatedProps?.city}
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
            value={updatedProps?.zipCode}
            onChange={handleChange}
          />
        </Grid>
        {whichInputs === "company" && (
          <>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                id="bankName"
                name="bankName"
                label="bank name"
                variant="outlined"
                value={updatedProps?.bankName}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                id="bankAccount"
                name="bankAccount"
                label="Konto bankowe"
                variant="outlined"
                value={updatedProps?.bankAccount}
                onChange={handleChange}
              />
            </Grid>
          </>
        )}
      </Grid>
    </>
  );
}

export default CompanyForm;
