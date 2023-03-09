import React from "react";
import { Button, Box, Grid } from "@material-ui/core";
import { Divider } from "@mui/material";
import { useKontrahentContext } from "../../context/useKontrahentContext";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
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
function ContrahentGrid(contractor) {
  const { handleEdit, handleDelete, setButtonText } = useKontrahentContext();
  const classes = useStyles();
  const handleEditChange = (id) => {
    handleEdit(id);
    setButtonText("Zapisz zmiany");
  };
  return (
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
          <p style={{ fontWeight: 500 }}>Kod pocztowy: </p> {contractor.zipCode}
        </div>
      </Box>

      <div>
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          onClick={() => handleEditChange(contractor._id)}
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
  );
}

export default ContrahentGrid;
