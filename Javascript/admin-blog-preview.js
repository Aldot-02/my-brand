document.addEventListener('DOMContentLoaded', function() {
    const selectedBlogId = localStorage.getItem('selectedBlogId');
    const blogs = JSON.parse(localStorage.getItem('blogs')) || [];
    const selectedBlog = blogs.find(blog => blog.id === selectedBlogId);

    if (selectedBlog) {
        document.title = selectedBlog.title;
        const blogHeading = document.querySelector('.blog-heading h1');
        blogHeading.textContent = selectedBlog.title;
        blogHeading.contentEditable = true;

        const authorUpdate = document.querySelector('.author-update');
        authorUpdate.textContent = selectedBlog.author;
        authorUpdate.contentEditable = true;

        document.querySelector('.publication-time').textContent = selectedBlog.dateTime;
        const blogContent = document.querySelector('.blog-content');
        blogContent.innerHTML = selectedBlog.content;
        blogContent.contentEditable = true;

        document.getElementById('save-changes').addEventListener('click', function() {
            selectedBlog.title = blogHeading.textContent;
            selectedBlog.author = authorUpdate.textContent;
            selectedBlog.content = blogContent.innerHTML;

            const currentDate = new Date();
            const formattedDate = `${currentDate.getDate()}-${currentDate.getMonth() + 1}-${currentDate.getFullYear()}`;
            const formattedTime = `${currentDate.getHours()}:${currentDate.getMinutes()}`;
            selectedBlog.dateTime = `${formattedDate}, ${formattedTime}`;

            localStorage.setItem('blogs', JSON.stringify(blogs));

            window.location.href = '../Admin Panel/admin-blogs.html';
        });
    } else {
        console.error('Selected blog not found');
    }
});
