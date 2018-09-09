import * as React from 'react';
import ReactDOM from "react-dom";
import { HomePage } from "./components/home-page/HomePage";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { NotFound } from "./components/not-found/NotFound";
import {SingIn} from "./components/SignIn/SingIn";
import {SignUp} from "./components/SignUp/SignUp";

ReactDOM.render(
    <BrowserRouter>
        <Switch>
            <Route
                exact={true}
                path={"/"}
                component={HomePage}
            />
            <Route
                exact={true}
                path={"/signin"}
                component={SingIn}
            />
            <Route
                exact={true}
                path={"/signup"}
                component={SignUp}
            />
            <Route component={NotFound}/>
        </Switch>
    </BrowserRouter>,
    document.getElementById("root")
);