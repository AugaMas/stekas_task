import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Landing from './Landing';
import PrivateRoute from './PrivateRoute';
import OrderList from './order/OrderList';

export default function Router() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact>
          <Landing />
        </Route>
        <PrivateRoute exact path="/orders" component={OrderList} />
      </Switch>
    </BrowserRouter>
  );
}
