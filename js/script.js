// Enhanced JavaScript functionality for Version 2 of the social media strategy website

// DOM Elements
document.addEventListener('DOMContentLoaded', () => {
    // Core DOM Elements
    const body = document.body;
    const header = document.querySelector('header');
    const themeSwitch = document.getElementById('theme-switch');
    const themeIcon = themeSwitch.querySelector('i');
    const menuToggle = document.getElementById('menu-toggle');
    const hamburger = menuToggle.querySelector('.hamburger');
    const mainNav = document.getElementById('main-nav');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.section');
    const platformTabs = document.querySelectorAll('.platform-tab');
    const platformContents = document.querySelectorAll('.platform-content');
    const platformMetricTabs = document.querySelectorAll('.platform-metric-tab');
    const platformMetricContents = document.querySelectorAll('.platform-metric-content');
    const actionCheckboxes = document.querySelectorAll('.action-checkbox');
    const saveButton = document.getElementById('save-progress');
    const saveStatus = document.getElementById('save-status');
    
    // Create back to top button
    createBackToTopButton();
    
    // Create accordions
    createAccordions();
    
    // Add key takeaways sections
    addKeyTakeaways();
    
    // Load saved theme preference
    loadThemePreference();
    
    // Load saved checkbox states
    loadCheckboxStates();
    
    // Set up event listeners
    setupEventListeners();
    
    // Initialize the first section as active if no hash in URL
    if (!window.location.hash) {
        const firstNavLink = document.querySelector('.nav-link');
        if (firstNavLink) {
            firstNavLink.classList.add('active');
            const targetId = firstNavLink.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                targetSection.classList.add('active');
            } else {
                console.error(`Section with ID "${targetId}" not found during initialization`);
            }
        }
    } else {
        // If there's a hash in the URL, activate the corresponding section
        const hash = window.location.hash.substring(1);
        const targetSection = document.getElementById(hash);
        const targetLink = document.querySelector(`.nav-link[href="#${hash}"]`);
        
        if (targetSection && targetLink) {
            // Remove active class from all links and sections
            document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('active'));
            document.querySelectorAll('.section').forEach(section => section.classList.remove('active'));
            
            // Add active class to the target link and section
            targetLink.classList.add('active');
            targetSection.classList.add('active');
        }
    }
});

// Create back to top button
function createBackToTopButton() {
    const backToTopButton = document.createElement('div');
    backToTopButton.className = 'back-to-top';
    backToTopButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
    document.body.appendChild(backToTopButton);
    
    // Show/hide back to top button based on scroll position
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }
    });
    
    // Scroll to top when button is clicked
    backToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Create accordions for content sections
function createAccordions() {
    // Find sections that should be accordions (h3 or h4 followed by content)
    const contentSections = document.querySelectorAll('.section-content');
    
    contentSections.forEach(section => {
        const headings = section.querySelectorAll('h3, h4');
        
        headings.forEach(heading => {
            // Skip headings that are already part of other components
            if (heading.closest('.key-takeaways') || 
                heading.closest('.accordion') || 
                heading.closest('.service-card') ||
                heading.closest('.competitor-card') ||
                heading.closest('.audience-card') ||
                heading.closest('.insight-card') ||
                heading.closest('.pillar-card') ||
                heading.closest('.seo-card') ||
                heading.closest('.tactic-card') ||
                heading.closest('.metric-card') ||
                heading.closest('.analytics-card') ||
                heading.closest('.timeline-phase') ||
                heading.closest('.next-steps-card')) {
                return;
            }
            
            // Get all content until the next heading
            let content = [];
            let nextElement = heading.nextElementSibling;
            
            while (nextElement && !['H3', 'H4'].includes(nextElement.tagName)) {
                content.push(nextElement.outerHTML);
                nextElement = nextElement.nextElementSibling;
            }
            
            // Only create accordion if there's content
            if (content.length > 0) {
                const accordionHTML = `
                    <div class="accordion">
                        <div class="accordion-header">
                            <h4>${heading.textContent}</h4>
                            <div class="accordion-icon">
                                <i class="fas fa-chevron-down"></i>
                            </div>
                        </div>
                        <div class="accordion-content">
                            <div class="accordion-content-inner">
                                ${content.join('')}
                            </div>
                        </div>
                    </div>
                `;
                
                // Replace the heading and content with the accordion
                const tempDiv = document.createElement('div');
                tempDiv.innerHTML = accordionHTML;
                const accordion = tempDiv.firstElementChild;
                
                heading.parentNode.insertBefore(accordion, heading);
                
                // Remove the original elements
                heading.remove();
                content.forEach((_, index) => {
                    if (accordion.nextElementSibling && !['H3', 'H4'].includes(accordion.nextElementSibling.tagName)) {
                        accordion.nextElementSibling.remove();
                    }
                });
                
                // Add event listener to toggle accordion
                const accordionHeader = accordion.querySelector('.accordion-header');
                const accordionContent = accordion.querySelector('.accordion-content');
                
                accordionHeader.addEventListener('click', () => {
                    accordionHeader.classList.toggle('active');
                    
                    if (accordionHeader.classList.contains('active')) {
                        accordionContent.style.maxHeight = accordionContent.scrollHeight + 'px';
                    } else {
                        accordionContent.style.maxHeight = 0;
                    }
                });
            }
        });
    });
}

