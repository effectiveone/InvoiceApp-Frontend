import React, { useState, useRef } from "react";
import { Button } from "@mui/material";
import FactoryInvoicePrinter from "../InvoicesTemplates/factoryInvoicePrinter";
import { useInvoiceContext } from "../../Context/useInvoiceContext";
import ReactToPrint from "react-to-print";
import InvoiceForm from "./InvoiceForm";

const NewInvoice = () => {
  const { handleSubmit } = useInvoiceContext();
  const [isVisible, setIsVisible] = useState(false);
  const componentRef = useRef(null);

  const toggleVisibility = () => {
    setIsVisible((prevState) => !prevState);
  };

  return (
    <>
      <Button onClick={toggleVisibility}>Podgląd</Button>
      {isVisible && (
        <ReactToPrint
          trigger={() => <Button>Print / Download</Button>}
          content={() => componentRef.current}
        />
      )}
      <Button onClick={handleSubmit}>Zapisz fakture</Button>

      {!isVisible && <InvoiceForm />}
      {isVisible && <FactoryInvoicePrinter ref={componentRef} />}
    </>
  );
};

export default NewInvoice;
