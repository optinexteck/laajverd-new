// Project data
const projectData = {
    'Himalayan region': {
        title: 'Himalayan Region',
        images: ['assets/img/blog/comments-1.jpg'], // Add your image paths
        siteDescription: `Thami Mosque, a 400-year-old wooden structure having religious significance for the local
            community and is considered sacred for the Noor Bakhsh Sofia group, followers of Syed M.`,
        projectDescription: `The project aimed to highlight the significance of Islamic art and architecture by documenting 
            the architectural form and decorative patterns used in Thami Mosque in Sermik village of Kharmang district.`
    },
    'Vernacular Prototype': {
        title: 'Vernacular Prototype',
        images: ['assets/img/blog/comments-2.jpg'], // Add your image paths
        siteDescription: 'Site description for Vernacular Prototype...',
        projectDescription: 'Project description for Vernacular Prototype...'
    },
    'Earthing Narratives': {
        title: 'Earthing Narratives',
        images: ['assets/img/blog/comments-3.jpg'], // Update with your actual image path
        siteDescription: `Project site description for Earthing Narratives...`, // Add your actual description
        projectDescription: `Project description for Earthing Narratives...` // Add your actual description
    }
};

// DOM Elements
const popup = document.getElementById('projectPopup');
const popupTitle = document.querySelector('.popup-title');
const popupImage = document.querySelector('.popup-image');
const siteDescription = document.querySelector('.site-description');
const projectDescription = document.querySelector('.project-description');
const closeButton = document.querySelector('.popup-close');

// Add click event listeners to plus icons
document.querySelectorAll('.archive-card .icon').forEach(icon => {
    icon.addEventListener('click', (e) => {
        e.stopPropagation(); // Prevent event bubbling
        const card = e.target.closest('.archive-card');
        const title = card.querySelector('.post-title').textContent;
        
        if (projectData[title]) {
            const data = projectData[title];
            
            // Populate popup content
            popupTitle.textContent = data.title;
            popupImage.src = data.images[0];
            siteDescription.innerHTML = `<p>${data.siteDescription}</p>`;
            projectDescription.innerHTML = `<p>${data.projectDescription}</p>`;
            
            // Show popup
            popup.style.display = 'block';
            document.body.style.overflow = 'hidden'; // Prevent background scrolling
        }
    });
});

// Close popup when clicking close button
closeButton.addEventListener('click', () => {
    popup.style.display = 'none';
    document.body.style.overflow = 'auto'; // Restore scrolling
});

// Close popup when clicking outside
popup.addEventListener('click', (e) => {
    if (e.target === popup) {
        popup.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});