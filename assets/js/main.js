// import { db } from './firebase.js';

(function () {
  "use strict";

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');
    if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
    window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
  }

  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

  /**
   * Mobile nav toggle
   */
  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

  function mobileNavToogle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    mobileNavToggleBtn.classList.toggle('bi-list');
    mobileNavToggleBtn.classList.toggle('bi-x');
  }
  mobileNavToggleBtn.addEventListener('click', mobileNavToogle);

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToogle();
      }
    });

  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function (e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Init isotope layout and filters
   */
  // document.querySelectorAll('.isotope-layout').forEach(function (isotopeItem) {
  //   let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
  //   let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
  //   let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

  //   let initIsotope;
  //   imagesLoaded(isotopeItem.querySelector('.isotope-container'), function () {
  //     initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
  //       itemSelector: '.isotope-item',
  //       layoutMode: layout,
  //       filter: filter,
  //       sortBy: sort
  //     });
  //   });

  //   isotopeItem.querySelectorAll('.isotope-filters li').forEach(function (filters) {
  //     filters.addEventListener('click', function () {
  //       isotopeItem.querySelector('.isotope-filters .filter-active').classList.remove('filter-active');
  //       this.classList.add('filter-active');
  //       initIsotope.arrange({
  //         filter: this.getAttribute('data-filter')
  //       });
  //       if (typeof aosInit === 'function') {
  //         aosInit();
  //       }
  //     }, false);
  //   });

  // });

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function (swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Correct scrolling position upon page load for URLs containing hash links.
   */
  window.addEventListener('load', function (e) {
    if (window.location.hash) {
      if (document.querySelector(window.location.hash)) {
        setTimeout(() => {
          let section = document.querySelector(window.location.hash);
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop),
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  });

  /**
   * Navmenu Scrollspy
   */
  let navmenulinks = document.querySelectorAll('.navmenu a');

  function navmenuScrollspy() {
    navmenulinks.forEach(navmenulink => {
      if (!navmenulink.hash) return;
      let section = document.querySelector(navmenulink.hash);
      if (!section) return;
      let position = window.scrollY + 200;
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        document.querySelectorAll('.navmenu a.active').forEach(link => link.classList.remove('active'));
        navmenulink.classList.add('active');
      } else {
        navmenulink.classList.remove('active');
      }
    })
  }
  window.addEventListener('load', navmenuScrollspy);
  document.addEventListener('scroll', navmenuScrollspy);

})();

/**
   * PDF File
 */

const db = firebase.firestore();

// Function to load practice files dynamically
function loadPracticeFiles() {
  const fileList = document.getElementById('dynamic-file-list');

  // Get the collection from Firestore
  db.collection('practiceFiles').get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      const fileData = doc.data();
      const listItem = document.createElement('li');

      // Create a clickable link for the PDF
      const link = document.createElement('a');
      link.href = fileData.fileUrl;
      link.target = "_blank";  // Open in a new tab
      link.classList.add('pdf-link');

      // Create the icon and title elements
      const icon = document.createElement('i');
      icon.classList.add('bi', 'bi-file-text');
      const title = document.createElement('span');
      title.textContent = fileData.title;

      // Append icon and title to the link
      link.appendChild(icon);
      link.appendChild(title);

      // Append the link to the list item
      listItem.appendChild(link);

      // Append the list item to the unordered list
      fileList.appendChild(listItem);
    });
  });
}

/*--------------------------------------------------------------
# Alrt
--------------------------------------------------------------*/

// Call the function to load the files
loadPracticeFiles();


// Get the elements
const aariWord = document.getElementById("aariWord");
const aariPopup = document.getElementById("aariPopup");

// Show popup when mouse enters "Aari"
aariWord.addEventListener("mouseenter", function () {
  aariPopup.style.display = "block";
});

// Hide popup when mouse leaves "Aari"
aariWord.addEventListener("mouseleave", function () {
  aariPopup.style.display = "none";
});

/*--------------------------------------------------------------
# Archive service
--------------------------------------------------------------*/

