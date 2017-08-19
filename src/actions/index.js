export const ADD_PLAYER = "ADD_PLAYER";
export const REMOVE_PLAYER = "REMOVE_PLAYER";
export const HYDRATE_PLAYER = "HYDRATE_PLAYER";

export function addPlayer(player, team) {
    return {
        type: ADD_PLAYER,
        player,
        team
    };
}

export function removePlayer(player, team) {
    return {
        type: REMOVE_PLAYER,
        player,
        team
    };
}

export function hydratePlayer(player, team) {
    return {
        type: HYDRATE_PLAYER,
        player,
        team
    };
}
