import { Button } from "@mui/material";
import React, { useRef, useState } from "react";
import Layout from "../shared/components/layout/layout";
import { useKontrahent } from "../shared/hook/useKontrahent";
import { useCompany } from "../shared/hook/useCompany";
import InvoicePrinter from "../shared/components/InvoicePrinter/invoicePrinter";
import InvoiceForm from "../shared/components/InvoicePrinter/InvoiceForm";
import { TAX_RATES } from "../shared/utils/tax";
import ReactToPrint from "react-to-print";
import { useDispatch, useSelector } from "react-redux";
import { createFaktura } from "../store/actions/fakturaActions";

const AllInvoices = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const localUser = JSON.parse(localStorage.getItem("user"));
  const currentUser = user ?? localUser;
  const { companyData } = useCompany();
  const { kontrahent } = useKontrahent();

  const [isVisible, setIsVisible] = useState(true);

  const [invoiceNumber, setInvoiceNumber] = useState("");
  const [invoicePaymentDate, setInvoicePaymentDate] = useState();
  const [invoiceDate, setInvoiceDate] = useState();
  const [invoiceSaleDate, setInvoiceSaleDate] = useState();
  const [selectedKontrahent, setSelectedKontrahent] = useState();
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [amount, setAmount] = useState("");
  const [notes, setNotes] = useState("");
  const [items, setItems] = useState([
    {
      name: "",
      quantity: 1,
      unit: "szt",
      vat: TAX_RATES[0].value,
      netPrice: 0,
      netValue: 0,
      grossValue: 0,
    },
  ]);
  const [totalNetValue, setTotalNetValue] = useState(0);
  const [totalGrossValue, setTotalGrossValue] = useState(0);

  const invoiceProductor = {
    companyData,
    selectedKontrahent,
    invoiceSaleDate,
    invoiceDate,
    invoicePaymentDate,
    items,
    totalNetValue,
    totalGrossValue,
    notes,
    userEmail: currentUser?.mail,
  };

  const handleSelectChange = (event) => {
    const selectedCompany = kontrahent.find(
      (k) => k.nip === event.target.value
    );
    const prefixedCompany = {};
    Object.entries(selectedCompany).forEach(([key, value]) => {
      prefixedCompany[`kontrahent_${key}`] = value;
    });
    setSelectedKontrahent(prefixedCompany);
    console.log("prefixedCompany", prefixedCompany);
  };
  const handlePrint = () => {
    window.print();
  };
  const componentRef = useRef();
  const handleSubmit = () => {
    dispatch(createFaktura(invoiceProductor, currentUser));
  };
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
            invoiceDate={invoiceDate}
            setInvoiceDate={setInvoiceDate}
            notes={notes}
            setNotes={setNotes}
          />
        </>
      ) : (
        <>
          <InvoicePrinter
            ref={componentRef}
            invoiceNumber={invoiceNumber}
            invoiceDate={invoiceDate}
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
