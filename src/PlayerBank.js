import React, { Component } from "react";

const FIELDS = [
    "name",
    "value",
    "rank",
    "tm_bw",
    "tier",
    "std_dev",
    "sk",
    "scarcity",
    "position_rank",
];

const LABELS = [
    "Name",
    "Value",
    "Rank",
    "Team / Bye",
    "Tier",
    "StdDev",
    "sk",
    "Scarcity",
    "Position Rank",
];

function createNewsLink(player) {
    const [first, ...lastParts] = player.get("name").replace(/\(\d*\)/, "").split(" ");

    const last = lastParts.join(" ");

    return `http://www.rotoworld.com/content/playersearch.aspx?searchname=${last},+${first}&sport=nfl`;
}

const ShowPlayer = (showModal, player) => {
    const name = player.get("name")

    const fields = FIELDS.map(field => <td key={field}>{player.get(field)}</td>);

    return (
        <tr key={name}>
            {fields}
            <td key="news"><a target="_blank" href={createNewsLink(player)}>News</a></td>
            <td key="add"><button className="btn btn-primary" onClick={() => showModal(player)}>Add</button></td>
        </tr>
    );
}

function totalValue(players) {
    return players.reduce((result, current) => {
        if (current.get("value")) {
            const number = parseFloat(current.get("value"));
            return result + (number > 0 ? number: 0);
        }

        return result;
    }, 0).toFixed(1);
}

export default class PlayerBank extends Component {

    render() {
        const { label, players, add, showModal } = this.props;

        return (
            <div className="player-bank">
                <table className="player-bank__table table table-striped table-dark">
                    <thead>
                        <tr>{LABELS.map(field => <th scope="col" key={field}>{field}</th>)}</tr>
                    </thead>
                    <tbody>
                        {players.map(ShowPlayer.bind(null, showModal))}
                    </tbody>
                </table>
            </div>
        );
    }

}
