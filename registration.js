import {
  uploadBytes,
  getDownloadURL,
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-storage.js";

import {
  collection,
  addDoc,
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";

import {
  getAuth,
  createUserWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";

import { ref , storageRef , db , auth } from "./config.js";


//Get User Data from HTML to JavaScript

const firstName = document.querySelector('#first-name')

const lastName = document.querySelector('#last-name')

const email = document.querySelector('#email')

const password = document.querySelector('#password')

const profile = document.querySelector('#input-file')

const registerBtn = document.querySelector('#register-btn')






registerBtn.addEventListener('click' , (event)=>{

  event.preventDefault()

  createUserWithEmailAndPassword(auth, email.value, password.value)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log(user);

      //Upload a file on storage

      uploadBytes(storageRef, profile.files[0])
        .then((snapshot) => {
          console.log(snapshot);

          console.log("Uploaded a blob or file!");

          //Get URL of uploaded image

          getDownloadURL(ref(storageRef))
            .then((url) => {
              console.log("URL==>", url);

              //Store the image URL to the firestore database

              async function setData() {
                try {
                  const docRef = await addDoc(collection(db, "users"), {
                    userName: firstName.value + " " + lastName.value,
                    userEmail: email.value,
                    userImage: url,
                    userId: user.uid
                  });
                  console.log("Document written with ID: ", docRef.id);
                  firstName.value = "";
                  lastName.value = "";
                  email.value = "";
                  profile.value = "";
                  password.value = "";
                } catch (e) {
                  console.error("Error adding document: ", e);
                }
              }

              setData();
            })
            .catch((error) => {
              console.log("download error==>", error);
            });
        })
        .catch((error) => {
          console.log(error);
        });

        window.location="login.html"
    })
    .catch((error) => {
      const errorMessage = error.message;
      alert(errorMessage)
    });

  



})






