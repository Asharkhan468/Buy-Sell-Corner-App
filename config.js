import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";
import { getStorage , ref } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-storage.js";

const firebaseConfig = {
  apiKey: "AIzaSyDfZ0kGPeOL282CA4LHopzRDH0yNEWbeAg",
  authDomain: "buy-sells-corner-app.firebaseapp.com",
  projectId: "buy-sells-corner-app",
  storageBucket: "buy-sells-corner-app.appspot.com",
  messagingSenderId: "927963922586",
  appId: "1:927963922586:web:6f57eee9a7baaa8b0b1f23",
  measurementId: "G-JRHXB4334Z",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const storageRef = ref(storage , 'profile');
export const auth = getAuth(app);
export {ref}
