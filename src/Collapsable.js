import React, { Component } from "react";

export default class Collapsable extends Component {

    state = { open: true };

    toggle() {
        this.setState({ open: !this.state.open });
    }

    render() {
        const { label, children } = this.props;
        return (
            <div className="Collapsable">
                <h2 onClick={() => this.toggle()}>{this.state.open ? "-" : "+"} {label}</h2>
                {this.state.open ? children : null}
            </div>
        );
    }
}
