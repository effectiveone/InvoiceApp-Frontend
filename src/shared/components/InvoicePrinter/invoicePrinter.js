import React from "react";
import { Grid } from "@material-ui/core";
import { Divider } from "@mui/material";

import Dates from "./Dates";
import ClientDetails from "./ClientDetails";
import Table from "./Table";
import Notes from "./Notes";
import Footer from "./Footer";
import { useInvoiceContext } from "../../context/useInvoiceContext";
const InvoicePrinter = () => {
  const { componentRef, companyData, selectedKontrahent } = useInvoiceContext();

  return (
    <div ref={componentRef} className="p-5">
      <ClientDetails
        title={null}
        companyName={companyData.companyName}
        legalForm={companyData.legalForm}
        zip={companyData.zipCode}
        city={companyData.city}
        street={companyData.street}
        nip={companyData.nip}
      />
      <Divider />
      <Dates />
      <Divider />
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <ClientDetails
            title="Sprzedawca"
            companyName={companyData.companyName}
            legalForm={companyData.legalForm}
            zip={companyData.zipCode}
            city={companyData.city}
            street={companyData.street}
            nip={companyData.nip}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <ClientDetails
            title="Nabywca"
            companyName={selectedKontrahent?.kontrahent_companyName}
            legalForm={selectedKontrahent?.kontrahent_legalForm}
            zip={selectedKontrahent?.kontrahent_zipCode}
            city={selectedKontrahent?.kontrahent_city}
            street={selectedKontrahent?.kontrahent_street}
            nip={selectedKontrahent?.kontrahent_nip}
          />
        </Grid>
      </Grid>
      <Divider />
      <Table />
      <Notes />
      <Footer />
    </div>
  );
};

export default InvoicePrinter;