// Add key takeaways to each section
function addKeyTakeaways() {
    const sections = document.querySelectorAll('.section');
    
    sections.forEach(section => {
        const sectionContent = section.querySelector('.section-content');
        if (!sectionContent) return;
        
        // Skip if key takeaways already exists
        if (sectionContent.querySelector('.key-takeaways')) return;
        
        // Get section ID to determine content
        const sectionId = section.id;
        let takeaways = [];
        
        switch(sectionId) {
            case 'overview':
                takeaways = [
                    'This strategy integrates Chinese medicine and astrology for a unique social media approach',
                    'Content pillars focus on seasonal cycles and astrological events',
                    'Platform-specific strategies are tailored to each channel's unique features',
                    'Implementation follows a phased approach for sustainable growth'
                ];
                break;
            case 'business-profile':
                takeaways = [
                    'Danielle offers a unique blend of Chinese medicine and astrology',
                    'Services include both in-person and remote consultations',
                    'Brand voice is knowledgeable, compassionate, and authentic',
                    'Current online presence has growth potential across platforms'
                ];
                break;
            case 'competitor-analysis':
                takeaways = [
                    'Top competitors blend traditional practices with modern wellness approaches',
                    'Successful practitioners maintain consistent posting schedules',
                    'Educational content performs best across all platforms',
                    'Danielle's unique integration of astrology and Chinese medicine is a key differentiator'
                ];
                break;
            case 'target-audience':
                takeaways = [
                    'Primary audience is women 25-55 interested in holistic health',
                    'Audience values authenticity, education, and personalized approaches',
                    'Content should address both physical and spiritual wellness',
                    'Platform preferences vary by demographic segments'
                ];
                break;
            case 'content-strategy':
                takeaways = [
                    'Content is organized around five core pillars aligned with Danielle's expertise',
                    'Seasonal themes follow both traditional Chinese medicine and astrological cycles',
                    'Educational content should balance depth with accessibility',
                    'Visual identity should reflect both natural and celestial elements'
                ];
                break;
            case 'platform-strategies':
                takeaways = [
                    'Each platform requires tailored content formats and posting frequencies',
                    'Instagram and Facebook serve as primary platforms for community building',
                    'TikTok and YouTube provide opportunities for educational content',
                    'Email marketing nurtures deeper relationships with interested prospects'
                ];
                break;
            case 'engagement-tactics':
                takeaways = [
                    'Authentic engagement is prioritized over vanity metrics',
                    'Community building focuses on creating valuable conversations',
                    'Collaboration with aligned practitioners amplifies reach',
                    'Consistent response patterns build audience trust'
                ];
                break;
            case 'metrics-analytics':
                takeaways = [
                    'Focus on measuring both engagement metrics and business outcomes',
                    'Monthly review cycles help optimize content strategy',
                    'Platform-specific KPIs track performance across channels',
                    'Analytics should inform content adjustments and resource allocation'
                ];
                break;
            case 'action-items':
                takeaways = [
                    'Implementation follows a phased approach over 90 days',
                    'Foundation phase establishes basic presence and content systems',
                    'Growth phase expands content and engagement strategies',
                    'Optimization phase refines approach based on performance data'
                ];
                break;
            default:
                takeaways = [];
        }
        
        // Only add key takeaways if we have content
        if (takeaways.length > 0) {
            const takeawaysHTML = `
                <div class="key-takeaways">
                    <h4>Key Takeaways</h4>
                    <ul>
                        ${takeaways.map(item => `<li>${item}</li>`).join('')}
                    </ul>
                </div>
            `;
            
            // Insert at the beginning of the section content
            sectionContent.insertAdjacentHTML('afterbegin', takeawaysHTML);
        }
    });
}

