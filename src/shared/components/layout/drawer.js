import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import ListIcon from "@material-ui/icons/List";
import BusinessIcon from "@material-ui/icons/Business";
import SettingsIcon from "@material-ui/icons/Settings";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  toolbar: theme.mixins.toolbar,
}));

const PermanentDrawer = ({ children }) => {
  const classes = useStyles();

  return (
    <div className={classes.root} data-testid="permanent-drawer">
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor="left"
      >
        <Toolbar />
        <div className={classes.toolbar} />
        <Divider />
        <List>
          <ListItem button>
            <ListItemIcon>
              <AddCircleOutlineIcon />
            </ListItemIcon>
            <ListItemText primary="Nowa faktura" />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <ListIcon />
            </ListItemIcon>
            <ListItemText primary="Wszystkie faktury" />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <BusinessIcon />
            </ListItemIcon>
            <ListItemText primary="Moja firma" />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <ListIcon />
            </ListItemIcon>
            <ListItemText primary="Kontrahenci" />
          </ListItem>
        </List>
        <Divider />
        <List>
          <ListItem button>
            <ListItemIcon>
              <SettingsIcon />
            </ListItemIcon>
            <ListItemText primary="Ustawienia" />
          </ListItem>
        </List>
      </Drawer>
      <main>{children}</main>
    </div>
  );
};

export default PermanentDrawer;
