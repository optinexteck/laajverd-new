// Check if user is logged in
firebase.auth().onAuthStateChanged((user) => {
  const adminControls = document.querySelectorAll('.admin-controls');
  adminControls.forEach(control => {
    control.style.display = user ? 'block' : 'none';
  });
});

// Glossary functions
function openGlossaryForm() {
  document.getElementById('glossaryForm').style.display = 'block';
}

function closeGlossaryForm() {
  document.getElementById('glossaryForm').style.display = 'none';
}

document.getElementById('addGlossaryForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const term = document.getElementById('term').value;
  const definition = document.getElementById('definition').value;

  try {
    await firebase.firestore().collection('glossary').add({
      term,
      definition,
      createdAt: new Date()
    });
    alert('Term added successfully!');
    closeGlossaryForm();
    location.reload();
  } catch (error) {
    alert('Error: ' + error.message);
  }
});

// Similar functions for Archive and Location
// ... (I can provide these if needed) 