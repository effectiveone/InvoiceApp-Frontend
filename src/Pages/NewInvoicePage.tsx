import React from "react";
import Layout from "../Shared/Components/Layout/layout";
import { InvoiceProvider } from "../Shared/Context/useInvoiceContext";
import NewInvoice from "../Shared/Components/NewInvoice/NewInvoice";

const NewInvoicePage: React.FC = () => {
  return (
    <InvoiceProvider>
      <NewInvoice />
    </InvoiceProvider>
  );
};

export default Layout(NewInvoicePage);
