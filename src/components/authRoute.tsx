import React from "react";
import { Route, Redirect } from "react-router-dom";

import { DBUser } from "../types/auth";
import * as ROUTES from '../routes';

export default function AuthRoute(user: DBUser | null | undefined) {
    return function ({ component: Component, ...rest }: { component: any, rest: any[] } | any): JSX.Element {
        return (
            <Route
                {...rest}
                render={props => (!!user ? <Component {...props} /> : <Redirect to={ROUTES.SIGN_IN} />)}
            />

        );
    };
}