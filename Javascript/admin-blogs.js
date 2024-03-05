document.addEventListener('DOMContentLoaded', function() {

    const checkAuthentication = async () => {
        let response;
        try {
            response = await fetch('http://localhost:3000/auth/authenticated', {
                credentials: "include"
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
            
            return true;

        } catch (error) {
            console.error('Error parsing JSON:', error);
            return false;
        }
    };

    
    checkAuthentication().then(isAuthenticated => {
        if (isAuthenticated) {
            fetchBlogs();
            addLogoutEvent();
        }
    });

    function fetchBlogs() {
        fetch('http://localhost:3000/blog/all')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch blogs');
                }
                return response.json();
            })
            .then(blogs => {
                displayBlogs(blogs);
            })
            .catch(error => {
                console.error('Error fetching blogs:', error);
            });
    }

    function displayBlogs(blogs) {
        const allBlogsContainer = document.querySelector('.blogs');

        blogs.forEach(blog => {
            const blogHTML = `
                <div class="post" data-id="${blog._id}" style="background-image: url(${blog.coverImage});">
                    <div class="checker">
                        <i class="fa-solid fa-check"></i>
                    </div>
                    <div class="post_content">
                        <p class="publication-date">${blog.createdAt}</p>
                        <p class="headline">${blog.title}</p>
                        <p class="author">By: ${blog.author}</p>
                    </div>
                </div>
            `;
            allBlogsContainer.insertAdjacentHTML('beforeend', blogHTML);
        });

        const checkers = document.querySelectorAll('.checker');
        checkers.forEach(checker => {
            checker.addEventListener('click', function(event) {
                event.stopPropagation();
                const post = checker.closest('.post');
                post.classList.toggle('selected');
            });
        });

        const posts = document.querySelectorAll('.post');
        posts.forEach(post => {
            post.addEventListener('click', function(event) {
                const blogId = post.dataset.id;
                window.location.href = `../Desktop/admin-open-blog.html?id=${blogId}`;
            });
        });

        const deleteBtn = document.querySelector('.delete-btn');
        deleteBtn.addEventListener('click', async function() {
            const selectedBlogIds = Array.from(document.querySelectorAll('.post.selected')).map(post => post.dataset.id);

            try {
                const response = await Promise.all(selectedBlogIds.map(id => fetch(`http://localhost:3000/blog/${id}`, { method: 'DELETE' })));
                const results = await Promise.all(response.map(res => res.json()));

                console.log(results);
                document.querySelectorAll('.post.selected').forEach(post => {
                    post.remove();
                });
            } catch (error) {
                console.error('Error deleting blogs:', error);
            }
        });
    }

    function addLogoutEvent() {

        const logoutButton = document.querySelector('.logout');
    
        logoutButton.addEventListener('click', async () => {
            let response;
            try {
                response = await fetch('http://localhost:3000/auth/logout', {
                    method: 'POST',
                    credentials: 'include'
                });
    
                if (!response.ok) {
                    throw new Error('Logout failed');
                }
            } catch (error) {
                console.error('Error:', error);
            }
    
            try {
                const result = await response.json();
                console.log(result.message);
                window.location.href = `../Authentication/Login.html`;
            } catch (error) {
                console.log("logout error please!")
            }
        });
    }
});