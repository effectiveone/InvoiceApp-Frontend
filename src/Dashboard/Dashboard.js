import React, { useState } from "react";
import Layout from "../shared/components/layout/layout";
import {
  useInvoice,
  InvoiceProvider,
} from "../shared/context/useInvoiceContext";

import { Grid } from "@material-ui/core";
import InvoiceForm from "../shared/components/InvoicePrinter/InvoiceForm";
const Dashboard = () => {
  const [selectedInvoice, setSelectdInvoice] = useState();

  const { invoiceDate, handleEditInvoice } = useInvoice(selectedInvoice);
  return (
    <>
      <InvoiceProvider>
        <button onClick={handleEditInvoice}>Zapisz zmiany</button>
        {invoiceDate?.map((invoice, index) => (
          <React.Fragment key={index}>
            <InvoiceComponent
              {...invoice}
              setSelectdInvoice={setSelectdInvoice}
            />
          </React.Fragment>
        ))}

        <InvoiceForm selectedInvoice={selectedInvoice} />
      </InvoiceProvider>
    </>
  );
};
export default Layout(Dashboard);

const InvoiceComponent = ({
  invoiceNumber,
  selectedKontrahent,
  totalNetValue,
  totalGrossValue,
  setSelectdInvoice,
}) => {
  const { companyName } = selectedKontrahent;
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
      <button onClick={() => setSelectdInvoice(invoiceNumber)}>Edytuj</button>
    </Grid>
  );
};
