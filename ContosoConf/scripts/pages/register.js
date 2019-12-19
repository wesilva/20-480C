const form = document.getElementById('registration-form');
const submitButton = form.querySelector('button');

const checkPasswords = function () {

};


const addPasswordInputEventListeners = function () {

};

const formSubmissionAttempted = function () {
    form.classList.add('submission-attempted');
}

const addSubmitClickEventListener = function () {
    submitButton.addEventListener('click', formSubmissionAttempted, false);
};

addPasswordInputEventListeners();
addSubmitClickEventListener();