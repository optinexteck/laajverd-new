const filterButtons = document.querySelectorAll(".filter-button");
const cards = document.querySelectorAll(".isotope-container");

//a - z
filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    var filterLetter = button.textContent.trim().toLowerCase(); 

    cards.forEach((card) => {
      const cardLinks = card.querySelectorAll(".link");

      let cardMatches = false;

      cardLinks.forEach((linkElement) => {
        const cardLink = linkElement.textContent.trim().toLowerCase();

        if (cardLink[0] === filterLetter && cardLink.textContent !== "aari") {
          console.log(`${filterLetter} button = ${cardLink[0]}`);
          cardMatches = true;
        }
      });

      if (cardMatches) {
        card.style.display = "block";

      } else {
        card.style.display = "none";

      }
    });
  });
});

// All button
const allButton = document.getElementById("all-button");
allButton.addEventListener("click", () => {
  cards.forEach((card) => {
    card.style.display = "block"; 
  });
});

