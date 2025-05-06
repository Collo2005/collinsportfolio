// Main JavaScript for Collins Muriithi Portfolio

// Wait for DOM to fully load
document.addEventListener('DOMContentLoaded', function() {
    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    menuToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
    });
    
    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
        });
    });
    
    // Portfolio filtering
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            
            portfolioItems.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 200);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 500);
                }
            });
        });
    });
    
    // Animate skill bars on scroll
    const skillSection = document.querySelector('#skills');
    const skillBars = document.querySelectorAll('.skill-progress');
    
    const animateSkills = () => {
        const sectionTop = skillSection.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (sectionTop < windowHeight * 0.75) {
            skillBars.forEach(bar => {
                const width = bar.style.width;
                bar.style.width = '0';
                setTimeout(() => {
                    bar.style.width = width;
                }, 200);
            });
            
            // Remove event listener after animation is triggered
            window.removeEventListener('scroll', animateSkills);
        }
    };
    
    window.addEventListener('scroll', animateSkills);
    
    // Form submission
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // Basic form validation
            if (name && email && message) {
                // Here you would typically send the form data to a server
                // For now, we'll just simulate a success message
                alert('Thank you for your message! I will get back to you soon.');
                contactForm.reset();
            } else {
                alert('Please fill in all required fields.');
            }
        });
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.getBoundingClientRect().top + window.pageYOffset;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Lazy load portfolio items animation
    const observeElements = (elements) => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-fade-in');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        
        elements.forEach(element => {
            observer.observe(element);
        });
    };
    
    // Observe portfolio items
    observeElements(document.querySelectorAll('.portfolio-item'));
    // Observe skill cards
    observeElements(document.querySelectorAll('.skill-card'));
    // Observe contact cards
    observeElements(document.querySelectorAll('.contact-card'));
    
    // Add sample portfolio items dynamically (for demo purposes)
    const addSampleProjects = () => {
        const portfolioTypes = [
            { type: 'ai', title: 'AI Language Tutor', desc: 'Educational AI system for language learning' },
            { type: 'web', title: 'E-Commerce Platform', desc: 'Responsive online store with payment integration' },
            { type: 'mobile', title: 'Health Tracker App', desc: 'Mobile application for fitness monitoring' },
            { type: 'community', title: 'Digital Literacy Program', desc: 'Technology education initiative for rural areas' },
            { type: 'ai', title: 'Predictive Analytics Tool', desc: 'Data-driven business intelligence solution' },
            { type: 'web', title: 'News Aggregator', desc: 'Web platform for personalized news content' }
        ];
        
        // Get the portfolio grid
        const portfolioGrid = document.querySelector('.portfolio-grid');
        
        // Clear any existing items
        portfolioGrid.innerHTML = '';
        
        // Add each project
        portfolioTypes.forEach((project, index) => {
            const portfolioItem = document.createElement('div');
            portfolioItem.className = 'portfolio-item';
            portfolioItem.setAttribute('data-category', project.type);
            
            portfolioItem.innerHTML = `
                <div class="portfolio-image">
                    <img src="/api/placeholder/${600 + index}/${400 + index}" alt="${project.title}">
                    <div class="portfolio-overlay">
                        <div class="portfolio-info">
                            <h4>${project.title}</h4>
                            <p>${project.desc}</p>
                            <a href="#" class="btn btn-sm">View Project</a>
                        </div>
                    </div>
                </div>
            `;
            
            portfolioGrid.appendChild(portfolioItem);
        });
        
        // Re-observe the newly added items
        observeElements(document.querySelectorAll('.portfolio-item'));
    };
    
    // Call the function to add sample projects
    addSampleProjects();
});