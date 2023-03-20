import { createContext, useContext, ReactNode } from "react";
import { useInvoice } from "../Hook/useInvoice";

interface IInvoiceContext {
  invoices: Invoice[];
  createInvoice: (invoice: Invoice) => Promise<void>;
  updateInvoice: (id: string, invoice: Invoice) => Promise<void>;
  deleteInvoice: (id: string) => Promise<void>;
}

export const InvoiceContext = createContext<IInvoiceContext | null>(null);

export const useInvoiceContext = (): IInvoiceContext => {
  const context = useContext<IInvoiceContext | null>(InvoiceContext);
  if (!context) {
    throw new Error("useInvoiceContext must be used within an InvoiceProvider");
  }
  return context;
};

export const InvoiceProvider = ({
  children,
}: {
  children: ReactNode;
}): JSX.Element => {
  const invoice = useInvoice();

  return (
    <InvoiceContext.Provider value={invoice}>
      {children}
    </InvoiceContext.Provider>
  );
};

export default InvoiceProvider;
