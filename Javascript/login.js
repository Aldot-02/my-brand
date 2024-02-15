document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('.infoForm');

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        const email = form.elements['username'].value.trim();
        const password = form.elements['password'].value.trim();
        
        let users = JSON.parse(localStorage.getItem('users')) || [];
        let user = users.find(u => u.email === email);

        if (!user) {
            displayError(form.elements['username'], "Email address not found.");
            return;
        }

        if (password !== user.password) {
            displayError(form.elements['password'], "Incorrect password.");
            return;
        }

        window.location.href = `../Admin%20Panel/admin-home.html?firstName=${encodeURIComponent(user.firstName)}&lastName=${encodeURIComponent(user.lastName)}&email=${encodeURIComponent(user.email)}`;
    });

    function displayError(input, message) {
        const errorElement = input.nextElementSibling;
        errorElement.textContent = message;
        errorElement.style.display = 'block';
    }
});