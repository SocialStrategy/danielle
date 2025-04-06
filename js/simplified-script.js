// Simplified navigation script for GitHub Pages compatibility
document.addEventListener('DOMContentLoaded', function() {
    // Get all navigation links and sections
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.section');
    const themeSwitch = document.getElementById('theme-switch');
    const menuToggle = document.getElementById('menu-toggle');
    const mainNav = document.getElementById('main-nav');
    const actionCheckboxes = document.querySelectorAll('.action-checkbox');
    
    // Set default to light mode
    document.body.classList.remove('dark-mode');
    
    // Simple navigation - add click event to each link
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Get target section id from href
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            // Only proceed if target section exists
            if (targetSection) {
                // Remove active class from all links and sections
                navLinks.forEach(link => link.classList.remove('active'));
                sections.forEach(section => section.classList.remove('active'));
                
                // Add active class to clicked link and target section
                this.classList.add('active');
                targetSection.classList.add('active');
                
                // Close mobile menu if open
                if (mainNav.classList.contains('active')) {
                    mainNav.classList.remove('active');
                    document.querySelector('.hamburger').classList.remove('active');
                }
                
                // Update URL hash
                window.location.hash = targetId;
            }
        });
    });
    
    // Handle initial load with hash in URL
    if (window.location.hash) {
        const hash = window.location.hash.substring(1);
        const targetSection = document.getElementById(hash);
        const targetLink = document.querySelector(`.nav-link[href="#${hash}"]`);
        
        if (targetSection && targetLink) {
            // Remove active class from all links and sections
            navLinks.forEach(link => link.classList.remove('active'));
            sections.forEach(section => section.classList.remove('active'));
            
            // Add active class to target link and section
            targetLink.classList.add('active');
            targetSection.classList.add('active');
        }
    }
    
    // Mobile menu toggle
    menuToggle.addEventListener('click', function() {
        mainNav.classList.toggle('active');
        this.querySelector('.hamburger').classList.toggle('active');
    });
    
    // Theme toggle
    themeSwitch.addEventListener('click', function() {
        document.body.classList.toggle('dark-mode');
        const themeIcon = this.querySelector('i');
        
        if (document.body.classList.contains('dark-mode')) {
            themeIcon.className = 'fas fa-sun';
            localStorage.setItem('theme', 'dark');
        } else {
            themeIcon.className = 'fas fa-moon';
            localStorage.setItem('theme', 'light');
        }
    });
    
    // Load saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        themeSwitch.querySelector('i').className = 'fas fa-sun';
    }
    
    // Save checkbox states
    actionCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            const checkboxStates = {};
            actionCheckboxes.forEach(cb => {
                checkboxStates[cb.id] = cb.checked;
            });
            localStorage.setItem('checkboxStates', JSON.stringify(checkboxStates));
            updateProgressIndicators();
        });
        
        // Load saved checkbox state
        const savedStates = JSON.parse(localStorage.getItem('checkboxStates') || '{}');
        if (savedStates[checkbox.id]) {
            checkbox.checked = savedStates[checkbox.id];
        }
    });
    
    // Update progress indicators
    updateProgressIndicators();
    
    // Function to update progress indicators
    function updateProgressIndicators() {
        const contentCheckboxes = document.querySelectorAll('.content-checkbox');
        const platformCheckboxes = document.querySelectorAll('.platform-checkbox');
        const engagementCheckboxes = document.querySelectorAll('.engagement-checkbox');
        const analyticsCheckboxes = document.querySelectorAll('.analytics-checkbox');
        const allCheckboxes = document.querySelectorAll('.action-checkbox');
        
        updateProgressBar('content-progress', contentCheckboxes);
        updateProgressBar('platform-progress', platformCheckboxes);
        updateProgressBar('engagement-progress', engagementCheckboxes);
        updateProgressBar('analytics-progress', analyticsCheckboxes);
        updateProgressBar('overall-progress', allCheckboxes);
    }
    
    // Function to update a specific progress bar
    function updateProgressBar(barId, checkboxes) {
        const progressBar = document.getElementById(barId);
        if (!progressBar || checkboxes.length === 0) return;
        
        const checkedCount = Array.from(checkboxes).filter(cb => cb.checked).length;
        const percentage = Math.round((checkedCount / checkboxes.length) * 100);
        
        progressBar.style.width = percentage + '%';
        progressBar.textContent = percentage + '%';
    }
});
