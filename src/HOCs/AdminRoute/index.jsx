import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import { isAdmin, getToken } from '../../api/helpers';

const AdminRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      getToken() ? (
        isAdmin() ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '/',
              state: {
                from: props.location,
              },
            }}
          />
        )
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

export default AdminRoute;
