import React from "react";
import { useKontrahentContext } from "../../Context/useKontrahentContext";
import { makeStyles, Theme } from "@material-ui/core/styles";
import { v4 as uuidv4 } from "uuid";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  TableSortLabel,
  TablePagination,
} from "@material-ui/core";
import FilterWrapper from "../FilterWrapper";
import { useInvoiceTable } from "../../Hook/useInvoiceTable";
import { useModal } from "../../Hook/useModal";

interface Kontrahent {
  _id: string;
  companyName: string;
  legalForm: string;
  nip: string;
  city: string;
}

interface InvoiceComponentProps extends Kontrahent {
  changeInvoiceNumber: (id: string) => void;
  handleOpen: () => void;
  handleEditChange: (id: string) => void;
  handleDelete: (id: string) => void;
}

interface KontrahentsDate {
  value: keyof Kontrahent;
  name: string;
}

const useStyles = makeStyles<Theme>((theme) => ({
  gridFlex: {
    display: "flex",
    flexDirection: "row",
    gap: "150px",
    marginLeft: "50px",
    paddingBottom: "50px",
  },
  boxFlex: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
    justifyContent: "space-between",
  },
}));

const kontrahentsDate: KontrahentsDate[] = [
  {
    value: "companyName",
    name: "Nazwa fromy",
  },
  {
    value: "legalForm",
    name: "Forma prawna",
  },
  {
    value: "nip",
    name: "NIP",
  },
  {
    value: "city",
    name: "Miasto",
  },
];

function ContrahentTable(): JSX.Element {
  const { handleOpen } = useModal();

  const { handleEdit, handleDelete, setButtonText, kontrahent } =
    useKontrahentContext();

  const {
    order,
    orderBy,
    page,
    rowsPerPage,
    handleChangePage,
    handleSortRequest,
    handleChangeRowsPerPage,
    handleFilterChange,
    sortedKontrahents,
  } = useInvoiceTable({ kontrahent });

  const classes = useStyles();

  const handleEditChange = (id: string) => {
    handleEdit(id);
    setButtonText("Zapisz zmiany");
  };

  return (
    <>
      <FilterWrapper handleFilterChange={handleFilterChange} />

      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="invoices table">
          <TableHead>
            <TableRow>
              {kontrahentsDate?.map((k) => (
                <React.Fragment key={uuidv4()}>
                  <TableCell>
                    <TableSortLabel
                      active={orderBy === k.value}
                      direction={order}
                      onClick={() => handleSortRequest(k.value)}
                    >
                      {k.name}
                    </TableSortLabel>
                  </TableCell>
                </React.Fragment>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedKontrahents &&
              Array.isArray(sortedKontrahents) &&
              (rowsPerPage > 0
                ? sortedKontrahents?.slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage
                  )
                : sortedKontrahents
              )?.map((kontrahent, index) => (
                <React.Fragment key={index}>
                  <KontrahentTableRow
                    {...kontrahent}
                    handleOpen={handleOpen}
                    handleEditChange={handleEditChange}
                    handleDelete={handleDelete}
                  />
                </React.Fragment>
              ))}
          </TableBody>
          {sortedKontrahents.length > 10 && (
            <TablePagination
              rowsPerPageOptions={[10, 25, 50]}
              component="div"
              count={sortedKontrahents.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          )}
        </Table>
      </TableContainer>
    </>
  );
}

export default ContrahentTable;

interface KontrahentTableRowProps {
  _id: string;
  companyName: string;
  legalForm: string;
  nip: string;
  city: string;
  changeInvoiceNumber: (id: string) => void;
  handleOpen: () => void;
  handleEditChange: (id: string) => void;
  handleDelete: (id: string) => void;
}

const KontrahentTableRow = ({
  _id,
  companyName,
  legalForm,
  nip,
  city,
  changeInvoiceNumber,
  handleOpen,
  handleEditChange,
  handleDelete,
}: KontrahentTableRowProps) => {
  const classes = useStyles();

  const handleClick = () => {
    changeInvoiceNumber(_id);
    handleOpen();
  };
  return (
    <TableRow key={uuidv4()}>
      <TableCell component="th" scope="row">
        {companyName}
      </TableCell>
      <TableCell>{legalForm}</TableCell>
      <TableCell>{nip}</TableCell>
      <TableCell>{city}</TableCell>
      <TableCell>
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          onClick={() => handleEditChange(_id)}
        >
          Edytuj
        </Button>
      </TableCell>
      <TableCell>
        <Button
          variant="contained"
          color="secondary"
          className={classes.button}
          onClick={() => handleDelete(_id)}
        >
          Usuń
        </Button>
      </TableCell>
    </TableRow>
  );
};
