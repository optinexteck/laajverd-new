//  data for folders and subfolder
const services = [
  {
    name: "Practice",
    subServices: [
      "Mud plasters",
      "Conservation of Natural dyes",
      "Story of the Yarn and its Making",
    ],
  },
  {
    name: "Wool",
    subServices: [
      "Conservation of Natural dyes",
      "Story of the Yarn and its Making",
    ],
  },
  {
    name: "Flora",
    subServices: ["Conservation of Natural dyes"],
  },
  {
    name: "Soil",
    subServices: ["Mud plasters"],
  },
];



const servicesList = document.getElementById("servicesList");

services.forEach((service, index) => {
  // Create main service link
  const serviceLink = document.createElement("a");
  serviceLink.href = `#${service.name.toLowerCase()}Subservices`;
  serviceLink.setAttribute("data-bs-toggle", "collapse");
  serviceLink.setAttribute("role", "button");
  serviceLink.setAttribute("aria-expanded", "false");
  serviceLink.setAttribute(
    "aria-controls",
    `${service.name.toLowerCase()}Subservices`
  );
  serviceLink.innerHTML = `<i class="bi bi-folder"></i><span>${service.name}</span>`;

  // Create collapse div
  const collapseDiv = document.createElement("div");
  collapseDiv.classList.add("collapse");
  collapseDiv.id = `${service.name.toLowerCase()}Subservices`;

  const subServicesList = document.createElement("div");
  subServicesList.classList.add("sub-services-list");

  service.subServices.forEach((subService) => {
    const subServiceLink = document.createElement("a");
    subServiceLink.href = "#";
    subServiceLink.innerHTML = `<i class="bi bi-file-text"></i><span>${subService}</span>`;
    subServicesList.appendChild(subServiceLink);
  });

  collapseDiv.appendChild(subServicesList);
  servicesList.appendChild(serviceLink);
  servicesList.appendChild(collapseDiv);
});
