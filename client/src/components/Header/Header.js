import React from "react";
import "./Header.scss";
import Nav from "../Nav/Nav";
import Search from "../Search/Search";

function Header() {
  return (
    <div className='Header'>
      <img src={process.env.PUBLIC_URL + "/logo.png"} alt='Logo' />
      <Search />
      <Nav />
    </div>
  );
}

export default Header;
