import { stateAbbr } from "./helpers/state-abbr.js";

const modalEl = document.querySelector('#sightings-modal');
const cityEl = document.querySelector('#city');
const timeEl = document.querySelector('#time');
const summaryEl = document.querySelector('#summary');
const shapeEl = document.querySelector('#shape');
const nextEl = document.querySelector('#next-sighting');
const previousEl = document.querySelector('#previous-sighting');
let index = 0;
let sightingData = [];

const stateSightingsHandler = async (event) => {
    event.preventDefault();
    const state = event.target.children[0].textContent;
    const stateId = stateAbbr[state];

    const response = await fetch(`/api/sightings/${stateId}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    });

    sightingData = await response.json();
    index = 0;

    setTimeout(() => modalEl.classList.add('is-active'), 500);

    displaySightingsModal(sightingData);
    getSightingCommentsHandler(sightingData[index].id);
}

const displaySightingsModal = (d) => {
    if (d[index].city) {
        cityEl.textContent = d[index].city;
    } else {
        cityEl.textContent = 'Unknown';
    }

    if (d[index].date_time) {
        timeEl.textContent = d[index].date_time;
    } else {
        timeEl.textContent = 'Unknown';
    }

    if (d[index].summary) {
        summaryEl.textContent = d[index].summary;
    } else {
        summaryEl.textContent = 'Unknown';
    }

    if (d[index].shape) {
        shapeEl.textContent = d[index].shape;
    } else {
        shapeEl.textContent = 'Unknown';
    }
}

const nextSighting = (d) => {
    if (index < d.length-1) {
        index++;
    } else {
        index = 0;
    }

    displaySightingsModal (d);
    getSightingCommentsHandler(d[index].id);
}

const previousSighting = (d) => {
    if (index > 0) {
        index--;
    } else {
        index = d.length-1;
    }

    displaySightingsModal (d);
    getSightingCommentsHandler(d[index].id);
}

const removeAllChildNodes = (parent) => {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

const getSightingCommentsHandler = async (sightingId) => {
    const response = await fetch(`/api/comments/${sightingId}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    });

    const commentData = await response.json();

    displaySightingComments(commentData);
}

const displaySightingComments = (d) => {
    console.log(d)
    const commentListEl = document.querySelector('#comment-list');
    const commentContainerEl = document.querySelector('#comment-container');

    if (d.length === 0) {
        commentContainerEl.setAttribute('style', 'display: none');
        return;
    }

    commentContainerEl.setAttribute('style', 'display: block');
    removeAllChildNodes(commentListEl);

    d.forEach(comment => {
        const commentEl = document.createElement('li');
        const userIdEl = document.createElement('div');
        const bodyEl = document.createElement('div');

        userIdEl.textContent = `User ${comment.user_id}`;
        bodyEl.textContent = comment.body;

        commentEl.append(userIdEl);
        commentEl.append(bodyEl);
        commentListEl.append(commentEl);
    })
}

const commentFormHandler = async function(event){
    event.preventDefault();

    const body = document.querySelector('textarea[name="comment-body"]').value;

    if (body && sightingData[index].id) {
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

        getSightingCommentsHandler(sightingData[index].id);
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