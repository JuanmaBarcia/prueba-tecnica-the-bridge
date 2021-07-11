import React from "react";
import "./Search.scss";

import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    width: 400,
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
}));

function Search() {
  const classes = useStyles();
  return (
    <div className='Search'>
      <Paper component='form' className={classes.root}>
        <InputBase
          className={classes.input}
          placeholder='Búsqueda'
          inputProps={{ "aria-label": "busqueda" }}
        />
        <Divider className={classes.divider} orientation='vertical' />
        <IconButton
          type='submit'
          className={classes.iconButton}
          aria-label='search'>
          <SearchIcon />
        </IconButton>
      </Paper>
    </div>
  );
}

export default Search;
