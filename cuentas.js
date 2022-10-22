import {

    getTasking,
    updateTask,
    saveCuenta,
    onGetTareas,
    cerrarSesion,
    getTasks,
    auth,
  
  } from "./firebase.js";
  
  

  const botonCerrar = document.getElementById("cerrar");
  
  

  const tasksContainerCategory = document.getElementById("task-category");
  
  //tabla para visualizar las cuentas
  const tasksContainer3 = document.getElementById("tasks-container3");
  //formulario para agregar una nuevas cuentas
  const taskForm4 = document.getElementById("task-form4");
  
  
  let editStatus = false;
  let id = "";
  const date = new Date();
  const currentMonth = date.getMonth() + 1;
  //const fechaComp = date.getFullYear() + "/" + currentMonth + "/" + date.getDate();
  const fechaComp = currentMonth + "_" + date.getFullYear();
  const fechaRegistrar = date.getDate() + "_" + currentMonth + "_" + date.getFullYear();
  
  console.log(fechaComp);
  
  botonCerrar.addEventListener("click", async (e) => {
    e.preventDefault();
  
    try {
      //  console.log(correo.value)
      //console.log(contrasena.value)
  
      await cerrarSesion()
    } catch (error) {
      console.log(error);
    }
  });
  
  
  window.addEventListener("DOMContentLoaded", async (e) => {
    // const querySnapshot = await getTasks();
    // querySnapshot.forEach((doc) => {
    //   console.log(doc.data());
    // });
  
    const docu = await getTasking();
    const task = docu.data().name;
    // console.log(task);
    document.getElementById('nombre').innerHTML = task;
  
  
  
    onGetTareas((querySnapshot) => {
      // tasksContainer2.innerHTML = "";
  
      querySnapshot.forEach((doc) => {
        const task = doc.data();
        //console.log(doc.data());
  
        //  document.getElementById('nombre').innerHTML = doc.data().name;
  
      });
  
    });
  
  
  
  });
  
 
  
 
  
  //agregar nuevas cuentas
  taskForm4.addEventListener("submit", async (e) => {
    e.preventDefault();
  
    const nuevacuenta = taskForm4["task-nombrecuenta"].value;
    const cuentapresupuesto = taskForm4["task-presupuesto"].value;
    const cuentadescr = taskForm4["task-desccuenta"].value;
  
  
    //const newcategory = nuevacategoria + " " + emoji;
  
    try {
    
      await saveCuenta(nuevacuenta, cuentapresupuesto, cuentadescr);
  
  
      taskForm4.reset();
     // taskForm["task-category"].value = '';
    } catch (error) {
      console.log(error);
    }
  
  });
  
  
  
  
  