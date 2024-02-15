document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('.infoForm');

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        const firstName = form.elements['firstname'].value.trim();
        const lastName = form.elements['lastname'].value.trim();
        const email = form.elements['username'].value.trim();
        const password = form.elements['password'].value;
        const confirmPassword = form.elements['confirmpass'].value;

        let errors = [];

        if (!firstName) {
            displayError(form.elements['firstname'], "First name is required.");
            errors.push("First name is required.");
        } else {
            clearError(form.elements['firstname']);
        }

        if (!lastName) {
            displayError(form.elements['lastname'], "Last name is required.");
            errors.push("Last name is required.");
        } else {
            clearError(form.elements['lastname']);
        }

        if (!email) {
            displayError(form.elements['username'], "Email address is required.");
            errors.push("Email address is required.");
        } else {
            clearError(form.elements['username']);
            const emailRegex = /^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,3})(\.[a-z]{2,3})?$/;
            if (!emailRegex.test(email)) {
                displayError(form.elements['username'], "Please enter a valid email address.");
                errors.push("Please enter a valid email address.");
            }
        }

        if (!password) {
            displayError(form.elements['password'], "Password is required.");
            errors.push("Password is required.");
        } else {
            clearError(form.elements['password']);
            if (password.length < 6) {
                displayError(form.elements['password'], "Password must be at least 6 characters long.");
                errors.push("Password must be at least 6 characters long.");
            }
        }

        if (!confirmPassword) {
            displayError(form.elements['confirmpass'], "Confirm password is required.");
            errors.push("Confirm password is required.");
        } else {
            clearError(form.elements['confirmpass']);
            if (password && confirmPassword && password !== confirmPassword) {
                displayError(form.elements['confirmpass'], "Passwords do not match.");
                errors.push("Passwords do not match.");
            }
        }

        if (errors.length > 0) {
            errors[0].focus();
        } else {
            let users = JSON.parse(localStorage.getItem('users')) || [];
            
            const existingUser = users.find(user => user.email === email);
            if (existingUser) {
                displayError(form.elements['username'], "The account with this email alredy exist");
                return;
            }

            const newUser = {
                firstName,
                lastName,
                email,
                password
            };
            users.push(newUser);

            localStorage.setItem('users', JSON.stringify(users));
            
            window.location.href = `Login.html?email=${encodeURIComponent(email)}`;
        }
    });

    function displayError(input, message) {
        const errorElement = input.parentNode.querySelector('.error-txt');
        errorElement.textContent = message;
        errorElement.style.display = 'block';
        input.style.borderBottomColor = 'red';
    }

    function clearError(input) {
        const errorElement = input.parentNode.querySelector('.error-txt');
        errorElement.textContent = '';
        errorElement.style.display = 'none';
        input.style.borderBottomColor = '#F45815';
    }
});