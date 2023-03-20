import { useInvoiceContext } from "../../../Context/useInvoiceContext";
import { Typography } from "@material-ui/core";

export default function Dates() {
  const { invoicePaymentDate, invoiceDates, invoiceSaleDate } =
    useInvoiceContext();

  return (
    <>
      <article className="mt-10 mb-14 flex items-end justify-end">
        <ul>
          <li>
            <Typography
              variant="h6"
              component="span"
              sx={{ fontWeight: "bold" }}
            >
              Data płatności:
            </Typography>{" "}
            {invoicePaymentDate}
          </li>
          <li className="bg-gray-100">
            <Typography
              variant="h6"
              component="span"
              sx={{ fontWeight: "bold" }}
            >
              Data wystawienia:
            </Typography>{" "}
            {invoiceDates}
          </li>
          <li>
            <Typography
              variant="h6"
              component="span"
              sx={{ fontWeight: "bold" }}
            >
              Data sprzedazy:
            </Typography>{" "}
            {invoiceSaleDate}
          </li>
        </ul>
      </article>
    </>
  );
}
