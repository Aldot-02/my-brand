document.addEventListener('DOMContentLoaded', function() {
    let selectedBlogId = localStorage.getItem('selectedBlogId');
    let blogs = JSON.parse(localStorage.getItem('blogs')) || [];
    let selectedBlog = blogs.find(blog => blog.id === selectedBlogId) || {};    

    document.querySelector('h1').textContent = selectedBlog.title || "Blog Title";

    const authorDetailsTop = document.querySelector('.author-details-top');
    authorDetailsTop.querySelector('.blog-publisher').textContent = `Author: ${selectedBlog.author || "Unknown"}`;
    authorDetailsTop.querySelector('span').textContent = `Date: ${selectedBlog.dateTime || "Unknown"}`;

    function formatContent(content) {
        return content;
    }

    const blogContent = document.querySelector('.blog-content');
    blogContent.innerHTML = formatContent(selectedBlog.content || "No content available");

    function displayComments() {
        const commentsSection = document.querySelector('.blog-comments-section');
        const commentsNumber = commentsSection.querySelector('.Comments-number');
        const userCommentsContainer = commentsSection.querySelector('.user-comment');
        
        commentsNumber.textContent = selectedBlog.comments ? selectedBlog.comments.length : 0;
        userCommentsContainer.innerHTML = '';

        if (selectedBlog.comments) {
            selectedBlog.comments.forEach(comment => {
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
                commentText.textContent = comment.content;

                commentContent.appendChild(commentText);

                commentElement.appendChild(commentAuthor);
                commentElement.appendChild(commentContent);

                userCommentsContainer.appendChild(commentElement);
            });
        }
    }

    function updateCommentsNumber() {
        const commentsNumber = document.querySelector('.comments-nbr');
        commentsNumber.textContent = selectedBlog.comments ? selectedBlog.comments.length : 0;
    }

    const commentForm = document.querySelector('.infoForm.authForm');
    commentForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const name = commentForm.elements['firstname'].value;
        const email = commentForm.elements['lastname'].value;
        const content = commentForm.elements['username'].value;

        if (selectedBlog.comments && selectedBlog.comments.some(comment => comment.email === email)) {
            alert("You have already commented on this blog with this email.");
            return;
        }

        const newComment = {
            name: name,
            email: email,
            content: content,
            date: new Date().toLocaleDateString()
        };

        selectedBlog.comments = selectedBlog.comments || [];
        selectedBlog.comments.push(newComment);

        updateCommentsNumber();
        displayComments();

        commentForm.reset();

        localStorage.setItem('blogs', JSON.stringify(blogs));
    });

    displayComments();
    updateCommentsNumber();

    const likeButton = document.querySelector('.Like-btn');
    const likesNumber = document.querySelector('.likes-nbr');

    likeButton.addEventListener('click', function() {
        if (likeButton.classList.contains('liked')) {
            selectedBlog.likes--;
            likeButton.classList.remove('liked');
            likeButton.style.backgroundColor = 'transparent';
        } else {
            selectedBlog.likes++;
            likeButton.classList.add('liked');
            likeButton.style.backgroundColor = '#F45815';
        }
        
        likesNumber.textContent = selectedBlog.likes;
        localStorage.setItem('blogs', JSON.stringify(blogs));
    });

    if (selectedBlog.likes > 0) {
        likeButton.classList.add('liked');
        likeButton.style.backgroundColor = '#F45815';
    }
    likesNumber.textContent = selectedBlog.likes || 0;

    const commentButton = document.querySelector('.comment-btn');

    commentButton.addEventListener('click', function() {
        const commentForm = document.querySelector('.blog-comment-form');
        commentForm.scrollIntoView({ behavior: 'smooth' });
    });

    const relatedPostsContainer = document.querySelector('.related-posts');

    const relatedBlogs = blogs.filter(blog => blog.id !== selectedBlogId);
    displayRelatedPosts(relatedBlogs);

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
            dateSpan.textContent = blog.dateTime;

            postDetailsTime.appendChild(dateSpan);

            relatedPostDetails.appendChild(h4);
            relatedPostDetails.appendChild(postDetailsTime);

            relatedPost.appendChild(postImg);
            relatedPost.appendChild(relatedPostDetails);

            const postLink = document.createElement('a');
            postLink.href = './open-new-blog.html';
            postLink.appendChild(relatedPost);

            const postWrapper = document.createElement('div');
            postWrapper.appendChild(postLink);

            relatedPostsContainer.appendChild(postWrapper);
        });
    }
});
