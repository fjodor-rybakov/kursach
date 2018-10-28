import {Component} from "react";
import {ProjectListStore} from "./ProjectListStore";
import * as React from "react";
import autobind from "autobind-decorator";
import {observer} from "mobx-react";
import Link from "react-router-dom/es/Link";

@observer
@autobind
class ProjectList extends Component {
    store = new ProjectListStore();

    constructor(props) {
        super(props);
    }

    async componentDidMount() {
        await fetch("/api/getProjects", {method: "GET"})
            .then(res => res.json())
            .then(data => {
                this.store.data = data;
            });
        console.log(this.store.data);
    }

    render() {
        return (
            <>
                {this.store.data.map(project => {
                    return (
                        <div className={"project-card"}>
                            <Link to={`/project/${project.id_project}`}>{project.title}</Link>
                        </div>
                    )}
                )}
            </>
        );
    }
}

export {ProjectList};