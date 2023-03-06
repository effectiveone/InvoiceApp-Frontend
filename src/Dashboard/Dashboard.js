import React, { useState } from "react";
import Layout from "../shared/components/layout/layout";
import { useInvoice } from "../shared/hook/useInvoice";
import { Grid } from "@material-ui/core";
import InvoiceForm from "../shared/components/InvoicePrinter/InvoiceForm";
const Dashboard = () => {
  const [selectedInvoice, setSelectdInvoice] = useState();

  const {
    invoiceDate,
    TAX_RATES,
    kontrahent,
    companyData,
    invoiceNumber,
    setInvoiceNumber,
    invoicePaymentDate,
    setInvoicePaymentDate,
    invoiceDates,
    setInvoiceDates,
    invoiceSaleDate,
    setInvoiceSaleDate,
    selectedKontrahent,
    setSelectedKontrahent,
    notes,
    setNotes,
    items,
    setItems,
    totalNetValue,
    setTotalNetValue,
    totalGrossValue,
    setTotalGrossValue,
    handleSelectChange,
    handlePrint,
    componentRef,
    handleSubmit,
  } = useInvoice(selectedInvoice);
  return (
    <>
      {invoiceDate?.map((invoice, index) => (
        <React.Fragment key={index}>
          <InvoiceComponent
            {...invoice}
            setSelectdInvoice={setSelectdInvoice}
          />
        </React.Fragment>
      ))}
      <InvoiceForm
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
      />
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
