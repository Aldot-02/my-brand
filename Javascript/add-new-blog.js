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
        addLogoutEvent();
        enableAuthenticatedFunctionality();
    }
});

function enableAuthenticatedFunctionality() {
    document.getElementById('titlePlaceholder').addEventListener('click', editTitle);
    document.getElementById('contentPlaceholder').addEventListener('click', editBlogBody);
    document.getElementById('previewButton').addEventListener('click', previewBlog);
    document.getElementById('publishButton').addEventListener('click', publishBlog);
    document.getElementById('imageInput').addEventListener('change', addMedia);
}

function editTitle() {
    document.getElementById('titlePlaceholder').contentEditable = true;
}

function editBlogBody() {
    document.getElementById('contentPlaceholder').contentEditable = true;
}

function previewBlog() {
    sendDataToServer('http://localhost:3000/blog/', 'POST', retrieveBlogData());
    window.location.href = '../Desktop/open-blog.html';
}

function publishBlog() {
    sendDataToServer('http://localhost:3000/blog/', 'POST', retrieveBlogData());
    window.location.href = '../Admin Panel/admin-blogs.html';
}

function retrieveBlogData() {
    var author = document.getElementById('authorInput').value;
    var title = document.getElementById('titlePlaceholder').innerText;
    var content = document.getElementById('contentPlaceholder').innerHTML;
    var imageSrc = document.getElementById('imagePreview').src;

    return {
        author: author,
        title: title,
        content: content,
        coverImage: imageSrc,
        likes: [],
        comments: []
    };
}

function sendDataToServer(url, method, data) {
    fetch(url, {
        method: method,
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        console.log('Success:', data);
        window.location.href = '../Admin Panel/admin-blogs.html';
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

function addMedia(event) {
    var reader = new FileReader();
    reader.onload = function () {
        var imagePreview = document.getElementById('imagePreview');
        imagePreview.src = reader.result;
        imagePreview.style.display = 'block';
    };
    reader.readAsDataURL(event.target.files[0]);
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