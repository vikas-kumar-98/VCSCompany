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
         // Service page script page goes here.,,,,,
        // Counter Animation
        const counters = document.querySelectorAll('.counter');
        const speed = 200;
        
        const animateCounters = () => {
            counters.forEach(counter => {
                const target = +counter.getAttribute('data-target');
                const count = +counter.innerText;
                const increment = target / speed;
                
                if (count < target) {
                    counter.innerText = Math.ceil(count + increment);
                    setTimeout(animateCounters, 1);
                } else {
                    counter.innerText = target;
                }
            });
        };
        
        // Intersection Observer to trigger animation when section is in view
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounters();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(document.querySelector('.services-section'));
        
        // Add hover effect to service cards
        document.querySelectorAll('.service-card').forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const x = e.clientX - card.getBoundingClientRect().left;
                const y = e.clientY - card.getBoundingClientRect().top;
                
                const centerX = card.offsetWidth / 2;
                const centerY = card.offsetHeight / 2;
                
                const angleX = (y - centerY) / 20;
                const angleY = (centerX - x) / 20;
                
                card.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg) translateY(-10px)`;
                card.style.boxShadow = `20px 20px 40px rgba(0,0,0,0.2)`;
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(-10px)';
                card.style.boxShadow = '0 20px 40px rgba(0,0,0,0.15), 0 10px 10px rgba(0,0,0,0.05)';
            });
        });
         //End of service page script here..,,,

    // Team member section script goes here.....
        // Advanced interactive effects
        document.addEventListener('DOMContentLoaded', () => {
            const teamMembers = document.querySelectorAll('.team-member');
            
            // 3D tilt effect
            teamMembers.forEach(member => {
                member.addEventListener('mousemove', (e) => {
                    const x = e.clientX - member.getBoundingClientRect().left;
                    const y = e.clientY - member.getBoundingClientRect().top;
                    
                    const centerX = member.offsetWidth / 2;
                    const centerY = member.offsetHeight / 2;
                    
                    const angleX = (y - centerY) / 20;
                    const angleY = (centerX - x) / 20;
                    
                    member.style.transform = `translateY(-10px) scale(1.02) rotateX(${angleX}deg) rotateY(${angleY}deg)`;
                });
                
                member.addEventListener('mouseleave', () => {
                    member.style.transform = 'translateY(-10px) scale(1.02)';
                });
            });
            
            // Scroll animation
            const observer = new IntersectionObserver((entries) => {
                entries.forEach((entry, index) => {
                    if (entry.isIntersecting) {
                        setTimeout(() => {
                            entry.target.style.opacity = 1;
                            entry.target.style.transform = 'translateY(0)';
                        }, index * 150);
                    }
                });
            }, { threshold: 0.1 });
            
            teamMembers.forEach(member => {
                member.style.opacity = 0;
                member.style.transform = 'translateY(30px)';
                member.style.transition = 'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
                observer.observe(member);
            });
            
            // Skill tag animation on hover
            const skillTags = document.querySelectorAll('.skill-tag');
            skillTags.forEach(tag => {
                tag.addEventListener('mouseenter', () => {
                    tag.style.transform = 'translateY(-3px)';
                });
                tag.addEventListener('mouseleave', () => {
                    tag.style.transform = 'translateY(0)';
                });
            });
        });

    //End of team member section script here.....

      //Faq page section srcitp goes here.....
        document.addEventListener('DOMContentLoaded', function() {
            // FAQ Accordion Functionality
            const faqQuestions = document.querySelectorAll('.faq-question');
            
            faqQuestions.forEach(question => {
                question.addEventListener('click', () => {
                    const item = question.parentNode;
                    item.classList.toggle('active');
                    
                    // Close other open items
                    document.querySelectorAll('.faq-item').forEach(otherItem => {
                        if (otherItem !== item && otherItem.classList.contains('active')) {
                            otherItem.classList.remove('active');
                        }
                    });
                });
            });
            
            // FAQ Filter Functionality
            const filterBtns = document.querySelectorAll('.filter-btn');
            const faqItems = document.querySelectorAll('.faq-item');
            
            filterBtns.forEach(btn => {
                btn.addEventListener('click', () => {
                    // Update active button
                    filterBtns.forEach(b => b.classList.remove('active'));
                    btn.classList.add('active');
                    
                    const category = btn.dataset.category;
                    
                    // Filter items
                    faqItems.forEach(item => {
                        if (category === 'all' || item.dataset.category === category) {
                            item.style.display = 'block';
                        } else {
                            item.style.display = 'none';
                        }
                    });
                });
            });
            
            // Animate FAQ items on scroll
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.style.opacity = 1;
                        entry.target.style.transform = 'translateY(0)';
                    }
                });
            }, { threshold: 0.1 });
            
            faqItems.forEach(item => {
                item.style.opacity = 0;
                item.style.transform = 'translateY(20px)';
                item.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
                observer.observe(item);
            });
        });

      //End of faq page section script here....

        // testimonial slider script strat here.......

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

        //End of testimonial slider script here...


        
// ......................End of index page script here................................................
