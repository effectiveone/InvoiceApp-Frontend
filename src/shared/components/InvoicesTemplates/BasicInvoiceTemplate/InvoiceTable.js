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
import { makeStyles } from "@material-ui/core/styles";
import { t } from "i18next";

const useStyles = makeStyles({
  tableRowOdd: {
    background: "#F5F5F5",
  },
});
export default function InvoiceTable() {
  const { items, totalGrossValue } = useInvoiceContext();
  const classes = useStyles();

  return (
    <>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#f0f0f0" }}>
              <TableCell>
                <Typography variant="h6" component="h3">
                  {t("description")}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6" component="h3">
                  {t("quantity")}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6" component="h3">
                  {t("unit")}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6" component="h3">
                  {t("vat")}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6" component="h3">
                  {t("netPrice")}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6" component="h3">
                  {t("netValue")}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6" component="h3">
                  {t("grossValue")}
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
                <TableRow
                  key={index}
                  className={index % 2 === 0 ? classes.tableRowOdd : null}
                >
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
