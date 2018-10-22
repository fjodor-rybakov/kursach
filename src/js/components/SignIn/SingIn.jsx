import * as React from 'react';
import { Component } from "react";
import {Link} from "react-router-dom";

class SingIn extends Component {
    handleSubmit(event) {
        event.preventDefault();
        console.log("on submit sign in");
    }

    async componentDidMount() {
        await fetch("/api/signIn", {method: "POST", body: JSON.stringify({
                email: "user@gmail.com",
                password: "Password123"
            })})
            .then(res => res.json())
            .then((data) => localStorage.setItem("token", data.token));
        await localStorage.getItem("token");
    }

    render() {
        return (
            <div className={"container"}>
                <form>
                    <div className={"form-group"}>
                        <label htmlFor={"login"}>
                            <input className={"form-control"} id={"login"} type={"text"} name={"login"} required="required"/>
                        </label>
                        <label htmlFor={"password"}>
                            <input className={"form-control"} id={"password"} type={"password"} name={"password"} required="required"/>
                        </label>
                        <button onClick={this.handleSubmit}>Sign In</button>
                    </div>
                </form>
                <div>
                    <Link to={"/signup"}>Sign Up</Link>
                </div>
            </div>
        );
    }
}

export { SingIn }