import React, { useContext, useCallback } from "react";
import "./Search.scss";

import { Link } from "react-router-dom";
import { debounce } from "lodash";
import { appContext } from "../../context/appContext";

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

  const { search, getSearch } = useContext(appContext);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedFetch = useCallback(debounce(getSearch, 300), [search]);

  const handleChange = async (e) => {
    const input = e.target.value;
    if (input.length !== 0) {
      debouncedFetch(input);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const input = e.target.elements.searchInput.value;
    getSearch(input);
    e.target.reset();
  };

  return (
    <div className='Search'>
      <Paper component='form' className={classes.root} onSubmit={handleSubmit}>
        <InputBase
          className={classes.input}
          placeholder='Búsqueda'
          inputProps={{ "aria-label": "busqueda" }}
          name='searchInput'
          onChange={handleChange}
        />
        <Divider className={classes.divider} orientation='vertical' />
        <IconButton
          type='submit'
          className={classes.iconButton}
          aria-label='search'>
          <Link to={`/search/${search}`}>
            <SearchIcon />
          </Link>
        </IconButton>
      </Paper>
    </div>
  );
}

export default Search;
