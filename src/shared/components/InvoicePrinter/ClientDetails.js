import React, { useEffect } from "react";
import { Grid, Typography } from "@material-ui/core";

const CompanyDetails = ({
  title,
  legalForm,
  companyName,
  zip,
  city,
  street,
  nip,
}) => {
  useEffect(() => {
    console.log(
      "props changed:",
      companyName,
      legalForm,
      zip,
      city,
      street,
      nip
    );
  }, [companyName, legalForm, zip, city, street, nip]);
  return (
    <Grid
      container
      spacing={3}
      style={{ display: "flex", flexDirection: "column" }}
    >
      <Grid item xs={12}>
        <Typography variant="h4" component="h2">
          {title}
        </Typography>
      </Grid>
      <Grid item xs={12} md={6}>
        <Typography
          variant="h6"
          component="h3"
          style={{
            display: "grid",
            flexDirection: "row",
          }}
        >
          {companyName}
          {legalForm}
        </Typography>
      </Grid>
      <Grid item xs={12} md={6}>
        <Typography variant="h6" component="h3">
          {`${zip} ${city}`}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h6" component="h3">
          {street}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h6" component="h3">
          {`NIP ${nip}`}
        </Typography>
      </Grid>
    </Grid>
  );
};

export default CompanyDetails;
