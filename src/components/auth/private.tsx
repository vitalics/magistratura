import React from "react";
import { Route, Redirect, RouteProps } from "react-router-dom";

import * as ROUTES from '../../routes';
import { useAuth } from "../../hooks/auth";
import { isUserLike } from "../../utils/auth";

export default function PrivateRoute({ children, ...rest }: React.PropsWithChildren<RouteProps>) {
  const { user } = useAuth();
  return (
    <Route
      {...rest}
      render={({ location }) =>
        user && isUserLike(user) ? (
          children
        ) : (
            <Redirect
              to={{
                pathname: ROUTES.SIGN_IN,
                state: { from: location }
              }}
            />
          )
      }
    />
  );
};
