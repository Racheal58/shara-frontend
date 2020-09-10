import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import { getToken } from '../../api/helpers';

const ProtectedRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      getToken() ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: '/authenticate',
            state: {
              from: props.location,
            },
          }}
        />
      )
    }
  />
);

export default ProtectedRoute;
