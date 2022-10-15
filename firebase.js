
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.8.1/firebase-app.js";
//import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/8.10.1/firebase-auth.js";

import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.8.1/firebase-auth.js";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {
  getFirestore,
  collection,
  collectionGroup,
  query,
  where,
  getDocs,
  onSnapshot,
  addDoc,
  setDoc,
  deleteDoc,
  doc,
  getDoc,
  updateDoc,
} from "https://www.gstatic.com/firebasejs/9.8.1/firebase-firestore.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries



const firebaseConfig = {
  // Put you credentials here
  apiKey: "AIzaSyC7toNkMv-wUJiasgVlPy42MQrymuah96o",
  authDomain: "integrarte-db8c0.firebaseapp.com",
  projectId: "integrarte-db8c0",
  storageBucket: "integrarte-db8c0.appspot.com",
  messagingSenderId: "131854706929",
  appId: "1:131854706929:web:2192579afe3f4c5515e150"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore();
export const auth = getAuth();



export const cerrarSesion = () =>
  signOut(auth).then(() => {
    // Sign-out successful.
    localStorage.removeItem('UserID');
    localStorage.removeItem('IDname');
    window.location.href = 'index.html';
  }).catch((error) => {
    // An error happened.
  });




/**
   *@param {string} email the description of the Task
   *@param {string} password the description of the Task
*/

export const crearCuenta = (auth, email, password, nombre) =>
  createUserWithEmailAndPassword(auth, email, password, nombre)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;

      console.log(nombre);
      console.log(userCredential.user.uid);
      localStorage.setItem("UserID", userCredential.user.uid);
      localStorage.setItem("IDname", nombre);
       window.location.href = 'home.html';
      // console.log(IDname);


      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorMessage);
      alert(errorMessage)
      // ..
    });


export const iniciarSesion = (auth, email, password) =>
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      localStorage.setItem("UserID", userCredential.user.uid);
      localStorage.removeItem('IDname');
         window.location.href = 'home.html';
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });

var userID = localStorage.getItem("UserID");




//var destination = localStorage.getItem("destino");

//console.log("users/"+userID)

//var holaperfil = "/users/"+userID+"negocio";


onAuthStateChanged(auth, async (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User
    const uid = user.uid;

    var nombreID = localStorage.getItem("IDname");

    if (nombreID == null){
      //console.log("a")
      } else {
        setDoc(doc(db, "users", uid), {
          name: nombreID,
      
        });
      }
      
    // window.location.href = 'home.html'
    // ...
  } else {
    // User is signed out
    console.log("usuario NO logueado");

    // ...
  }
  //window.location.href = 'home.html';
});


var pruebas = "/users/nOQszCqK8vUqRZ08RkheqwDibgy2/tareas"

//console.log(holaperfil)


var holas = userID;
//console.log(holaperfil)
var usuarioRaiz = "users/" + userID;
var miUusarioo = "users/" + userID;

// Initialize Firebase





//esto va a funcionar para obtener todos los usuarios
//const querySnapshot = await getDocs(collection(db, "users"));
//querySnapshot.forEach((collection) => {
// doc.data() is never undefined for query doc snapshots
//console.log(collection.id, " => ", collection.data());
//query(collectionGroup(db, "tareas"), where("uid", "==", collection.id)); 
//console.log(query);

//console.log(collection.data().count);


//});


//const holas = "/users/"+userID+"/"+destination;
console.log(usuarioRaiz)

/**
 * Save a New Task in Firestore
 * @param {string} date the title of the Task
 * @param {string} title the title of the Task
 * @param {string} description the description of the Task
 * @param {string} category the description of the Task
 * @param {string} cantidad the description of the Task
 * @param {string} uid the description of the Task
 * 
 * 
 * @param {string} nombre the description of the Task
 
 */
//export const saveTask = (title, description) =>
//addDoc(collection(db,  'users'), { title, description });
const date = new Date();
const currentMonth = date.getMonth() + 1; 
//const fechaComp = date.getFullYear() + "/" + currentMonth +  "/"  +date.getDate();
const fechaComp = date.getFullYear() + "/" + date.getDate() +  "/"  + currentMonth;
const fechaMes = date.getFullYear() + "/" + currentMonth ;
console.log(fechaMes)


export const saveTask = (date, title, category, description, cantidad, uid) =>
  addDoc(collection(db, usuarioRaiz + "/" + date), {date, title, category, description, cantidad, uid });

//guardar una nueva categoria
  export const saveCat = (categoria) =>
  addDoc(collection(db, usuarioRaiz + "/categoria"), {categoria });


export const onGetDia = (callback) =>
  onSnapshot(collection(db, usuarioRaiz + "/" + fechaComp), callback);

  export const onGetMes = (callback) =>
  onSnapshot(collectionGroup(db, "10"), callback);

  export const onGetCategorias = (callback) =>
onSnapshot(collectionGroup(db, "categoria"), callback);



export const onGetTasks21 = (callback) =>
  onSnapshot(collectionGroup(db, "tareas"), callback);

// query(collectionGroup(db, "tareas"), where("uid", "==", collection.id)); 

export const onGetTareas = (callback) =>
  onSnapshot(collection(db, "users"), callback);




export const onGetTareas2 = (callback) =>
  onSnapshot(collectionGroup(db, destination), callback);



/**
 *
 * @param {string} id Task ID
 */
export const deleteTask = (id) => deleteDoc(doc(db, usuarioRaiz + "/" + fechaComp, id));

export const getTask = (id) => getDoc(doc(db, usuarioRaiz + "/" + fechaComp, id));

export const getTasking = () => getDoc(doc(db, "users", userID));

export const updateTask = (id, newFields) =>
  updateDoc(doc(db, usuarioRaiz + "/" + fechaComp, id), newFields);

export const getTasks = () => getDocs(collection(db, userID));






