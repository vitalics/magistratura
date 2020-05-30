import React from "react";
import { Route, RouteProps } from "react-router-dom";

import { useAuth } from "../../hooks/auth";
import { DBUser } from "../../types/auth";

type Props = { allowed: DBUser['roles'] };

export default function ProtectedRoute({ children, allowed, ...rest }: React.PropsWithChildren<Props> & RouteProps) {
  const { user } = useAuth();
  const isHaveRight = user && allowed.some(role => {
    return user.roles.includes(role)
  });

  return (
    <Route
      {...rest}
      render={({ location }) =>
        user && isHaveRight ?
          children
          :
          <>No Rights</>
      }
    />
  );
};
