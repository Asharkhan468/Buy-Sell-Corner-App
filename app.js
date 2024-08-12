import {
  onAuthStateChanged,
  signOut,
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";
import { collection, query, where, getDocs } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";


import { auth ,db  } from "./config.js";

let ads = [] //initialize an array for store ads from the database


const div = document.querySelector('#div')

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




async function getData(){
  const querySnapshot = await getDocs(collection(db, "user-ads"));
querySnapshot.forEach((doc) => {
  ads.push(doc.data());
  console.log(ads);

  const card = document.querySelector("#div-cards");

  function renderCard(){
    card.innerHTML='';

    ads.map((item)=>{

      card.innerHTML += `<div class="card bg-base-100 w-[20rem] shadow-xl mt-6">
   <figure>
     <img
       src="${item.productImage}"
      alt="Shoes" />
  </figure>
   <div class="card-body">
     <h2 class="card-title">${item.productTitle}</h2>
     <p>${item.productDescription}</p>
     <div class="card-actions justify-end">
       <p class="mt-[10px] font-bold">Rs ${item.productPrice}</p>
       <button class="btn btn-secondary">MORE INFO</button>
     </div>
   </div>
 </div>`;



     
      
      

    })


  }

  renderCard()

   
  
  
  
  
  
  
});
}


getData()


//render data in a card from the firestore



// function renderAds(){

//   for (let i = 0; i < ads.length; i++) {
//     console.log(i);

//    
//   }

// }

// renderAds()




 

 
 
  
















 