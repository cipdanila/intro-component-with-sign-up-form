'use strict';

// Event listener for close button
const closeButton = document.querySelector('.close');
closeButton.addEventListener('click', () => {
    closeModal();
});

// Function to show the modal
function showModal() {
    const firstName = document.querySelector('#firstName').value;
    const lastName = document.querySelector('#lastName').value;
    const message = `Congrats! Your trial has been claimed, <strong>${firstName}</strong> <strong>${lastName}</strong>.`;

    const modalMessage = document.querySelector('.modal-message');
    modalMessage.innerHTML = message;

    const modal = document.querySelector('.modal');
    modal.style.display = 'block';
}

// Function to close the modal
function closeModal() {
    const modal = document.querySelector('.modal');
    modal.style.display = 'none';
}
