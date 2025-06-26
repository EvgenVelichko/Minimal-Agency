/** @format */

document.addEventListener('DOMContentLoaded', function () {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('nav ul li a');
    const header = document.querySelector('header');

    const navigableSectionIds = Array.from(navLinks).map(link =>
        link.getAttribute('href').substring(1),
    );

    const updateNavLinkActiveState = () => {
        if (window.innerWidth <= 768) {
            navLinks.forEach(link => link.classList.remove('active'));
            return;
        }

        let currentSectionId = '';
        const headerHeight = header ? header.offsetHeight : 0;

        const activationLine = window.scrollY + headerHeight + 5;

        for (let i = sections.length - 1; i >= 0; i--) {
            const section = sections[i];
            const sectionId = section.id;

            if (sectionId && navigableSectionIds.includes(sectionId)) {
                if (activationLine >= section.offsetTop) {
                    currentSectionId = sectionId;
                    break;
                }
            }
        }

        if (!currentSectionId && window.scrollY < headerHeight + 100) {
            if (navigableSectionIds.includes('main-banner')) {
                currentSectionId = 'main-banner';
            } else if (navigableSectionIds.length > 0) {
                const firstNavigableSection = sections.find(s =>
                    navigableSectionIds.includes(s.id),
                );
                if (firstNavigableSection) {
                    currentSectionId = firstNavigableSection.id;
                }
            }
        }

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (
                link.getAttribute('href') &&
                link.getAttribute('href').substring(1) === currentSectionId
            ) {
                link.classList.add('active');
            }
        });
    };

    updateNavLinkActiveState();

    window.addEventListener('scroll', updateNavLinkActiveState);

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            const headerOffset = header ? header.offsetHeight : 0;
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition =
                elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth',
            });
        });
    });
});
