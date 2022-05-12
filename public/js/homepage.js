import { stateAbbr } from "./helpers/state-abbr.js";

const modalEl = document.querySelector('#sightings-modal');
const cityEl = document.querySelector('#city');
const timeEl = document.querySelector('#time');
const summaryEl = document.querySelector('#summary');
const shapeEl = document.querySelector('#shape');
const nextEl = document.querySelector('#next-sighting');
const previousEl = document.querySelector('#previous-sighting');
let index = 0;
let sightingData;

const stateSightingsHandler = async (event) => {
    event.preventDefault();
    const state = event.target.children[0].textContent;
    const state_id = stateAbbr[state];

    const response = await fetch(`/api/sightings/${state_id}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    });

    sightingData = await response.json();
    index = 0;

    setTimeout(() => modalEl.classList.add('is-active'), 500);

    displaySightingsModal(sightingData);
    displaySightingComments(sightingData.id);
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

const displaySightingComments = () => {

}

const commentFormHandler = async function(event){
    event.preventDefault();

    const body = document.querySelector('textarea[name="comment-body"]').value;

    if (body && sightingData[index].id) {
        console.log(body)
        await fetch('/api/comments', {
            method: 'POST',
            body: JSON.stringify({
                body,
                sightingId: sightingData[index].id,
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
    
        displaySightingComments();
    } else {
        console.error('Unable to post comment')
    }
};

document.body.addEventListener('click', (event) => {
    if (event.target === document.querySelector('#comment-submit')) {
        commentFormHandler(event);
    }
});

previousEl.addEventListener('click', (event) => previousSighting(sightingData, index));
nextEl.addEventListener('click', (event) => nextSighting(sightingData, index));

export { commentFormHandler }
export { stateSightingsHandler }