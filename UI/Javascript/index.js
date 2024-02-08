// // MOUSE ANIMATIONS

// document.addEventListener('mousemove', function(e) {
//     const cursor = document.getElementById('cursor');
//     // Offset the cursor's center
//     const x = e.clientX - cursor.offsetWidth / 2;
//     const y = e.clientY - cursor.offsetHeight / 2;
    
//     cursor.style.left = `${x}px`;
//     cursor.style.top = `${y}px`;
//     cursor.style.opacity = 1; // Make the cursor visible when moving
//     cursor.style.transform = 'rotate(45deg) scale(1)'; // Default size
//   });
  
//   document.addEventListener('mouseout', function(e) {
//     const cursor = document.getElementById('cursor');
//     if (e.relatedTarget === null) {
//       cursor.style.opacity = 0; // Hide the cursor when not on the page
//     }
//   });
  
//   document.addEventListener('mouseover', function(e) {
//     const cursor = document.getElementById('cursor');
//     cursor.style.transform = 'rotate(45deg) scale(0.9)'; // Shrink cursor a bit on hover for effect
//   });
  
//   // To ensure that the cursor disappears when the mouse leaves the window
//   window.onmouseleave = function() {
//     const cursor = document.getElementById('cursor');
//     cursor.style.opacity = 0;
//   };
  
//   window.onmouseenter = function() {
//     const cursor = document.getElementById('cursor');
//     cursor.style.opacity = 1;
//   };

// // END OF MOUSE ANIMATIONS EFFECTS

// // NAVIGATION SHADOW ON SCROLL

// window.addEventListener('scroll', function() {
//     var navbar = document.querySelector('.navbar');
//     // Add shadow if not at the top
//     if (window.pageYOffset > 0) {
//         navbar.classList.add('navbar-shadow');
//     // Remove shadow when at the top
//     } else {
//         navbar.classList.remove('navbar-shadow');
//     }
// });

// // END OF NAVIGATION SHADOW ON SCROLL

// // NAVIGATION SCROLLING

// // List of pages in the order they should be navigated
// const pages = ['about.html', 'projects.html', 'blogs.html', 'contact.html'];
// let currentPageIndex = pages.findIndex(page => window.location.href.endsWith(page));

// window.addEventListener('scroll', () => {
//   const mainTag = document.querySelector('main');
//   // Check if the user has scrolled to the bottom of the <main> tag
//   if (window.innerHeight + window.scrollY >= mainTag.offsetHeight + mainTag.offsetTop) {
//     currentPageIndex++;
//     // Navigate to the next page if it exists
//     if (currentPageIndex < pages.length) {
//       window.location.href = pages[currentPageIndex];
//     }
//   }
// });


// // Showing the footer on navigation of contact page
// if (window.location.href.endsWith('contact.html')) {
//   document.body.classList.add('show-footer');
// }


// // END OF NAVIGATION SCROLLING