import React, { useState, useEffect } from "react";
import { TextField, Button, Box, Grid, Typography } from "@material-ui/core";
import { Delete } from "@material-ui/icons";
import { useInvoiceContext } from "../../Context/useInvoiceContext";

const InvoiceForm = () => {
  const {
    TAX_RATES,
    selectedKontrahent,
    items,
    setItems,
    totalNetValue,
    setTotalNetValue,
    totalGrossValue,
    setTotalGrossValue,
    kontrahent,
    invoiceSaleDate,
    setInvoiceSaleDate,
    invoicePaymentDate,
    setInvoicePaymentDate,
    handleSelectChange,
    invoiceDate,
    setInvoiceDate,
    setNotes,
    notes,
  } = useInvoiceContext();

  const [isNotesVisibility, setIsNotesVisibility] = useState(false);
  const changeVisibility = () => {
    setIsNotesVisibility(!isNotesVisibility);
  };
  useEffect(() => {
    const newTotalNetValue = items?.reduce(
      (total, item) => total + item.netValue,
      0
    );
    const newTotalGrossValue = items?.reduce(
      (total, item) => total + item.grossValue,
      0
    );
    setTotalNetValue(newTotalNetValue);
    setTotalGrossValue(newTotalGrossValue);
  }, [items, setTotalGrossValue, setTotalNetValue]);

  const handleAddItem = () => {
    setItems([
      ...items,
      {
        name: "",
        quantity: 1,
        unit: "",
        vat: TAX_RATES[0].value,
        netPrice: 0,
        netValue: 0,
        grossValue: 0,
      },
    ]);
  };

  const handleRemoveItem = (index) => {
    const newItems = [...items];
    newItems.splice(index, 1);
    setItems(newItems);
  };

  const handleItemChange = (index, field, value) => {
    const newItems = [...items];
    newItems[index][field] = value;

    if (field === "quantity" || field === "netPrice" || field === "vat") {
      const item = newItems[index];
      const netValue = item.quantity * item.netPrice;
      const grossValue = netValue * (1 + item.vat);
      newItems[index].netValue = netValue;
      newItems[index].grossValue = grossValue;
    }
    setItems(newItems);
  };

  return (
    <>
      <Box style={{ display: "flex", flexDirection: "row" }}>
        <Grid
          style={{ display: "flex", flexDirection: "column" }}
          item
          xs={12}
          md={6}
        >
          <Typography>Wybierz kontrahenta</Typography>
          <select
            style={{ width: "300px" }}
            name="companyName"
            value={
              selectedKontrahent?.kontrahent_companyName ??
              kontrahent[0]?.companyName
            }
            onChange={handleSelectChange}
          >
            {kontrahent?.map((k, index) => (
              <option key={index} value={k.nip}>
                {k.companyName}
              </option>
            ))}
          </select>
        </Grid>
        <Box
          item
          xs={12}
          md={6}
          style={{
            display: "flex",
            flexDirection: "row",
            gap: "20px",
          }}
        >
          <Grid
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <label htmlFor="invoiceDate">Invoice Date</label>
            <input
              type="date"
              name="invoiceDate"
              id="invoiceDate"
              placeholder="Invoice Date"
              autoComplete="off"
              value={invoiceDate}
              onChange={(e) => setInvoiceDate(e.target.value)}
            />
          </Grid>
          <Grid style={{ display: "flex", flexDirection: "column" }}>
            <label htmlFor="dueDate">Due Date</label>
            <input
              type="date"
              name="dueDate"
              id="dueDate"
              placeholder="Invoice Date"
              autoComplete="off"
              value={invoiceSaleDate}
              onChange={(e) => setInvoiceSaleDate(e.target.value)}
            />
          </Grid>
          <Grid style={{ display: "flex", flexDirection: "column" }}>
            <label htmlFor="dueDate">Data płatności</label>
            <input
              type="date"
              name="dueDate"
              id="dueDate"
              placeholder="Invoice Date"
              autoComplete="off"
              value={invoicePaymentDate}
              onChange={(e) => setInvoicePaymentDate(e.target.value)}
            />
          </Grid>
        </Box>
      </Box>
      <form>
        <Grid container spacing={2} style={{ paddingTop: "50px" }}>
          <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleAddItem}
              style={{ width: "100%" }}
            >
              Dodaj produkt/usługę
            </Button>
          </Grid>
          {items?.map((item, index) => (
            <InvoiceItem
              key={index}
              index={index}
              item={item}
              taxRates={TAX_RATES}
              onRemove={handleRemoveItem}
              onChange={handleItemChange}
            />
          ))}
          <Grid
            item
            xs={12}
            md={6}
            style={{
              display: "flex",
              flexDirection: "column",
              paddingTop: "50px",
            }}
          >
            <Button onClick={changeVisibility}>Additional Notes</Button>
            {isNotesVisibility && (
              <>
                {" "}
                <textarea
                  name="notes"
                  id="notes"
                  cols="30"
                  rows="10"
                  placeholder="Additional notes to the client"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                ></textarea>
              </>
            )}
          </Grid>
          <Grid item xs={12} md={2} style={{ paddingTop: "50px" }}>
            <TextField
              label="Wartość netto"
              value={totalNetValue?.toFixed(2)}
              InputProps={{ readOnly: true }}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} md={2} style={{ paddingTop: "50px" }}>
            <TextField
              label="Wartość brutto"
              value={totalGrossValue?.toFixed(2)}
              InputProps={{ readOnly: true }}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} md={2} style={{ paddingTop: "50px" }}>
            <TextField
              label="Vat"
              value={(totalGrossValue - totalNetValue)?.toFixed(2)}
              InputProps={{ readOnly: true }}
              fullWidth
            />
          </Grid>
        </Grid>
      </form>
    </>
  );
};

