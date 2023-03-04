import React, { useRef, useEffect, useState } from "react";
import { Grid } from "@material-ui/core";
import { Divider } from "@mui/material";

import ReactToPrint from "react-to-print";
// import MainDetails from "./MainDetails";
import Header from "./Header";
import Dates from "./Dates";
import ClientDetails from "./ClientDetails";
import Table from "./Table";
import Notes from "./Notes";
// import Footer from "./Footer"

const InvoicePrinter = ({
  handlePrint,
  invoiceNumber,
  invoiceDate,
  dueDate,
  selectedKontrahent,
  companyData,
  description,
  quantity,
  price,
  amount,
  list,
  setList,
  total,
  setTotal,
  setNotes,
  notes,
}) => {
  const componentRef = useRef();
  const [preselectedKontrahent, setPreselectedKontrahent] = useState();
  useEffect(() => {
    setPreselectedKontrahent(selectedKontrahent);
  }, [selectedKontrahent]);
  console.log("preselectedKontrahent?.companyName", preselectedKontrahent);
  return (
    <>
      <div className="invoice__preview bg-white p-5 rounded">
        <ReactToPrint
          trigger={() => (
            <button className="bg-blue-500 ml-5 text-white font-bold py-2 px-8 rounded shadow border-2 border-blue-500 hover:bg-transparent hover:text-blue-500 transition-all duration-300">
              Print / Download
            </button>
          )}
          content={() => componentRef.current}
        />
        <div ref={componentRef} className="p-5">
          <Header handlePrint={handlePrint} />
          <ClientDetails
            title={null}
            companyName={companyData.companyName}
            legalForm={companyData.legalForm}
            zip={companyData.zipCode}
            city={companyData.city}
            street={companyData.street}
            nip={companyData.nip}
          />
          <Divider />
          <Dates
            invoiceNumber={invoiceNumber}
            invoiceDate={invoiceDate}
            dueDate={dueDate}
          />
          <Divider />

          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <ClientDetails
                title="Sprzedawca"
                companyName={companyData.companyName}
                legalForm={companyData.legalForm}
                zip={companyData.zipCode}
                city={companyData.city}
                street={companyData.street}
                nip={companyData.nip}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <ClientDetails
                title="Nabywca"
                companyName={preselectedKontrahent?.kontrahent_companyName}
                legalForm={preselectedKontrahent?.kontrahent_legalForm}
                zip={preselectedKontrahent?.kontrahent_zipCode}
                city={preselectedKontrahent?.kontrahent_city}
                street={preselectedKontrahent?.kontrahent_street}
                nip={preselectedKontrahent?.kontrahent_nip}
              />
            </Grid>
          </Grid>
          <Divider />

          <Table
            description={description}
            quantity={quantity}
            price={price}
            amount={amount}
            list={list}
            setList={setList}
            total={total}
            setTotal={setTotal}
          />

          <Notes notes={notes} />

          {/* <Footer
            name={name}
            address={address}
            website={website}
            email={email}
            phone={phone}
            bankAccount={bankAccount}
            bankName={bankName}
          /> */}
        </div>
      </div>
    </>
  );
};

export default InvoicePrinter;
