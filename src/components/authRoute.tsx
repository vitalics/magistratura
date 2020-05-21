import React from "react";
import { Route } from "react-router-dom";
import SignIn from '../containers/signIn'

import { User } from '../types/auth';

export default function AuthGuardedRoute(user: User | null): (Component: any, ...rest: any[]) => JSX.Element {
    return function ({ component: Component, ...rest }): JSX.Element {
        return (
            <Route
                {...rest}
                render={props => (!!user ? <Component {...props} /> : <SignIn />)}
            />
        );
    };
}