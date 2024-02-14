document.addEventListener('DOMContentLoaded', function() {
    const table = document.getElementById('user-table').getElementsByTagName('tbody')[0];
    const totalUsersElement = document.querySelector('.card-numbers p');

    updateTotalUsersCount();

    const firstName = localStorage.getItem('firstName');
    const lastName = localStorage.getItem('lastName');
    const email = localStorage.getItem('email');

    if (firstName && lastName && email) {
        addUserToTable(firstName, lastName, email);
    } else {
        const tableRow = table.parentElement.parentElement;
        tableRow.style.display = 'none';
    }

    function addUserToTable(firstName, lastName, email) {
        const newRow = table.insertRow();
        newRow.innerHTML = `<td><i class="fa-regular fa-user"></i>${firstName}</td>
                            <td>${lastName}</td>
                            <td>${email}</td>`;
    }

    function updateTotalUsersCount() {
        const totalUsers = localStorage.length / 4;
        
        totalUsersElement.textContent = totalUsers;
    }
});
