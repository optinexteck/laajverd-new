document.addEventListener('DOMContentLoaded', function() {
    // Handle tooltip positioning
    const tooltipWords = document.querySelectorAll('.tooltip-word');
    const glossaryContent = document.querySelector('.glossary-content');
    
    // Tooltip positioning code remains the same
    tooltipWords.forEach(word => {
        const tooltip = word.querySelector('.tooltip-text');
        
        word.addEventListener('mouseenter', () => {
            // Get word and tooltip dimensions
            const wordRect = word.getBoundingClientRect();
            const tooltipRect = tooltip.getBoundingClientRect();
            
            // Check if tooltip goes off screen
            if (tooltipRect.left < 0) {
                tooltip.style.left = '0';
                tooltip.style.transform = 'translateX(0)';
            } else if (tooltipRect.right > window.innerWidth) {
                tooltip.style.left = 'auto';
                tooltip.style.right = '0';
                tooltip.style.transform = 'translateX(0)';
            }
            
            // Adjust vertical position if needed
            if (tooltipRect.top < 0) {
                tooltip.style.bottom = 'auto';
                tooltip.style.top = '100%';
            }
        });
    });

    const alphabetButtons = document.querySelectorAll('.alphabet');
    
    // Store the original content
    const originalContent = glossaryContent.innerHTML;

    alphabetButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter').replace('.filter-', '');
            
            // Remove active class from all buttons and add to clicked one
            alphabetButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            if (filter === '*') {
                // Show original content for "All" button
                glossaryContent.innerHTML = originalContent;
            } else {
                // For specific letters, only show matching tooltip words
                const filteredWords = Array.from(tooltipWords)
                    .filter(word => word.getAttribute('data-letter') === filter)
                    .map(word => word.outerHTML)
                    .join(' ');
                
                glossaryContent.innerHTML = filteredWords;
            }
        });
    });
});
