import React from "react";
import "./Main.scss";

import { Route, Switch, Redirect } from "react-router-dom";

import Manufacturers from "../../pages/Manufacturers/Manufacturers";
import Products from "../../pages/Products/Products";

function Main() {
  return (
    <div className='Main wrapper'>
      <Switch>
        <Route exact path='/'>
          <Redirect to='/products' />
        </Route>
        <Route
          path='/products'
          component={Products}
          // render={() => <Products data='products' exact />}
        />
        <Route path='/manufacturers' render={() => <Manufacturers />} />
        <Route
          path='/manufacturer/:id'
          render={() => <Products data='manufacturer' />}
        />
      </Switch>
    </div>
  );
}

export default Main;
