import * as React from 'react';
import { Component } from "react";
import {Link} from "react-router-dom";
import {isUndefined} from "lodash";
import autobind from "autobind-decorator";

@autobind
class SingIn extends Component {

    constructor(props){
        super(props);
        this.validateErr = "";
        this.emailRef = React.createRef();
        this.passwordRef = React.createRef();
    }

    handleSubmit(event) {
        event.preventDefault();
        console.log("on submit sign in");
        if (isUndefined(this.passwordRef.current) || isUndefined(this.emailRef.current)) {
            return;
        }
        const password = this.passwordRef.current.value;
        const email = this.emailRef.current.value;
        if (!this.validateForm(email, password)){
            return;
        }
        this.sendFormData(email, password);
    }

    sendFormData(email, password) {
        console.log("send");
        const body = {
            email: email,
            password: password
        };
        fetch("/v1/signIn", {method: "POST", body: JSON.stringify(body) })
            .then(res => res.json())
            .then( (data) => {
                this.res = data;
                console.log(data);
            });
    }

    validateForm(email, password, repeatPass){
        if (password === "" || email=== "") {
            this.validateErr = "Все поля должны быть заполнены";
            return false;
        }
        return true;
    }

    render() {
        return (
            <div className={"container"}>
                <h1>Вход</h1>
                <div>
                    <Link to={"/signup"}>Sign Un</Link>
                </div>
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Email address</label>
                        <input name="email" className="form-control" ref={this.emailRef} placeholder="Enter email"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputPassword1">Password</label>
                        <input type="password" ref={this.passwordRef} className="form-control" placeholder="Password"/>
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
                {
                    this.validateErr !== "" && this.res !== "success"
                        ? <div className="alert alert-danger" role="alert">{this.validateErr}</div>
                        : void 0
                }
            </div>
        );
    }
}

export { SingIn }