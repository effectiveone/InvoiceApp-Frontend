import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { readFaktury } from "../../store/actions/fakturaActions";
import { useUser } from "./useUser";
import { useKontrahent } from "./useKontrahent";
import { useCompany } from "./useCompany";
import { createFaktura } from "../../store/actions/fakturaActions";
import { TAX_RATES } from "../utils/tax";

export const useInvoice = () => {
  const { currentUser } = useUser();
  const { companyData } = useCompany();
  const { kontrahent } = useKontrahent();
  const dispatch = useDispatch();
  const invoiceDate = useSelector((state) => state.faktura.fakturaData);

  useEffect(() => {
    if (!invoiceDate?.length) {
      dispatch(readFaktury(currentUser));
    }
  }, [dispatch, invoiceDate, currentUser]);

  const [invoiceNumber, setInvoiceNumber] = useState("");
  const [invoicePaymentDate, setInvoicePaymentDate] = useState();
  const [invoiceDates, setInvoiceDates] = useState();
  const [invoiceSaleDate, setInvoiceSaleDate] = useState();
  const [selectedKontrahent, setSelectedKontrahent] = useState();
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
    console.log("prefixedCompany", prefixedCompany);
  };

  const invoiceProductor = {
    companyData,
    selectedKontrahent,
    invoiceSaleDate,
    invoiceDate,
    invoicePaymentDate,
    items,
    totalNetValue,
    totalGrossValue,
    notes,
    userEmail: currentUser?.mail,
  };

  const handlePrint = () => {
    window.print();
  };
  const componentRef = useRef();
  const handleSubmit = () => {
    dispatch(createFaktura(invoiceProductor, currentUser));
  };
  return {
    invoiceDate,

    invoiceNumber,
    setInvoiceNumber,
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
