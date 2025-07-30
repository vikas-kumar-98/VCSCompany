//header navigation and mobile menu functionality ...........
        // Header shrink on scroll
        const mainHeader = document.getElementById('main-header');
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) { // Adjust scroll threshold as needed
                mainHeader.classList.add('scrolled');
            } else {
                mainHeader.classList.remove('scrolled');
            }
        });

        // Mobile menu toggle functionality
        const mobileMenuButton = document.getElementById('mobile-menu-button');
        const mobileMenu = document.getElementById('mobile-menu');

        mobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('active');
            // Toggle the hamburger icon to an 'X'
            const icon = mobileMenuButton.querySelector('i');
            if (mobileMenu.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });

        // Function to toggle sub-menus in mobile navigation
        function toggleSubMenu(button) {
            const subMenu = button.nextElementSibling;
            const icon = button.querySelector('i');
            subMenu.classList.toggle('hidden');
            icon.classList.toggle('fa-chevron-down');
            icon.classList.toggle('fa-chevron-up');
        }

//End of header navigaion and mobile menu functionality..................................

// Start of back to top button functionality ...........

        // Back to Top Button
        const backToTop = document.getElementById('backToTop');
        
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
        });
        
        backToTop.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
// End of back to top button functionality ................

