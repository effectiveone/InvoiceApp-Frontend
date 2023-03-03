import Layout from "../shared/components/layout/layout";
import React, { useState, useEffect } from "react";
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
import { useKontrahent } from "../shared/hook/useKontrahent";
import { useModal } from "../shared/hook/useModal";

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
  const classes = useStyles();
  const { open, setOpen, handleOpen, handleClose } = useModal();
  const {
    handleEdit,
    handleDelete,
    updatedCompanyData,
    kontrahent,
    handleSubmit,
    handleChange,
  } = useKontrahent(handleClose);

  return (
    <>
      <Box>
        <Button variant="contained" color="primary" onClick={handleOpen}>
          Open Modal
        </Button>
        <Modal open={open} onClose={handleClose} className={classes.modal}>
          <div className={classes.paper}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant="h5" component="h2">
                  Dane firmy
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth variant="outlined">
                  <InputLabel id="legalFormLabel">Forma prawna</InputLabel>
                  <Select
                    labelId="legalFormLabel"
                    id="legalForm"
                    name="legalForm"
                    value={updatedCompanyData?.legalForm}
                    onChange={handleChange}
                    label="Forma prawna"
                  >
                    {/* You can replace legalForms with your own options */}
                    {legalForms.map((form) => (
                      <MenuItem key={form.value} value={form.value}>
                        {form.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  id="companyName"
                  name="companyName"
                  label="Nazwa firmy"
                  variant="outlined"
                  value={updatedCompanyData?.companyName}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  id="nip"
                  name="nip"
                  label="NIP"
                  variant="outlined"
                  value={updatedCompanyData?.nip}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  id="regon"
                  name="regon"
                  label="REGON"
                  variant="outlined"
                  value={updatedCompanyData?.regon}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="street"
                  name="street"
                  label="Ulica"
                  variant="outlined"
                  value={updatedCompanyData?.street}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  id="city"
                  name="city"
                  label="Miasto"
                  variant="outlined"
                  value={updatedCompanyData?.city}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  id="city"
                  name="city"
                  label="Miasto"
                  variant="outlined"
                  value={updatedCompanyData?.city}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  id="zipCode"
                  name="zipCode"
                  label="Kod pocztowy"
                  variant="outlined"
                  value={updatedCompanyData?.zipCode}
                  onChange={handleChange}
                />
              </Grid>
            </Grid>
            <Box sx={{ mt: 3 }}>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                onClick={handleSubmit}
              >
                Dodaj
              </Button>
              <Button sx={{ ml: 2 }} onClick={handleClose}>
                Anuluj
              </Button>
            </Box>
          </div>
        </Modal>
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
