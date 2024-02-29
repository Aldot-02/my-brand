// function editTitle() {
//     document.getElementById('titlePlaceholder').contentEditable = true;
// }

// function editBlogBody() {
//     document.getElementById('contentPlaceholder').contentEditable = true;
// }

// function previewBlog() {
//     storeDataToLocalStorage();
//     window.location.href = '../Desktop/open-blog.html';
// }

// function publishBlog() {
//     storeDataToLocalStorage();
//     window.location.href = '../Admin Panel/admin-blogs.html';
// }

// function storeDataToLocalStorage() {
//     var dateTime = new Date().toLocaleString();
//     var author = document.getElementById('authorInput').value;
//     var title = document.getElementById('titlePlaceholder').innerText;
//     var content = document.getElementById('contentPlaceholder').innerHTML;
//     var imageSrc = document.getElementById('imagePreview').src;
    
//     var blogId = generateUniqueId();

//     var blog = {
//         id: blogId,
//         author: author,
//         title: title,
//         content: content,
//         coverImage: imageSrc,
//         dateTime: dateTime,
//         likes: 0,
//         comments: []
//     };

//     var blogs = JSON.parse(localStorage.getItem('blogs')) || [];

//     blogs.push(blog);

//     localStorage.setItem('blogs', JSON.stringify(blogs));
// }

// function addMedia(event) {
//     var reader = new FileReader();
//     reader.onload = function () {
//         var imagePreview = document.getElementById('imagePreview');
//         imagePreview.src = reader.result;
//         imagePreview.style.display = 'block';
//     };
//     reader.readAsDataURL(event.target.files[0]);
// }

// function generateUniqueId() {
//     return '_' + Math.random().toString(36).substr(2, 9);
// }

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