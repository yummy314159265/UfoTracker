import { stateAbbr } from "./state_abbr.js";

const stateHandler = async (event) => {
    event.preventDefault();
    const state = event.target.children[0].textContent;
    const state_id = stateAbbr[state];

    const response = await fetch(`/api/sightings/${state_id}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    });

    console.log(response)
}

export { stateHandler }