import React, { useState } from "react";
import "./App.scss";

import { BrowserRouter } from "react-router-dom";
import { appContext } from "./context/appContext";
import axios from "axios";

import Header from "./components/Header/Header";
import Main from "./components/Main/Main";
import Footer from "./components/Footer/Footer";

// API queries
const getProducts = async () => await axios.get("/api/products");
const getManufacturers = async () => await axios.get(`/api/manufacturers`);
const getManufacturerProducts = async (id) =>
  await axios.get(`/api/manufacturer/${id}`);
const getSearchProducts = async (key) => await axios.get(`/api/search/${key}`);

function App() {
  const [results, setResults] = useState([]);
  const [search, setSearch] = useState("");

  const getSearch = (input) => {
    if (input.length <= 1) {
      setSearch("");
    } else {
      setSearch(input);
    }
  };

  const value = {
    getProducts,
    getManufacturers,
    getManufacturerProducts,
    getSearchProducts,
    results,
    setResults,
    search,
    setSearch,
    getSearch,
  };

  return (
    <div className='App'>
      <BrowserRouter>
        <appContext.Provider value={value}>
          <Header />
          <Main />
        </appContext.Provider>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
