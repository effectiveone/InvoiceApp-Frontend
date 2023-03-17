import React from "react";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";

import { sanitizedUrl } from "../../utils/api";

const useStyles = makeStyles({
  menu: {
    display: "flex",
    flexDirection: "column",
  },
  coinContainer: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    alignItems: "center",
  },
  currentUser: {
    transform: "translateX(10%)",
  },
});

function Dropdown({ handleLogout, open, id, anchorEl, handleClose }) {
  const classes = useStyles();

  return (
    <Menu
      id={id}
      anchorEl={anchorEl}
      keepMounted
      open={open}
      onClose={handleClose}
      PaperProps={{ square: true }}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
      className={classes.menu}
    >
      <MenuItem onClick={handleLogout}>Logout</MenuItem>
    </Menu>
  );
}

export default Dropdown;