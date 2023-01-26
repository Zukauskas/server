const formDOM = document.querySelector('form');
const usernameDOM = document.getElementById('username');
const emailDOM = document.getElementById('email');
const passDOM = document.getElementById('pass');
const repassDOM = document.getElementById('repass');
const tosDOM = document.getElementById('tos');
const submitDOM = document.querySelector('form button');

const errorsDOM = document.createElement('div');
formDOM.appendChild(errorsDOM);

const is = {
    string: (str) => typeof str === 'string' && str.trim() !== '',
    minSize: (str, size) => str.length >= size,
    maxSize: (str, size) => str.length <= size,
    username: (str) =>
        is.string(str) && is.minSize(str, 4) && is.maxSize(str, 20),
    email: (str) =>
        is.string(str) &&
        is.minSize(str, 6) &&
        is.maxSize(str, 50) &&
        str.includes('@') &&
        str.includes('.'),
    pass: (str) =>
        is.string(str) && is.minSize(str, 10) && is.maxSize(str, 100),
    tos: () => true,
};

if (submitDOM) {
    function submitForm(e) {
        e.preventDefault();

        const usernameNotValid = document.createElement('div');
        const emailNotValid = document.createElement('div');
        const passNotValid = document.createElement('div');
        const repassNotValid = document.createElement('div');
        const tosNotChecked = document.createElement('div');
        const samePassNotValid = document.createElement('div');

        errorsDOM.innerHTML = '';

        const usernameValid = is.username(usernameDOM.value);
        const emailValid = is.email(emailDOM.value);
        const passValid = is.pass(passDOM.value);
        const repassValid = is.pass(repassDOM.value);

        if (!usernameValid) {
            usernameNotValid.classList.add('error');
            usernameNotValid.innerText = 'Username is invalid';
            errorsDOM.appendChild(usernameNotValid);
        }

        if (!emailValid) {
            emailNotValid.classList.add('error');
            emailNotValid.innerText = 'Email is invalid';
            errorsDOM.appendChild(emailNotValid);
        }

        if (!passValid) {
            passNotValid.classList.add('error');
            passNotValid.innerText = 'Password is invalid';
            errorsDOM.appendChild(passNotValid);
        }

        if (!repassValid) {
            repassNotValid.classList.add('error');
            repassNotValid.innerText = 'Repeated password is invalid';
            errorsDOM.appendChild(repassNotValid);
        }

        if (!tosDOM.checked) {
            tosNotChecked.classList.add('error');
            tosNotChecked.innerText = 'TOS not checked';
            errorsDOM.appendChild(tosNotChecked);
        }

        const samePass = passDOM.value === repassDOM.value;

        if (!samePass) {
            samePassNotValid.classList.add('error');
            samePassNotValid.innerText = 'Passwords are not the same';
            errorsDOM.appendChild(samePassNotValid);
        }

        if (
            usernameValid &&
            emailValid &&
            passValid &&
            samePass &&
            tosDOM.checked
        ) {
            console.log('Everything is A-OK!');
        }
    }

    submitDOM.addEventListener('click', submitForm);
}
