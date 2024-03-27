'use strict';

// Select the form and input elements
const form = document.querySelector("form");
const inputs = document.querySelectorAll("input");

// Function for form data validation
function formValidation(inputs) {
    let allFieldsValid = true;

    inputs.forEach((input) => {
        const errorMessage = input.parentElement.querySelector('.error-text');
        const fieldName = input.getAttribute('placeholder');

        // Check if the input has a value
        if (!input.value) {
            errorMessage.textContent = `${fieldName} cannot be empty`;
            input.parentElement.classList.add('error');
            input.parentElement.classList.remove('success'); // elimină clasa 'success'
            allFieldsValid = false;
        } else {
            input.parentElement.classList.remove('error');
            input.parentElement.classList.add('success'); // adaugă clasa 'success'
            // Check if the field is an email
            if (input.type === 'email') {
                if (!validateEmail(input.value)) {
                    errorMessage.textContent = `Looks like this is not a valid ${fieldName}`;
                    input.parentElement.classList.add('error');
                    input.parentElement.classList.remove('success'); // elimină clasa 'success'
                    allFieldsValid = false;
                } else {
                    input.parentElement.classList.remove('error');
                    input.parentElement.classList.add('success'); // adaugă clasa 'success'
                }
            }
            // Check if the first name and last name are valid
            if (input.type === 'text') {
                if (!validateName(input.value)) {
                    errorMessage.textContent = `${fieldName} must have at least 3 characters`;
                    input.parentElement.classList.add('error');
                    input.parentElement.classList.remove('success'); // elimină clasa 'success'
                    allFieldsValid = false;
                } else {
                    input.parentElement.classList.remove('error');
                    input.parentElement.classList.add('success'); // adaugă clasa 'success'
                }
            }
            // Check if the password is valid
            if (input.type === 'password') {
                if (!validatePassword(input.value)) {
                    errorMessage.textContent = `Please enter a valid ${fieldName} (at least 8 characters including a mix of upper and lower case letters, numbers, and symbols)`;
                    input.parentElement.classList.add('error');
                    input.parentElement.classList.remove('success'); // elimină clasa 'success'
                    allFieldsValid = false;
                } else {
                    input.parentElement.classList.remove('error');
                    input.parentElement.classList.add('success'); // adaugă clasa 'success'
                }
            }
        }
    });

    return allFieldsValid;
}

// Function to validate first name and last name
function validateName(name) {
    return name.length >= 3;
}

// Function to validate email address
function validateEmail(email) {
    const regExp = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    return regExp.test(email.toLowerCase());
}

// Function to validate password
function validatePassword(password) {
    const regExp =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])[A-Za-z\d\W_]{8,}$/;
    return regExp.test(password);
}

// Event for submitting form data to the server
form.addEventListener('submit', (event) => {
    event.preventDefault();
    const isValid = formValidation(inputs);

    if (isValid) {
        sendDataToServer();
    }
});

// Function to send form data to the server
function sendDataToServer() {
    const formData = {
        firstName: document.getElementById("firstName").value,
        lastName: document.getElementById("lastName").value,
        emailAddress: document.getElementById("email").value,
        password: document.getElementById("password").value
    };

    fetch("/submit", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.text();
    })
    .then(data => {
        console.log('Server response:', data);
        showModal();
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
    });
}
