import {Component} from "react";
import {ProfileStore} from "./ProfileStore";
import * as React from "react";

class Profile extends Component {
    store = new ProfileStore();

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        fetch("/api/getProfile", {method: "GET", body: JSON.stringify({id: 1})})
            .then(res => res.json())
            .then(data => this.store.data = data);
    }

    render() {
        return (
            <div>{this.store.data}</div>
        );
    }
}

export { Profile };