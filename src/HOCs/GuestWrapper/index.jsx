import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import { getToken } from '../../api/helpers';

const GuestWrapper = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props =>
        !getToken() ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: `/` }} />
        )
      }
    />
  );
};

export default GuestWrapper;
