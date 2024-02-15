document.addEventListener('DOMContentLoaded', function() {
    const users = JSON.parse(localStorage.getItem('users')) || [];

    users.forEach(user => {
        addUserToTable(user.firstName, user.lastName, user.email);
    });
});

function addUserToTable(firstName, lastName, email) {
    const userTable = document.getElementById('user-table-extended').getElementsByTagName('tbody')[0];
    const newRow = userTable.insertRow();
    newRow.innerHTML = `<td><i class="fa-regular fa-user"></i>${firstName}</td>
                        <td>${lastName}</td>
                        <td>${email}</td>
                        <td><button class="delete-btn">Delete</button></td>`;

    const deleteButton = newRow.querySelector('.delete-btn');
    deleteButton.addEventListener('click', function() {
        userTable.removeChild(newRow);

        const users = JSON.parse(localStorage.getItem('users')) || [];
        const updatedUsers = users.filter(user => user.email !== email);
        localStorage.setItem('users', JSON.stringify(updatedUsers));
    });
}
