import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, addDoc } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAs7KECwbuQq3KlGV42RoBUG-jxILOWWxU",
  authDomain: "portfolio-7fca2.firebaseapp.com",
  projectId: "portfolio-7fca2",
  storageBucket: "portfolio-7fca2.firebasestorage.app",
  messagingSenderId: "49278709657",
  appId: "1:49278709657:web:01db1c2e6bc72050e6ed08",
  measurementId: "G-P98PCM908H"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Analytics (wrap in try-catch as it might fail in development)
let analytics = null;
try {
  analytics = getAnalytics(app);
} catch (error) {
  console.log("Analytics failed to load:", error);
}

// Initialize Firestore
const db = getFirestore(app);

// Export everything needed
export { 
  db,
  collection,  // Export collection function
  getDocs,     // Export getDocs function
  addDoc,       // Export addDoc function
  analytics    // Export analytics if needed
};