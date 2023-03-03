import React, { useRef } from "react";
import ReactToPrint from "react-to-print";
// import MainDetails from "./MainDetails"
import Header from "./Header";
import Dates from "./Dates";
// import ClientDetails from "./ClientDetails"
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

          {/* <MainDetails name={name} address={address} />

          <ClientDetails
            clientName={clientName}
            clientAddress={clientAddress}
          /> */}

          <Dates
            invoiceNumber={invoiceNumber}
            invoiceDate={invoiceDate}
            dueDate={dueDate}
          />

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
