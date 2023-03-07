import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { readFaktury } from "../../store/actions/fakturaActions";
import { useUser } from "./useUser";
import { useKontrahent } from "./useKontrahent";
import { useCompany } from "./useCompany";
import { createFaktura, editFaktury } from "../../store/actions/fakturaActions";
import { TAX_RATES } from "../utils/tax";
import { convertDate } from "../utils/dateValidator";

export const useInvoice = () => {
  const { currentUser } = useUser();
  const { companyData } = useCompany();
  const { kontrahent } = useKontrahent();
  const dispatch = useDispatch();
  const invoiceDate = useSelector((state) => state?.faktura?.fakturaData);
  const [selectedInvoice, setSelectedInvoice] = useState();
  const [invoiceNumberDate, updateInvoiceNumberDate] = useState();
  const [localInvoiceNumber, setLocalInvoiceNumber] = useState();

  useEffect(() => {
    console.log("invoiceNumberFromuseInvoice", localInvoiceNumber);
    if (!invoiceDate?.length) {
      dispatch(readFaktury(currentUser));
    }
    if (localInvoiceNumber) {
      updateInvoiceNumberDate(localInvoiceNumber);
      // Find the invoice in the store by its number
      const invoice = invoiceDate.find(
        (faktura) => faktura.invoiceNumber === localInvoiceNumber
      );

      // If the invoice exists, set its data to the invoiceDate state
      if (invoice) {
        setSelectedInvoice(invoice);
      }
    }
  }, [localInvoiceNumber, currentUser, dispatch]);

  const [invoiceDates, setInvoiceDates] = useState(
    new Date().toISOString().slice(0, 10)
  );
  useEffect(() => {
    console.log("invoiceDates", invoiceDates);
  }, [invoiceDates]);

  const [invoiceSaleDate, setInvoiceSaleDate] = useState(
    new Date().toISOString().slice(0, 10)
  );

  const [invoicePaymentDate, setInvoicePaymentDate] = useState(
    new Date().toISOString().slice(0, 10)
  );

  const [selectedKontrahent, setSelectedKontrahent] = useState({});
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

  const handleSelectChange = (event) => {
    const selectedCompany = kontrahent.find(
      (k) => k.nip === event.target.value
    );
    const prefixedCompany = {};
    Object.entries(selectedCompany).forEach(([key, value]) => {
      prefixedCompany[`kontrahent_${key}`] = value;
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
    console.log("localInvoiceNumberlocalInvoiceNumber", localInvoiceNumber);
    if (localInvoiceNumber) {
      setItems(selectedInvoice?.items);
      setTotalNetValue(selectedInvoice?.totalNetValue);
      setTotalGrossValue(selectedInvoice?.totalGrossValue);
      setInvoiceDates(convertDate(selectedInvoice?.invoiceDate));
      setSelectedKontrahent(selectedInvoice?.selectedKontrahent);
      setInvoicePaymentDate(convertDate(selectedInvoice?.invoicePaymentDate));
      setNotes(selectedInvoice?.notes);
      setInvoiceSaleDate(convertDate(selectedInvoice?.invoiceSaleDate));
    }
  }, [selectedInvoice]);

  return {
    selectedInvoice,
    setLocalInvoiceNumber,
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
