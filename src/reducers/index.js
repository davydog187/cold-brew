import { ADD_PLAYER, REMOVE_PLAYER, HYDRATE_PLAYER } from "../actions";
import { Set, List } from "immutable";

function hydrateTeam(team) {
    if (team.get("players")) {
        return team;
    }

    return team.set("players", List());
}

function hydrate(state) {
    if (state.get("hydrated")) {
        return state;
    }

    return state
        .update("teams", teams => teams.map(hydrateTeam))
        .set("taken", Set())
        .set("hydrated", true);
}

export default function(incoming = {}, action) {
    const state = hydrate(incoming);

    switch(action.type) {
        case HYDRATE_PLAYER: {
            const { player, team } = action;
            const { name, position } = player;

            const playerObj =
                state
                .get(position)
                .find(current => current.get("name") === name);

            const index =
                state
                .get("teams")
                .findIndex(current => current.get("name") === team);

            return state
                .update("taken", taken => taken.add(playerObj))
                .updateIn(
                    ["teams", index],
                    team => team.update("players", players => players.push(playerObj))
                );
        }
        case ADD_PLAYER: {
            const { player, team } = action;

            const index =
                state
                .get("teams")
                .findIndex(current => current.get("name") === team);

            return state
                .update("taken", taken => taken.add(player))
                .updateIn(
                    ["teams", index],
                    team => team.update("players", players => players.push(player))
                );
        }
        case REMOVE_PLAYER: {
            const { player, team } = action;

            const teamIndex =
                state
                .get("teams")
                .findIndex(current => current.get("name") === team);

            const playerIndex =
                state
                .getIn(["teams", teamIndex, "players"])
                .findIndex(current => current.get("name") === player.get("name"));


            return state
                .update("taken", taken => taken.remove(player))
                .deleteIn(["teams", teamIndex, "players", playerIndex]);
        }
        default: {
            return state;
        }
    }
}
