import React, { useState, useRef, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { AiOutlineMenu } from "react-icons/ai";
import { MdAccountCircle } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { getActions } from "../../../store/actions/authActions";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Dropdown from "./Dropdown";
import { sanitizedUrl } from "../../utils/api";
import { useUser } from "../../hook/useUser";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
  },
  drawer: {
    flexShrink: 0,
  },
  Tolbar: {
    backgroundColor: theme.palette.background.default,
    color: theme.palette.text.primary,
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
  },
  toolbar: theme.mixins.toolbar,
}));
export default function Navbar({ className }) {
  const classes = useStyles();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser } = useUser();
  const { logout } = getActions(dispatch);
  const handleLogout = () => {
    logout();
    navigate("/login");
    // history.push("/login");
  };
  const [anchorEl, setAnchorEl] = useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const opendropdown = Boolean(anchorEl);
  const id = opendropdown ? "simple-popover" : undefined;

  const inputElement = useRef();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar className={classes.Tolbar}>
          <Box display="flex" alignItems="center">
            <Typography
              component={Link}
              to={sanitizedUrl.Dashboard}
              variant="h6"
              noWrap
            >
              Invoice
            </Typography>
          </Box>
          <Box display="flex" alignItems="center">
            Welcome, {currentUser?.username}
            <IconButton
              ref={inputElement}
              aria-label="account of current user"
              aria-controls={id}
              aria-haspopup="true"
              onClick={handleClick}
              color="inherit"
            >
              <MdAccountCircle />
            </IconButton>
            <Dropdown
              handleLogout={handleLogout}
              open={opendropdown}
              id={id}
              anchorEl={anchorEl}
              handleClose={handleClose}
            />
          </Box>
        </Toolbar>
      </AppBar>
    </div>
  );
}