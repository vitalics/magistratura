import React from "react";
import { Route } from "react-router-dom";
import SignIn from '../containers/signIn'

import {User} from 'firebase';

export default function AuthGuardedRoute(user: null | User | undefined): (Component: any, ...rest: any[]) => JSX.Element {
    return function ({ component: Component, ...rest }): JSX.Element {
        console.dir(user);
        return (
            <Route
                {...rest}
                render={props => (!!user ? <Component {...props} /> : <SignIn />)}
            />
        );
    };
}