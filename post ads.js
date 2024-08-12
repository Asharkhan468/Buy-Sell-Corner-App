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
const form = document.querySelector('#form')



form.addEventListener('submit' , (event)=>{
  event.preventDefault()


  //Upload an image to the storage

  const storageRef = ref(storage, "ad-image");


  uploadBytes(storageRef, adImage.files[0])
  .then((snapshot) => {
    console.log("Image uploded sucessfully to the storage!");
    adImage.value = "";

    //get the link of uploaded image

    getDownloadURL(ref(storage))
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
    ownerNumber: number.value
  });

  
   console.log("Document written with ID: ", docRef.id);
   title.value=""
   description.value=""
   price.value=""
   userName.value=""
   number.value=""
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