import {

    getTasking,
    getTotalCtaGral,
    updateTask,
    getTask,
    getCuentas,
    deleteCuenta,
    saveCuenta,
    onGetTareas,
    cerrarSesion,
    onGetCuentas,
    getTasks,
    auth,
    updateCuenta,
  
  } from "./firebase.js";
  
  

  const botonCerrar = document.getElementById("cerrar");
  
 
  //tabla para visualizar las cuentas
  const tasksContainer3 = document.getElementById("tasks-container3");
  //formulario para agregar una nuevas cuentas
  const taskForm4 = document.getElementById("task-form4");
  
  
  let editStatus = false;
  let id = "";

  
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
  
    const ctaG = await getTotalCtaGral();
    const obtctag = ctaG.data().presupuesto;
    // console.log(task);
   
  
  
  
  });
  
  // const querySnapshotu = await q;
  onGetCuentas((querySnapshot) => {
    tasksContainer3.innerHTML = "";

 
    querySnapshot.forEach((doc) => {
      const task = doc.data();

      // const sumatotal = ;
     
     


      tasksContainer3.innerHTML += `
      <tr >
        <td>${task.nombre}</td>    
         
 <td>$${task.presupuesto}</td>
 <td>${task.description}</td>
 <td>  
<button class="btn btn-secondary btn-edit" data-id="${doc.id}">
 🖉 Editar
</button>
<button class="btn btn-primary btn-delete" data-id="${doc.id}">
 🗑 Eliminar
</button>
</td> </tr>

   `; 

    });

  
   //console.log(arr.length)
 
    const btnsDelete = tasksContainer3.querySelectorAll(".btn-delete");
    btnsDelete.forEach((btn) =>
      btn.addEventListener("click", async ({ target: { dataset } }) => {
        try {
          await deleteCuenta(dataset.id);
        } catch (error) {
          console.log(error);
        }
      })
    );

    const btnsEdit = tasksContainer3.querySelectorAll(".btn-edit");
    btnsEdit.forEach((btn) => {
      btn.addEventListener("click", async (e) => {
        try {
          const doc = await getCuentas(e.target.dataset.id);
          const task = doc.data();
          taskForm4["task-nombrecuenta"].value = task.nombre;
          taskForm4["task-presupuesto"].value = task.presupuesto;
          taskForm4["task-desccuenta"].value = task.description;
        
          editStatus = true;
          id = doc.id;
          taskForm4["btn-task-form"].innerText = "Actualizar";
        } catch (error) {
          console.log(error);
        }
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
        if (!editStatus) {
          await saveCuenta(nuevacuenta, cuentapresupuesto, cuentadescr);
    
        } else {
          await updateCuenta(id, {
            nombre: nuevacuenta,
            presupuesto: cuentapresupuesto,
            description: cuentadescr,
        
    
          });
    
          editStatus = false;
          id = "";
          taskForm4["btn-task-form"].innerText = "Save";
        }
    
        taskForm4.reset();
     
     // taskForm["task-category"].value = '';
    } catch (error) {
      console.log(error);
    }
  
  });
  
  
  
  
  