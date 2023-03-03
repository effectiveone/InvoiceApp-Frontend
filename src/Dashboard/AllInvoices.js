import { Button } from "@mui/material";
import React, { useState } from "react";
import Layout from "../shared/components/layout/layout";
import { useKontrahent } from "../shared/hook/useKontrahent";
import { useCompany } from "../shared/hook/useCompany";
import InvoicePrinter from "../shared/components/InvoicePrinter/invoicePrinter";
import TableForm from "../shared/components/InvoicePrinter/TableForm";

const AllInvoices = () => {
  const { companyData } = useCompany();
  const { kontrahent } = useKontrahent();

  const [isVisible, setIsVisible] = useState(true);

  const [invoiceNumber, setInvoiceNumber] = useState("");
  const [invoiceDate, setInvoiceDate] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [selectedKontrahent, setSelectedKontrahent] = useState();
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [amount, setAmount] = useState("");
  const [list, setList] = useState([]);
  const [total, setTotal] = useState(0);
  const [notes, setNotes] = useState("");
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
  const handlePrint = () => {
    window.print();
  };
  return (
    <>
      <Button onClick={() => setIsVisible(!isVisible)}>Podgląd</Button>
      {isVisible ? (
        <>
          {" "}
          <article className="md:grid grid-cols-3 gap-10">
            {kontrahent.length > 0 ? (
              <select name="companyName" onChange={handleSelectChange}>
                {kontrahent.map((k, index) => (
                  <option key={index} value={k.nip}>
                    {k.companyName}
                  </option>
                ))}
              </select>
            ) : (
              <div>You have to add kontrahent</div>
            )}
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
            <article>
              <TableForm
                description={description}
                setDescription={setDescription}
                quantity={quantity}
                setQuantity={setQuantity}
                price={price}
                setPrice={setPrice}
                amount={amount}
                setAmount={setAmount}
                list={list}
                setList={setList}
                total={total}
                setTotal={setTotal}
              />
            </article>
            <label htmlFor="notes">Additional Notes</label>
            <textarea
              name="notes"
              id="notes"
              cols="30"
              rows="10"
              placeholder="Additional notes to the client"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            ></textarea>
          </article>
        </>
      ) : (
        <>
          <InvoicePrinter
            invoiceNumber={invoiceNumber}
            invoiceDate={invoiceDate}
            dueDate={dueDate}
            selectedKontrahent={selectedKontrahent}
            companyData={companyData}
            handlePrint={handlePrint}
            description={description}
            quantity={quantity}
            price={price}
            amount={amount}
            list={list}
            setList={setList}
            total={total}
            setTotal={setTotal}
            notes={notes}
            setNotes={setNotes}
          />
        </>
      )}
    </>
  );
};

export default Layout(AllInvoices);
