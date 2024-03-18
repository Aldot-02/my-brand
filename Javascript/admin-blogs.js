document.addEventListener('DOMContentLoaded', function() {

    const checkAuthentication = async () => {
        let response;
        try {
            response = await fetch('https://my-brand-backend-aldo-1.onrender.com/auth/authenticated', {
                credentials: "include",
                headers: {
                    'Content-Type': 'application/json'
                },
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
            const logoutBtn = document.querySelector('.logout');
            logoutBtn.addEventListener('click', logout);
        }
    });

    function fetchBlogs() {
        fetch('https://my-brand-backend-aldo-1.onrender.com/blog/all', {
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: "include",
        })
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
                const confirmation = confirm('Are you sure you want to delete the selected blog(s)?');
                if (confirmation) {
                    const response = await Promise.all(selectedBlogIds.map(id => fetch(`https://my-brand-backend-aldo-1.onrender.com/blog/${id}`, { 
                        method: 'DELETE',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        credentials: "include", 
                    })));
                    const results = await Promise.all(response.map(res => res.json()));

                    console.log(results);
                    document.querySelectorAll('.post.selected').forEach(post => {
                        post.remove();
                    });

                    togglePopup();
                }
            } catch (error) {
                console.error('Error deleting blogs:', error);
            }
        });

        window.togglePopup = function() {
            var blur = document.getElementById('blur');
            blur.classList.toggle('blur-popup');
            var popup = document.getElementById('popup');
            popup.classList.toggle('blur-popup');
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