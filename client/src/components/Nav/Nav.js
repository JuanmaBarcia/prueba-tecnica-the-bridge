import React, { useState } from "react";
import "./Nav.scss";

import { Link } from "react-router-dom";

import clsx from "clsx";
import Drawer from "@material-ui/core/Drawer";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import StorefrontIcon from "@material-ui/icons/Storefront";
import BusinessIcon from "@material-ui/icons/Business";

const useStyles = () => ({
  list: {
    width: 250,
  },
  fullList: {
    width: "auto",
  },
});

function Nav() {
  const [state, setValue] = useState({});

  const classes = useStyles();

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setValue({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === "top" || anchor === "bottom",
      })}
      role='presentation'
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}>
      <List>
        <Link to='/products'>
          <ListItem button>
            <ListItemText>Productos</ListItemText>
            <ListItemIcon>
              <StorefrontIcon />
            </ListItemIcon>
          </ListItem>
        </Link>
        <Link to='/manufacturers'>
          <ListItem button>
            <ListItemText>Fabricantes</ListItemText>
            <ListItemIcon>
              <BusinessIcon />
            </ListItemIcon>
          </ListItem>
        </Link>
      </List>
    </div>
  );
  return (
    <div className='Nav'>
      <React.Fragment key='top'>
        <Button onClick={toggleDrawer("top", true)}>
          <IconButton className={classes.iconButton} aria-label='menu'>
            <MenuIcon />
          </IconButton>
        </Button>
        <Drawer
          anchor='top'
          open={state["top"]}
          onClose={toggleDrawer("top", false)}>
          {list("top")}
        </Drawer>
      </React.Fragment>
    </div>
  );
}

export default Nav;
