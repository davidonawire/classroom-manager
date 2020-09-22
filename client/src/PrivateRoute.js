import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { Context } from './Context';

// For routes that require sign-in, redirect to sign-in page
export default ({ component: Component, ...rest }) => {
  const { authenticatedUser } = useContext(Context);
  return (
    <Route
      {...rest}
      render={props => authenticatedUser ? (
          <Component {...props} />
        ) : (
          <Redirect to={{
            pathname: '/signin',
            state: { from: props.location }
          }} />
        )
      }
    />
  );
};