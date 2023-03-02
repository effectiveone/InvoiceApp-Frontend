import React, { useState, useEffect } from "react";
import {
  TextField,
  Grid,
  Typography,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@material-ui/core";
import Layout from "../shared/components/layout/layout";
import { legalForms } from "../shared/utils/forms";
import {
  getCompanyData,
  addCompanyData,
} from "../store/actions/mycompanyActions";
import { useDispatch, useSelector } from "react-redux";

const MyCompany = () => {
  const dispatch = useDispatch();
  const companyData = useSelector((state) => state.mycompany);
  const user = useSelector((state) => state.auth.user);
  const localUser = JSON.parse(localStorage.getItem("user"));
  const currentUser = user ?? localUser;

  const [updatedCompanyDate, setCompanyData] = useState({
    nip: "",
    regon: "",
    street: "",
    city: "",
    zipCode: "",
    companyName: "",
    legalForm: "",
    userEmail: currentUser?.mail,
  });

  const handleChange = (event) => {
    setCompanyData({
      ...updatedCompanyDate,
      [event.target.name]: event.target.value,
    });
  };

  useEffect(() => {
    if (!companyData?.length) {
      dispatch(getCompanyData({ userEmail: currentUser?.mail }));
    }
  }, [dispatch, companyData]);

  const handleSubmit = () => {
    dispatch(addCompanyData(updatedCompanyDate, currentUser));
  };

  return (
    <>
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
              value={companyData?.legalForm}
              onChange={handleChange}
              label="Forma prawna"
            >
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
            value={companyData?.companyName}
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
            value={companyData?.nip}
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
            value={companyData?.regon}
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
            value={companyData?.street}
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
            value={companyData?.city}
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
            value={companyData?.zipCode}
            onChange={handleChange}
          />
        </Grid>
        <button onClick={handleSubmit}>Submit</button>
      </Grid>
    </>
  );
};

export default Layout(MyCompany);
