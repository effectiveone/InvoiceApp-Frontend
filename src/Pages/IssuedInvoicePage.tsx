import React from "react";
import Layout from "../Shared/Components/Layout/layout";
import { InvoiceProvider } from "../Shared/Context/useInvoiceContext";
import InvoicesIssuedList from "../Shared/Components/AllInvoices/InvoicesIssuedList";

const IssuedInvoicePage: React.FC = () => {
  return (
    <InvoiceProvider>
      <div>
        <InvoicesIssuedList />
      </div>
    </InvoiceProvider>
  );
};

export default Layout(IssuedInvoicePage);
