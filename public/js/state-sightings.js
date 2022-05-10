import { stateAbbr } from "./state-abbr.js";

const stateSightingsHandler = async (event) => {
    event.preventDefault();
    const state = event.target.children[0].textContent;
    const state_id = stateAbbr[state];

    await fetch(`/api/sightings/${state_id}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    });
}

export { stateSightingsHandler }