import React, { Component } from "react";

const ShowPlayer = (showModal, player) => {
    if (!player.get("rank")) {
        return (
            <div key={player.get("name")} className="player-bank__player">
                {player.get("name")}
                <button onClick={() => showModal(player)}>Add</button>
            </div>
        );
    }

    return (
        <div key={player.get("name")} className="player-bank__player">
            {player.get("name")}, {player.get("rank")} {player.get("value") && player.get("value")}
            <button onClick={() => showModal(player)}>Add</button>
        </div>
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
                <h2>{label}</h2>
                <div>{totalValue(players)}</div>
                {players.map(ShowPlayer.bind(null, showModal))}
            </div>
        );

    }

}
