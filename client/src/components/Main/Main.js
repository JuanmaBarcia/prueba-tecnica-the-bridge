import React from "react";
import "./Main.scss";

import { Route, Switch, Redirect } from "react-router-dom";

import Manufacturers from "../../pages/Manufacturers/Manufacturers";
import Products from "../../pages/Products/Products";
import Details from "../../pages/Details/Details";

function Main() {
  return (
    <div className='Main wrapper'>
      <Switch>
        <Route exact path='/'>
          <Redirect to='/products' />
        </Route>
        <Route path='/products' component={Products} />
        <Route path='/manufacturers' component={Manufacturers} />
        <Route path='/manufacturer/:id' component={Products} />
        <Route path='/product/:id' component={Details} />
      </Switch>
    </div>
  );
}

export default Main;
