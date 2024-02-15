document.addEventListener('DOMContentLoaded', function() {
    const table = document.getElementById('user-table').getElementsByTagName('tbody')[0];
    const totalUsersElement = document.querySelector('.card-numbers p');

    let users = JSON.parse(localStorage.getItem('users')) || [];

    updateTotalUsersCount();

    const startIdx = Math.max(users.length - 5, 0);
    const endIdx = users.length;
    for (let i = startIdx; i < endIdx; i++) {
        const { firstName, lastName, email } = users[i];
        addUserToTable(firstName, lastName, email);
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
});