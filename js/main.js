"use strict";

// Event listener for form submission
form.addEventListener('submit', (event) => {
    event.preventDefault();
    formValidation();
    if (allFieldsValid) {
        showModal();
    }
});

// Event listener for close button
const closeButton = document.querySelector('.close');
closeButton.addEventListener('click', () => {
    closeModal();
});
