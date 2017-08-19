import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reducer from './reducers';
import registerServiceWorker from './registerServiceWorker';
import { createLogger } from 'redux-logger';
import Immutable from "immutable";
import qb from "./data/qbs.json";
import rb from "./data/rbs.json";
import wr from "./data/wrs.json";
import te from "./data/tes.json";
import teams from "./data/teams.json";
import defense from "./data/defense.json";
import kicker from "./data/kickers.json";
import { hydratePlayer } from "./actions";

const initialData = Immutable.fromJS({
    qb,
    rb,
    wr,
    te,
    defense,
    kicker,
    teams
});

const logger = createLogger();


const store = createStore(reducer, initialData, applyMiddleware(logger));
store.subscribe(save);

const storedData = parseStoredData(window.localStorage.getItem("teams"), store);

let previous;
function save() {
    let current = store.getState();

    if (current === previous) return;

    window.localStorage.setItem("teams", JSON.stringify(store.getState().get("teams").toJS()))
}

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);
registerServiceWorker();

function parseStoredData(data, store) {
    if(!data) return;
    JSON
        .parse(data)
        .forEach(team => {
            team.players.forEach(player => {
                store.dispatch(hydratePlayer(player, team.name));
            });
        });
}
