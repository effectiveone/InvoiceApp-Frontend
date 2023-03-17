import Layout from "../shared/components/layout/layout";

import { InvoiceProvider } from "../shared/context/useInvoiceContext";
import NewInvoice from "../shared/components/NewInvoice/NewInvoice";

export const AllInvoices = () => {
  return (
    <InvoiceProvider>
      <NewInvoice />
    </InvoiceProvider>
  );
};

export default Layout(AllInvoices);
