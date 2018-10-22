import * as React from 'react';
import {Component} from "react";
import {Link} from "react-router-dom";
import isUndefined from "lodash";
import {observer} from "mobx-react";
import {SignUpStore} from "./SignUpStore";
import autobind from "autobind-decorator";

@observer
@autobind
class SignUp extends Component {
    store = new SignUpStore();

    constructor(props) {
        super(props);
        this.store.validateErr = "";
        this.emailRef = React.createRef();
        this.passwordRef = React.createRef();
        this.repeatPasswordRef = React.createRef();
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        if (isUndefined(this.repeatPasswordRef.current) || isUndefined(this.passwordRef.current) ||
            isUndefined(this.emailRef.current)) {
            return;
        }
        const repeatPass = this.repeatPasswordRef.current.value;
        const password = this.passwordRef.current.value;
        const email = this.emailRef.current.value;
        if (!this.validateForm(email, password, repeatPass)) {
            return;
        }
        this.sendFormData(email, password);
    }

    sendFormData(email, password) {
        const body = {
            email: email,
            password: password
        };
        fetch("/api/signUp", {method: "POST", body: JSON.stringify(body)})
            .then(res => res.json())
            .then(data => this.store.validateErr = data);
    }

    validateForm(email, password, repeatPass) {
        if (repeatPass !== password) {
            this.store.validateErr = "Пароли не совпадают";
            return false;
        }
        if (password === "" || email === "") {
            this.store.validateErr = "Все поля должны быть заполнены";
            return false;
        }
        return true;
    }

    render() {
        return (
            <div className={"container"}>
                <h1>Регистрация</h1>
                <div>
                    <Link to={"/signin"}>Sign In</Link>
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
                    <div className="form-group">
                        <label htmlFor="exampleInputPassword1">Password</label>
                        <input type="password" ref={this.repeatPasswordRef} className="form-control"
                               placeholder="Password"/>
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
                {
                    this.store.validateErr !== ""
                        ? <div className="alert alert-danger" role="alert">{this.store.validateErr}</div>
                        : void 0
                }
            </div>
        );
    }
}

export {SignUp}