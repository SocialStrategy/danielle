document.addEventListener('DOMContentLoaded', function() {
    // Initialize theme toggle with light mode as default
    initThemeToggle(false);
    
    // Initialize navigation
    initNavigation();
    
    // Initialize platform tabs
    initPlatformTabs();
    
    // Initialize platform metric tabs
    initPlatformMetricTabs();
    
    // Initialize checkboxes
    initCheckboxes();
});

// Theme Toggle Functionality
function initThemeToggle(isDarkMode) {
    const themeSwitch = document.getElementById('theme-switch');
    const themeIcon = themeSwitch.querySelector('i');
    
    // Set initial theme based on parameter (false = light mode, true = dark mode)
    if (isDarkMode) {
        document.body.classList.add('dark-mode');
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
    } else {
        document.body.classList.remove('dark-mode');
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
    }
    
    // Toggle theme on click
    themeSwitch.addEventListener('click', function() {
        document.body.classList.toggle('dark-mode');
        
        if (document.body.classList.contains('dark-mode')) {
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
            localStorage.setItem('theme', 'dark');
        } else {
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
            localStorage.setItem('theme', 'light');
        }
    });
}

// Navigation Functionality
function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.section');
    const menuToggle = document.getElementById('menu-toggle');
    const mainNav = document.getElementById('main-nav');
    
    // Handle navigation link clicks
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Get the target section ID from the href attribute
            const targetId = this.getAttribute('href').substring(1);
            
            // Remove active class from all links and sections
            navLinks.forEach(link => link.classList.remove('active'));
            sections.forEach(section => section.classList.remove('active'));
            
            // Add active class to clicked link and target section
            this.classList.add('active');
            document.getElementById(targetId).classList.add('active');
            
            // Close mobile menu if open
            if (window.innerWidth <= 768) {
                mainNav.classList.remove('active');
            }
            
            // Scroll to top
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    });
    
    // Mobile menu toggle
    menuToggle.addEventListener('click', function() {
        mainNav.classList.toggle('active');
    });
    
    // Close mobile menu on window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            mainNav.classList.remove('active');
        }
    });
}

// Platform Tabs Functionality
function initPlatformTabs() {
    const platformTabs = document.querySelectorAll('.platform-tab');
    
    platformTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const platform = this.getAttribute('data-platform');
            
            // Remove active class from all tabs
            platformTabs.forEach(tab => tab.classList.remove('active'));
            
            // Add active class to clicked tab
            this.classList.add('active');
            
            // Hide all platform content
            document.querySelectorAll('.platform-content').forEach(content => {
                content.style.display = 'none';
            });
            
            // Show selected platform content
            document.getElementById(`${platform}-content`).style.display = 'block';
        });
    });
    
    // Set first tab as active by default
    if (platformTabs.length > 0) {
        platformTabs[0].click();
    }
}

// Platform Metric Tabs Functionality
function initPlatformMetricTabs() {
    const platformMetricTabs = document.querySelectorAll('.platform-metric-tab');
    
    platformMetricTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const platformMetric = this.getAttribute('data-platform-metric');
            
            // Remove active class from all tabs
            platformMetricTabs.forEach(tab => tab.classList.remove('active'));
            
            // Add active class to clicked tab
            this.classList.add('active');
            
            // Hide all platform metric content
            document.querySelectorAll('.platform-metric-content').forEach(content => {
                content.style.display = 'none';
            });
            
            // Show selected platform metric content
            document.getElementById(`${platformMetric}-metric-content`).style.display = 'block';
        });
    });
    
    // Set first tab as active by default
    if (platformMetricTabs.length > 0) {
        platformMetricTabs[0].click();
    }
}

// Checkbox Functionality
function initCheckboxes() {
    // Get all checkboxes with class 'action-checkbox'
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    
    // Load saved checkbox states from localStorage
    loadCheckboxStates();
    
    // Add event listeners to checkboxes
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            // Save checkbox state to localStorage
            saveCheckboxState(this.id, this.checked);
        });
    });
}

// Save checkbox state to localStorage
function saveCheckboxState(id, isChecked) {
    localStorage.setItem(`checkbox_${id}`, isChecked);
}

// Load checkbox states from localStorage
function loadCheckboxStates() {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    
    checkboxes.forEach(checkbox => {
        const savedState = localStorage.getItem(`checkbox_${checkbox.id}`);
        
        if (savedState !== null) {
            checkbox.checked = savedState === 'true';
        }
    });
}
