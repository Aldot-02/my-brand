document.addEventListener('DOMContentLoaded', function() {
    const logoutButton = document.querySelector('.logout');

    logoutButton.addEventListener('click', function() {
        localStorage.removeItem('loggedInUser');
        window.location.href = '../Authentication/Login.html';
    });

    const table = document.getElementById('user-table').getElementsByTagName('tbody')[0];
    const totalUsersElement = document.querySelector('.card-numbers p');
    const totalBlogsElement = document.querySelector('.blogs-nbr');

    let users = JSON.parse(localStorage.getItem('users')) || [];
    let blogs = JSON.parse(localStorage.getItem('blogs')) || [];
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

    if (!loggedInUser) {
        window.location.href = '../Authentication/Login.html';
    } else {
        updateTotalUsersCount();
        updateTotalBlogsCount();

        const startIdx = Math.max(users.length - 5, 0);
        const endIdx = users.length;
        for (let i = startIdx; i < endIdx; i++) {
            const { firstName, lastName, email } = users[i];
            addUserToTable(firstName, lastName, email);
        }

        window.history.pushState(null, document.title, window.location.href);
        window.addEventListener('popstate', function(event) {
            window.history.pushState(null, document.title, window.location.href);
        });
    }

    function addUserToTable(firstName, lastName, email) {
        const newRow = table.insertRow();
        newRow.innerHTML = `<td><i class="fa-regular fa-user"></i>${firstName}</td>
                            <td>${lastName}</td>
                            <td>${email}</td>`;
    }

    function updateTotalUsersCount() {
        totalUsersElement.textContent = users.length;
    }
    function updateTotalBlogsCount() {
        totalBlogsElement.textContent = blogs.length;
    }
});
