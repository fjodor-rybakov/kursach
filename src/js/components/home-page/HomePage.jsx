import * as React from 'react';
import { Component } from "react";
import { Link } from 'react-router-dom';
import "./HomePageStyle.css";
import {observer} from "mobx-react";
import autobind from "autobind-decorator";
@observer
@autobind
class HomePage extends Component {

    render() {
        return(
            <div>
                <div className={"authorization"}>
                    <Link className={"button"} to={"/signin"}>Sign In</Link>
                    <Link className={"button"} to={"/signup"}>Sign Up</Link>
                </div>
                <h1 className={"site-name"}>Order task</h1>
                <div className={"about-us"}>
                    <p>Some info...</p>
                </div>
                <p className={"button-order"}>
                    <Link className={"button"} to={"/signup"}>Create order</Link>
                </p>
            </div>
        );
    }
}

export { HomePage };