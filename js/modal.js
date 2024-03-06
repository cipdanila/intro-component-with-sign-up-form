"use strict";

// Function to display the modal
function showModal() {
    const firstName = document.querySelector('#firstName').value;
    const lastName = document.querySelector('#lastName').value;
    const message = `Success! Your trial has been claimed, ${firstName} ${lastName}.`;

    const modalMessage = document.querySelector('.modal-message');
    modalMessage.textContent = message;

    const modal = document.querySelector('.modal');
    modal.style.display = 'block';
}

// Function to close the modal
function closeModal() {
    const modal = document.querySelector('.modal');
    modal.style.display = 'none';
}
