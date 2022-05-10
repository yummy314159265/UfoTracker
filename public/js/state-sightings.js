import { stateAbbr } from "./state-abbr.js";

const stateSightingsHandler = async (event) => {
    event.preventDefault();
    const state = event.target.children[0].textContent;
    const state_id = stateAbbr[state];

    const response = await fetch(`/api/sightings/${state_id}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    });

    const data = await response.json();

    const modal = document.getElementById('sightings-modal');
    const city = document.getElementById('city');
    const time = document.getElementById('time');
    const summary = document.getElementById('summary');
    const shape = document.getElementById('shape');

    city.textContent = data[0].city;
    time.textContent = data[0].date_time;
    summary.textContent = data[0].summary;
    shape.textContent = data[0].shape;
    
    setTimeout(() => modal.classList.add('is-active'), 500);
}

export { stateSightingsHandler }