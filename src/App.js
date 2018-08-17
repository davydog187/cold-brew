import React, { Component } from 'react';
import logo from './logo.svg';
import football from "./Sport_football.png";
import './App.css';
import Roster from "./Roster";
import PlayerBank from "./PlayerBank";
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import { addPlayer, removePlayer } from "./actions";
import Modal from "react-modal";
import Collapsable from "./Collapsable";

class App extends Component {

    state = {
    }


    showModal = (player) => {
        console.info("show modal called");
        this.setState({...this.state, modal: true, player });

    }

    closeModal = () => {
        console.info("modal close");
        this.setState({...this.state, modal: false, player: null });
    }

    renderModal() {
        const { addPlayer } = this.props;
        const teams = this.props.data.get("teams");

        console.log("state", this.state);
        const styles = {
            content: { left: "60%" },
        }

        return (
            <Modal isOpen={this.state.modal} onRequestClose={this.closeModal} style={styles}>
                <div className="list-group">
                    {teams.map(team => {
                        return (
                            <button
                                className="list-group-item list-group-item-action text-center"
                                onClick={() => addPlayer(this.state.player, team.get("name")) && this.closeModal()}>{team.get("name")}
                            </button>
                        );
                    })}
                </div>
            </Modal>
        );
    }

    render() {
        const taken = this.props.data.get("taken");
        const qbs = filter(this.props.data.get("qb"), taken);
        const rbs = filter(this.props.data.get("rb"), taken);
        const wrs = filter(this.props.data.get("wr"), taken);
        const tes = filter(this.props.data.get("te"), taken);
        const defense = filter(this.props.data.get("defense"), taken);
        const kickers = filter(this.props.data.get("kicker"), taken);
        const teams = this.props.data.get("teams");
        const { addPlayer, removePlayer } = this.props;
        return (
            <div className="App">
                <div className="App-header">
                    <img src={football} className="App-logo" alt="logo" />
                    <h2>Cold Brew - Draft System</h2>
                </div>

                <div className="drafter">
                    <div className="rosters">
                        {teams.map(team => <Roster name={team.get("name")} players={team.get("players")} removePlayer={removePlayer}/>)}
                    </div>

                    <div className="players">
                        <Collapsable label={`Wide Receivers - ${totalValue(wrs)} - ${printHighestValue(wrs)}`}>
                            <PlayerBank players={wrs}  showModal={this.showModal} remove={removePlayer}/>
                        </Collapsable>
                        <Collapsable label={`Running Backs - ${totalValue(rbs)} - ${printHighestValue(rbs)}`}>
                            <PlayerBank players={rbs} showModal={this.showModal} remove={removePlayer} />
                        </Collapsable>
                        <Collapsable label={`Quarterbacks - ${totalValue(qbs)} - ${printHighestValue(qbs)}`}>
                            <PlayerBank players={qbs} showModal={this.showModal} remove={removePlayer} />
                        </Collapsable>
                        <Collapsable label={`Tight Ends - ${totalValue(tes)} - ${printHighestValue(tes)}`}>
                            <PlayerBank players={tes}  showModal={this.showModal} remove={removePlayer}/>
                        </Collapsable>
                        <Collapsable label={`Defense - ${totalValue(defense)} - ${printHighestValue(defense)}`}>
                            <PlayerBank players={defense}  showModal={this.showModal} remove={removePlayer}/>
                        </Collapsable>
                        <Collapsable label={`Kickers - ${totalValue(kickers)} - ${printHighestValue(kickers)}`}>
                            <PlayerBank players={kickers}  showModal={this.showModal} remove={removePlayer}/>
                        </Collapsable>
                    </div>
                </div>

                {this.renderModal()}
            </div>
        );
    }
}
function totalValue(players) {
    if (players.size === 0) return null;
    return players.reduce((result, current) => {
        if (current.get("value")) {
            const number = parseFloat(current.get("value"));
            return result + (number > 0 ? number: 0);
        }

        return result;
    }, 0).toFixed(1);
}

function printHighestValue(players) {
    const player = highestValuePlayer(players);

    if (player) {
        return `${player.get("name")} - ${player.get("value") || ""}`;
    }

    return "";
}

function highestValuePlayer(players) {
    return players.reduce((highest, player) => {
        if (parseFloat(player.get("value")) > parseFloat(highest.get("value"))) {
            return player;
        }

        return highest;
    }, players.first());
}

function filter(list, set) {
    return list.filter(item => !set.has(item));
}

export default connect(state => ({ data: state }), dispatch => bindActionCreators({ addPlayer, removePlayer }, dispatch))(App);
