import { Button } from "@mui/material";
import React, { useState } from "react";
import Layout from "../shared/components/layout/layout";

import InvoicePrinter from "../shared/components/InvoicePrinter/invoicePrinter";
import InvoiceForm from "../shared/components/InvoicePrinter/InvoiceForm";
import { useInvoice } from "../shared/hook/useInvoice";
import ReactToPrint from "react-to-print";
const AllInvoices = () => {
  const {
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
  } = useInvoice();
  const [isVisible, setIsVisible] = useState(true);
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [amount, setAmount] = useState("");

  return (
    <>
      <Button onClick={() => setIsVisible(!isVisible)}>Podgląd</Button>
      {!isVisible && (
        <ReactToPrint
          trigger={() => <Button>Print / Download</Button>}
          content={() => componentRef.current}
        />
      )}
      <Button onClick={handleSubmit}>Zapisz fakture</Button>

      {isVisible ? (
        <>
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
      ) : (
        <>
          <InvoicePrinter
            ref={componentRef}
            invoiceNumber={invoiceNumber}
            invoiceDate={invoiceDates}
            dueDate={invoiceSaleDate}
            selectedKontrahent={selectedKontrahent}
            companyData={companyData}
            handlePrint={handlePrint}
            description={description}
            quantity={quantity}
            price={price}
            amount={amount}
            list={items}
            setList={setItems}
            total={totalNetValue}
            setTotal={setTotalNetValue}
            totalGrossValue={totalGrossValue}
            setTotalGrossValue={setTotalGrossValue}
            notes={notes}
            setNotes={setNotes}
          />
        </>
      )}
    </>
  );
};

export default Layout(AllInvoices);
