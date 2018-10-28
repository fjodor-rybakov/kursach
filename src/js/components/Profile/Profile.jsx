import {Component} from "react";
import {ProfileStore} from "./ProfileStore";
import * as React from "react";
import autobind from "autobind-decorator";
import {observer} from "mobx-react";
import "./Profile.css";

@observer
@autobind
class Profile extends Component {
    store = new ProfileStore();

    constructor(props) {
        super(props);
    }

    async componentDidMount() {
        await fetch("/api/profile", {method: "POST", body: JSON.stringify({id: 1})})
            .then(res => res.json())
            .then(data => {
                this.store.data = data;
            });
    }

    render() {
        return (
            <div>
                <img src={"https://iupac.org/cms/wp-content/uploads/2018/05/default-avatar.png"} className={"image"}/>
                <h5>Name: {this.store.data.name}</h5>
                <h5>Last name: {this.store.data.last_name}</h5>
                <h5>Email: {this.store.data.email}</h5>
                <h5>Id: {this.store.data.id_user}</h5>
            </div>
        );
    }
}

export {Profile};