// Fetch data from Firebase and populate the archive page dynamically
async function fetchServices() {
  try {
    // Fetch data from Firestore
    const servicesSnapshot = await db.collection('services').get();
    const servicesList = servicesSnapshot.docs.map(doc => doc.data());

    // Populate services and subcategories dynamically
    const servicesContainer = document.getElementById('services-list');
    const fileDetailsContainer = document.getElementById('file-details');
    servicesContainer.innerHTML = '';  // Clear the container before populating

    servicesList.forEach(service => {
      // Create service link
      const serviceLink = document.createElement('a');
      serviceLink.href = '#';
      serviceLink.classList.add('list-group-item', 'list-group-item-action');
      serviceLink.innerHTML = `<i class="bi bi-folder"></i> ${service.name}`;

      // Append the service link to the container
      servicesContainer.appendChild(serviceLink);

      // Create subcategories div
      const subList = document.createElement('div');
      subList.classList.add('sub-list');
      subList.style.display = 'none';  // Initially hidden

      // Add subcategories
      service.subcategories.forEach(subcategory => {
        const subLink = document.createElement('a');
        subLink.href = '#';
        subLink.innerHTML = `<i class="bi bi-file-earmark"></i> ${subcategory.name}`;
        subLink.classList.add('list-group-item');

        // On clicking a subcategory, show related files
        subLink.addEventListener('click', (event) => {
          event.preventDefault();
          displayFileDetails(subcategory.files);
        });

        subList.appendChild(subLink);
      });

      // Toggle subcategories on clicking the main service link
      serviceLink.addEventListener('click', (event) => {
        event.preventDefault();
        subList.style.display = subList.style.display === 'block' ? 'none' : 'block';
      });

      // Append subcategories to the services container
      servicesContainer.appendChild(subList);
    });

  } catch (error) {
    console.error('Error fetching services:', error);
  }
}

// Display file details when a subcategory is clicked
function displayFileDetails(files) {
  const fileDetailsContainer = document.getElementById('file-details');
  fileDetailsContainer.innerHTML = '';  // Clear previous files

  files.forEach(file => {
    const fileDiv = document.createElement('div');
    fileDiv.innerHTML = `<i class="bi bi-file-earmark-text"></i> ${file.name}`;
    fileDetailsContainer.appendChild(fileDiv);
  });
}

db.collection("Documents").get().then((querySnapshot) => {
  querySnapshot.forEach((doc) => {
    // Create menu item
    const menuItem = `<li><a href="#" onclick="loadFiles('${doc.id}')">${doc.id}</a></li>`;
    document.querySelector('.left-menu').innerHTML += menuItem;
  });
});

function loadFiles(category) {
  db.collection("Documents").doc(category).collection("Files").get().then((querySnapshot) => {
    let filesHTML = '';
    querySnapshot.forEach((fileDoc) => {
      filesHTML += `<li><a href="#" onclick="loadFileDetails('${category}', '${fileDoc.id}')">${fileDoc.id}</a></li>`;
    });
    document.querySelector('.file-list').innerHTML = filesHTML;
  });
}

function loadFileDetails(category, fileName) {
  db.collection("Documents").doc(category).collection("Files").doc(fileName).get().then((doc) => {
    if (doc.exists) {
      const fileData = doc.data();
      document.querySelector('.file-details').innerHTML = `
        <h2>${fileName}</h2>
        <p>${fileData.Description}</p>
        <p><strong>Author: </strong>${fileData.Author}</p>
        <p>${fileData.Bio}</p>
        <a href="${fileData.fileURL}" target="_blank">Download PDF</a>
      `;
    }
  });
}


// Fetch services and populate the page when the document is ready
document.addEventListener('DOMContentLoaded', fetchServices);


// Reference to the Practice document
const practiceDocRef = db.collection("Documents").doc("Practice");

// Get Files collection under Practice
practiceDocRef.collection("Files").get().then((querySnapshot) => {
  querySnapshot.forEach((doc) => {
    console.log(doc.id, " => ", doc.data());
  });
});

// Get Subcategory collection under Practice
practiceDocRef.collection("Subcategory").get().then((querySnapshot) => {
  querySnapshot.forEach((doc) => {
    console.log(doc.id, " => ", doc.data());
  });
});

/*--------------------------------------------------------------
# Project Ftach
--------------------------------------------------------------*/

const projectsContainer = document.getElementById("projectsContainer");

