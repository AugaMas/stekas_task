import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Landing from './Landing';
import PrivateRoute from './PrivateRoute';
import OrderList from './order/OrderList';
import OrderEdit from './order/OrderEdit';

export default function Router() {
  return (
    <Switch>
      <Route path="/" exact>
        <Landing />
      </Route>
      <PrivateRoute exact path="/orders" component={OrderList} />
      <PrivateRoute exact path="/order/:id" component={OrderEdit} />
    </Switch>
  );
}
