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
    document.querySelector('textarea[name="comment-body"]').value = '';

    if (sightingData.length===0) {
        hideCommentTextArea();
        displaySightingsModal([{
            city: 'No sightings found',
            date_time: '',
            summary: '',
            shape: '',
        }]);
        return;
    }

    displaySightingsModal(sightingData);
    getSightingCommentsHandler(sightingData[index].id);
    displayCommentTextArea();
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
        const boxEl = document.createElement('box');
        const contentEl = document.createElement('content')
        const userIdEl = document.createElement('h4');
        const bodyEl = document.createElement('p');

        boxEl.classList.add('box');
        contentEl.classList.add('content');

        userIdEl.textContent = `${comment.user.email}`;
        bodyEl.textContent = comment.body;

        contentEl.append(bodyEl);
        contentEl.append(userIdEl);
        boxEl.append(contentEl);
        commentEl.append(boxEl)
        commentListEl.append(commentEl);
    })
}

const displayCommentTextArea = () => {
    document.querySelector('#comment-textarea').setAttribute('style', 'display: block');
    const body = document.querySelector('textarea[name="comment-body"]');
    const commentSubmitBtn = document.querySelector('#comment-submit');
    
    body.addEventListener('input', () => {
        if (body.value) {
            commentSubmitBtn.disabled = false;
        } else {
            commentSubmitBtn.disabled = true;
        }
    });
}

const hideCommentTextArea = () => {
    document.querySelector('#comment-textarea').setAttribute('style', 'display: none');
}

const commentFormHandler = async function(event){
    event.preventDefault();

    const body = document.querySelector('textarea[name="comment-body"]');

    const response = await fetch('/api/comments', {
        method: 'POST',
        body: JSON.stringify({
            body: body.value,
            sightingId: sightingData[index].id,
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (response.redirected === true) {
        return window.location.href = response.url;
    }

    getSightingCommentsHandler(sightingData[index].id);
    body.value = '';
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