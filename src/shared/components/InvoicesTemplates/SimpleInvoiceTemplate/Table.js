import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@material-ui/core";
import { useInvoiceContext } from "../../../Context/useInvoiceContext";
export default function InvoiceTable() {
  const { items, totalGrossValue } = useInvoiceContext();

  return (
    <>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#f0f0f0" }}>
              <TableCell>
                <Typography variant="h6" component="h3">
                  Nazwa
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6" component="h3">
                  Ilość
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6" component="h3">
                  Jednostka
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6" component="h3">
                  VAT
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6" component="h3">
                  Cena netto
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6" component="h3">
                  Wartość netto
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6" component="h3">
                  Wartość brutto
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map((item, index) => {
              const {
                name,
                quantity,
                unit,
                vat,
                netPrice,
                netValue,
                grossValue,
              } = item;

              return (
                <TableRow key={index}>
                  <TableCell>{name}</TableCell>
                  <TableCell>{quantity}</TableCell>
                  <TableCell>{unit}</TableCell>
                  <TableCell>{vat}</TableCell>
                  <TableCell>{netPrice}</TableCell>
                  <TableCell>{netValue}</TableCell>
                  <TableCell>{grossValue}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>

      <div style={{ textAlign: "end" }}>
        <Typography
          variant="h4"
          component="h2"
          sx={{ fontWeight: "bold", color: "#333333" }}
        >
          PLN. {totalGrossValue.toLocaleString()}
        </Typography>
      </div>
    </>
  );
}
