import {
  onGetDia,
  // q,
  ver,
  saveCat,
  onGetMes,
  onGetCategorias,
  saveTask,
  deleteTask,
  getTask,
  getTasking,
  updateTask,
  onGetTareas,
  cerrarSesion,
  getTasks,
  auth,

} from "./firebase.js";


//formulario para agregar gastos o ingresos
const taskForm = document.getElementById("task-form");
const tasksContainer = document.getElementById("tasks-container");

//tabla para visualizar el mes
const tasksContainer2 = document.getElementById("tasks-container2");
const botonCerrar = document.getElementById("cerrar");


//formulario para agregar una nueva categoria
const taskForm3 = document.getElementById("task-form3");
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


  onGetCategorias((Snapshot) => {
    // tasksContainer2.innerHTML = "";

    Snapshot.forEach((doc) => {
      const cate = doc.data().categoria;
      //  console.log(cate);



      tasksContainerCategory.innerHTML += `
    
        <option>${doc.data().categoria}</option>    
         

   `;



      //  document.getElementById('nombre').innerHTML = doc.data().name;

    });

  });





  // const querySnapshotu = await q;
  onGetDia((querySnapshot) => {
    tasksContainer.innerHTML = "";

    const arr = [];
    querySnapshot.forEach((doc) => {
      const task = doc.data();

      // const sumatotal = ;
      let myString = parseFloat(task.cantidad);
      

      arr.push(myString);
     
     


      tasksContainer.innerHTML += `
      <tr >
        <td>${task.date}</td>    
         
 <td>${task.category}</td>
 <td>${task.title}</td>
 <td>${task.cantidad}</td>
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

    let total = arr.reduce((a, b) => a + b, 0);
      
   tasksContainer.innerHTML +=  `<tr><td>Total</td><td></td><td></td><td>$`+total+`</td><td></td><td></td></tr>`

   //console.log(arr.length)
 
    const btnsDelete = tasksContainer.querySelectorAll(".btn-delete");
    btnsDelete.forEach((btn) =>
      btn.addEventListener("click", async ({ target: { dataset } }) => {
        try {
          await deleteTask(dataset.id);
        } catch (error) {
          console.log(error);
        }
      })
    );

    const btnsEdit = tasksContainer.querySelectorAll(".btn-edit");
    btnsEdit.forEach((btn) => {
      btn.addEventListener("click", async (e) => {
        try {
          const doc = await getTask(e.target.dataset.id);
          const task = doc.data();
          taskForm["task-title"].value = task.title;
          taskForm["task-category"].value = task.category;
          taskForm["task-description"].value = task.description;
          taskForm["task-number"].value = task.cantidad;
          editStatus = true;
          id = doc.id;
          taskForm["btn-task-form"].innerText = "Actualizar";
        } catch (error) {
          console.log(error);
        }
      });
    });
    
  });
  

  //aqui empieza el tab para la información mensual


  onGetMes((querySnapshot) => {
    tasksContainer2.innerHTML = "";
    const arr2 = [];
    querySnapshot.forEach((doc) => {
      const task = doc.data();
      let myString = parseFloat(task.cantidad);
      

      arr2.push(myString);
    
      tasksContainer2.innerHTML += `
      <tr >
        <td>${task.date}</td>    
         
 <td>${task.category}</td>
 <td>${task.title}</td>
 <td>${task.cantidad}</td>
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
//suma total de los gastos del mes
    let total = arr2.reduce((a, b) => a + b, 0);
      
    tasksContainer2.innerHTML +=  `<tr><td>Total</td><td></td><td></td><td>$`+total+`</td><td></td><td></td></tr>`
 

    const btnsDelete = tasksContainer2.querySelectorAll(".btn-delete");
    btnsDelete.forEach((btn) =>
      btn.addEventListener("click", async ({ target: { dataset } }) => {
        try {
          await deleteTask(dataset.id);
        } catch (error) {
          console.log(error);
        }
      })
    );

    const btnsEdit = tasksContainer2.querySelectorAll(".btn-edit");
    btnsEdit.forEach((btn) => {
      btn.addEventListener("click", async (e) => {
        try {
          const doc = await getTask(e.target.dataset.id);
          const task = doc.data();
          taskForm["task-title"].value = task.title;
          taskForm["task-category"].value = task.category;
          taskForm["task-description"].value = task.description;
          taskForm["task-number"].value = task.cantidad;
          editStatus = true;
          id = doc.id;
          taskForm["btn-task-form"].innerText = "Actualizar";
        } catch (error) {
          console.log(error);
        }
      });
    });

  });


});

//guardar un nuevo registro
taskForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const title = taskForm["task-title"];
  const categoria = taskForm["task-category"];
  const description = taskForm["task-description"];
  const cantidad = taskForm["task-number"];
  const uid = document.getElementById('nombre').innerHTML;



  try {
    if (!editStatus) {
      await saveTask(fechaRegistrar, title.value, categoria.value, description.value, cantidad.value, uid);

    } else {
      await updateTask(id, {
        title: title.value,
        category: categoria.value,
        description: description.value,
        cantidad: cantidad.value,

      });

      editStatus = false;
      id = "";
      taskForm["btn-task-form"].innerText = "Save";
    }

    taskForm.reset();
    title.focus();
  } catch (error) {
    console.log(error);
  }
});


//agregar una nueva categoria

taskForm3.addEventListener("submit", async (e) => {
  e.preventDefault();

  const nuevacategoria = taskForm3["nuevaCategoria"].value;
  const emoji = taskForm3["task-emoji"].value;

  const newcategory = nuevacategoria + " " + emoji;

  try {
    tasksContainerCategory.innerHTML = `
    
    
     

`;
    await saveCat(newcategory);


    taskForm3.reset();
    taskForm["task-category"].value = '';
  } catch (error) {
    console.log(error);
  }

});

//agregar nuevas cuentas
taskForm4.addEventListener("submit", async (e) => {
  e.preventDefault();

  const nuevacuenta = taskForm3["task-nombrecuenta"].value;
  const cuentapresupuesto = taskForm3["task-presupuesto"].value;
  const cuentadescr = taskForm3["task-desccuenta"].value;


  //const newcategory = nuevacategoria + " " + emoji;

  try {
  
    await saveCuenta(nuevacuenta, cuentapresupuesto, cuentadescr);


    taskForm4.reset();
   // taskForm["task-category"].value = '';
  } catch (error) {
    console.log(error);
  }

});




