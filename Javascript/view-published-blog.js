document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const clickedBlogId = urlParams.get('id');

    fetch(`https://my-brand-backend-aldo-1.onrender.com/blog/${clickedBlogId}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch clicked blog');
            }
            return response.json();
        })
        .then(clickedBlog => {
            document.querySelector('h1').textContent = clickedBlog.title || "Blog Title";

            const authorDetailsTop = document.querySelector('.author-details-top');
            authorDetailsTop.querySelector('.blog-publisher').textContent = `Author: ${clickedBlog.author || "Unknown"}`;
            authorDetailsTop.querySelector('span').textContent = `${new Date(clickedBlog.createdAt).toLocaleString()}`;

            function formatContent(content) {
                return content;
            }

            const blogContent = document.querySelector('.blog-content');
            blogContent.innerHTML = formatContent(clickedBlog.content || "No content available");

            // LIKING FUNCTIONALITY
            
            const likesNumber = document.querySelector('.likes-nbr');
            if (clickedBlog.likes && Array.isArray(clickedBlog.likes)) {
                likesNumber.innerHTML = clickedBlog.likes.length || 0;
            } else {
                console.error('Likes data is missing or not in the correct format');
            }

            // Update the like button color based on the user's like status
            const likeButton = document.querySelector('.Like-btn');
            likeButton.addEventListener('click', async function() {
                try {
                    const authResponse = await fetch('https://my-brand-backend-aldo-1.onrender.com/auth/authenticated', {
                        credentials: "include",
                        method: "GET"
                    });
                    if (!authResponse.ok) {
                        throw new Error('User is not authenticated');
                    }
                    const userData = await authResponse.json();

                    const likeResponse = await fetch(`https://my-brand-backend-aldo-1.onrender.com/blog/${clickedBlogId}/like`, {
                        method: 'PATCH',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        credentials: "include",
                        body: JSON.stringify({ userId: userData._id })
                    });
                    
                    if (clickedBlog.likes.includes(userData._id)) {
                        likeButton.classList.remove('liked');
                    } else {
                        likeButton.classList.add('liked');
                    }

                    if (!likeResponse.ok) {
                        throw new Error('Failed to update like');
                    }
                    location.reload();
                    
                } catch (error) {
                    console.error('Error:', error);
                    if (error.message === 'User is not authenticated') {
                        window.location.href = '../Authentication/Login.html';
                    }
                }
            });


            // COMMENTING FUNCTIONALITY
            const commentsNumber = document.querySelector('.comments-nbr');
            commentsNumber.innerHTML = clickedBlog.comments.length || 0;

            const commentButton = document.querySelector('.comment-btn');

            commentButton.addEventListener('click', function() {
                const commentForm = document.querySelector('.blog-comment-form');
                commentForm.scrollIntoView({ behavior: 'smooth' });
            });


            const commentForm = document.querySelector('.infoForm.authForm');
            commentForm.addEventListener('submit', async function(event) {
                event.preventDefault();
            
                const commentMessage = document.getElementById('comment-message').value;
            
                try {
                    const authResponse = await fetch('https://my-brand-backend-aldo-1.onrender.com/auth/authenticated', {
                        credentials: "include",
                        method: "GET",
                        headers: {
                            'Content-Type': 'application/json'
                        },
                    });
            
                    if (!authResponse.ok) {
                        throw new Error('User is not authenticated');
                    }
            
                    const userData = await authResponse.json();
            
                    const commentResponse = await fetch(`https://my-brand-backend-aldo-1.onrender.com/blog/${clickedBlogId}/comment`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        credentials: "include",
                        body: JSON.stringify({
                            message: commentMessage
                        })
                    });
            
                    if (!commentResponse.ok) {
                        throw new Error('Failed to add comment');
                    }
            
                    location.reload();
                } catch (error) {
                    console.error('Error:', error);
                    if (error.message === 'User is not authenticated') {
                        window.location.href = '../Authentication/Login.html';
                    }
                }
            });

            // ALL COMMENTS
            async function fetchAndDisplayComments(blogId) {
                try {
                    const response = await fetch(`https://my-brand-backend-aldo-1.onrender.com/blog/${blogId}/comments`);
                    const comments = await response.json();
                    console.log(comments)

                    const commentsSection = document.querySelector('.blog-comments-section');
                    const commentsNumberSection = document.querySelector('.Comments-number');
                    const userCommentsContainer = commentsSection.querySelector('.user-comment');
            
                    commentsNumberSection.innerHTML = clickedBlog.comments.length || 0;
                    userCommentsContainer.innerHTML = '';
                        
                    comments.forEach(comment => {

                        const commentElement = document.createElement('div');
                        commentElement.classList.add('user-comment-content');

                        const commentAuthor = document.createElement('div');
                        commentAuthor.classList.add('comment-author');

                        const commentorProfile = document.createElement('div');
                        commentorProfile.classList.add('commentor-profile');
                        commentorProfile.innerHTML = '<i class="fa-regular fa-user"></i>';

                        const authorDetails = document.createElement('div');
                        authorDetails.classList.add('author-details');

                        const commentorName = document.createElement('span');
                        commentorName.classList.add('commentor');
                        commentorName.textContent = comment.name;

                        const commentDate = document.createElement('span');
                        commentDate.classList.add('comments-date');
                        commentDate.textContent = comment.date;

                        authorDetails.appendChild(commentorName);
                        authorDetails.appendChild(commentDate);

                        commentAuthor.appendChild(commentorProfile);
                        commentAuthor.appendChild(authorDetails);

                        const commentContent = document.createElement('div');
                        commentContent.classList.add('comment-content');

                        const commentText = document.createElement('p');
                        commentText.textContent = comment.message;

                        commentContent.appendChild(commentText);

                        commentElement.appendChild(commentAuthor);
                        commentElement.appendChild(commentContent);

                        userCommentsContainer.appendChild(commentElement);
                    });
                } catch (error) {
                    console.error('Error fetching comments:', error);
                }
            }

            fetchAndDisplayComments(clickedBlogId);

            // Related posts

            const relatedPostsContainer = document.querySelector('.related-posts');

            fetch('https://my-brand-backend-aldo-1.onrender.com/blog/all')
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Failed to fetch related blogs');
                    }
                    return response.json();
                })
                .then(allBlogs => {
                    const relatedBlogs = allBlogs.filter(blog => blog._id !== clickedBlogId);
                    displayRelatedPosts(relatedBlogs);
                })
                .catch(error => {
                    console.error('Error fetching related blogs:', error);
                });

            function displayRelatedPosts(blogs) {
                blogs.forEach(blog => {
                    const relatedPost = document.createElement('div');
                    relatedPost.classList.add('related-post');

                    const postImg = document.createElement('div');
                    postImg.classList.add('post-img');

                    const img = document.createElement('img');
                    img.src = blog.coverImage;
                    img.alt = blog.title;

                    postImg.appendChild(img);

                    const relatedPostDetails = document.createElement('div');
                    relatedPostDetails.classList.add('related-post-details');

                    const h4 = document.createElement('h4');
                    h4.textContent = blog.title;

                    const postDetailsTime = document.createElement('div');
                    postDetailsTime.classList.add('post-details-time');

                    const dateSpan = document.createElement('span');
                    dateSpan.textContent = `${new Date(blog.createdAt).toLocaleString()}`;

                    postDetailsTime.appendChild(dateSpan);

                    relatedPostDetails.appendChild(h4);
                    relatedPostDetails.appendChild(postDetailsTime);

                    relatedPost.appendChild(postImg);
                    relatedPost.appendChild(relatedPostDetails);

                    const postLink = document.createElement('a');
                    postLink.href = `../Desktop/open-blog.html?id=${blog._id}`;
                    postLink.appendChild(relatedPost);

                    const postWrapper = document.createElement('div');
                    postWrapper.appendChild(postLink);

                    relatedPostsContainer.appendChild(postWrapper);
                });
            }
        })
    .catch(error => {
        console.error('Error fetching clicked blog:', error);
    });
});