db.collection("Projects").get().then((querySnapshot) => {
  querySnapshot.forEach((doc) => {
    const project = doc.data();

    // Create HTML for each project
    const projectHTML = `
      <div class="project-card">
        <img src="${project.imageUrl}" alt="${project.title}">
        <h2>${project.title}</h2>
        <p>by ${project.author}</p>
        <p>${project.year}</p>
        <a href="project-details.html?id=${doc.id}">Read More</a>
      </div>
    `;

    // Append to the container
    projectsContainer.innerHTML += projectHTML;
  });
});

const params = new URLSearchParams(window.location.search);
const projectId = params.get('id');

if (projectId) {
  db.collection("Projects").doc(projectId).get().then((doc) => {
    if (doc.exists) {
      const project = doc.data();
      document.getElementById("projectTitle").innerText = project.title;
      document.getElementById("projectAuthor").innerText = project.author;
      document.getElementById("projectYear").innerText = project.year;
      document.getElementById("projectDescription").innerText = project.description;
      document.getElementById("projectImage").src = project.imageUrl;
    } else {
      console.log("No such document!");
    }
  });
}

/*--------------------------------------------------------------
# Archive
--------------------------------------------------------------*/
function toggleDetails(element) {
  const card = element.parentElement;
  const details = card.querySelector('.details');
  
  if (details.classList.contains('active')) {
      details.classList.remove('active');
      element.classList.replace('bi-dash', 'bi-plus');
  } else {
      details.classList.add('active');
      element.classList.replace('bi-plus', 'bi-dash');
  }
}

  // Open offcanvas
  $('.open-offcanvas').on('click', function () {
    var target = $(this).data('target');
    $(target).addClass('show');
});

 // Close offcanvas with the close button
 $('.close-offcanvas').on('click', function () {
  $(this).closest('.offcanvas').removeClass('show');
  $('.offcanvas-backdrop').removeClass('show'); // Hide the background overlay
});

// Close offcanvas when clicking outside (on the overlay)
$('.offcanvas-backdrop').on('click', function () {
  $('.offcanvas').removeClass('show');
  $(this).removeClass('show'); // Hide the background overlay
});

$(document).on('click', function (e) {
  var offcanvas = $('.offcanvas.show');
  if (offcanvas.length > 0 && !$(e.target).closest('.offcanvas').length && !$(e.target).hasClass('open-offcanvas')) {
      offcanvas.removeClass('show');
      $('.offcanvas-backdrop').removeClass('show');
  }
});

// Function to create glossary terms dynamically
function createGlossaryTerms(terms) {
    const container = document.querySelector('.glossary-text-container');
    
    terms.forEach(term => {
        const termSpan = document.createElement('span');
        termSpan.className = 'glossary-term';
        termSpan.innerHTML = `
            ${term.word}
            <div class="glossary-tooltip">
                ${term.definition}
            </div>
        `;
        container.appendChild(termSpan);
        // Add a space after each term
        container.appendChild(document.createTextNode(' '));
    });
}

// Handle tooltip positioning
document.addEventListener('DOMContentLoaded', () => {
    const terms = document.querySelectorAll('.glossary-term');
    
    terms.forEach(term => {
        term.addEventListener('mouseenter', (e) => {
            const tooltip = term.querySelector('.glossary-tooltip');
            const rect = term.getBoundingClientRect();
            
            // Adjust tooltip position if it goes off-screen
            if (rect.left < 0) {
                tooltip.style.left = '0';
                tooltip.style.transform = 'translateX(0)';
            } else if (rect.right > window.innerWidth) {
                tooltip.style.left = 'auto';
                tooltip.style.right = '0';
                tooltip.style.transform = 'translateX(0)';
            }
        });
    });
});







const cardContainer = document.querySelector('.card-container');
const cards = document.querySelectorAll('.card');

let currentIndex = 0;

function autoSwipe() {
  currentIndex++;
  if (currentIndex >= cards.length) {
    currentIndex = 0;
  }

  // Shift cards
  cardContainer.style.transform = `translateX(-${currentIndex * 320}px)`;
  cardContainer.style.transition = 'transform 0.5s ease-in-out';
}

// Start the animation loop
setInterval(autoSwipe, 3000);

