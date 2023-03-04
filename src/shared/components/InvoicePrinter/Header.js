import React from "react";
import { Box, Typography } from "@material-ui/core";

export default function Header() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", xl: "row" },
        alignItems: "center",
        justifyContent: { xs: "center", xl: "space-between" },
        marginBottom: 5,
      }}
      component="header"
    >
      <div>
        <Typography
          variant="h1"
          component="h1"
          sx={{
            fontWeight: "bold",
            textTransform: "uppercase",
            letterSpacing: "wide",
            fontSize: { xs: "4xl", md: "5xl" },
            marginBottom: 3,
          }}
        >
          Invoicer
        </Typography>
      </div>
    </Box>
  );
}
