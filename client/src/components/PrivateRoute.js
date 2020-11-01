import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

function PrivateRoute(props) {
  const user = useSelector((store) => store.auth && store.auth.user);

  return user ? (
    <Route path={props.path} exact={props.exact} component={props.component} />
  ) : (
    <Redirect to="/" />
  );
}

export default PrivateRoute;
