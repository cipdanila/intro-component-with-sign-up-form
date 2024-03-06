"use strict";

// Select the form and inputs
const form = document.querySelector("form");
const inputs = document.querySelectorAll("input");

let allFieldsValid = true;

// Function to validate form fields
function formValidation() {
    allFieldsValid = true;  // Resetting the variable on each function call

    inputs.forEach((input) => {
        const errorMessage = input.parentElement.querySelector('.error-text');
        let fieldName = input.getAttribute('placeholder');

        // Check if the input has a value
        if (!input.value) {
            errorMessage.textContent = `${fieldName} cannot be empty`;
            input.parentElement.classList.add('error');
            allFieldsValid = false;
        } else {
            input.parentElement.classList.remove('error');
            // Check if the field is an email
            if (input.type === 'email') {
                if (!validateEmail(input.value)) {
                    errorMessage.textContent = `Looks like this is not an ${fieldName}`;
                    input.parentElement.classList.add('error');
                    allFieldsValid = false;
                } else {
                    input.parentElement.classList.remove('error');
                }
            }
            // Check if the first name and last name are valid
            if (input.type === 'text') {
                if (!validateName(input.value)) {
                    errorMessage.textContent = `${fieldName} must have at least 3 letters`;
                    input.parentElement.classList.add('error');
                    allFieldsValid = false;
                } else {
                    input.parentElement.classList.remove('error');
                }
            }
            // Check if the password is valid
            if (input.type === 'password') {
                if (!validatePassword(input.value)) {
                    errorMessage.textContent = `Please enter a valid ${fieldName} (at least 8 characters with uppercase, lowercase, numbers, and symbols)`;
                    input.parentElement.classList.add('error');
                    allFieldsValid = false;
                } else {
                    input.parentElement.classList.remove('error');
                }
            }
        }
    });
}

// Function to validate first name and last name
function validateName(name) {
    return name.length >= 3;
}


// Function to validate email
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
