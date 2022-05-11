const loginFormHandler = async (event) => {
    event.preventDefault();

    const email = document.querySelector('#userEmail').value.trim();
    const password = document.querySelector('#userPass').value.trim();

    if (email && password) {
        const response = await fetch('/api/user/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
        document.location.replace('/');
        } else {
        alert('Failed to log in.');
        }
    }
};
  
const signupFormHandler = async (event) => {
    event.preventDefault();

    const email = document.querySelector('#userEmail').value.trim();
    const password = document.querySelector('#userPass').value.trim();

    if (email && password) {
        const response = await fetch('/api/user', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
        document.location.replace('/');
        } else {
        alert('Failed to sign up.');
        }
    }
};
  
document
    .querySelector('#login')
    .addEventListener('click', loginFormHandler);

document
    .querySelector('#sign-up')
    .addEventListener('click', signupFormHandler);
  
document
    .querySelector('#login-button')
    .setAttribute('style', 'display: none');