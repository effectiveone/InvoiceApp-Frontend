import Layout from "../shared/components/layout/layout";
import React from "react";
import {
  Button,
  Box,
  Modal,
  TextField,
  Grid,
  Typography,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@material-ui/core";
import { Divider } from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";
import { legalForms } from "../shared/utils/forms";
import {
  useKontrahentContext,
  KontrahentProvider,
} from "../shared/context/useKontrahentContext";
import { useModal } from "../shared/hook/useModal";
import ContrahentModal from "../shared/components/Kontrahent/ContrahentModal";

const useStyles = makeStyles((theme) => ({
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

const Kontrahent = () => {
  return (
    <KontrahentProvider>
      <MyComponent />
    </KontrahentProvider>
  );
};
const MyComponent = () => {
  const classes = useStyles();
  const {
    open,
    handleOpen,
    handleClose,
    handleEdit,
    handleDelete,
    updatedCompanyData,
    kontrahent,
    handleSubmit,
    handleChange,
  } = useKontrahentContext();

  return (
    <>
      <Box>
        <Button variant="contained" color="primary" onClick={handleOpen}>
          Add Kontrahent
        </Button>
        <ContrahentModal />
        {kontrahent?.map((contractor) => (
          <Grid
            key={contractor._id}
            item
            xs={12}
            sm={6}
            md={4}
            lg={3}
            className={classes.gridFlex}
          >
            <Box className={classes.boxFlex}>
              <div>
                {" "}
                <p style={{ fontWeight: 500 }}>Nazwa firmy:</p>{" "}
                {contractor.companyName}
              </div>
              <div>
                {" "}
                <p style={{ fontWeight: 500 }}>Forma prawna: </p>{" "}
                {contractor.legalForm}
              </div>
            </Box>
            <Box className={classes.boxFlex}>
              <div>
                {" "}
                <p style={{ fontWeight: 500 }}>NIP: </p> {contractor.nip}
              </div>
              <div>
                {" "}
                <p style={{ fontWeight: 500 }}>REGON:</p> {contractor.regon}
              </div>
            </Box>
            <Box className={classes.boxFlex}>
              <div>
                {" "}
                <p style={{ fontWeight: 500 }}>Ulica: </p> {contractor.street}
              </div>
              <div>
                {" "}
                <p style={{ fontWeight: 500 }}>Miasto: </p> {contractor.city}
              </div>
              <div>
                {" "}
                <p style={{ fontWeight: 500 }}>Kod pocztowy: </p>{" "}
                {contractor.zipCode}
              </div>
            </Box>

            <div>
              <Button
                variant="contained"
                color="primary"
                className={classes.button}
                onClick={() => handleEdit(contractor._id)}
              >
                Edytuj
              </Button>
              <Button
                variant="contained"
                color="secondary"
                className={classes.button}
                onClick={() => handleDelete(contractor._id)}
              >
                Usuń
              </Button>
            </div>
            <Divider />
          </Grid>
        ))}
      </Box>
    </>
  );
};

export default Layout(Kontrahent);
