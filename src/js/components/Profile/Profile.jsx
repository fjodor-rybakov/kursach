import {Component} from "react";
import {ProfileStore} from "./ProfileStore";
import * as React from "react";

class Profile extends Component {
    store = new ProfileStore();

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>Hello</div>
        );
    }
}

export { Profile };