import React, { useEffect, useState } from "react";
import { Grid } from "@material-ui/core";
import { Divider } from "@mui/material";

import Dates from "./Dates";
import ClientDetails from "./ClientDetails";
import Table from "./Table";
import Notes from "./Notes";

const InvoicePrinter = React.forwardRef((props, ref) => {
  const {
    invoiceNumber,
    invoiceDate,
    dueDate,
    selectedKontrahent,
    companyData,
    description,
    quantity,
    price,
    amount,
    list,
    setList,
    total,
    setTotal,
    notes,
  } = props;

  const [preselectedKontrahent, setPreselectedKontrahent] =
    useState(selectedKontrahent);

  useEffect(() => {
    setPreselectedKontrahent(selectedKontrahent);
  }, [selectedKontrahent]);

  return (
    <div ref={ref} className="p-5">
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
      <Dates
        invoiceNumber={invoiceNumber}
        invoiceDate={invoiceDate}
        dueDate={dueDate}
      />
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
            companyName={preselectedKontrahent?.kontrahent_companyName}
            legalForm={preselectedKontrahent?.kontrahent_legalForm}
            zip={preselectedKontrahent?.kontrahent_zipCode}
            city={preselectedKontrahent?.kontrahent_city}
            street={preselectedKontrahent?.kontrahent_street}
            nip={preselectedKontrahent?.kontrahent_nip}
          />
        </Grid>
      </Grid>
      <Divider />

      <Table
        description={description}
        quantity={quantity}
        price={price}
        amount={amount}
        list={list}
        setList={setList}
        total={total}
        setTotal={setTotal}
      />

      <Notes notes={notes} />
    </div>
  );
});

export default InvoicePrinter;
