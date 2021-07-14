import React from "react";
import "./Footer.scss";
import Copyright from "../Copyright/Copyright";

function Footer() {
  return (
    <div className='Footer' data-testid='footer'>
      <Copyright />
    </div>
  );
}

export default Footer;