const InvoiceItem = ({ index, item, taxRates, onRemove, onChange }) => {
  const handleFieldChange = (event) => {
    const { name, value } = event.target;
    onChange(index, name, value);
  };

  const handleTaxChange = (event) => {
    const { value } = event.target;
    onChange(index, "vat", parseFloat(value));
  };

  return (
    <>
      <Grid item xs={12}>
        <Typography variant="h6" gutterBottom>
          Produkt/usługa {index + 1}
          {index > 0 && (
            <Button
              startIcon={<Delete />}
              onClick={() => onRemove(index)}
              style={{ float: "right" }}
            >
              Usuń
            </Button>
          )}
        </Typography>
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField
          label="Nazwa"
          name="name"
          value={item.name}
          onChange={handleFieldChange}
          fullWidth
        />
      </Grid>
      <Grid item xs={12} md={1}>
        <TextField
          label="Ilość"
          type="number"
          name="quantity"
          value={item.quantity}
          onChange={handleFieldChange}
          fullWidth
        />
      </Grid>
      <Grid item xs={12} md={1}>
        <TextField
          label="Jednostka"
          name="unit"
          value={item.unit}
          onChange={handleFieldChange}
          fullWidth
        />
      </Grid>
      <Grid item xs={12} md={1}>
        <TextField
          select
          label="VAT"
          name="vat"
          value={item.vat}
          onChange={handleTaxChange}
          fullWidth
        >
          {taxRates?.map((rate) => (
            <option key={rate.value} value={rate.value}>
              {rate.label}
            </option>
          ))}
        </TextField>
      </Grid>
      <Grid item xs={12} md={1}>
        <TextField
          label="Cena netto"
          type="number"
          name="netPrice"
          value={item.netPrice}
          onChange={handleFieldChange}
          fullWidth
        />
      </Grid>
      <Grid item xs={12} md={1}>
        <TextField
          label="Wartość netto"
          type="number"
          name="netValue"
          value={item.netValue}
          fullWidth
          readOnly
        />
      </Grid>
      <Grid item xs={12} md={1}>
        <TextField
          label="Wartość brutto"
          type="number"
          name="grossValue"
          value={item.grossValue}
          fullWidth
          readOnly
        />
      </Grid>
    </>
  );
};
export default InvoiceForm;
