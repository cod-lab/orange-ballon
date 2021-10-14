const navbar = document.getElementById('navbar');
const navbarStyle = navbar.style;

const down = document.getElementsByClassName('down')[0];
const part1 = down.getElementsByClassName('part1')[0];

const logoStyle = navbar.getElementsByClassName('logo')[0].style;

const main = document.getElementsByTagName('main')[0];

const mainBackground = window.getComputedStyle(main).backgroundImage;
const down_part1_Background = window.getComputedStyle(part1).backgroundImage;

window.addEventListener('scroll', () => {
    // stick navbar at top
    if(navbar.getBoundingClientRect().top < 0) {
        navbarStyle.position = 'sticky';
        navbarStyle.top = 0;
        navbarStyle.boxShadow = '0 0 10px rgb(0 0 0 / 20%)';
    }
    if(navbar.getBoundingClientRect().top > 0) {
        navbarStyle.position = 'static';
        navbarStyle.boxShadow = '';
    }


    // change logo on logo encounter with section 'down'
    if(part1.getBoundingClientRect().top <= navbar.getBoundingClientRect().bottom) {
        logoStyle.background = "url('/graphics/logos/navbar/black.ico')";
        logoStyle.backgroundSize = '25px';
        logoStyle.backgroundRepeat = 'no-repeat';
        logoStyle.backgroundPosition = 'center center';
    } else {
        logoStyle.background = "url('/graphics/logos/navbar/white.ico')";
        logoStyle.backgroundSize = '25px';
        logoStyle.backgroundRepeat = 'no-repeat';
        logoStyle.backgroundPosition = 'center center';
    }


    // change navbar background on different sections encounter
    if(main.getBoundingClientRect().top >= 0) navbarStyle.background = '';
    if(main.getBoundingClientRect().top < 0) {
        navbarStyle.background = mainBackground;
        navbarStyle.backgroundSize = '100%';
        navbarStyle.backgroundPosition = 'left -' + window.scrollY + 'px';
    }
    if(part1.getBoundingClientRect().top <= navbar.getBoundingClientRect().bottom) {
        navbarStyle.background = down_part1_Background;
        navbarStyle.backgroundSize = '100%';
        navbarStyle.backgroundPosition = 'left ' + part1.getBoundingClientRect().top + 'px';
    }
    if(part1.getBoundingClientRect().bottom <= navbar.getBoundingClientRect().bottom + 35)
        navbarStyle.background = 'white';
});

