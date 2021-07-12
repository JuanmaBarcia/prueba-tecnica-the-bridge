import React, { useContext } from "react";
import "./SearchPage.scss";

import Products from "../Products/Products";
import { appContext } from "../../context/appContext";

function SearchPage() {
  const { search, results } = useContext(appContext);

  return (
    <div className='SearchPage'>
      {results.length !== 0 && search.length !== 0 ? (
        <Products data={search} title={`Búsqueda: ${search}`} />
      ) : (
        <h2>No hay resultados</h2>
      )}
    </div>
  );
}

export default SearchPage;
