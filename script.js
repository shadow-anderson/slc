document.addEventListener('DOMContentLoaded', function() {
    const quoteCarousel = document.querySelector('.quote-carousel');
    const quotesContainer = document.querySelector('.quotes-container');
    const quotes = document.querySelectorAll('.quotes-container p');
    let currentQuote = 0;

    quoteCarousel.addEventListener('click', function() {
        const initialQuote = document.querySelector('.quote');
        initialQuote.style.display = 'none';
        quotesContainer.style.display = 'block';
        
        // Rotate through quotes
        setInterval(() => {
            quotes.forEach(quote => quote.style.display = 'none');
            quotes[currentQuote].style.display = 'block';
            currentQuote = (currentQuote + 1) % quotes.length;
        }, 3000);
    });

    // Member card expansion functionality
    const memberCards = document.querySelectorAll('.member-card');
    
    memberCards.forEach(card => {
        card.addEventListener('click', function() {
            // Close other cards
            memberCards.forEach(otherCard => {
                if (otherCard !== card && otherCard.classList.contains('expanded')) {
                    otherCard.classList.remove('expanded');
                }
            });
            
            // Toggle current card
            this.classList.toggle('expanded');
            
            // Smooth scroll to card if it's expanded
            if (this.classList.contains('expanded')) {
                const cardRect = this.getBoundingClientRect();
                const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                const targetPosition = cardRect.top + scrollTop - 100; // 100px from top
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Timeline functionality
    // Toggle event details
    const detailsToggles = document.querySelectorAll('.details-toggle');
    
    detailsToggles.forEach(toggle => {
        toggle.addEventListener('click', function() {
            const details = this.closest('.timeline-content')
                               .querySelector('.event-details');
            details.classList.toggle('expanded');
            this.textContent = details.classList.contains('expanded') ? 
                              'Less Details' : 'More Details';
        });
    });

    // Update countdown
    function updateCountdown() {
        const festDate = new Date('2024-04-30'); // Set your fest date
        const now = new Date();
        const diff = festDate - now;

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

        document.querySelector('.countdown .days').textContent = days;
        document.querySelector('.countdown .hours').textContent = hours;
    }

    updateCountdown();
    setInterval(updateCountdown, 1000 * 60 * 60); // Update every hour

    // Resources Section Functionality
    // Markdown Editor
    const markdownInput = document.getElementById('markdown-input');
    const markdownPreview = document.getElementById('markdown-preview');

    markdownInput?.addEventListener('input', function() {
        const text = this.value;
        if (text.trim() === '') {
            markdownPreview.innerHTML = '<p class="preview-placeholder">Preview will appear here...</p>';
        } else {
            // Simple markdown conversion (can be expanded)
            const formatted = text
                .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                .replace(/\*(.*?)\*/g, '<em>$1</em>')
                .replace(/\n/g, '<br>');
            markdownPreview.innerHTML = formatted;
        }
    });

    // Character Name Generator
    const nameGenerator = document.getElementById('name-generator');
    const generatedNameSpan = document.querySelector('.generated-name');
    
    const firstNames = ['Emma', 'Liam', 'Olivia', 'Noah', 'Ava', 'Ethan', 'Sophia', 'Mason'];
    const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller'];

    nameGenerator?.addEventListener('click', function() {
        const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
        const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
        generatedNameSpan.textContent = `${firstName} ${lastName}`;
    });
}); 