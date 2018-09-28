import * as React from 'react';
import { Component } from "react";
import { Link } from 'react-router-dom';
import "./HomePageStyle.css";
import {observer} from "mobx-react";
import autobind from "autobind-decorator";
import {HomePageStore} from "./HomePageStore";

@observer
@autobind
class HomePage extends Component {
    store = new HomePageStore();

    handleClick() {
        this.store.value = "321";
    }

    render() {
        return(
            <div>
                <div className={"authorization"}>
                    <Link className={"button"} to={"/signin"}>Sign In</Link>
                    <Link className={"button"} to={"/signup"}>Sign Up</Link>
                </div>
                {this.store.value}
                <h1 className={"site-name"} onClick={this.handleClick}>Order task</h1>
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