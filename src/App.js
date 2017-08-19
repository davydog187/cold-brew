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

class App extends Component {

    state = {
        view: "rosters"
    }

    showRosters() {
        this.setState({ ...this.state, view: "rosters" });
    }

    showPlayers() {
        this.setState({ ...this.state, view: "players" });
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

        return (
            <Modal isOpen={this.state.modal} onRequestClose={this.closeModal} >
                <div className="teams">
                    {teams.map(team => {
                        return <button onClick={() => addPlayer(this.state.player, team.get("name")) && this.closeModal()}>{team.get("name")}</button>;
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
        const { view } = this.state;
        const showPlayers = view === "players";
        const showRosters = view === "rosters";
        return (
            <div className="App">
                <div className="App-header">
                    <img src={football} className="App-logo" alt="logo" />
                    <h2>Cold Brew - Draft System</h2>
                    <button onClick={() => this.showRosters()}>Rosters</button>
                    <button onClick={() => this.showPlayers()}>Players</button>
                </div>

                {showPlayers && <div className="players">
                    <PlayerBank label="Quarterbacks" players={qbs} showModal={this.showModal} remove={removePlayer} />
                    <PlayerBank label="Running backs" players={rbs} showModal={this.showModal} remove={removePlayer} />
                    <PlayerBank label="Wide Receivers" players={wrs}  showModal={this.showModal} remove={removePlayer}/>
                    <PlayerBank label="Tight Ends" players={tes}  showModal={this.showModal} remove={removePlayer}/>
                    <PlayerBank label="Defense" players={defense}  showModal={this.showModal} remove={removePlayer}/>
                    <PlayerBank label="Kickers" players={kickers}  showModal={this.showModal} remove={removePlayer}/>
                </div>}

                {showRosters && <div className="rosters">
                    {teams.map(team => <Roster name={team.get("name")} players={team.get("players")} removePlayer={removePlayer}/>)}
                </div>}
                {this.renderModal()}
            </div>
        );
    }
}

function filter(list, set) {
    return list.filter(item => !set.has(item));
}

export default connect(state => ({ data: state }), dispatch => bindActionCreators({ addPlayer, removePlayer }, dispatch))(App);
