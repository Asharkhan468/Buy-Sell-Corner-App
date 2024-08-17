import {
  signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";

import { auth } from "./config.js";

const form = document.querySelector("#form");
const email = document.querySelector("#email");
const password = document.querySelector("#password");
const loginBtn = document.querySelector("#login-btn");

//login wrong crediential error

const sucessModal = document.querySelector('#sucess-modal')

const invalidCrediential = document.querySelector("#invalid-alert");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  signInWithEmailAndPassword(auth, email.value, password.value)
    .then((userCredential) => {
      const user = userCredential.user;
      invalidCrediential.innerHTML=""
      sucessModal.innerHTML = `<!-- Pop-up container -->
<div class="fixed inset-0 flex items-center justify-center bg-gradient-to-r from-[tranparent]-600 via-blue-600 to-indigo-600 bg-opacity-80 z-50">
  <!-- Background Animation -->
  <div class="absolute inset-0 bg-gradient-to-br from-transparent to-black opacity-40 animate-[pulse_6s_infinite]"></div>

  <!-- Pop-up Box -->
  <div class="relative bg-gradient-to-r from-gray-900 to-black text-white p-8 rounded-xl shadow-2xl border border-purple-600 max-w-sm w-full mx-[20px]">
    <!-- Glowing Animation -->
    <div class="absolute inset-0 rounded-xl border-4 border-indigo-600 opacity-40 blur-md animate-[ping_2s_infinite]"></div>

    <!-- Success Icon and Message -->
    <div class="flex flex-col items-center space-y-4 z-10 relative">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-20 h-20 text-green-400 animate-bounce">
        <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4M20 12A8 8 0 118 4.929M12 20h.01" />
      </svg>
      <h2 class="text-3xl font-bold tracking-wider">Success!</h2>
      <p class="text-center text-lg">You've logged in successfully.</p>
    </div>

  <!-- Sound Trigger -->
  <audio autoplay>
    <source src="assets/audio/success-1-6297.mp3" type="audio/mpeg">
    Your browser does not support the audio element.
  </audio>
</div>

`;

setTimeout(()=>{
  window.location="index.html"

} , 3000)


    })
    .catch((error) => {
      const errorMessage = error.message;
      invalidCrediential.innerHTML = `<div role="alert" class="alert alert-warning">
  <svg
    xmlns="http://www.w3.org/2000/svg"
    class="h-6 w-6 shrink-0 stroke-current"
    fill="none"
    viewBox="0 0 24 24">
    <path
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" class="text-[red] text-[20px]" />
  </svg>
  <span>Invalid Login Credential!</span>
</div>`;
      
    });

});


