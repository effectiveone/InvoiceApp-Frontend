import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Box } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  header: {
    // Define styles for the header here
  },
  logo: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
  },
  image: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    width: "90px",
    height: "59ox",
  },

  title: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    color: "#5D6975",
    textAlign: "center",
    marginRight: "10px",

    fontSize: "0.8em",
  },
  invoice: {
    width: "100%",
    borderTop: "1px solid  #5D6975",
    borderBottom: "1px solid  #5D6975",
    color: "#5D6975",
    fontSize: "2.4em",
    lineHeight: "1.4em",
    fontWeight: "normal",
    textAlign: "center",
    margin: "0 0 20px 0",
    background: `url(dimension.png)`,
  },
}));

const HeaderInvoice = () => {
  const classes = useStyles();

  return (
    <header className={classes.header}>
      <Grid container>
        <Grid item xs={12}>
          <Box className={classes.logo}>
            <img src="logo512.png" alt="Logo" className={classes.image} />
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box className={classes.title}>
            <h1 className={classes.invoice}>INVOICE 3-2-1</h1>
          </Box>
        </Grid>
      </Grid>
    </header>
  );
};

export default HeaderInvoice;
