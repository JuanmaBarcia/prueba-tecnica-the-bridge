import React from "react";
import "./Header.scss";

import { Link } from "react-router-dom";

import Nav from "../Nav/Nav";
import Search from "../Search/Search";

function Header() {
  return (
    <div className='Header' data-testid='header'>
      <div className='mobile_menu'>
        <Link to='/products'>
          <img src={process.env.PUBLIC_URL + "/logo.png"} alt='Logo' />
        </Link>
        <Search />
        <Nav />
      </div>
      <div className='desktop_menu'>
        <Link to='/products'>
          <img src={process.env.PUBLIC_URL + "/logo.png"} alt='Logo' />
        </Link>
        <Link to='/products'>Productos</Link>
        <Link to='/manufacturers'>Fabricantes</Link>
        <Search />
      </div>
    </div>
  );
}

export default Header;
