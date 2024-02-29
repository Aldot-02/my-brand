window.onload = function(){

    const menu_hamburger = document.querySelector('.hamburger');
    const mobile_menu = document.querySelector('.mobile-nav');

    menu_hamburger.addEventListener('click', function(){
        menu_hamburger.classList.toggle('is-active');
        mobile_menu.classList.toggle('is-active');
    });

    

}

// // BLOGS DISPLAY
// document.addEventListener('DOMContentLoaded', function() {
//     let blogs = JSON.parse(localStorage.getItem('blogs')) || [];

//     displayBlogs(blogs);

//     function displayBlogs(blogs) {
//         const blogsContainer = document.querySelector('.blogs');

//         blogs.forEach(blog => {
//             const blogHTML = `
//                 <div class="post" data-id="${blog.id}" style="background-image: url(${blog.coverImage});">
//                     <a href="../Desktop/open-blog.html">
//                         <div class="post_content">
//                             <p class="publication-date">${blog.dateTime}</p>
//                             <p class="headline">${blog.title}</p>
//                             <p class="author">By: ${blog.author}</p>
//                         </div>
//                     </a>
//                 </div>
//             `;
//             blogsContainer.insertAdjacentHTML('beforeend', blogHTML);
//         });
//     }

//     const blogPosts = document.querySelectorAll('.post');

//     blogPosts.forEach(post => {
//         post.addEventListener('click', function() {
//             const postId = post.getAttribute('data-id');
//             localStorage.setItem('selectedBlogId', postId);
//             window.location.href = './Desktop/open-blog.html';
//         });
//     });
// });

// // THE END OF BLOGS DISPLAY

document.addEventListener('DOMContentLoaded', function() {
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

    function displayBlogs(blogs) {
        const blogsContainer = document.querySelector('.blogs');

        blogs.forEach(blog => {
            const blogHTML = `
                <div class="post" data-id="${blog._id}" style="background-image: url(${blog.coverImage});">
                    <div class="post_content">
                        <p class="publication-date">${blog.createdAt}</p>
                        <p class="headline">${blog.title}</p>
                        <p class="author">By: ${blog.author}</p>
                    </div>
                </div>
            `;
            blogsContainer.insertAdjacentHTML('beforeend', blogHTML);
        });

        document.querySelectorAll('.post').forEach(post => {
            post.addEventListener('click', function() {
                const postId = post.getAttribute('data-id');
                window.location.href = `../Desktop/open-blog.html?id=${postId}`;
            });
        });
    }
});



// VALIDATING THE CLIENT'S SIDE CONTACT FORM
const form = document.querySelector('form');
const fullName = document.getElementById("name")
const email = document.getElementById("email")
const phone = document.getElementById("phone")
const subject = document.getElementById("subject")
const message = document.getElementById("message")

function sendEmail() {
    const bodyMessage = `Full Name: ${fullName.value}<br>Email Address: ${email.value}<br>Phone Number: ${phone.value}<br><br><br>Message: ${message.value}<br>`
    Email.send({
        SecureToken : "f5fc0194-8657-4337-a560-6217aa440e8f",
        To : 'twizald.03@gmail.com',
        From : 'twizald.03@gmail.com',
        Subject : subject.value,
        Body : bodyMessage
    }).then(
        message => {
            if (message == "OK") {
                Swal.fire({
                    title: "Success!",
                    text: "Message sent successfully!",
                    icon: "success"
                  });
            }
          }
    );
}

// Checking inputs
function checkInputs(){
    const items = document.querySelectorAll(".item");

    for (const item of items){
        if (item.value == "") {
            item.classList.add("error");
            item.parentElement.classList.add("error");
        }   

        if(items[1].value != "") {
            checkEmail();
        }
        items[1].addEventListener("keyup", () => {
            checkEmail();
        })
        
        item.addEventListener("keyup", () => {
            if (item.value != "") {
                item.classList.remove("error");
                item.parentElement.classList.remove("error")
            }
            else {
                item.classList.add("error");
                item.parentElement.classList.add("error");
            }
        })
    }
}

// checking the email
function checkEmail(){
    const emailRegex = /^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,3})(\.[a-z]{2,3})?$/;

    const ErrorTxtEmail = document.querySelector(".error-txt.email-address");

    if (!email.value.match(emailRegex)) {
        email.classList.add("error");
        email.parentElement.classList.add("error");

        if (email.value != ""){
            ErrorTxtEmail.innerText = "Enter a Valid Email address"
        }
        else 
        ErrorTxtEmail.innerText = "This Field can't be empty"
    }
    else {
        email.classList.remove("error");
        email.parentElement.classList.remove("error");
    }
}


form.addEventListener("submit", (e) => {
    e.preventDefault();
    checkInputs();

    if (!fullName.classList.contains("error") && !email.classList.contains("error") && !phone.classList.contains("error") && !subject.classList.contains("error") && !message.classList.contains("error")) {
        sendEmail();
    }
    form.reset();
    return false;
    
})

//THE END OF CLIENTS CONTACT FORM
