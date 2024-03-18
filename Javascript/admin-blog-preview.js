document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const selectedBlogId = urlParams.get('id');

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
            
            fetch(`https://my-brand-backend-aldo-1.onrender.com/blog/${selectedBlogId}`, {
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: "include",
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Failed to fetch selected blog');
                    }
                    return response.json();
                })
                .then(selectedBlog => {
                    document.title = selectedBlog.title;
                    const blogHeading = document.querySelector('.blog-heading h1');
                    blogHeading.textContent = selectedBlog.title;
                    blogHeading.contentEditable = true;

                    const authorUpdate = document.querySelector('.author-update');
                    authorUpdate.textContent = selectedBlog.author;
                    authorUpdate.contentEditable = true;

                    const publicationTime = document.querySelector('.publication-time');

                    function formatDateTime() {
                        const currentDate = new Date();
                        const formattedDate = currentDate.toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric'
                        });
                        const formattedTime = currentDate.toLocaleTimeString('en-US', {
                            hour: 'numeric',
                            minute: 'numeric',
                            second: 'numeric',
                            hour12: false
                        });
                        publicationTime.textContent = `${formattedDate}, ${formattedTime}`;
                    }

                    formatDateTime();

                    const blogContent = document.querySelector('.blog-content');
                    blogContent.innerHTML = selectedBlog.content;
                    blogContent.contentEditable = true;

                    document.getElementById('save-changes').addEventListener('click', async function() {
                        selectedBlog.title = blogHeading.textContent;
                        selectedBlog.author = authorUpdate.textContent;
                        selectedBlog.content = blogContent.innerHTML;

                        try {
                            const response = await fetch(`https://my-brand-backend-aldo-1.onrender.com/blog/${selectedBlogId}`, {
                                method: 'PATCH',
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                                credentials: "include",
                                body: JSON.stringify(selectedBlog)
                            });

                            if (!response.ok) {
                                throw new Error('Failed to update blog');
                            }

                            console.log('Blog updated successfully');
                            displayConfirmationPopup();
                        } catch (error) {
                            console.error('Error updating blog:', error);
                        }
                    });
                })
                .catch(error => {
                    console.error('Error fetching selected blog:', error);
                });

            return true;

        } catch (error) {
            console.error('Error parsing JSON:', error);
            return false;
        }
    };
    

    checkAuthentication().then(isAuthenticated => {
        if (isAuthenticated) {
            const logoutBtn = document.querySelector('.logout');
            logoutBtn.innerHTML = "Logout"
            logoutBtn.addEventListener('click', logout);
        }
    });

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

    function displayConfirmationPopup() {
        const popup = document.getElementById('popup');
        popup.querySelector('p').textContent = 'Blog updated successfully. Click Close to continue.';
        popup.classList.add('blur-popup');

        var blur = document.getElementById('blur');
        blur.classList.toggle('blur-popup');


        const closeButton = document.getElementById('close-popup');
        closeButton.addEventListener('click', function() {
            window.location.href = '../Admin Panel/admin-blogs.html';
        });
    }
});