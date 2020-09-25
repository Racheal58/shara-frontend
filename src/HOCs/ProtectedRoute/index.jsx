import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import { getToken, setRedirectUrl } from '../../api/helpers';

const ProtectedRoute = ({ component: Component, ...rest }) => {
  setRedirectUrl(rest.path);
  return (
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
                from: rest.path,
              },
            }}
          />
        )
      }
    />
  );
};

export default ProtectedRoute;
