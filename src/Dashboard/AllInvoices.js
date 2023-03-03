import { Button } from "@mui/material";
import React, { useState, useEffect } from "react";
import Layout from "../shared/components/layout/layout";
import { useKontrahent } from "../shared/hook/useKontrahent";
import { useCompany } from "../shared/hook/useCompany";

const AllInvoices = () => {
  const { companyData } = useCompany();
  const { kontrahent } = useKontrahent();

  const [isVisible, setIsVisible] = useState(true);

  const [invoiceNumber, setInvoiceNumber] = useState("");
  const [invoiceDate, setInvoiceDate] = useState("");
  const [dueDate, setDueDate] = useState("");

  return (
    <>
      <Button onClick={() => setIsVisible(!isVisible)}>Podgląd</Button>
      {isVisible ? (
        <>
          {" "}
          <article className="md:grid grid-cols-3 gap-10">
            <div className="flex flex-col">
              <label htmlFor="invoiceNumber">Invoice Number</label>
              <input
                type="text"
                name="invoiceNumber"
                id="invoiceNumber"
                placeholder="Invoice Number"
                autoComplete="off"
                value={invoiceNumber}
                onChange={(e) => setInvoiceNumber(e.target.value)}
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="invoiceDate">Invoice Date</label>
              <input
                type="date"
                name="invoiceDate"
                id="invoiceDate"
                placeholder="Invoice Date"
                autoComplete="off"
                value={invoiceDate}
                onChange={(e) => setInvoiceDate(e.target.value)}
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="dueDate">Due Date</label>
              <input
                type="date"
                name="dueDate"
                id="dueDate"
                placeholder="Invoice Date"
                autoComplete="off"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
              />
            </div>
          </article>
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default Layout(AllInvoices);
