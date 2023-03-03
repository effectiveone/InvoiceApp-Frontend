import React, { useRef } from "react";
import ReactToPrint from "react-to-print";

const InvoicePrinter = () => {
  const componentRef = useRef();
  const handlePrint = () => {
    window.print();
  };
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

          <MainDetails name={name} address={address} />

          <ClientDetails
            clientName={clientName}
            clientAddress={clientAddress}
          />

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

          <Footer
            name={name}
            address={address}
            website={website}
            email={email}
            phone={phone}
            bankAccount={bankAccount}
            bankName={bankName}
          />
        </div>
      </div>
    </>
  );
};

export default InvoicePrinter;
