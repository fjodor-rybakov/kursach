import * as React from 'react';
import {Component} from "react";
import {Link} from "react-router-dom";
import {SignInStore} from "./SignInStore";
import {observer} from "mobx-react";
import autobind from "autobind-decorator";
import { Redirect } from "react-router";

@autobind
@observer
class SingIn extends Component {
    store = new SignInStore();

    async handleSubmit(event) {
        await event.preventDefault();
        const login = this.store.login;
        const password = this.store.password;
        const data = JSON.stringify({
            email: login,
            password: password
        });
        await fetch("/api/signIn", {method: "POST", body: data})
            .then(res => {
                if (res.status === 200) {
                    return res.json();
                }
            })
            .then(data => this.handleAcceptUser(data))
            .catch(() => this.store.validateErr = "Такого пользователя не существует");
    }

    handleAcceptUser(data) {
        localStorage.setItem("token", data.token);
        console.log("token", data);
        location.reload();
    }

    handleChangeLogin(event) {
        this.store.login = event.target.value;
    }

    handleChangePassword(event) {
        this.store.password = event.target.value;
    }

    render() {
        if (localStorage.getItem("token")) {
            return <Redirect to='/' />
        } else  {
            return (
                <div className={"container"}>
                    <h1>Вход</h1>
                    <div>
                        <Link to={"/signup"}>Sign Up</Link>
                    </div>
                    <form>
                        <div className={"form-group"}>
                            <label htmlFor={"login"}>Login</label>
                            <input
                                className={"form-control"}
                                id={"login"}
                                type={"text"}
                                name={"login"}
                                required={"required"}
                                placeholder={"Enter email"}
                                onChange={this.handleChangeLogin}
                            />
                        </div>
                        <div className={"form-group"}>
                            <label htmlFor={"password"}>Password</label>
                            <input
                                className={"form-control"}
                                id={"password"}
                                type={"password"}
                                name={"password"}
                                required={"required"}
                                placeholder={"Enter password"}
                                onChange={this.handleChangePassword}
                            />
                        </div>
                        <button onClick={this.handleSubmit} className={"btn btn-primary"}>Sign In</button>
                    </form>
                    {
                        this.store.validateErr !== ""
                            ? <div className={"alert alert-danger"} role={"alert"}>{this.store.validateErr}</div>
                            : void 0
                    }
                </div>
            );
        }
    }
}

export {SingIn}