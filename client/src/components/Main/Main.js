import React from "react";
import "./Main.scss";

import { Route, Switch, Redirect } from "react-router-dom";

import Manufacturers from "../../pages/Manufacturers/Manufacturers";
import Products from "../../pages/Products/Products";
import Details from "../../pages/Details/Details";
import SearchPage from "../../pages/SearchPage/SearchPage";

function Main() {
  return (
    <div className='Main wrapper'>
      <Switch>
        <Route exact path='/'>
          <Redirect to='/products' />
        </Route>
        <Route path='/products' render={() => <Products title='Cámaras' />} />
        <Route path='/product/:id' component={Details} />
        <Route path='/manufacturers' component={Manufacturers} />
        <Route path='/manufacturer/:id' component={Products} />
        <Route path='/search' component={SearchPage} />
      </Switch>
    </div>
  );
}

export default Main;
