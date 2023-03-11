import React, { useState, useEffect, useCallback, useMemo } from "react";
import Layout from "../shared/components/layout/layout";
import {
  useInvoice,
  InvoiceProvider,
  useInvoiceContext,
} from "../shared/context/useInvoiceContext";
import { makeStyles } from "@material-ui/core/styles";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Modal,
  TableSortLabel,
  TablePagination,
} from "@material-ui/core";
import FilterWrapper from "../shared/components/FilterWrapper";

import { useInvoiceTable } from "../shared/hook/useInvoiceTable";
import { useModal } from "../shared/hook/useModal";

import InvoiceForm from "../shared/components/InvoicePrinter/InvoiceForm";

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 650,
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    maxWidth: "80%",
    margin: "auto",
  },
}));

function Dashboard() {
  return (
    <InvoiceProvider>
      <MyComponent />
    </InvoiceProvider>
  );
}

const MyComponent = () => {
  const { open, handleOpen, handleClose } = useModal();
  const { invoiceDate, handleEditInvoice, setLocalInvoiceNumber } =
    useInvoiceContext();
  const {
    order,
    orderBy,
    page,
    rowsPerPage,
    sortedArray,
    emptyRows,
    handleChangePage,
    handleSortRequest,
    handleChangeRowsPerPage,
    handleFilterChange,
    sortedInvoices,
  } = useInvoiceTable(invoiceDate);
  const classes = useStyles();

  const changeInvoiceNumber = (inv) => {
    console.log("changeInvoiceNumber__inv__Dashboard", inv);
    setLocalInvoiceNumber(inv);
  };

  return (
    <>
      <FilterWrapper
        handleFilterChange={handleFilterChange}
        // selected={selected}
      />
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="invoices table">
          <TableHead>
            <TableRow>
              <TableCell>
                <TableSortLabel
                  active={orderBy === "number"}
                  direction={order}
                  onClick={() => handleSortRequest("number")}
                >
                  Numer faktury
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === "issueDate"}
                  direction={order}
                  onClick={() => handleSortRequest("issueDate")}
                >
                  Data wystawienia
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === "customer"}
                  direction={order}
                  onClick={() => handleSortRequest("customer")}
                >
                  Kontrahent
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === "netAmount"}
                  direction={order}
                  onClick={() => handleSortRequest("netAmount")}
                >
                  Kwota netto
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === "grossAmount"}
                  direction={order}
                  onClick={() => handleSortRequest("grossAmount")}
                >
                  Kwota brutto
                </TableSortLabel>
              </TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? sortedInvoices.slice(
                  page * rowsPerPage,
                  page * rowsPerPage + rowsPerPage
                )
              : sortedInvoices
            )?.map((invoice, index) => (
              <React.Fragment key={index}>
                <InvoiceComponent
                  {...invoice}
                  handleOpen={handleOpen}
                  changeInvoiceNumber={changeInvoiceNumber}
                />
              </React.Fragment>
            ))}
          </TableBody>
          {sortedInvoices.length > 10 && (
            <TablePagination
              rowsPerPageOptions={[10, 25, 50]}
              component="div"
              count={sortedInvoices.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          )}
        </Table>
      </TableContainer>
      <Modal open={open} onClose={handleClose} className={classes.modal}>
        <div className={classes.paper}>
          <InvoiceForm />
          <Button
            variant="contained"
            color="primary"
            onClick={handleEditInvoice}
          >
            Zapisz zmiany
          </Button>
        </div>
      </Modal>
    </>
  );
};
export default Layout(Dashboard);

const InvoiceComponent = ({
  invoiceNumber,
  selectedKontrahent,
  totalNetValue,
  totalGrossValue,
  invoiceSaleDate,
  changeInvoiceNumber,
  handleOpen,
}) => {
  const { companyName } = selectedKontrahent;
  const handleClick = () => {
    console.log("changeInvoiceNumber__inv", invoiceNumber);
    changeInvoiceNumber(invoiceNumber);
    handleOpen();
  };
  return (
    <TableRow key={invoiceNumber}>
      <TableCell component="th" scope="row">
        {invoiceNumber}
      </TableCell>
      <TableCell>{invoiceSaleDate}</TableCell>
      <TableCell>{companyName}</TableCell>
      <TableCell>{totalNetValue}</TableCell>
      <TableCell>{totalGrossValue}</TableCell>
      <TableCell>
        <Button variant="contained" color="primary" onClick={handleClick}>
          Edytuj
        </Button>
      </TableCell>
    </TableRow>
  );
};
