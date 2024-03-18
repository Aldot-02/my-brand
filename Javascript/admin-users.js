document.addEventListener('DOMContentLoaded', function() {
    const userTable = document.getElementById('user-table-extended').getElementsByTagName('tbody')[0];

    const checkAuthentication = async () => {
        let response;
        try {
            response = await fetch('https://my-brand-backend-aldo-1.onrender.com/auth/authenticated', {
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: "include",
            });
            if (!response.ok) {
                throw new Error('Response is not OK');
            }
        } catch (error) {
            console.error('Error:', error);
            window.location.href = '../Authentication/Login.html';
            return false;
        }
        
        try {
            const userData = await response.json();
            console.log(userData);
            const adminName = document.querySelector('.admin-details-top .admin-name');
            if (adminName) {
                adminName.textContent = `${userData.firstname} ${userData.lastname}`;
            } else {
                console.error('Admin name element not found');
            }
            
            return userData;
        } catch (error) {
            console.error('Error parsing JSON:', error);
            return false;
        }
    };

    checkAuthentication().then(user => {
        if (user) {
            fetchUsers(user._id, user.isAdmin);
            const logoutBtn = document.querySelector('.logout');
            logoutBtn.addEventListener('click', logout);
        }
    });

    async function fetchUsers(authenticatedUserId, isAdmin) {
        try {
            const response = await fetch('https://my-brand-backend-aldo-1.onrender.com/user', {
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: "include",
            });
            const users = await response.json();
            users.forEach(user => {
                if (user._id !== authenticatedUserId) {
                    addUserToTable(user._id, user.firstname, user.lastname, user.email, authenticatedUserId, isAdmin);
                }
            });
        } catch (error) {
            console.error('Failed to fetch users:', error.message);
        }
    }

    function addUserToTable(userId, firstname, lastname, email, authenticatedUserId, isAdmin) {
        const newRow = userTable.insertRow();
        newRow.innerHTML = `<td><i class="fa-regular fa-user"></i>${firstname}</td>
                            <td>${lastname}</td>
                            <td>${email}</td>
                            <td><button class="delete-btn" data-user-id="${userId}">Delete</button></td>`;
    
        const deleteButton = newRow.querySelector('.delete-btn');
        deleteButton.addEventListener('click', async () => {
            try {
                const confirmation = confirm('Are you sure you want to delete this user?');
                if (confirmation) {
                    await deleteUser(userId, authenticatedUserId, isAdmin);
                    newRow.remove();
                    togglePopup();
                }
            } catch (error) {
                console.error('Error deleting user:', error.message);
            }
        });
        
        window.togglePopup = function() {
            var blur = document.getElementById('blur');
            blur.classList.toggle('blur-popup');
            var popup = document.getElementById('popup');
            popup.classList.toggle('blur-popup');
        }
        
    }

    async function deleteUser(userId, currentUserId, currentUserAdminStatus) {
        try {
            const response = await fetch(`https://my-brand-backend-aldo-1.onrender.com/user/${userId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: "include",
                body: JSON.stringify({
                    currentUserId,
                    currentUserAdminStatus
                })
            });

            if (!response.ok) {
                throw new Error('Failed to delete user');
            }
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async function logout() {
        const response = await fetch('https://my-brand-backend-aldo-1.onrender.com/auth/logout', {
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: "include",
            method: "POST"
        });
        if(!response.ok){
            console.log("Failed to logout");
        } else {
            window.location.href = '../Authentication/login.html';
            console.log("Logout was successful")
        }
    };
});

function toggle(){
    var blur = document.getElementById('blur');
    blur.classList.toggle('blur-popup')
    var popup = document.getElementById('popup');
    popup.classList.toggle('blur-popup')
}