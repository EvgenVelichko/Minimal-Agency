/** @format */

document.addEventListener('DOMContentLoaded', function () {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('nav ul li a');

    window.addEventListener('scroll', () => {
        let current = '';
        const scrollY = window.scrollY || window.pageYOffset;

        sections.forEach(section => {
            if (section && section.id) {
                const sectionTop =
                    section.offsetTop -
                    document.querySelector('header').offsetHeight;
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
    });

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (targetId === '#' || targetId === '') return;

            try {
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    const headerHeight =
                        document.querySelector('header').offsetHeight;
                    const elementPosition =
                        targetElement.getBoundingClientRect().top +
                        window.scrollY;
                    const offsetPosition = elementPosition - headerHeight;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth',
                    });
                }
            } catch (error) {
                console.error('Error selecting target element:', error);
            }
        });
    });

    const contactForm = document.querySelector('.contact-form form');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const inputs = this.querySelectorAll('input, textarea');
            let isValid = true;

            inputs.forEach(input => {
                if (!input.value.trim()) {
                    isValid = false;
                    input.style.borderColor = 'red';
                } else {
                    input.style.borderColor = '';
                }
            });

            if (isValid) {
                console.log('Form submitted:', {
                    name: this.querySelector('input[type="text"]').value,
                    email: this.querySelector('input[type="email"]').value,
                    message: this.querySelector('textarea').value,
                });
                alert("Thanks for your message! We'll be in touch soon.");
                this.reset();
            } else {
                alert('Please fill in all fields.');
            }
        });
    }
});
