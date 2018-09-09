import * as React from 'react';
import { Component } from "react";
import { Link } from 'react-router-dom';
import "./HomePageStyle.css";
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
                    <p>Какая-то инфа</p>
                </div>
                <div className={"button-order"}>
                    <Link className={"button"} to={"/signup"}>Сделать заказ</Link>
                </div>
            </div>
        );
    }
}

export { HomePage };