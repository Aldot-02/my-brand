document.addEventListener('DOMContentLoaded', function() {
    // Retrieve user data from localStorage
    const firstName = localStorage.getItem('firstName');
    const lastName = localStorage.getItem('lastName');
    const email = localStorage.getItem('email');
    const password = localStorage.getItem('password');

    if (firstName && lastName && email) {
        // Populate the table with user data
        addUserToTable(firstName, lastName, email);
    }
});

function addUserToTable(firstName, lastName, email) {
    const userTable = document.getElementById('user-table-extended').getElementsByTagName('tbody')[0];
    const newRow = userTable.insertRow();
    newRow.innerHTML = `<td><i class="fa-regular fa-user"></i>${firstName}</td>
                        <td>${lastName}</td>
                        <td>${email}</td>
                        <td><button class="delete-btn">Delete</button></td>`;

    // Add event listener for the delete button
    const deleteButton = newRow.querySelector('.delete-btn');
    deleteButton.addEventListener('click', function() {
        // Remove the row from the table
        userTable.removeChild(newRow);
        
        // Remove user data from localStorage
        localStorage.removeItem('firstName');
        localStorage.removeItem('lastName');
        localStorage.removeItem('email');
        localStorage.removeItem('passord');
    });
}
