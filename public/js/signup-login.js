const loginFormHandler = async (event) => {
    event.preventDefault();

    const email = document.querySelector('#userEmail').value.trim();
    const password = document.querySelector('#userPass').value.trim();
    const loginMessage = document.querySelector('.login-message');

    if (email && password) {
        const response = await fetch('/api/user/login', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            loginMessage.classList.add('has-text-success');
            loginMessage.textContent = 'Success!';
            document.location.replace('/');
        } else {
            loginMessage.classList.add('has-text-danger');
            loginMessage.textContent = 'Invalid login';
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
    .querySelector('#login-button')
    .addEventListener('click', loginFormHandler);

document
    .querySelector('#sign-up')
    .addEventListener('click', signupFormHandler);
  
document
    .querySelector('#login')
    .setAttribute('style', 'display: none');