document.addEventListener('DOMContentLoaded', function() {
    let selectedBlogId = localStorage.getItem('selectedBlogId');
    let selectedBlog = JSON.parse(localStorage.getItem('blogs')).find(blog => blog.id === selectedBlogId);    

    document.querySelector('h1').textContent = selectedBlog.title;

    const authorDetailsTop = document.querySelector('.author-details-top');
    authorDetailsTop.querySelector('.blog-publisher').textContent = `Author: ${selectedBlog.author}`;
    authorDetailsTop.querySelector('span').textContent = `Date: ${selectedBlog.dateTime}`;

    function formatContent(content) {
    
        return content;
    }

    const blogContent = document.querySelector('.blog-content');

    blogContent.innerHTML = formatContent(selectedBlog.content);

    paragraphs.forEach(paragraph => {
        const p = document.createElement('p');
        p.textContent = paragraph;
        blogContent.appendChild(p);
    });

    const mediaImg = document.querySelector('.media-img img');
    mediaImg.src = selectedBlog.coverImage;
    mediaImg.alt = selectedBlog.title;
});


// RELATED POSTS
document.addEventListener('DOMContentLoaded', function() {
    const relatedPostsContainer = document.querySelector('.related-posts');

    let blogs = JSON.parse(localStorage.getItem('blogs')) || [];
    displayRelatedPosts(blogs);

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

            const timeSpan = document.createElement('span');
            timeSpan.textContent = blog.time;

            postDetailsTime.appendChild(timeSpan);

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

// THE END OF RELATED POSTS