// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-analytics.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-storage.js";
import { collection, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";
import { ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-storage.js";
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyCjA3GI1FC6_wikAy6qMw8hk4ZXDPsgw1U",
  authDomain: "laajverd-42a3f.firebaseapp.com",
  projectId: "laajverd-42a3f",
  storageBucket: "laajverd-42a3f.appspot.com",
  messagingSenderId: "654657065769",
  appId: "1:654657065769:web:9cff527bd2a4ec6a9f1d38",
  measurementId: "G-ZS0JV6362J"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

// Auth functions
export const loginAdmin = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    throw error;
  }
};

// Firestore functions
export const addLocation = async (locationData) => {
  try {
    const docRef = await addDoc(collection(db, 'locations'), {
      ...locationData,
      createdAt: new Date()
    });
    return docRef.id;
  } catch (error) {
    throw error;
  }
};

export const addGlossaryTerm = async (termData) => {
  try {
    const docRef = await addDoc(collection(db, 'glossary'), {
      ...termData,
      createdAt: new Date()
    });
    return docRef.id;
  } catch (error) {
    throw error;
  }
};

export const addArchiveItem = async (archiveData) => {
  try {
    const docRef = await addDoc(collection(db, 'archive'), {
      ...archiveData,
      createdAt: new Date()
    });
    return docRef.id;
  } catch (error) {
    throw error;
  }
};

// Storage functions
export const uploadImage = async (file, path) => {
  try {
    const storageRef = ref(storage, `${path}/${file.name}`);
    await uploadBytes(storageRef, file);
    const url = await getDownloadURL(storageRef);
    return url;
  } catch (error) {
    throw error;
  }
};

// Get functions
export const getLocations = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'locations'));
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    throw error;
  }
};

export const getGlossaryTerms = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'glossary'));
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    throw error;
  }
};

export const getArchiveItems = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'archive'));
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    throw error;
  }
};
