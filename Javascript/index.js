window.onload = function(){
    window.addEventListener('scroll', function(e) {
        if(window.pageYOffset > 100) {
            document.querySelector("header").classList('is-scrolling');
        } else {
            document.querySelector("header").classList.remove('is-scrolling');
        }
    });

    const menu_hamburger = document.querySelector('.hamburger');
    const mobile_menu = document.querySelector('.mobile-nav');
    const mobile_menu_nav = document.querySelector('.remove-mobile-nav');

    menu_hamburger.addEventListener('click', function(){
        menu_hamburger.classList.toggle('is-active');
        mobile_menu.classList.toggle('is-active');
        mobile_menu_nav.classList.toggle('is-active');
    });

    mobile_menu_nav.addEventListener('click', function(){
        mobile_menu.classList.toggle('is-active');
    })
}