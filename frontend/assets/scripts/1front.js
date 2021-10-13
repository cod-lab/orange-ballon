window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar').style;
    // navbar.classList.toggle()
    if(window.scrollY > 73) {
        // navbar.style.position = 'fixed';
        navbar.position = 'sticky';
        navbar.top = 0;
        navbar.boxShadow = '0 0 10px rgb(0 0 0 / 20%)';
        // navbar.style.width = '110%';
        navbar.background = "url('/graphics/backgrounds/front/k.jpg')";
        // navbar.style.filter = "drop-shadow(3px 1px 6px #000000)";
        navbar.backgroundSize = 'cover';
        navbar.backgroundPosition = 'left -' + window.scrollY + 'px';

    }
    // navbar.style.backgroundPosition = 'left -73px';

    if(window.scrollY < 73.3) {
        navbar.position = 'static';
        // navbar.style.top = 'static';
        // navbar.boxShadow = '0 0 0';     // ✔
        navbar.boxShadow = 'none';
        navbar.backgroundPosition = 'left -10vh';
        // navbar.backgroundPosition = 'left -10vh right -10vh';
        // navbar.backgroundPosition = 'top left -20vh';
        // navbar.backgroundSize = 'cover';
        // navbar.background = "url('/graphics/backgrounds/front/k.jpg')";
        navbar.background = 'transparent';

    }

});

