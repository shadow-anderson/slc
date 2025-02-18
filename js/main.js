// Import required libraries
import { Swiper } from 'swiper';
import MicroModal from 'micromodal';
import { marked } from 'marked';

// Initialize modules
document.addEventListener('DOMContentLoaded', async function() {
    try {
        // Show loading state
        document.body.innerHTML = showLoading('initial');
        
        // Load content
        const content = await loadContent();
        
        // Initialize components
        initializeSwiper();
        initializeMicroModal();
        initializeMarkdownEditor();
        initializeLazyLoading();
        initializeBackToTop();
        
        // Render content
        renderMembers(content.members);
        renderEvents(content.events);
        renderPublications(content.publications);
        
        // Add accessibility features
        addAccessibilityFeatures();
    } catch (error) {
        handleError(error);
    }
});

// Content loading
async function loadContent() {
    try {
        const response = await fetch('data/content.json');
        return await response.json();
    } catch (error) {
        console.error('Error loading content:', error);
        return { members: [], events: [], publications: [] };
    }
}

// Component initialization
function initializeSwiper() {
    new Swiper('.quote-carousel', {
        effect: 'fade',
        autoplay: {
            delay: 3000,
            disableOnInteraction: false
        },
        loop: true
    });
}

function initializeMicroModal() {
    MicroModal.init({
        onShow: modal => console.log(`${modal.id} is shown`),
        onClose: modal => console.log(`${modal.id} is hidden`),
        disableScroll: true
    });
}

function initializeMarkdownEditor() {
    const markdownInput = document.getElementById('markdown-input');
    const markdownPreview = document.getElementById('markdown-preview');

    if (markdownInput && markdownPreview) {
        markdownInput.addEventListener('input', function() {
            const text = this.value;
            if (text.trim() === '') {
                markdownPreview.innerHTML = '<p class="preview-placeholder">Preview will appear here...</p>';
            } else {
                markdownPreview.innerHTML = marked(text);
            }
        });
    }
}

// Lazy loading implementation
function initializeLazyLoading() {
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });

    lazyImages.forEach(img => imageObserver.observe(img));
}

// Back to Top functionality
function initializeBackToTop() {
    const backToTopButton = document.querySelector('.back-to-top');
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }
    });

    backToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Content rendering functions
function renderMembers(members) {
    const membersGrid = document.querySelector('.members-grid');
    if (!membersGrid) return;

    membersGrid.innerHTML = members.map(member => `
        <div class="member-card" data-member-id="${member.id}">
            <div class="member-photo">
                <img data-src="${member.photo}" 
                     alt="${member.name}" 
                     loading="lazy">
                <div class="member-overlay">
                    <h3>${member.name}</h3>
                    <p class="designation">${member.role}</p>
                    <span class="department-badge ${member.department.toLowerCase().replace(/\s+/g, '-')}">
                        ${member.department}
                    </span>
                    <p class="batch">${member.batch}</p>
                </div>
            </div>
            <div class="member-details">
                <div class="bio">
                    <p>${member.bio}</p>
                </div>
                <div class="specialization">
                    <h4>Literary Specialization</h4>
                    <div class="genre-tags">
                        ${member.specialization.map(spec => `
                            <span>${spec}</span>
                        `).join('')}
                    </div>
                </div>
                <div class="contact">
                    <a href="mailto:${member.email}">${member.email}</a>
                </div>
                <div class="achievements">
                    <h4>Highlights</h4>
                    <ul>
                        ${member.achievements.map(achievement => `
                            <li>${achievement}</li>
                        `).join('')}
                    </ul>
                </div>
                <div class="favorite-quote">
                    <h4>Favorite Quote</h4>
                    <blockquote>
                        "${member.favoriteQuote.text}"
                        <cite>- ${member.favoriteQuote.author}</cite>
                    </blockquote>
                </div>
            </div>
        </div>
    `).join('');
}

// Add error handling with literary-themed messages
function handleError(error, type = 'general') {
    const messages = content.microcopy.errors;
    const errorMessage = messages[type] || messages['500'];
    
    const errorContainer = document.createElement('div');
    errorContainer.className = 'error-message literary';
    errorContainer.innerHTML = `
        <p>${errorMessage}</p>
        <small>Error: ${error.message}</small>
    `;
    
    document.body.appendChild(errorContainer);
}

// Add loading states with book metaphors
function showLoading(type = 'initial') {
    const loadingMessages = content.microcopy.loading;
    const message = loadingMessages[type] || loadingMessages.initial;
    
    return `
        <div class="loading-state">
            <div class="book-animation"></div>
            <p>${message}</p>
        </div>
    `;
}

// Add similar render functions for events and publications... 

// Accessibility enhancements
function addAccessibilityFeatures() {
    // Add ARIA labels
    document.querySelectorAll('.member-card').forEach(card => {
        card.setAttribute('role', 'article');
        card.setAttribute('tabindex', '0');
    });

    // Add keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            const expandedCard = document.querySelector('.member-card.expanded');
            if (expandedCard) {
                expandedCard.classList.remove('expanded');
            }
        }
    });
} 