// document.addEventListener('DOMContentLoaded', function() {
//     const form = document.querySelector('.infoForm');

//     form.addEventListener('submit', function(event) {
//         event.preventDefault();
//         const email = form.elements['username'].value.trim();
//         const password = form.elements['password'].value.trim();
        
//         let users = JSON.parse(localStorage.getItem('users')) || [];
//         let user = users.find(u => u.email === email);

//         if (!user) {
//             displayError(form.elements['username'], "Email address not found.");
//             return;
//         }

//         if (password !== user.password) {
//             displayError(form.elements['password'], "Incorrect password.");
//             return;
//         }

//         localStorage.setItem('loggedInUser', JSON.stringify(user));

//         window.location.href = `../Admin%20Panel/admin-home.html`;
//     });

//     function displayError(input, message) {
//         const errorElement = input.nextElementSibling;
//         errorElement.textContent = message;
//         errorElement.style.display = 'block';
//     }

//     const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

//     if (loggedInUser) {
//         window.location.href = `../Admin%20Panel/admin-home.html`;
//     }
// });

document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('.infoForm');

    form.addEventListener('submit', async function(event) {
        event.preventDefault();
        const email = form.elements['username'].value.trim();
        const password = form.elements['password'].value.trim();

        let errors = [];

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

        if (errors.length === 0) {
            try {
                const response = await fetch('http://localhost:3000/auth/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        email: email,
                        password: password
                    })
                });

                if (!response.ok) {
                    throw new Error('Login failed. Please check your email and password.');
                }

                const userData = await response.json();

                if (userData.isAdmin) {
                    window.location.href = `../Admin%20Panel/admin-home.html`;
                } else {
                    window.location.href = `../index.html`;
                }
            } catch (error) {
                console.error('Login failed:', error.message);
                displayError(form.querySelector('button[type="submit"]'), error.message);
            }
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