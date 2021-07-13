import React from "react";
import "./Header.scss";

import { Link } from "react-router-dom";

import Nav from "../Nav/Nav";
import Search from "../Search/Search";

function Header() {
  return (
    <div className='Header'>
      <Link to='/products'>
        <img src={process.env.PUBLIC_URL + "/logo.png"} alt='Logo' />
      </Link>
      <Search />
      <Nav />
    </div>
  );
}

export default Header;