// Set up all event listeners
function setupEventListeners() {
    const header = document.querySelector('header');
    const themeSwitch = document.getElementById('theme-switch');
    const menuToggle = document.getElementById('menu-toggle');
    const hamburger = menuToggle.querySelector('.hamburger');
    const mainNav = document.getElementById('main-nav');
    const navLinks = document.querySelectorAll('.nav-link');
    const platformTabs = document.querySelectorAll('.platform-tab');
    const platformMetricTabs = document.querySelectorAll('.platform-metric-tab');
    const actionCheckboxes = document.querySelectorAll('.action-checkbox');
    const saveButton = document.getElementById('save-progress');
    
    // Header scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Theme toggle
    themeSwitch.addEventListener('click', toggleTheme);
    
    // Mobile menu toggle
    menuToggle.addEventListener('click', () => {
        mainNav.classList.toggle('active');
        hamburger.classList.toggle('active');
    });
    
    // Navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            handleNavigation.call(this, e);
        });
    });
    
    // Update active nav based on scroll position
    window.addEventListener('scroll', updateActiveNavOnScroll);
    
    // Platform tabs
    platformTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            switchPlatformTab(tab);
        });
    });
    
    // Platform metric tabs
    platformMetricTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            switchPlatformMetricTab(tab);
        });
    });
    
    // Action checkboxes
    actionCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', () => {
            saveCheckboxStates();
            updateProgressIndicators();
        });
    });
    
    // Save button
    if (saveButton) {
        saveButton.addEventListener('click', handleSaveProgress);
    }
    
    // Accordion headers (for any that might be added dynamically)
    document.addEventListener('click', (e) => {
        if (e.target.closest('.accordion-header')) {
            const header = e.target.closest('.accordion-header');
            const content = header.nextElementSibling;
            
            header.classList.toggle('active');
            
            if (header.classList.contains('active')) {
                content.style.maxHeight = content.scrollHeight + 'px';
            } else {
                content.style.maxHeight = 0;
            }
        }
    });
}

// Toggle between light and dark theme
function toggleTheme() {
    const body = document.body;
    const themeIcon = document.querySelector('#theme-switch i');
    
    body.classList.toggle('dark-mode');
    
    // Update theme icon
    if (body.classList.contains('dark-mode')) {
        themeIcon.className = 'fas fa-sun';
        localStorage.setItem('theme', 'dark');
    } else {
        themeIcon.className = 'fas fa-moon';
        localStorage.setItem('theme', 'light');
    }
}

// Load saved theme preference from localStorage
function loadThemePreference() {
    const body = document.body;
    const themeIcon = document.querySelector('#theme-switch i');
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme === 'dark') {
        body.classList.add('dark-mode');
        themeIcon.className = 'fas fa-sun';
    } else {
        body.classList.remove('dark-mode');
        themeIcon.className = 'fas fa-moon';
    }
    
    // If no theme preference is saved, default to light mode
    if (savedTheme === null) {
        body.classList.remove('dark-mode');
        themeIcon.className = 'fas fa-moon';
        localStorage.setItem('theme', 'light');
    }
}

// Handle navigation link clicks
function handleNavigation(e) {
    e.preventDefault();
    
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.section');
    const mainNav = document.getElementById('main-nav');
    const hamburger = document.querySelector('.hamburger');
    
    // Get the target section ID from the href
    const targetId = this.getAttribute('href').substring(1);
    const targetSection = document.getElementById(targetId);
    
    // Check if target section exists
    if (!targetSection) {
        console.error(`Section with ID "${targetId}" not found`);
        return;
    }
    
    // Remove active class from all links and sections
    navLinks.forEach(link => link.classList.remove('active'));
    sections.forEach(section => section.classList.remove('active'));
    
    // Add active class to clicked link and target section
    this.classList.add('active');
    targetSection.classList.add('active');
    
    // Close mobile menu if open
    if (mainNav.classList.contains('active')) {
        mainNav.classList.remove('active');
        hamburger.classList.remove('active');
    }
    
    // Update URL hash without scrolling
    history.pushState(null, null, `#${targetId}`);
    
    // Scroll to top of the section with offset for header
    window.scrollTo({
        top: targetSection.offsetTop - 80,
        behavior: 'smooth'
    });
}

