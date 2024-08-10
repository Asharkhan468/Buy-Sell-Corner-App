import {
  onAuthStateChanged,
  signOut,
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";
import { collection, query, where, getDocs } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";

import { auth ,db  } from "./config.js";

const userProfile = document.querySelector("#user-profile");

onAuthStateChanged(auth, (user) => {
  if (user) {
    const uid = user.uid;

    async function getData(){
      
const q = query(collection(db, "users"), where("userId", "==", uid));

const querySnapshot = await getDocs(q);
querySnapshot.forEach((doc) => {
  // doc.data() is never undefined for query doc snapshots
 let image = doc.data().userImage
 userProfile.src=`${image}`
 
});
    }    

    getData()

     

  } else {
    console.log('user login nhi hy!');
    

  }
});



//Logout user


 document.querySelector('#logout-btn').addEventListener('click' , ()=>{
  signOut(auth)
    .then(() => {
      alert('You have sucessfully logout!')
      window.location="login.html"
    })
    .catch((error) => {
     alert(error)
    });

 })