import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";

import {
  collection,
  query,
  where,
  getDocs,
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";


import { auth ,db } from "./config.js";


const div = document.querySelector('#div');


onAuthStateChanged(auth, (user) => {
  if (user) {
    const uid = user.uid;
    console.log(user);

   async function getData(){
     const q = query(collection(db, "users"), where("userId", "==", uid));

     const querySnapshot = await getDocs(q);
     querySnapshot.forEach((doc) => {
       // doc.data() is never undefined for query doc snapshots
       console.log(doc.id, " => ", doc.data());
     });


   }

   getData()
   
    div.innerHTML += `<div class="dropdown dropdown-end">
      <div tabindex="0" role="button" class="btn btn-ghost btn-circle avatar">
        <div class="w-10 rounded-full">
          <img
            alt="Tailwind CSS Navbar component"
            src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
        </div>
      </div>
      <ul
        tabindex="0"
        class="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
        <li>
          <a class="justify-between">
            Profile
            <span class="badge">New</span>
          </a>
        </li>
        <li><a>Settings</a></li>
        <li><a>Logout</a></li>
      </ul>
    </div>`;

  } else {

    div.innerHTML = `<button class="btn btn-warning" id="login-btn">LOGIN</button>`;

     document.querySelector('#login-btn').addEventListener('click' , ()=>{
      window.location="login.html"
     })

  }
});



