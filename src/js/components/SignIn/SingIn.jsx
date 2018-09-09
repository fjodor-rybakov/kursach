import * as React from 'react';
import { Component } from "react";
import {Link} from "react-router-dom";

class SingIn extends Component {
    handleSubmit(event) {
        event.preventDefault();
        console.log("on submit sign in");
    }

    render() {
        return (
            <div>
                <form>
                    <label htmlFor={"login"}>
                        <input id={"login"} type={"text"} name={"login"} required="required"/>
                    </label>
                    <label htmlFor={"password"}>
                        <input id={"password"} type={"password"} name={"password"} required="required"/>
                    </label>
                    <button onClick={this.handleSubmit}>Sign In</button>
                </form>
                <div>
                    <Link to={"/signup"}>Sign Up</Link>
                </div>
            </div>
        );
    }
}

export { SingIn }