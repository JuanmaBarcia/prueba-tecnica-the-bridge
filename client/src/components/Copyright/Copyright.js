import React from "react";
import "./Copyright.scss";

function Copyright() {
  return (
    <div className='Copyright' data-testid='copyright'>
      © Juanma Barcia {new Date().getFullYear()}
    </div>
  );
}

export default Copyright;
