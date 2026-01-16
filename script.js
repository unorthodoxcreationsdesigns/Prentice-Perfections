// Smooth scrolling for navigation links
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        closeMenu();
    }
}

// Show category function
function showCategory(categoryId) {
    // Hide all categories
    const categories = document.querySelectorAll('.talent-category');
    categories.forEach(category => {
        category.style.display = 'none';
    });

    // Show selected category
    const selectedCategory = document.getElementById(categoryId);
    if (selectedCategory) {
        selectedCategory.style.display = 'grid';
    }

    // Update active tab styling
    const tabs = document.querySelectorAll('.category-tab');
    tabs.forEach(tab => {
        tab.style.borderBottom = 'none';
        tab.style.color = '';
    });

    event.target.closest('.category-tab').style.borderBottom = '3px solid #4ECDC4';
}

// Talent Modal Functions
function openTalentModal(element) {
    const modal = document.getElementById('talentModal');
    const name = element.querySelector('h3').textContent;
    const specialty = element.querySelector('.specialty').textContent;
    const bio = element.querySelector('.bio').textContent;
    const image = element.querySelector('.talent-image').textContent;

    document.getElementById('modalImage').textContent = image;
    document.getElementById('modalName').textContent = name;
    document.getElementById('modalSpecialty').textContent = specialty;
    document.getElementById('modalBio').textContent = bio;

    // Add some details based on the talent
    const details = generateTalentDetails(name, specialty);
    document.getElementById('modalDetails').innerHTML = details;

    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeTalentModal(event) {
    // If clicking the close button or outside the modal content
    if (!event || event.target.id === 'talentModal' || event.target.classList.contains('close-btn')) {
        const modal = document.getElementById('talentModal');
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

function generateTalentDetails(name, specialty) {
    const detailsMap = {
        'Hip-Hop Artist': '<strong>Genre:</strong> Hip-Hop<br><strong>Experience:</strong> 5+ years<br><strong>Reach:</strong> 2M+ Streams',
        'Indie Rock Band': '<strong>Genre:</strong> Indie Rock<br><strong>Members:</strong> 4<br><strong>Tours:</strong> Southeast Circuit',
        'Pop Vocalist': '<strong>Genre:</strong> Pop<br><strong>Chart Hits:</strong> 3<br><strong>Collaborations:</strong> Multiple',
        'Electronic DJ': '<strong>Genre:</strong> Electronic/EDM<br><strong>Festivals:</strong> Major Circuit<br><strong>Experience:</strong> 8+ years',
        'Open Format DJ': '<strong>Style:</strong> Open Format<br><strong>Events:</strong> Major Circuit<br><strong>Experience:</strong> Professional<br><strong>Brand:</strong> Throwback King Apparel',
        'Lead Actor': '<strong>Experience:</strong> 10+ years<br><strong>Credits:</strong> TV & Film<br><strong>Range:</strong> Drama & Comedy',
        'Actress': '<strong>Experience:</strong> 7+ years<br><strong>Specialization:</strong> Drama & Comedy<br><strong>Languages:</strong> English, Spanish',
        'Character Actor': '<strong>Experience:</strong> 12+ years<br><strong>Notable Roles:</strong> Streaming Series<br><strong>Training:</strong> Prestigious Academy',
        'Fashion Model': '<strong>Height:</strong> 5\'10"<br><strong>Experience:</strong> Runway & Editorial<br><strong>Agencies:</strong> International',
        'Male Model': '<strong>Height:</strong> 6\'1"<br><strong>Specialization:</strong> Commercial<br><strong>Campaigns:</strong> Major Brands',
        'Influencer Model': '<strong>Followers:</strong> 500K+<br><strong>Engagement:</strong> High<br><strong>Brands:</strong> Multiple Partnerships',
        'Runway Model': '<strong>Experience:</strong> International Runway<br><strong>Shows:</strong> Major Fashion Events<br><strong>Locations:</strong> Paris, Milan, NYC',
        'Basketball Player': '<strong>League:</strong> Professional<br><strong>Position:</strong> Guard<br><strong>Endorsements:</strong> Major Sponsors',
        'Soccer Player': '<strong>League:</strong> Professional<br><strong>Position:</strong> Forward<br><strong>International:</strong> Yes',
        'Volleyball Champion': '<strong>Title:</strong> National Champion<br><strong>Experience:</strong> 8+ years<br><strong>Media:</strong> Commentary Work',
        'Fitness Influencer': '<strong>Followers:</strong> 1M+<br><strong>Specialization:</strong> Fitness & Wellness<br><strong>Certifications:</strong> Multiple'
    };

    return detailsMap[specialty] || '<strong>Experience:</strong> Professional<br><strong>Availability:</strong> For Bookings<br><strong>Ready:</strong> To Collaborate';
}

// Handle form submission
function handleFormSubmit(event) {
    event.preventDefault();

    const form = event.target;
    const formData = new FormData(form);

    // Show success message
    const successMessage = document.createElement('div');
    successMessage.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #D4A574;
        color: #3D1F47;
        padding: 20px 30px;
        border-radius: 8px;
        box-shadow: 0 5px 20px rgba(61, 31, 71, 0.3);
        z-index: 3000;
        animation: slideInRight 0.5s ease;
        font-weight: 600;
    `;
    successMessage.textContent = '✓ Message sent successfully! Prentice Perfections will be in touch soon.';
    document.body.appendChild(successMessage);

    // Reset form
    form.reset();

    // Remove message after 4 seconds
    setTimeout(() => {
        successMessage.style.animation = 'slideOutRight 0.5s ease';
        setTimeout(() => {
            document.body.removeChild(successMessage);
        }, 500);
    }, 4000);
}

// Mobile menu toggle
function toggleMenu() {
    const navLinks = document.querySelector('.nav-links');
    if (navLinks) {
        navLinks.classList.toggle('active');
    }
}

function closeMenu() {
    const navLinks = document.querySelector('.nav-links');
    if (navLinks && navLinks.classList.contains('active')) {
        navLinks.classList.toggle('active');
    }
}

// Mobile menu button click handler
document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.querySelector('.menu-toggle');
    if (menuToggle) {
        menuToggle.addEventListener('click', toggleMenu);
    }

    // Close menu when clicking on nav links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    // Initialize first talent category as visible
    const firstCategory = document.getElementById('music');
    if (firstCategory) {
        firstCategory.style.display = 'grid';
    }

    // Add keyboard support for modal
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            const modal = document.getElementById('talentModal');
            if (modal.style.display === 'block') {
                closeTalentModal();
            }
        }
    });

    // Animate elements on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe talent cards
    const talentCards = document.querySelectorAll('.talent-card');
    talentCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'all 0.5s ease';
        observer.observe(card);
    });

    // Observe service cards
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'all 0.5s ease';
        observer.observe(card);
    });

    // Observe story cards
    const storyCards = document.querySelectorAll('.story-card');
    storyCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateX(-20px)';
        card.style.transition = 'all 0.5s ease';
        observer.observe(card);
    });
});

// Add active state to nav links based on scroll position
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.style.color = '';
        if (link.getAttribute('href') === '#' + current) {
            link.style.color = '#4ECDC4';
        }
    });
});

// Add CSS animations to style tag
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }

    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Parallax effect on hero section
window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero');
    if (hero) {
        const scrollPosition = window.pageYOffset;
        hero.style.backgroundPosition = `center ${scrollPosition * 0.5}px`;
    }
});
