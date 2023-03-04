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

export default function InvoiceTable({ list, total }) {
  return (
    <>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#f0f0f0" }}>
              <TableCell>
                <Typography variant="h6" component="h3">
                  Description
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6" component="h3">
                  Quantity
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6" component="h3">
                  Price
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6" component="h3">
                  Amount
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {list.map(({ id, description, quantity, price, amount }) => (
              <TableRow key={id}>
                <TableCell>{description}</TableCell>
                <TableCell>{quantity}</TableCell>
                <TableCell>{price}</TableCell>
                <TableCell>{amount}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <div style={{ textAlign: "end" }}>
        <Typography
          variant="h4"
          component="h2"
          sx={{ fontWeight: "bold", color: "#333333" }}
        >
          Kshs. {total.toLocaleString()}
        </Typography>
      </div>
    </>
  );
}