// Update active navigation link based on scroll position
function updateActiveNavOnScroll() {
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Get current scroll position
    const scrollPosition = window.scrollY + 100; // Adding offset
    
    // Find the current section
    sections.forEach(section => {
        if (section.classList.contains('active')) {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                // Find the corresponding nav link
                const sectionId = section.getAttribute('id');
                
                navLinks.forEach(link => {
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        // Update active state in navigation
                        navLinks.forEach(navLink => {
                            navLink.parentElement.classList.remove('active');
                        });
                        link.parentElement.classList.add('active');
                    }
                });
            }
        }
    });
}

// Switch between platform tabs
function switchPlatformTab(clickedTab) {
    const platformTabs = document.querySelectorAll('.platform-tab');
    const platformContents = document.querySelectorAll('.platform-content');
    const platform = clickedTab.getAttribute('data-platform');
    const targetContent = document.getElementById(`${platform}-content`);
    
    // Remove active class from all tabs and contents
    platformTabs.forEach(tab => tab.classList.remove('active'));
    platformContents.forEach(content => content.classList.remove('active'));
    
    // Add active class to clicked tab and target content
    clickedTab.classList.add('active');
    targetContent.classList.add('active');
}

// Switch between platform metric tabs
function switchPlatformMetricTab(clickedTab) {
    const platformMetricTabs = document.querySelectorAll('.platform-metric-tab');
    const platformMetricContents = document.querySelectorAll('.platform-metric-content');
    const platform = clickedTab.getAttribute('data-platform-metric');
    const targetContent = document.getElementById(`${platform}-metric-content`);
    
    // Remove active class from all tabs and contents
    platformMetricTabs.forEach(tab => tab.classList.remove('active'));
    platformMetricContents.forEach(content => content.classList.remove('active'));
    
    // Add active class to clicked tab and target content
    clickedTab.classList.add('active');
    targetContent.classList.add('active');
}

// Save checkbox states to localStorage
function saveCheckboxStates() {
    const actionCheckboxes = document.querySelectorAll('.action-checkbox');
    const checkboxStates = {};
    
    actionCheckboxes.forEach(checkbox => {
        checkboxStates[checkbox.id] = checkbox.checked;
    });
    
    localStorage.setItem('checkboxStates', JSON.stringify(checkboxStates));
}

// Load checkbox states from localStorage
function loadCheckboxStates() {
    const actionCheckboxes = document.querySelectorAll('.action-checkbox');
    const savedStates = localStorage.getItem('checkboxStates');
    
    if (savedStates) {
        const checkboxStates = JSON.parse(savedStates);
        
        actionCheckboxes.forEach(checkbox => {
            if (checkboxStates[checkbox.id] !== undefined) {
                checkbox.checked = checkboxStates[checkbox.id];
            }
        });
        
        // Update progress indicators after loading states
        updateProgressIndicators();
    }
}

// Update progress indicators based on checkbox states
function updateProgressIndicators() {
    // Calculate overall progress
    const actionCheckboxes = document.querySelectorAll('.action-checkbox');
    const totalCheckboxes = actionCheckboxes.length;
    let checkedCheckboxes = 0;
    
    actionCheckboxes.forEach(checkbox => {
        if (checkbox.checked) {
            checkedCheckboxes++;
        }
    });
    
    const progressPercentage = totalCheckboxes > 0 ? Math.round((checkedCheckboxes / totalCheckboxes) * 100) : 0;
    
    // Update progress in the UI if there's a progress element
    const progressElement = document.getElementById('overall-progress');
    if (progressElement) {
        progressElement.textContent = `${progressPercentage}%`;
        progressElement.style.width = `${progressPercentage}%`;
    }
}

// Handle save progress button click
function handleSaveProgress() {
    const saveStatus = document.getElementById('save-status');
    
    // Save checkbox states
    saveCheckboxStates();
    
    // Show save status message
    saveStatus.textContent = 'Progress saved successfully!';
    saveStatus.classList.add('visible');
    
    // Hide save status message after 3 seconds
    setTimeout(() => {
        saveStatus.classList.remove('visible');
    }, 3000);
}

// Handle hash change for direct links
window.addEventListener('hashchange', () => {
    const hash = window.location.hash;
    if (hash) {
        const targetLink = document.querySelector(`a[href="${hash}"]`);
        if (targetLink) {
            targetLink.click();
        }
    }
});

// Initial section display based on URL hash
window.addEventListener('load', () => {
    const hash = window.location.hash;
    if (hash) {
        const targetLink = document.querySelector(`a[href="${hash}"]`);
        if (targetLink) {
            targetLink.click();
        }
    }
});
