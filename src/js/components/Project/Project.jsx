import {Component} from "react";
import * as React from "react";
import autobind from "autobind-decorator";
import {observer} from "mobx-react";
import {observable} from "mobx";

@observer
@autobind
class Project extends Component {
    @observable data = {};
    constructor(props) {
        super(props);
    }

    async componentDidMount() {
        let id = location.hash.split('/')[2];
        await fetch("/api/getProject", {method: "POST", body: JSON.stringify({id: id})})
            .then(res => res.json())
            .then(data => {
                this.data = data;
            });
        console.log(this.data);
    }

    render() {
        return (
            <div>
                {this.data.title}
            </div>
        );
    }
}

export {Project};