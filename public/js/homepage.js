import { stateAbbr } from "./helpers/state-abbr.js";

const modalEl = document.querySelector('#sightings-modal');
const cityEl = document.querySelector('#city');
const timeEl = document.querySelector('#time');
const summaryEl = document.querySelector('#summary');
const shapeEl = document.querySelector('#shape');
const nextEl = document.querySelector('#next-sighting');
const previousEl = document.querySelector('#previous-sighting');
const submitButtonEl = document.querySelector('#comment-submit');
const loginButtonEl = document.querySelector('#login-button');
let index;
let data;

const stateSightingsHandler = async (event) => {
    event.preventDefault();
    const state = event.target.children[0].textContent;
    const state_id = stateAbbr[state];

    const response = await fetch(`/api/sightings/${state_id}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    });

    data = await response.json();
    index = 0;

    setTimeout(() => modalEl.classList.add('is-active'), 500);

    displaySightingsModal(data);
}

const displaySightingsModal = (d) => {
    cityEl.textContent = d[index].city;
    timeEl.textContent = d[index].date_time;
    summaryEl.textContent = d[index].summary;
    shapeEl.textContent = d[index].shape;
}

const nextSighting = (d) => {
    if (index < d.length) {
        index++;
    } else {
        index = 0;
    }

    displaySightingsModal (d);
}

const previousSighting = (d) => {
    if (index > 0) {
        index--;
    } else {
        index = d.length-1;
    }

    displaySightingsModal (d);
}

previousEl.addEventListener('click', (event) => previousSighting(data, index));
nextEl.addEventListener('click', (event) => nextSighting(data, index));

export { stateSightingsHandler }