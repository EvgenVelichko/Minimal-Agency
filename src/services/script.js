/** @format */

document.addEventListener('DOMContentLoaded', function () {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('nav ul li a');
    const header = document.querySelector('header');

    const updateNavLinkActiveState = () => {
        if (window.innerWidth <= 768) {
            navLinks.forEach(link => link.classList.remove('active'));
            return;
        }

        let current = '';
        const scrollY = window.scrollY || window.pageYOffset;
        const headerHeight = header ? header.offsetHeight : 0;

        sections.forEach(section => {
            if (section && section.id) {
                const sectionTop = section.offsetTop - headerHeight - 1;
                const sectionHeight = section.clientHeight;

                if (
                    scrollY >= sectionTop &&
                    scrollY < sectionTop + sectionHeight
                ) {
                    current = section.getAttribute('id');
                }
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (
                link.getAttribute('href') &&
                link.getAttribute('href').substring(1) === current
            ) {
                link.classList.add('active');
            }
        });
    };

    updateNavLinkActiveState();
    window.addEventListener('scroll', updateNavLinkActiveState);
});
