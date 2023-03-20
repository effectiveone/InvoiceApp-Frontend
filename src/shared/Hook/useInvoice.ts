import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { readFaktury } from "../../Store/actions/fakturaActions";
import { useUser } from "./useUser";
import { useKontrahent } from "./useKontrahent";
import { useCompany } from "./useCompany";
import { createFaktura, editFaktury } from "../../Store/actions/fakturaActions";
import { TAX_RATES } from "../Utils/tax";
import { convertDate } from "../Utils/dateValidator";

interface IInvoiceProductor {
  companyData: any;
  selectedKontrahent: any;
  invoiceSaleDate: string;
  invoiceDate: string;
  invoicePaymentDate: string;
  items: any[];
  totalNetValue: number;
  totalGrossValue: number;
  notes: string;
  userEmail: string;
}

interface IInvoiceEditor extends IInvoiceProductor {
  invoiceNumber: string;
}

interface IInvoiceItem {
  name: string;
  quantity: number;
  unit: string;
  vat: number;
  netPrice: number;
  netValue: number;
  grossValue: number;
}

export const useInvoice = () => {
  const { currentUser } = useUser();
  const { companyData } = useCompany();
  const { kontrahent } = useKontrahent();
  const dispatch = useDispatch();
  const invoiceDate = useSelector((state: any) => state?.faktura?.fakturaData);
  const [selectedInvoice, setSelectedInvoice] = useState<any>();
  const [invoiceNumberDate, updateInvoiceNumberDate] = useState<string>();
  const [localInvoiceNumber, setLocalInvoiceNumber] = useState<string>();
  useEffect(() => {
    if (!invoiceDate?.length) {
      dispatch(readFaktury(currentUser));
    }
    if (localInvoiceNumber) {
      updateInvoiceNumberDate(localInvoiceNumber);
      // Find the invoice in the store by its number
      const invoice = invoiceDate.find(
        (faktura: any) => faktura.invoiceNumber === localInvoiceNumber
      );

      // If the invoice exists, set its data to the invoiceDate state
      if (invoice) {
        setSelectedInvoice(invoice);
      }
    }
  }, [localInvoiceNumber, currentUser, dispatch]);

  const [invoiceDates, setInvoiceDates] = useState<string>(
    new Date().toISOString().slice(0, 10)
  );

  const [invoiceSaleDate, setInvoiceSaleDate] = useState<string>(
    new Date().toISOString().slice(0, 10)
  );

  const [invoicePaymentDate, setInvoicePaymentDate] = useState<string>(
    new Date().toISOString().slice(0, 10)
  );

  const [selectedKontrahent, setSelectedKontrahent] = useState<any>({});
  const [notes, setNotes] = useState<string>("");
  const [items, setItems] = useState<IInvoiceItem[]>([
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
  const [totalNetValue, setTotalNetValue] = useState<number>(0);
  const [totalGrossValue, setTotalGrossValue] = useState<number>(0);

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCompany = kontrahent.find(
      (k: any) => k.nip === event.target.value
    );

    const prefixedCompany: { [key: string]: any } = {};
    Object.entries(selectedCompany).forEach(([key, value]) => {
      prefixedCompany[`kontrahent_${key}`] = value;
    });
    setSelectedKontrahent(prefixedCompany);
  };

  const invoiceProductor: FakturaData = {
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

  const invoiceEditor: FakturaData & { invoiceNumber: string } = {
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
    invoiceNumber: invoiceNumberDate!,
  };

  const handlePrint = () => {
    window.print();
  };

  const componentRef = useRef<HTMLDivElement>(null);

  const handleSubmit = () => {
    dispatch(createFaktura(invoiceProductor, currentUser));
  };

  const handleEditInvoice = () => {
    dispatch(editFaktury(invoiceEditor, currentUser));
  };

  // Add useEffect hook to update certain state based on changes in invoiceDate
  useEffect(() => {
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
    setInvoicePaymentDate,
    invoicePaymentDate,
    invoiceDates,
    invoiceSaleDate,
    setInvoiceDates,
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
