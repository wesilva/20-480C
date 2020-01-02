const form = document.getElementById('registration-form');
const submitButton = form.querySelector('button');

const passwordInput = document.getElementById('password');
const confirmPasswordInput = document.getElementById('confirm-password');


const checkPasswords = function () {
    if (passwordInput.value === confirmPasswordInput.value) {
        confirmPasswordInput.setCustomValidity('');
    } else {
        confirmPasswordInput.setCustomValidity(`Your passwords don't match. Please type the same password again.`);
    }
};


const addPasswordInputEventListeners = function () {
    passwordInput.addEventListener('input', checkPasswords, false);
    confirmPasswordInput.addEventListener('input', checkPasswords, false);
};

const formSubmissionAttempted = function () {
    form.classList.add('submission-attempted');
}

const addSubmitClickEventListener = function () {
    submitButton.addEventListener('click', formSubmissionAttempted, false);
};

addPasswordInputEventListeners();
addSubmitClickEventListener();