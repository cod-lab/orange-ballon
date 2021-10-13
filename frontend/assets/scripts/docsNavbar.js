const navbar = document.getElementById('navbar');
const navbarStyle = navbar.style;

window.addEventListener('scroll', () => {
    if(navbar.getBoundingClientRect().top < 0) {
        navbarStyle.position = 'sticky';
        navbarStyle.top = 0;
        navbarStyle.boxShadow = '0 0 10px rgb(0 0 0 / 20%)';
    }
    if(navbar.getBoundingClientRect().top > 0) {
        navbarStyle.position = 'static';
        navbarStyle.boxShadow = '';
    }

});

