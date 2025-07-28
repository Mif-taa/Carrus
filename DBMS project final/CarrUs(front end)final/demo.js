const hamburgerMenu = document.querySelector('.hamburger-menu');
const dropdownMenu = document.getElementById('dropdown-menu');

function toggleMenu() {
    const isExpanded = hamburgerMenu.getAttribute('aria-expanded') === 'true';
    hamburgerMenu.setAttribute('aria-expanded', !isExpanded);
    dropdownMenu.classList.toggle('active');
}

hamburgerMenu.addEventListener('click', toggleMenu);
