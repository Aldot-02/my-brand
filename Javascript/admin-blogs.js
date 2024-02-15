document.addEventListener('DOMContentLoaded', function() {
    let blogs = JSON.parse(localStorage.getItem('blogs')) || [];

    displayBlogs(blogs);

    function displayBlogs(blogs) {
        const allBlogsContainer = document.querySelector('.blogs');

        blogs.forEach(blog => {
            const blogHTML = `
                <div class="post" data-id="${blog.id}" style="background-image: url(${blog.coverImage});">
                    <div class="checker">
                        <i class="fa-solid fa-check"></i>
                    </div>
                    <a href="../Desktop/open-blog.html">
                        <div class="post_content">
                            <p class="publication-date">${blog.dateTime}</p>
                            <p class="headline">${blog.title}</p>
                            <p class="author">By: ${blog.author}</p>
                        </div>
                    </a>
                </div>
            `;
            allBlogsContainer.insertAdjacentHTML('beforeend', blogHTML);
        });

        const checkers = document.querySelectorAll('.checker');
        checkers.forEach(checker => {
            checker.addEventListener('click', function(event) {
                const post = event.target.closest('.post');
                post.classList.toggle('selected');
            });
        });

        const deleteBtn = document.querySelector('.delete-btn');
        deleteBtn.addEventListener('click', function() {
            const selectedBlogIds = Array.from(document.querySelectorAll('.post.selected'))
                                        .map(post => post.dataset.id);

            blogs = blogs.filter(blog => !selectedBlogIds.includes(blog.id));
            localStorage.setItem('blogs', JSON.stringify(blogs));

            document.querySelectorAll('.post.selected').forEach(post => {
                post.remove();
            });
        });
    }
});