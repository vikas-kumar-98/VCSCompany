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


//.........................Index page script here......................................
        document.addEventListener('DOMContentLoaded', function() {
            // DOM Elements
            const track = document.querySelector('.testimonials-track');
            const cards = document.querySelectorAll('.testimonial-card');
            const dots = document.querySelectorAll('.nav-dot');
            const prevBtn = document.querySelector('.prev');
            const nextBtn = document.querySelector('.next');
            const themeToggle = document.querySelector('.theme-toggle');
            
            // State variables
            let currentIndex = 0;
            let autoPlayInterval;
            const originalCardCount = 4; // Original testimonials (not including clones)
            const isDesktop = window.matchMedia('(min-width: 900px)').matches;
            const cardsToShow = isDesktop ? 3 : 1;
            
            // Initialize
            updateTrackPosition();
            startAutoPlay();
            setupEventListeners();
            
            // Functions
            function updateTrackPosition() {
                const cardWidth = 100 / cardsToShow;
                track.style.transform = `translateX(-${currentIndex * cardWidth}%)`;
                
                // Update aria-hidden attributes
                cards.forEach((card, index) => {
                    // For desktop with 3 cards visible, we need to check a range
                    if (isDesktop) {
                        const isVisible = index >= currentIndex && index < currentIndex + cardsToShow;
                        card.setAttribute('aria-hidden', !isVisible);
                    } else {
                        card.setAttribute('aria-hidden', index !== currentIndex);
                    }
                });
                
                // Update active dot (only for original testimonials)
                dots.forEach((dot, index) => {
                    // For desktop, we need to handle the clone testimonials
                    let effectiveIndex = currentIndex;
                    if (isDesktop && currentIndex >= originalCardCount) {
                        effectiveIndex = currentIndex - originalCardCount;
                    }
                    dot.classList.toggle('active', index === effectiveIndex % originalCardCount);
                });
            }
            
            function goToIndex(index) {
                // Handle wrap-around for infinite slider
                if (index < 0) {
                    // If going left from first item, jump to the cloned items at the end
                    index = originalCardCount + Math.floor(originalCardCount / cardsToShow);
                } else if (index > originalCardCount) {
                    // If going right past the original items, reset to start
                    index = 0;
                }
                
                currentIndex = index;
                updateTrackPosition();
                resetAutoPlay();
                
                // If we're at the cloned items, silently reset to original position
                if (isDesktop && currentIndex >= originalCardCount) {
                    setTimeout(() => {
                        currentIndex = currentIndex - originalCardCount;
                        track.style.transition = 'none';
                        updateTrackPosition();
                        // Force reflow
                        track.offsetHeight;
                        track.style.transition = 'transform 0.5s ease';
                    }, 500);
                }
            }
            
            function startAutoPlay() {
                autoPlayInterval = setInterval(() => {
                    goToIndex(currentIndex + 1);
                }, 5000);
            }
            
            function resetAutoPlay() {
                clearInterval(autoPlayInterval);
                startAutoPlay();
            }
            
            function setupEventListeners() {
                // Navigation dots
                dots.forEach((dot, index) => {
                    dot.addEventListener('click', () => goToIndex(index));
                });
                
                // Arrow buttons
                prevBtn.addEventListener('click', () => goToIndex(currentIndex - 1));
                nextBtn.addEventListener('click', () => goToIndex(currentIndex + 1));
                
                // Keyboard navigation
                document.addEventListener('keydown', (e) => {
                    if (e.key === 'ArrowLeft') goToIndex(currentIndex - 1);
                    if (e.key === 'ArrowRight') goToIndex(currentIndex + 1);
                });
                
                // Pause autoplay on hover
                track.addEventListener('mouseenter', () => clearInterval(autoPlayInterval));
                track.addEventListener('mouseleave', startAutoPlay);
                
                // Touch events for mobile swipe
                let touchStartX = 0;
                let touchEndX = 0;
                
                track.addEventListener('touchstart', (e) => {
                    touchStartX = e.changedTouches[0].screenX;
                    clearInterval(autoPlayInterval);
                }, {passive: true});
                
                track.addEventListener('touchend', (e) => {
                    touchEndX = e.changedTouches[0].screenX;
                    handleSwipe();
                    startAutoPlay();
                }, {passive: true});
                
                function handleSwipe() {
                    const threshold = 50;
                    if (touchStartX - touchEndX > threshold) {
                        goToIndex(currentIndex + 1); // Swipe left
                    } else if (touchEndX - touchStartX > threshold) {
                        goToIndex(currentIndex - 1); // Swipe right
                    }
                }
                
                // Theme toggle
                themeToggle.addEventListener('click', toggleTheme);
                
                // Check for preferred color scheme
                if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
                    document.documentElement.setAttribute('data-theme', 'dark');
                }
                
                // Handle window resize
                window.addEventListener('resize', handleResize);
            }
            
            function handleResize() {
                const wasDesktop = isDesktop;
                const nowDesktop = window.matchMedia('(min-width: 900px)').matches;
                
                if (wasDesktop !== nowDesktop) {
                    // Reset position when switching between mobile and desktop
                    currentIndex = 0;
                    updateTrackPosition();
                }
            }
            
            function toggleTheme() {
                const currentTheme = document.documentElement.getAttribute('data-theme');
                const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
                document.documentElement.setAttribute('data-theme', newTheme);
                
                // Update button emoji
                themeToggle.textContent = newTheme === 'dark' ? '🌓' : '🌒';
                
                // Save preference to localStorage
                localStorage.setItem('theme', newTheme);
            }
            
            // Check for saved theme preference
            const savedTheme = localStorage.getItem('theme');
            if (savedTheme) {
                document.documentElement.setAttribute('data-theme', savedTheme);
                themeToggle.textContent = savedTheme === 'dark' ? '🌓' : '🌒';
            }
        });

// ......................End of index page script here................................................
