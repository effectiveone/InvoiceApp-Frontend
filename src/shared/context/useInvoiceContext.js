import { createContext, useContext, useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { readFaktury } from "../../store/actions/fakturaActions";
import { useUser } from "../hook/useUser";
import { useKontrahent } from "../hook/useKontrahent";
import { useCompany } from "../hook/useCompany";
import { createFaktura, editFaktury } from "../../store/actions/fakturaActions";
import { TAX_RATES } from "../utils/tax";

const InvoiceContext = createContext();

export const useInvoice = (invoiceNumber) => {
  const { currentUser } = useUser();
  const { companyData } = useCompany();
  const { kontrahent } = useKontrahent();
  const dispatch = useDispatch();
  const invoiceDate = useSelector((state) => state.faktura.fakturaData);
  const [selectedInvoice, setSelectedInvoice] = useState();
  const [invoiceNumberDate, updateInvoiceNumberDate] = useState();
  useEffect(() => {
    if (!invoiceDate?.length) {
      dispatch(readFaktury(currentUser));
    }
    if (invoiceNumber) {
      updateInvoiceNumberDate(invoiceNumber);
      // Find the invoice in the store by its number
      const invoice = invoiceDate.find(
        (faktura) => faktura.invoiceNumber === invoiceNumber
      );

      // If the invoice exists, set its data to the invoiceDate state
      if (invoice) {
        setSelectedInvoice(invoice);
      }
    }
  }, [dispatch, invoiceDate, currentUser, invoiceNumber]);

  const [invoiceDates, setInvoiceDates] = useState(
    selectedInvoice?.invoiceDate ?? new Date().toISOString().substr(0, 10)
  );

  const [invoiceSaleDate, setInvoiceSaleDate] = useState(
    selectedInvoice?.invoiceSaleDate ?? new Date().toISOString().substr(0, 10)
  );

  const [invoicePaymentDate, setInvoicePaymentDate] = useState(
    selectedInvoice?.invoicePaymentDate ??
      new Date().toISOString().substr(0, 10)
  );

  const [selectedKontrahent, setSelectedKontrahent] = useState(
    selectedInvoice?.selectedKontrahent ?? {}
  );
  const [notes, setNotes] = useState(selectedInvoice?.notes ?? "");
  const [items, setItems] = useState(
    selectedInvoice?.items ?? [
      {
        name: "",
        quantity: 1,
        unit: "szt",
        vat: TAX_RATES[0].value,
        netPrice: 0,
        netValue: 0,
        grossValue: 0,
      },
    ]
  );
  const [totalNetValue, setTotalNetValue] = useState(
    selectedInvoice?.totalNetValue ?? 0
  );
  const [totalGrossValue, setTotalGrossValue] = useState(
    selectedInvoice?.totalGrossValue ?? 0
  );

  const handleSelectChange = (event) => {
    const selectedCompany = kontrahent.find(
      (k) => k.nip === event.target.value
    );
    const prefixedCompany = {};
    Object.entries(selectedCompany).forEach(([key, value]) => {
      prefixedCompany[kontrahent_`${key}`] = value;
    });
    setSelectedKontrahent(prefixedCompany);
  };

  const invoiceProductor = {
    companyData,
    selectedKontrahent,
    invoiceSaleDate,
    invoiceDate: invoiceDates,
    invoicePaymentDate,
    items,
    totalNetValue,
    totalGrossValue,
    notes,
    userEmail: currentUser?.mail,
  };

  const invoiceEditor = {
    companyData,
    selectedKontrahent,
    invoiceSaleDate,
    invoiceDate: invoiceDates,
    invoicePaymentDate,
    items,
    totalNetValue,
    totalGrossValue,
    notes,
    userEmail: currentUser?.mail,
    invoiceNumber: invoiceNumberDate,
  };

  const handlePrint = () => {
    window.print();
  };

  const componentRef = useRef();

  const handleSubmit = () => {
    dispatch(createFaktura(invoiceProductor, currentUser));
  };

  const handleEditInvoice = () => {
    dispatch(editFaktury(invoiceEditor, currentUser));
  };

  // Add useEffect hook to update certain state based on changes in invoiceDate
  useEffect(() => {
    if (invoiceNumber) {
      setItems(selectedInvoice?.items);
      setTotalNetValue(selectedInvoice?.totalNetValue);
      setTotalGrossValue(selectedInvoice?.totalGrossValue);
      setInvoiceDates(selectedInvoice?.invoiceDate);
      setSelectedKontrahent(selectedInvoice?.selectedKontrahent);
      setInvoicePaymentDate(selectedInvoice?.invoicePaymentDate);
      setNotes(selectedInvoice?.notes);
      setInvoiceSaleDate(selectedInvoice?.invoiceSaleDate);
    }
  }, [invoiceNumber]);

  return {
    invoiceDate,
    handleEditInvoice,
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
    kontrahent,
    companyData,
    TAX_RATES,
  };
};

export const InvoiceProvider = ({ children }) => {
  const invoice = useInvoice();

  return (
    <InvoiceContext.Provider value={invoice}>
      {children}
    </InvoiceContext.Provider>
  );
};

export const useInvoiceContext = () => useContext(InvoiceContext);
