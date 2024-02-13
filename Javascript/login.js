document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('.infoForm');

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        const email = form.elements['username'].value.trim();
        const password = form.elements['password'].value.trim();

        let storedEmail = localStorage.getItem('email');
        let storedPassword = localStorage.getItem('password');
        let errors = [];

        if (!email) {
            displayError(form.elements['username'], "Email address is required.");
            errors.push("Email address is required.");
        } else if (email !== storedEmail) {
            displayError(form.elements['username'], "Incorrect email.");
            errors.push("Incorrect email.");
        } else {
            clearError(form.elements['username']);
        }

        if (!password) {
            displayError(form.elements['password'], "Password is required.");
            errors.push("Password is required.");
        } else if (password !== storedPassword) {
            displayError(form.elements['password'], "Incorrect Password.");
            errors.push("Incorrect Password.");
        } else {
            clearError(form.elements['password']);
        }

        if (errors.length > 0) {
            return false;
        } else {
            window.location.href = "../Admin Panel/admin-home.html";
        }
    });

    // form.reset();
    // return false;

    function displayError(input, message) {
        const errorElement = input.nextElementSibling;
        errorElement.textContent = message;
        errorElement.style.display = 'block';
    }

    function clearError(input) {
        const errorElement = input.nextElementSibling;
        errorElement.textContent = '';
        errorElement.style.display = 'none';
    }
});