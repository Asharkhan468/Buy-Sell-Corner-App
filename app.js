import {
  onAuthStateChanged,
  signOut,
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";
import { collection, query, where, getDocs } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";


import { auth ,db  } from "./config.js";

let ads = [] //initialize an array for store ads from the database







let moreInfo=[]


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
          my_modal_2.showModal();
        // window.location = "login.html";
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

  card.innerHTML += `<p class="text-[#000]">No Ads Posted</p>`;

  function renderCard(){
    card.innerHTML='';

    ads.map((item)=>{

      card.innerHTML += `<div class="card bg-base-100 w-[20rem] shadow-xl mt-6 border-solid border-[#ced4da] border">
   <figure>
     <img class="max-w-[100%] h-[320px] object-cover"
       src="${item.productImage}"
      alt="Shoes" />
  </figure>
   <div class="card-body">
     <h2 class="card-title">${item.productTitle}</h2>
     <p>${item.productDescription}</p>
     <div class="card-actions justify-end">
       <p class="mt-[10px] font-bold">Rs ${item.productPrice}</p>
       <button class="btn btn-secondary" id="more-info-btn">MORE INFO</button>
     </div>
   </div>
 </div>`;



 const moreInfoBtn = document.querySelectorAll("#more-info-btn");

 moreInfoBtn.forEach((btn, index) => {
   btn.addEventListener("click", () => {
    moreInfo=[]
     moreInfo.push(ads[index]);

     localStorage.setItem('ads-info' , JSON.stringify(moreInfo[0]))

     //alert user to login for view more info

     const loginAlert = document.querySelector("#login-alert");

     onAuthStateChanged(auth, (user) => {
      if(user){
        window.location.href = "more info.html";
      }else{
        loginAlert.innerHTML = my_modal_1.showModal()
      }
     })
   });
 });



     
      
      

    })



    //Ok button in the login alert popup functionality started

    const okBtn = document.querySelector('#btn-ok');

    okBtn.addEventListener('click' , ()=>{
      window.location.href="login.html"
    })




    //Ok button in the login alert popup functionality ended






    


  }

  renderCard()





 


   
  
  
  
  
  
  
});
}


getData()




//Logout confirmation



 //Logout user


 const modal = document.getElementById("logoutModal");
 const logoutBtn = document.querySelector("#logout-btn");
 const closeBtn = document.querySelector(".logout-close-btn");
 const confirmLogout = document.getElementById("confirmLogout");
 const cancelLogout = document.getElementById("cancelLogout");





// Show modal
logoutBtn.addEventListener('click' , ()=>{

  modal.style.display = 'flex';
})


// Close modal
closeBtn.addEventListener('click' , ()=>{

  modal.style.display = 'none';
})


cancelLogout.addEventListener('click' , ()=>{

  modal.style.display = 'none';
})


confirmLogout.addEventListener('click' , ()=>{

  signOut(auth)
    .then(() => {
      window.location = "login in.html";
    })

    .catch((error) => {
      console.error("Sign out error:", error);
    });

})


window.addEventListener('click' , (event)=>{
  if (event.target === modal) {
    modal.style.display = "none";
  }

})
    


//search functionality started

let filterArray=[];


const form = document.querySelector('#search-input');
const defaultSearch = document.querySelector('#default-search');

form.addEventListener('click' , (e)=>{

  e.preventDefault()

  console.log(defaultSearch.value);
  


})










 

 
 
  
















 