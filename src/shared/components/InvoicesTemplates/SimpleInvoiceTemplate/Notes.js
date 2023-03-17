import React from "react";
import { Box, Typography } from "@material-ui/core";
import { useInvoiceContext } from "../../../context/useInvoiceContext";

export default function Notes() {
  const { notes } = useInvoiceContext();

  return (
    <Box sx={{ marginTop: 10, marginBottom: 5 }} component="section">
      <Typography variant="h3" component="h3">
        Additional notes
      </Typography>
      <Typography
        variant="body1"
        component="p"
        sx={{ maxWidth: "50ch", textAlign: "justify" }}
      >
        {notes}
      </Typography>
    </Box>
  );
}