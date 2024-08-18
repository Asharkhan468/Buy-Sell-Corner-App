//Upload a file to a storage things imported

import {
  uploadBytes,
  getDownloadURL,
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-storage.js";


import {
  onAuthStateChanged,
  signOut,
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";
import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";

import { auth, db , ref ,storage} from "./config.js";

const div = document.querySelector("#div");

//login button

onAuthStateChanged(auth, (user) => {
  if (user) {
    const uid = user.uid;
    async function getData() {
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
        <li><a href="index.html">Home</a></li>
        <li><a id="logout-btn">Logout</a></li>
      </ul>
    </div>`;

        //Logout user

        // document.querySelector("#logout-btn").addEventListener("click", () => {
        //   signOut(auth)
        //     .then(() => {
        //       alert("You have sucessfully logout!");
        //       window.location = "login.html";
        //     })
        //     .catch((error) => {
        //       alert(err);
        //     });
        // });

        const LogoutBtn = document.querySelector("#logout-btn");
        const NoBtn = document.querySelector("#btn-no");
        const YesBtn = document.querySelector("#btn-yes");

       


         LogoutBtn.addEventListener("click", () => {
           my_modal_3.showModal();

           YesBtn.addEventListener("click", () => {
             signOut(auth)
               .then(() => {
                 my_modal_4.showModal();


                 setTimeout(() => {
                   window.location.href = "login.html";
                 }, 1000);
               })
               .catch((error) => {
                 console.error("Sign out error:", error);
               });
           });

           NoBtn.addEventListener("click", () => {
             my_modal_3.style.display = "none";
           });
         });


        
      });
    }

    getData();
  } else {
   window.location="login.html"
  }
});




//Upload ads script

const adImage = document.querySelector('#input-file');
const title = document.querySelector('#title');
const description = document.querySelector('#description');
const price = document.querySelector('#price');
const userName = document.querySelector('#name');
const number = document.querySelector("#contact-number");
const delievery = document.querySelector("#delievery");
const condition = document.querySelector("#condition");
const brand = document.querySelector("#brand");
const form = document.querySelector('#form');
const postBtn = document.querySelector('#post-btn');





form.addEventListener('submit' , (event)=>{
  event.preventDefault()

 
  
postBtn.innerHTML = `<span class="loading loading-lg loading-spinner text-warning"></span>`;
  

  //Upload an image to the storage

  const storageRef = ref(storage, adImage.files[0].name);


  


  uploadBytes(storageRef, adImage.files[0])
  .then((snapshot) => {
    console.log("Image uploded sucessfully to the storage!");
    adImage.value = "";

    //get the link of uploaded image

    getDownloadURL(ref(storageRef))
      .then((url) => {
        console.log("url==>", url);

        async function setData(){
          try {
  const docRef = await addDoc(collection(db, "user-ads"), {
    productImage:url,
    productTitle: title.value,
    productDescription: description.value,
    productPrice: parseInt(price.value),
    ownerName:userName.value,
    ownerNumber: number.value,
    delievery:delievery.value,
    condition:condition.value,
    productBrand:brand.value,

  });

  
   console.log("Document written with ID: ", docRef.id);

    const dialog = document.getElementById("my_modal_2");
    const audio = document.getElementById("success-audio");

    audio.play();
    dialog.showModal();

  //  my_modal_2.showModal();

   postBtn.innerHTML = `POST NOW`;



   setTimeout(()=>{
    my_modal_2.style.display='none';

   

   }, 2000)

   
   
   
   
   
   
   
   title.value=""
   description.value=""
   price.value=""
   userName.value=""
   number.value=""
   delievery.value=""
   condition.value=""
   brand.value=""

   setTimeout(()=>{

     window.location.href="index.html"
   } , 2000)


  } catch (e) {
    console.error("Error adding document: ", e);
}
        }

        setData()
      })

      .catch((error) => {
        console.log('URL error' , error);
      });
  })
  .catch((error)=>{

    console.log('uploading image error' , error);
    

  })


 
  
    
 
  
})