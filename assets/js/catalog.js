// code of automate download catalog

// data for Download Catalog

const pdfData = [
  {
    name: "Catalog PDF",
    file: "bi-filetype-pdf",
  },
  {
    name: "Catalog Doc",
    file: "bi-file-earmark-word",
  },
];

const catalogList = document.getElementById("downloadcatalogs");

pdfData.forEach((element) => {
  catalogList.innerHTML = `<a href="#"><i class="bi ${
    bi - filetype - pdf
  }"></i><span>${element.name}</span></a>`;
});
