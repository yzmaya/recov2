

import {
  iniciarSesion,
  crearCuenta,
  recuperarContrasena,
  auth,


} from "./firebase.js";


const formCrearCuenta = document.getElementById("signup-form2");
const formIniciarSesion = document.getElementById("signup-form");
const formRecuperarContrasena = document.getElementById("signup-form3");


// inicio de sesión

formIniciarSesion.addEventListener("submit", async (e) => {
  e.preventDefault();

  const correo = formIniciarSesion["email"];
  const contrasena = formIniciarSesion["password"];



  try {
    //console.log(correo.value)
    //  console.log(contrasena.value)
    // localStorage.setItem("IDname", nombre.value);
    await iniciarSesion(auth, correo.value, contrasena.value)


  } catch (error) {
    console.log(error);
  }

});




//crear cuenta de inicio de sesión

formCrearCuenta.addEventListener("submit", async (e) => {
  e.preventDefault();
  const nombre = formCrearCuenta["name2"];
  const correo = formCrearCuenta["email2"];
  const contrasena = formCrearCuenta["password2"];



  try {
    //  console.log(correo.value)
    //console.log(contrasena.value)


    //return nombre;
    await crearCuenta(auth, correo.value, contrasena.value, nombre.value)

    //  window.location.href = 'home.html';

  } catch (error) {
    console.log(error);
  }
  //  window.location.href = 'home.html';
});


// inicio de sesión

formRecuperarContrasena.addEventListener("submit", async (e) => {
  e.preventDefault();

  var x = document.getElementById("notRecuperaCon");


  const correo = formRecuperarContrasena["email3"];

  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }


  formRecuperarContrasena["email3"].value = '';

  try {
    //console.log(correo.value)
    //  console.log(contrasena.value)
    // localStorage.setItem("IDname", nombre.value);
    await recuperarContrasena(auth, correo.value)


  } catch (error) {
    console.log(error);
  }

});