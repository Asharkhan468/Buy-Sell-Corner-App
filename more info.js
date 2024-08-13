import {
  onAuthStateChanged,
  signOut,
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";
import {
  collection,
  query,
  where,
  getDocs,
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";

import { auth, db } from "./config.js";

let ads = []; //initialize an array for store ads from the database



//login button


 

onAuthStateChanged(auth, (user) => {
  if (user) {
    const uid = user.uid;
    async function getData(){
      
const q = query(collection(db, "users"), where("userId", "==", uid));

const querySnapshot = await getDocs(q);
querySnapshot.forEach((doc) => {
  div.innerHTML += `<div class="dropdown dropdown-end">
      <div tabindex="0" role="button" class="btn btn-ghost btn-circle avatar">
        <div class="w-10 rounded-full">
          <img
            alt="Profile" id="user-profile"
            src="${doc.data().userImage}" />
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
        <li><a href="post ads.html">Post Ads</a></li>
        <li><a id="logout-btn">Logout</a></li>
      </ul>
    </div>`;

  //Logout user

  document.querySelector("#logout-btn").addEventListener("click", () => {
    signOut(auth)
      .then(() => {
        alert("You have sucessfully logout!");
        window.location = "login.html";
      })
      .catch((error) => {
        alert(err);
      });
  });
});
    }    

    getData()

     

  } else {
   div.innerHTML=`<button class="btn btn-warning" id="login-btn">LOGIN</button>`
   document.getElementById("login-btn").addEventListener("click", () => {
     window.location.href = "login.html";
   });
    

  }
});


