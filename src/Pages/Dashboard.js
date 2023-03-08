import React, { useState, useEffect } from "react";
import Layout from "../shared/components/layout/layout";
import {
  useInvoice,
  InvoiceProvider,
  useInvoiceContext,
} from "../shared/context/useInvoiceContext";

import { Grid } from "@material-ui/core";
import InvoiceForm from "../shared/components/InvoicePrinter/InvoiceForm";

function Dashboard() {
  return (
    <InvoiceProvider>
      <MyComponent />
    </InvoiceProvider>
  );
}

const MyComponent = () => {
  const { invoiceDate, handleEditInvoice, setLocalInvoiceNumber } =
    useInvoiceContext();

  const changeInvoiceNumber = (inv) => {
    console.log("changeInvoiceNumber__inv__Dashboard", inv);
    setLocalInvoiceNumber(inv);
  };

  return (
    <>
      <button onClick={handleEditInvoice}>Zapisz zmiany</button>
      {invoiceDate?.map((invoice, index) => (
        <React.Fragment key={index}>
          <InvoiceComponent
            {...invoice}
            changeInvoiceNumber={changeInvoiceNumber}
          />
        </React.Fragment>
      ))}
      <InvoiceForm />
    </>
  );
};
export default Layout(Dashboard);

const InvoiceComponent = ({
  invoiceNumber,
  selectedKontrahent,
  totalNetValue,
  totalGrossValue,
  changeInvoiceNumber,
}) => {
  const { companyName } = selectedKontrahent;
  const handleClick = () => {
    console.log("changeInvoiceNumber__inv", invoiceNumber);
    changeInvoiceNumber(invoiceNumber);
  };
  return (
    <Grid
      style={{
        display: "flex",
        flexDirection: "row",
        gap: "100px",
      }}
    >
      <p>{invoiceNumber}</p>
      <p>{companyName}</p>
      <p>{totalNetValue}</p>
      <p>{(totalGrossValue - totalNetValue)?.toFixed(2)}</p>
      <button onClick={handleClick}>Edytuj</button>
    </Grid>
  );
};
