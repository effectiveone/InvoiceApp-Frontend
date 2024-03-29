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
import { legalForms } from "../../Utils/forms";
import { t } from "i18next";
function CompanyForm({ whichInputs, updatedCompanyData, handleChange }) {
  const [updatedProps, setUpdatedProps] = useState(updatedCompanyData);
  useEffect(() => {
    setUpdatedProps(updatedCompanyData);
  }, [updatedCompanyData]);

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h5" component="h2">
            {t("companyData")}
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControl fullWidth variant="outlined">
            <InputLabel id="legalFormLabel">{t("legalForm")}</InputLabel>
            <Select
              labelId="legalFormLabel"
              id="legalForm"
              name="legalForm"
              value={updatedProps?.legalForm}
              onChange={handleChange}
              label={t("legalForm")}
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
            label={t("companyName")}
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
            label={t("street")}
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
            label={t("city")}
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
            label={t("zipCode")}
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
                label={t("bankName")}
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
                label={t("bankAccount")}
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
