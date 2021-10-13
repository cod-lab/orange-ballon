const navbar = document.getElementById('navbar');
const navbarStyle = navbar.style;

const down = document.getElementsByClassName('down')[0];
const part1 = down.getElementsByClassName('part1')[0];
// const part2 = down.getElementsByClassName('part2')[0];

// const logo = document.getElementsByClassName('logo')[0].firstElementChild;
// const logo = document.getElementsByClassName('logo')[0];
// const logo = document.getElementById('logo');
const logoStyle = navbar.getElementsByClassName('logo')[0].style;
// const logoStyle = logo.style;

const main = document.getElementsByTagName('main')[0];

const mainBackground = window.getComputedStyle(main).backgroundImage;
const down_part1_Background = window.getComputedStyle(part1).backgroundImage;

window.addEventListener('scroll', () => {
    // set header at top
    // const navbar = document.getElementById('navbar'); // .style;
    // const navbarStyle = navbar.style;
    // if(window.scrollY > 73) {
    // if(navbar.top !== '') {
    if(navbar.getBoundingClientRect().top < 0) {
        // navbar.style.position = 'fixed';
        navbarStyle.position = 'sticky';
        navbarStyle.top = 0;
        navbarStyle.boxShadow = '0 0 10px rgb(0 0 0 / 20%)';
        // navbar.style.width = '110%';
        // navbar.background = "url('/graphics/backgrounds/front/k.jpg')";
        // navbar.style.filter = "drop-shadow(3px 1px 6px #000000)";
        // navbar.backgroundSize = 'cover';
        // navbar.backgroundPosition = 'left -' + window.scrollY + 'px';

    }
    // navbar.style.backgroundPosition = 'left -73px';

    // if(window.scrollY < 73.3) {
    // else {
    if(navbar.getBoundingClientRect().top > 0) {
        navbarStyle.position = 'static';
        // navbar.style.top = 'static';
        // navbar.boxShadow = '0 0 0';     // ✔
        navbarStyle.boxShadow = '';
        // navbar.backgroundPosition = 'left -10vh';
        // navbar.backgroundPosition = 'left -10vh right -10vh';
        // navbar.backgroundPosition = 'top left -20vh';
        // navbar.backgroundSize = 'cover';
        // navbar.background = "url('/graphics/backgrounds/front/k.jpg')";
        // navbar.background = 'transparent';

    }

    // while(window.scrollY > 73) {
    /*while(navbar.getBoundingClientRect().top < 0) {
        navbarStyle.position = 'sticky';
        navbarStyle.top = 0;
        navbarStyle.boxShadow = '0 0 10px rgb(0 0 0 / 20%)';
    }*/


    // change logo on logo encounter with section 'down'
    // const down = document.getElementsByClassName('down')[0];
    // const logo = document.getElementsByClassName('logo')[0].firstElementChild;
    // if(down.getBoundingClientRect().top < 10)
    // if(down.getBoundingClientRect().top <= logo.getBoundingClientRect().bottom - ((logo.height/2) - 5))
    // if(down.getBoundingClientRect().top <= navbar.getBoundingClientRect().bottom)
    if(part1.getBoundingClientRect().top <= navbar.getBoundingClientRect().bottom)
        // logo.style.filter = 'invert(0.8)';
        // logo.src = '/graphics/logos/black.ico';
        // logoStyle.background = '/graphics/logos/black.ico';
    {
        logoStyle.background = "url('/graphics/logos/navbar/black.ico')";
        logoStyle.backgroundSize = '25px';
        logoStyle.backgroundRepeat = 'no-repeat';
        logoStyle.backgroundPosition = 'center center';
    }
        // if(down.getBoundingClientRect().top > 0)
    // else logo.style.filter = 'none';
    // else logo.src = '/graphics/logos/white.ico';
    // else logoStyle.background = "url('/graphics/logos/white.ico')";
    else {
        logoStyle.background = "url('/graphics/logos/navbar/white.ico')";
        logoStyle.backgroundSize = '25px';
        logoStyle.backgroundRepeat = 'no-repeat';
        logoStyle.backgroundPosition = 'center center';
    }


    // change header background on different sections encounter
    /*const allEles = document.getElementsByTagName("*");
    // console.log(allEles, typeof allEles);
    // allEles.forEach(ele => console.log(ele));
    for (let i=34; i<allEles.length-1; i++) {
        // console.log(allEles[i]);
        // if(i !== 24) {
            if(allEles[i].getBoundingClientRect().top <= navbar.getBoundingClientRect().bottom - 5)
                // allEles[i].style.opacity = 0;
                allEles[i].innerText= '';
        // }
    }*/

    // const main = document.getElementsByTagName('main')[0];
    // console.log(main.getBoundingClientRect().top);
    if(main.getBoundingClientRect().top >= 0) navbarStyle.background = '';
    // if(main.getBoundingClientRect().top <= navbar.getBoundingClientRect().bottom)
    if(main.getBoundingClientRect().top < 0) {
        // console.log(main.getBoundingClientRect().top);
        // navbarStyle.background = "url('/graphics/backgrounds/main/k.jpg')";
        // navbarStyle.background = window.getComputedStyle(main).backgroundImage;
        navbarStyle.background = mainBackground;
        navbarStyle.backgroundSize = '100%';
        navbarStyle.backgroundPosition = 'left -' + window.scrollY + 'px';
        // navbar.style.filter = "hue-rotate(348deg) grayscale(20%)";
    } // else navbarStyle.background = '';
    // if(down.getBoundingClientRect().top <= navbar.getBoundingClientRect().bottom) {
    if(part1.getBoundingClientRect().top <= navbar.getBoundingClientRect().bottom) {
        // navbarStyle.background = "url('/graphics/backgrounds/down/d.jpg')";
        // navbarStyle.background = window.getComputedStyle(down).backgroundImage;
        // navbarStyle.background = downBackground;
        navbarStyle.background = down_part1_Background;
        navbarStyle.backgroundSize = '100%';
        // navbarStyle.backgroundPosition = 'left ' + down.getBoundingClientRect().top + 'px';
        navbarStyle.backgroundPosition = 'left ' + part1.getBoundingClientRect().top + 'px';
    } // else navbarStyle.background = '';
    // if(down.getBoundingClientRect().top > navbar.getBoundingClientRect().bottom) {
    //     navbarStyle.background = '';
    // }

    if(part1.getBoundingClientRect().bottom <= navbar.getBoundingClientRect().bottom + 35)
        // navbarStyle.backgroundColor = 'white';
        navbarStyle.background = 'white';
});

