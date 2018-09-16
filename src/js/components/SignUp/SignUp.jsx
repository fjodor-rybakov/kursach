import * as React from 'react';
import { Component } from "react";
import {Link} from "react-router-dom";

class SignUp extends Component {
    handleSubmit(event) {
        event.preventDefault();
        console.log("on submit sign up");
    }

    render() {
        return (
            <div className={"container"}>
                <form>
                    <div className={"form-group"}>
                        <label htmlFor={"first_name"}>
                            <input className={"form-control"} id={"first_name"} type={"text"} name={"first_name"} required="required"/>
                        </label>
                        <label htmlFor={"last_name"}>
                            <input className={"form-control"} id={"last_name"} type={"text"} name={"last_name"} required="required"/>
                        </label>
                        <label htmlFor={"login"}>
                            <input className={"form-control"} id={"login"} type={"text"} name={"login"} required="required"/>
                        </label>
                        <label htmlFor={"password"}>
                            <input className={"form-control"} id={"password"} type={"password"} name={"password"} required="required"/>
                        </label>
                        <button onClick={this.handleSubmit}>Sign Up</button>
                    </div>
                </form>
                <div>
                    <Link to={"/signin"}>Sign In</Link>
                </div>
            </div>
        );
    }
}

export { SignUp }