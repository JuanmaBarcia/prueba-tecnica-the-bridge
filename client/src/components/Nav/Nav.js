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
import MenuIcon from "@material-ui/icons/Menu";
import HomeIcon from "@material-ui/icons/Home";
import EditIcon from "@material-ui/icons/Edit";

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
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText>Productos</ListItemText>
          </ListItem>
        </Link>
        <Link to='/manufacturers'>
          <ListItem button>
            <ListItemIcon>
              <EditIcon />
            </ListItemIcon>
            <ListItemText>Fabricantes</ListItemText>
          </ListItem>
        </Link>
      </List>
    </div>
  );
  return (
    <div className='Nav'>
      <React.Fragment key='top'>
        <Button onClick={toggleDrawer("top", true)}>
          <MenuIcon />
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
