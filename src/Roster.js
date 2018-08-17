import React, { Component } from "react";
import "./Roster.css";

function computeRank(players) {
    return players.reduce((result, current) => {
        if (current.get("value")) {
            return result + parseFloat(current.get("value"));
        }

        return result;
    }, 0);
}

const REQS = {
    qb: 1,
    rb: 2,
    wr: 2,
    te: 1,
    defense: 1,
    kicker: 1
};

function computeRemaning(players) {
    const reqs = { ...REQS };

    return players.reduce((result, current) => {
        const type = current.get("position");
        console.info("type", type);
        result[type] = result[type] - 1;
        return result;
    }, reqs);
}

function remaining(players) {
    const { qb, rb, wr, te, defense, kicker } = computeRemaning(players);
    return (
        <div>
            qb {qb} rb {rb} wr {wr} te {te} d {defense} k {kicker}
        </div>
    );
}

export default class Roster extends Component {

    render() {
        const { players = [], name, removePlayer } = this.props;
        console.info("remaining", computeRemaning(players));
        return (
            <div className="list-group mb-4">
                <div className="list-group-item d-flex justify-content-between align-items-center">
                    {name} {remaining(players)} <span className="badge badge-primary badge-pill">{computeRank(players)}</span>
                </div>
                {players.map(player => {
                    return (
                        <a href="#" className="list-group-item list-group-item-action list-group-item-primary" key={player.get("name")} onClick={() => removePlayer(player, name)}>
                            {player.get("name")} {player.get("value")} {player.get("tm_bw")}
                        </a>
                    );
                })}
            </div>
        );
    }

}
