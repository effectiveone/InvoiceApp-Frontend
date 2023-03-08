import { useInvoiceContext } from "../../context/useInvoiceContext";

export default function Dates() {
  const { invoicePaymentDate, invoiceDates, invoiceSaleDate } =
    useInvoiceContext();
  return (
    <>
      <article className="mt-10 mb-14 flex items-end justify-end">
        <ul>
          <li className="p-1 ">
            <span className="font-bold">Data płatności:</span>{" "}
            {invoicePaymentDate}
          </li>
          <li className="p-1 bg-gray-100">
            <span className="font-bold">Data wystawienia:</span> {invoiceDates}
          </li>
          <li className="p-1 ">
            <span className="font-bold">Data sprzedazy:</span> {invoiceSaleDate}
          </li>
        </ul>
      </article>
    </>
  );
}
