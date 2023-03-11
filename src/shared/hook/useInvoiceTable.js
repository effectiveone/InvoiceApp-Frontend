import React, { useState, useEffect, useCallback, useMemo } from "react";

export const useInvoiceTable = (invoiceDate) => {
  const [filterValue, setFilterValue] = useState("");
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("issueDate");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleSortRequest = (property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };
  const sortedInvoices = useMemo(() => {
    let filteredArray = invoiceDate || [];

    if (filterValue) {
      filteredArray = filteredArray.filter((obj) =>
        obj.selectedKontrahent.companyName
          .toLowerCase()
          .includes(filterValue.toLowerCase())
      );
    }

    const sortedArray = filteredArray.sort((a, b) => {
      if (orderBy === "number") {
        if (order === "asc") {
          return a.invoiceNumber.localeCompare(b.invoiceNumber);
        } else {
          return b.invoiceNumber.localeCompare(a.invoiceNumber);
        }
      } else if (orderBy === "issueDate") {
        if (order === "asc") {
          return a.invoiceSaleDate.localeCompare(b.invoiceSaleDate);
        } else {
          return b.invoiceSaleDate.localeCompare(a.invoiceSaleDate);
        }
      } else if (orderBy === "customer") {
        if (order === "asc") {
          return a.selectedKontrahent.companyName.localeCompare(
            b.selectedKontrahent.companyName
          );
        } else {
          return b.selectedKontrahent.companyName.localeCompare(
            a.selectedKontrahent.companyName
          );
        }
      } else if (orderBy === "netAmount") {
        if (order === "asc") {
          return a.totalNetValue - b.totalNetValue;
        } else {
          return b.totalNetValue - a.totalNetValue;
        }
      } else if (orderBy === "grossAmount") {
        if (order === "asc") {
          return a.totalGrossValue - b.totalGrossValue;
        } else {
          return b.totalGrossValue - a.totalGrossValue;
        }
      }
      return 0;
    });

    return sortedArray;
  }, [invoiceDate, orderBy, order, filterValue]);

  const emptyRows =
    rowsPerPage -
    Math.min(rowsPerPage, sortedInvoices.length - page * rowsPerPage);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterChange = useCallback(
    (e) => {
      setFilterValue(e);
    },
    [filterValue]
  );
  return {
    emptyRows,
    handleChangePage,
    handleSortRequest,
    handleChangeRowsPerPage,
    handleFilterChange,
    order,
    orderBy,
    page,
    rowsPerPage,
    sortedInvoices,
  };
};
