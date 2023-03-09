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
import { makeStyles } from "@material-ui/core/styles";
import { legalForms } from "../../utils/forms";
import { useKontrahentContext } from "../../context/useKontrahentContext";
import { useModal } from "../../hook/useModal";

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
function ContrahentModal() {
  const classes = useStyles();
  const {
    button,
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
            {button}
            <Button sx={{ ml: 2 }} onClick={handleClose}>
              Anuluj
            </Button>
          </Box>
        </div>
      </Modal>
    </>
  );
}

export default ContrahentModal;
