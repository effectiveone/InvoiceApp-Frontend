import React from "react";
import Layout from "../shared/components/layout/layout";
import { InvoiceProvider } from "../shared/context/useInvoiceContext";
import InvoicesIssuedList from "../shared/components/AllInvoices/InvoicesIssuedList";

function Dashboard() {
  return (
    <InvoiceProvider>
      <InvoicesIssuedList />
    </InvoiceProvider>
  );
}

export default Layout(Dashboard);
