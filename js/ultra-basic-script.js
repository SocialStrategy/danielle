// Ultra-basic navigation script
document.addEventListener('DOMContentLoaded', function() {
    // Direct click handlers for each navigation link
    document.querySelectorAll('.nav-link').forEach(function(link) {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Get the target section ID
            const targetId = this.getAttribute('href').substring(1);
            
            // Hide all sections
            document.querySelectorAll('.section').forEach(function(section) {
                section.style.display = 'none';
            });
            
            // Show the target section
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                targetSection.style.display = 'block';
            }
            
            // Update active class on navigation links
            document.querySelectorAll('.nav-link').forEach(function(navLink) {
                navLink.classList.remove('active');
            });
            this.classList.add('active');
            
            // Close mobile menu if open
            const mainNav = document.getElementById('main-nav');
            if (mainNav && mainNav.classList.contains('active')) {
                mainNav.classList.remove('active');
                const hamburger = document.querySelector('.hamburger');
                if (hamburger) {
                    hamburger.classList.remove('active');
                }
            }
        });
    });
    
    // Handle mobile menu toggle
    const menuToggle = document.getElementById('menu-toggle');
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            const mainNav = document.getElementById('main-nav');
            if (mainNav) {
                mainNav.classList.toggle('active');
                const hamburger = this.querySelector('.hamburger');
                if (hamburger) {
                    hamburger.classList.toggle('active');
                }
            }
        });
    }
    
    // Handle theme toggle
    const themeSwitch = document.getElementById('theme-switch');
    if (themeSwitch) {
        themeSwitch.addEventListener('click', function() {
            document.body.classList.toggle('dark-mode');
            const themeIcon = this.querySelector('i');
            if (themeIcon) {
                if (document.body.classList.contains('dark-mode')) {
                    themeIcon.className = 'fas fa-sun';
                    localStorage.setItem('theme', 'dark');
                } else {
                    themeIcon.className = 'fas fa-moon';
                    localStorage.setItem('theme', 'light');
                }
            }
        });
    }
    
    // Load saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        const themeIcon = document.querySelector('#theme-switch i');
        if (themeIcon) {
            themeIcon.className = 'fas fa-sun';
        }
    }
    
    // Handle checkbox state saving
    document.querySelectorAll('.action-checkbox').forEach(function(checkbox) {
        checkbox.addEventListener('change', function() {
            localStorage.setItem(this.id, this.checked);
        });
        
        // Load saved checkbox state
        const savedState = localStorage.getItem(checkbox.id);
        if (savedState === 'true') {
            checkbox.checked = true;
        }
    });
    
    // Initialize - show first section or section from hash
    if (window.location.hash) {
        // If URL has hash, trigger click on corresponding nav link
        const hash = window.location.hash.substring(1);
        const navLink = document.querySelector(`.nav-link[href="#${hash}"]`);
        if (navLink) {
            navLink.click();
        }
    } else {
        // Otherwise show the first section
        const firstSection = document.querySelector('.section');
        if (firstSection) {
            firstSection.style.display = 'block';
        }
    }
});
