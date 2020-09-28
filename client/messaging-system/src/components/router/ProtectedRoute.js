import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from 'react-redux';

export const ProtectedRoute = ({
    component: Component,
    ...rest
}) => {
    const { user:{isLogedIn} } = useSelector(state => state)

    return (
        <Route
            {...rest}
            render={props => {
                if (isLogedIn) {
                    return <Component {...props} />;
                } else {
                    return (
                        <Redirect
                            to={{
                                pathname: "/",
                                state: {
                                    from: props.location
                                }
                            }}
                        />
                    );
                }
            }}
        />
    );
};