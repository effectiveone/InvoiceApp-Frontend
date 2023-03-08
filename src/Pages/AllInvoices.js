import { Button } from "@mui/material";
import React, { useState } from "react";
import Layout from "../shared/components/layout/layout";

import InvoicePrinter from "../shared/components/InvoicePrinter/invoicePrinter";
import InvoiceForm from "../shared/components/InvoicePrinter/InvoiceForm";
import ReactToPrint from "react-to-print";
import {
  InvoiceProvider,
  useInvoiceContext,
} from "../shared/context/useInvoiceContext";
function AllInvoices() {
  return (
    <InvoiceProvider>
      <MyComponent />
    </InvoiceProvider>
  );
}

const MyComponent = () => {
  const { componentRef, handleSubmit } = useInvoiceContext();
  const [isVisible, setIsVisible] = useState();
  return (
    <>
      <Button onClick={() => setIsVisible((prevState) => !prevState)}>
        Podgląd
      </Button>
      {isVisible && (
        <ReactToPrint
          trigger={() => <Button>Print / Download</Button>}
          content={() => componentRef.current}
        />
      )}
      <Button onClick={handleSubmit}>Zapisz fakture</Button>

      {!isVisible ? (
        <>
          <InvoiceForm />
        </>
      ) : (
        <>
          {" "}
          <InvoicePrinter ref={componentRef} />
        </>
      )}
    </>
  );
};

export default Layout(AllInvoices);
