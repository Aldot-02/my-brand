document.addEventListener('DOMContentLoaded', function() {
    const userTable = document.getElementById('user-table-extended').getElementsByTagName('tbody')[0];

    async function fetchUsers() {
        try {
            const response = await fetch('http://localhost:3000/user');
            const users = await response.json();
            users.forEach(user => {
                addUserToTable(user._id, user.firstname, user.lastname, user.email);
            });
        } catch (error) {
            console.error('Failed to fetch users:', error.message);
        }
    }

    fetchUsers();

    function addUserToTable(userId, firstname, lastname, email) {
        const newRow = userTable.insertRow();
        newRow.innerHTML = `<td><i class="fa-regular fa-user"></i>${firstname}</td>
                            <td>${lastname}</td>
                            <td>${email}</td>
                            <td><button class="delete-btn" data-user-id="${userId}">Delete</button></td>`;
    
        const deleteButton = newRow.querySelector('.delete-btn');
        deleteButton.addEventListener('click', async () => {
            try {
                const response = await fetch(`http://localhost:3000/user/${userId}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch user details');
                }
                const userDetails = await response.json();
                if (userDetails.isAdmin) {
                    alert("Only this Admin can delete his/her Account");
                    return;
                }
                const confirmation = confirm('Are you sure you want to delete this user?');
                if (confirmation) {
                    await fetch(`http://localhost:3000/user/${userId}`, {
                        method: 'DELETE'
                    });
                    newRow.remove();
                    alert('User deleted successfully');
                }
            } catch (error) {
                console.error('Error deleting user:', error.message);
            }
        });
    }
});