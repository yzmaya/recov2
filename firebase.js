
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.8.1/firebase-app.js";
//import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/8.10.1/firebase-auth.js";

import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut, sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/9.8.1/firebase-auth.js";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {
  getFirestore,
  collection,
  collectionGroup,
  query,
  orderBy,
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
   apiKey: "AIzaSyC7kBXyd1LcKq4JJiW-3JlhcBOJPtNucHM",

  authDomain: "reco-2cabc.firebaseapp.com",

  databaseURL: "https://reco-2cabc.firebaseio.com",

  projectId: "reco-2cabc",

  storageBucket: "reco-2cabc.appspot.com",

  messagingSenderId: "775658028653",

  appId: "1:775658028653:web:05fbc136e9d85bb9350964",

  measurementId: "G-Q71KJZLVWE"

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
      window.location.href = 'cuentasfirst.html';
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


export const recuperarContrasena = (auth, email) =>
  sendPasswordResetEmail(auth, email)
    .then(() => {
      // Signed in
      console.log("Se envio al correo")

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

    if (nombreID == null) {
      //console.log("a")
    } else {
      setDoc(doc(db, "users", uid), {
        name: nombreID,

      });

      const nuevacat1 = "Educación " + "🎓";
      const nuevacat2 = "Nuevo " + "➕";



      setDoc(doc(db, usuarioRaiz + "/categoria/ACatPrincipal"),
        { categoria: nuevacat1, });

      setDoc(doc(db, usuarioRaiz + "/categoria/ACatPrincipal2"),
        { categoria: nuevacat2, });

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
const fechaComp = currentMonth + "_" + date.getFullYear();
const fechaMes = currentMonth + "_" + date.getFullYear();
const fechaDelDia = date.getDate() + "_" + currentMonth + "_" + date.getFullYear();
const miDiaInteger = date.getDate();
//console.log(currentMonth)

//guardar una tarea
export const saveTask = (date, title, category, description, cantidad, mesActual, mesActualTemp, uid) =>
addDoc(collection(db, usuarioRaiz + "/" + mesActualTemp), { date, title, category, description, cantidad, mesActual, mesActualTemp, uid });

//guardar una nueva categoria
export const saveCat = (categoria) =>
  addDoc(collection(db, usuarioRaiz + "/categoria"), { categoria });

//guardar una cuenta
export const saveCuenta = (nombre, presupuesto, description) =>
  setDoc(doc(db, usuarioRaiz + "/cuenta/" + nombre), { nombre, presupuesto, description });


//obtener las categorias en el form
export const onGetCategorias = (callback) =>
  onSnapshot(collection(db, usuarioRaiz + "/categoria"), callback);
//obtener el dia en mi tabla
export const onGetDia = (callback) =>
  onSnapshot(query(collection(db, usuarioRaiz + "/" + fechaComp), where("date", "==", miDiaInteger)), callback);
//obtener el mes en mi tabla
export const onGetMes = (callback) =>
  onSnapshot(query(collection(db, usuarioRaiz + "/" + fechaComp), orderBy("date","desc")), callback);
//obtener el año en mi tabla

export const onGetAnual01 = (callback) =>
  onSnapshot(collection(db, usuarioRaiz + "/" + "1_" + date.getFullYear()), callback);

export const onGetAnual02 = (callback) =>
  onSnapshot(collection(db, usuarioRaiz + "/" + "2_" + date.getFullYear()), callback);

export const onGetAnual03 = (callback) =>
  onSnapshot(collection(db, usuarioRaiz + "/" + "3_" + date.getFullYear()), callback);

export const onGetAnual04 = (callback) =>
  onSnapshot(collection(db, usuarioRaiz + "/" + "4_" + date.getFullYear()), callback);

export const onGetAnual05 = (callback) =>
  onSnapshot(collection(db, usuarioRaiz + "/" + "5_" + date.getFullYear()), callback);

export const onGetAnual06 = (callback) =>
  onSnapshot(collection(db, usuarioRaiz + "/" + "6_" + date.getFullYear()), callback);

export const onGetAnual07 = (callback) =>
  onSnapshot(collection(db, usuarioRaiz + "/" + "7_" + date.getFullYear()), callback);

export const onGetAnual08 = (callback) =>
  onSnapshot(collection(db, usuarioRaiz + "/" + "8_" + date.getFullYear()), callback);

export const onGetAnual09 = (callback) =>
  onSnapshot(collection(db, usuarioRaiz + "/" + "9_" + date.getFullYear()), callback);

export const onGetAnual10 = (callback) =>
  onSnapshot(collection(db, usuarioRaiz + "/" + "10_" + date.getFullYear()), callback);

export const onGetAnual11 = (callback) =>
  onSnapshot(collection(db, usuarioRaiz + "/" + "11_" + date.getFullYear()), callback);

export const onGetAnual12 = (callback) =>
  onSnapshot(collection(db, usuarioRaiz + "/" + "12_" + date.getFullYear()), callback);

//obtener las cuentas en la tabla
export const onGetCuentas = (callback) =>
  onSnapshot(collection(db, usuarioRaiz + "/cuenta"), callback);


//export const q = getDocs(query(collection(db, usuarioRaiz + "/" + fechaComp), where("date", "==", fechaDelDia)));


export const ver = () => getDocs(query(collection(db, usuarioRaiz + "/" + fechaComp), where("date", "==", fechaDelDia)));

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

export const deleteCuenta = (id) => deleteDoc(doc(db, usuarioRaiz + "/cuenta/", id));

export const getTask = (id) => getDoc(doc(db, usuarioRaiz + "/" + fechaComp, id));

export const getCuentas = (id) => getDoc(doc(db, usuarioRaiz + "/cuenta/", id));

export const getTasking = () => getDoc(doc(db, "users", userID));
export const getTotalCtaGral = () => getDoc(doc(db, "users/" + userID + "/cuenta/General"));

//obtener la cantidad para poder eliminar al presupuesto
export const getCantidad = (id) => getDoc(doc(db, usuarioRaiz + "/" + fechaComp, id));

//actualizar tareas generales
export const updateTask = (id, newFields) =>
  updateDoc(doc(db, usuarioRaiz + "/" + fechaComp, id), newFields);

//actualizar mi ingreso general
export const updateCtaGral = (presupuesto) =>
  updateDoc(doc(db, "users/" + userID + "/cuenta/General"), presupuesto);


export const updateCuenta = (id, newFields) =>
  updateDoc(doc(db, usuarioRaiz + "/cuenta/", id), newFields);

export const getTasks = () => getDocs(collection(db, userID));






