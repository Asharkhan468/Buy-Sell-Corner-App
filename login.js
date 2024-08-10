import {
  signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";

import { auth } from "./config.js";

const form = document.querySelector("#form");
const email = document.querySelector("#email");
const password = document.querySelector("#password");
const loginBtn = document.querySelector("#login-btn");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  signInWithEmailAndPassword(auth, email.value, password.value)
    .then((userCredential) => {
      const user = userCredential.user;
      alert('You have loggedIn sucessfully!')
      window.location="index.html"
    })
    .catch((error) => {
      const errorMessage = error.message;
      console.log(errorMessage);
      
    });

});


