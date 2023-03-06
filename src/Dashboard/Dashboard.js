import React from "react";
import Layout from "../shared/components/layout/layout";
import { useInvoice } from "../shared/hook/useInvoice";
import { Grid } from "@material-ui/core";
import InvoiceForm from "../shared/components/InvoicePrinter/InvoiceForm";
const Dashboard = () => {
  const { invoiceDate } = useInvoice();
  return (
    <>
      {invoiceDate?.map((invoice) => (
        <InvoiceComponent {...invoice} />
      ))}
      {/* <InvoiceForm
            items={items}
            setItems={setItems}
            totalNetValue={totalNetValue}
            setTotalNetValue={setTotalNetValue}
            totalGrossValue={totalGrossValue}
            setTotalGrossValue={setTotalGrossValue}
            TAX_RATES={TAX_RATES}
            kontrahent={kontrahent}
            invoiceSaleDate={invoiceSaleDate}
            setInvoiceSaleDate={setInvoiceSaleDate}
            invoicePaymentDate={invoicePaymentDate}
            setInvoicePaymentDate={setInvoicePaymentDate}
            handleSelectChange={handleSelectChange}
            invoiceDate={invoiceDates}
            setInvoiceDate={setInvoiceDates}
            notes={notes}
            setNotes={setNotes}
          /> */}
    </>
  );
};
export default Layout(Dashboard);

const InvoiceComponent = ({
  invoiceNumber,
  selectedKontrahent,
  totalNetValue,
  totalGrossValue,
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
      <p>{totalNetValue - totalGrossValue}</p>
    </Grid>
  );
};
