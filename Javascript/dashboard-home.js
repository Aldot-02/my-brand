document.addEventListener('DOMContentLoaded', function() {
    const table = document.getElementById('user-table').getElementsByTagName('tbody')[0];
    const totalUsersElement = document.querySelector('.card-numbers p');
    const totalBlogsUsers = document.querySelector('.card-numbers .blogs-nbr');
    
    
    async function fetchUserInfo() {
        try {
            const response = await fetch('http://localhost:3000/auth/profile', {
                method: 'GET',
                credentials: 'include'
            });

            if (!response.ok) {
                throw new Error('Failed to fetch user information');
            }

            const userInfo = await response.json();
            console.log(userInfo);
        } catch (error) {
            console.error('Failed to fetch user information:', error.message);
        }
    }
    fetchUserInfo()

    async function fetchUsers() {
        try {
            const response = await fetch('http://localhost:3000/user');
            const users = await response.json();

            updateTotalUsersCount(users.length);

            const startIdx = Math.max(users.length - 4, 0);
            const endIdx = users.length;
            for (let i = startIdx; i < endIdx; i++) {
                const { firstname, lastname, email } = users[i];
                addUserToTable(firstname, lastname, email);
            }
        } catch (error) {
            console.error('Failed to fetch users:', error.message);
        }
    }

    fetchUsers();

    async function fetchBlogs() {
        try {
            const response = await fetch('http://localhost:3000/blog/all');
            const blogs = await response.json();

            updateTotalBlogsCount(blogs.length);
        } catch (error) {
            console.error('Failed to fetch blogs:', error.message);
        }
    }

    fetchBlogs();

    function addUserToTable(firstname, lastname, email) {
        const newRow = table.insertRow();
        newRow.innerHTML = `<td><i class="fa-regular fa-user"></i>${firstname}</td>
                            <td>${lastname}</td>
                            <td>${email}</td>`;
    }

    function updateTotalUsersCount(count) {
        totalUsersElement.textContent = count;
    }
    function updateTotalBlogsCount(count) {
        totalBlogsUsers.textContent = count;
    }

    const logoutButton = document.querySelector('.logout');
    
    logoutButton.addEventListener('click', async function(event) {
        event.preventDefault();
        try {
            const response = await fetch('http://localhost:3000/auth/logout', {
                method: 'POST',
                credentials: 'include'
            });
            if (response.ok) {
                document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
                window.location.href = '../Authentication/Login.html';
            } else {
                throw new Error('Failed to logout. Please try again.');
            }
        } catch (error) {
            console.error('Logout failed:', error.message);
        }
    });
});